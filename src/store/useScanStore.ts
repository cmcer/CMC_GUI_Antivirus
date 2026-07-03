import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  startScanSimulation,
  type ScanController,
  type ScanTick,
} from '../services/mockScanner'
import { seedHistory } from '../services/mockData'

export type ScanStatus = 'idle' | 'scanning' | 'completed'
export type ScanType = 'quick' | 'full' | 'custom'

export interface ScanHistoryEntry {
  id: string
  type: ScanType
  timestamp: number
  filesScanned: number
  threatsFound: number
  durationSec: number
}

export interface ThreatLog {
  name: string
  path: string
}

interface ScanState {
  scanStatus: ScanStatus
  scanProgress: number
  currentScanningFile: string
  activeScanType: ScanType | null
  filesScanned: number
  threatsFound: number
  elapsedSec: number
  liveThreats: ThreatLog[]
  scanHistory: ScanHistoryEntry[]

  startScan: (type: ScanType) => void
  stopScan: () => void
  resetScan: () => void
}

// Controller lives outside the store — it's imperative and non-serializable.
let controller: ScanController | null = null

export const useScanStore = create<ScanState>()(
  persist(
    (set, get) => ({
      scanStatus: 'idle',
      scanProgress: 0,
      currentScanningFile: '',
      activeScanType: null,
      filesScanned: 0,
      threatsFound: 0,
      elapsedSec: 0,
      liveThreats: [],
      scanHistory: seedHistory(),

      startScan: (type) => {
        // Guard against double-starts.
        if (get().scanStatus === 'scanning') return
        controller?.stop()

        set({
          scanStatus: 'scanning',
          activeScanType: type,
          scanProgress: 0,
          currentScanningFile: '',
          filesScanned: 0,
          threatsFound: 0,
          elapsedSec: 0,
          liveThreats: [],
        })

        const applyTick = (tick: ScanTick) => {
          set((s) => ({
            scanProgress: tick.progress,
            currentScanningFile: tick.currentFile,
            filesScanned: tick.filesScanned,
            threatsFound: tick.threatsFound,
            elapsedSec: tick.elapsedSec,
            liveThreats: tick.newThreat
              ? [...s.liveThreats, tick.newThreat]
              : s.liveThreats,
          }))
        }

        controller = startScanSimulation(type, applyTick, (final) => {
          controller = null
          const entry: ScanHistoryEntry = {
            id: `scan-${Date.now()}`,
            type,
            timestamp: Date.now(),
            filesScanned: final.filesScanned,
            threatsFound: final.threatsFound,
            durationSec: Math.max(1, Math.round(final.elapsedSec)),
          }
          set((s) => ({
            scanStatus: 'completed',
            scanProgress: 100,
            currentScanningFile: final.currentFile,
            filesScanned: final.filesScanned,
            threatsFound: final.threatsFound,
            elapsedSec: final.elapsedSec,
            liveThreats: final.newThreat
              ? [...s.liveThreats, final.newThreat]
              : s.liveThreats,
            scanHistory: [entry, ...s.scanHistory].slice(0, 30),
          }))
        })
      },

      stopScan: () => {
        controller?.stop()
        controller = null
        set({
          scanStatus: 'idle',
          scanProgress: 0,
          activeScanType: null,
          currentScanningFile: '',
        })
      },

      resetScan: () =>
        set({
          scanStatus: 'idle',
          scanProgress: 0,
          activeScanType: null,
          currentScanningFile: '',
          filesScanned: 0,
          threatsFound: 0,
          elapsedSec: 0,
          liveThreats: [],
        }),
    }),
    {
      name: 'cmc-av-scan',
      // Only history is persisted — transient scan state resets each launch.
      partialize: (s) => ({ scanHistory: s.scanHistory }),
    },
  ),
)
