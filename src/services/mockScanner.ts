import {
  mockScanPaths,
  mockSuspiciousPaths,
  mockThreatNames,
} from './mockData'
import type { ScanType } from '../store/useScanStore'

export interface ScanTick {
  progress: number
  currentFile: string
  filesScanned: number
  threatsFound: number
  elapsedSec: number
  /** Present only on the tick where a new threat is discovered. */
  newThreat?: { name: string; path: string }
}

interface ScanProfile {
  /** Progress gained per tick (percent). */
  speed: number
  /** Files counted per tick. */
  fileRate: number
  /** Probability (0-1) a threat is found on a given tick. */
  threatChance: number
}

const profiles: Record<ScanType, ScanProfile> = {
  quick: { speed: 2.4, fileRate: 180, threatChance: 0.015 },
  full: { speed: 0.8, fileRate: 640, threatChance: 0.03 },
  custom: { speed: 3.2, fileRate: 60, threatChance: 0.02 },
}

const TICK_MS = 120

export interface ScanController {
  stop: () => void
}

/**
 * Simulates an antivirus scan using timed intervals.
 * Emits progress ticks via onTick and finishes via onComplete.
 */
export function startScanSimulation(
  type: ScanType,
  onTick: (tick: ScanTick) => void,
  onComplete: (final: ScanTick) => void,
): ScanController {
  const profile = profiles[type]
  const startedAt = Date.now()

  let progress = 0
  let filesScanned = 0
  let threatsFound = 0
  let currentFile = mockScanPaths[0]
  let stopped = false

  const interval = window.setInterval(() => {
    if (stopped) return

    // Advance progress with a little organic jitter.
    progress = Math.min(100, progress + profile.speed * (0.6 + Math.random() * 0.8))
    filesScanned += Math.round(profile.fileRate * (0.5 + Math.random()))
    const elapsedSec = (Date.now() - startedAt) / 1000

    let newThreat: ScanTick['newThreat']
    if (Math.random() < profile.threatChance && progress < 96) {
      const path =
        mockSuspiciousPaths[Math.floor(Math.random() * mockSuspiciousPaths.length)]
      const name =
        mockThreatNames[Math.floor(Math.random() * mockThreatNames.length)]
      threatsFound += 1
      newThreat = { name, path }
      currentFile = path
    } else {
      currentFile = mockScanPaths[Math.floor(Math.random() * mockScanPaths.length)]
    }

    const tick: ScanTick = {
      progress,
      currentFile,
      filesScanned,
      threatsFound,
      elapsedSec,
      newThreat,
    }

    if (progress >= 100) {
      window.clearInterval(interval)
      onComplete({ ...tick, progress: 100 })
    } else {
      onTick(tick)
    }
  }, TICK_MS)

  return {
    stop: () => {
      stopped = true
      window.clearInterval(interval)
    },
  }
}
