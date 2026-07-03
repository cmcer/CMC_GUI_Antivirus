import { useEffect, useRef } from 'react'
import {
  Loader2,
  FileSearch,
  ShieldCheck,
  ShieldAlert,
  Bug,
  Files,
  Timer,
  Square,
} from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { useScanStore } from '../store/useScanStore'
import { formatNumber, formatDuration } from '../services/format'
import { scanTypeLabels } from '../services/mockData'

/**
 * Full-panel overlay shown while scanning and on completion.
 * Renders a live progress ring, streaming file path, and stats.
 */
export default function ScanningOverlay() {
  const { appLanguage, t } = useAppStore()
  const {
    scanStatus,
    scanProgress,
    currentScanningFile,
    filesScanned,
    threatsFound,
    elapsedSec,
    activeScanType,
    liveThreats,
    stopScan,
    resetScan,
  } = useScanStore()

  const logRef = useRef<HTMLDivElement>(null)

  // Keep the threat log scrolled to the newest entry.
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight })
  }, [liveThreats.length])

  if (scanStatus === 'idle') return null

  const done = scanStatus === 'completed'
  const clean = done && threatsFound === 0
  const typeLabel = activeScanType
    ? scanTypeLabels[activeScanType][appLanguage === 'VN' ? 'vn' : 'en']
    : ''

  const R = 54
  const C = 2 * Math.PI * R
  const dash = C - (scanProgress / 100) * C

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden
        onClick={done ? resetScan : undefined}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('scanning')}
        className="card animate-fade-up relative w-full max-w-lg overflow-hidden p-8 shadow-glow"
      >
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-cyan/15 blur-3xl" />

        {/* Progress ring */}
        <div className="relative mx-auto grid h-40 w-40 place-items-center">
          <svg className="h-40 w-40 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r={R} className="fill-none stroke-surface-3" strokeWidth="8" />
            <circle
              cx="60"
              cy="60"
              r={R}
              className={[
                'fill-none transition-[stroke-dashoffset] duration-150 ease-linear',
                clean ? 'stroke-accent' : done ? 'stroke-warning' : 'stroke-cyan',
              ].join(' ')}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={done ? 0 : dash}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            {done ? (
              clean ? (
                <ShieldCheck className="h-12 w-12 text-accent" />
              ) : (
                <ShieldAlert className="h-12 w-12 text-warning" />
              )
            ) : (
              <>
                <span className="font-mono text-3xl font-bold tabular-nums text-content">
                  {Math.round(scanProgress)}%
                </span>
                <Loader2 className="mt-1 h-4 w-4 animate-spin text-cyan" />
              </>
            )}
          </div>
        </div>

        {/* Heading */}
        <div className="mt-5 text-center">
          <h3 className="text-lg font-bold text-content">
            {done ? t('scan_complete') : `${t('scanning')}: ${typeLabel}`}
          </h3>
          {done && (
            <p
              className={[
                'mt-1 text-sm font-medium',
                clean ? 'text-accent' : 'text-warning',
              ].join(' ')}
            >
              {clean
                ? t('no_threats')
                : `${threatsFound} ${t('threats_detected_n')}`}
            </p>
          )}
        </div>

        {/* Live file path */}
        {!done && (
          <div className="mt-5 flex items-center gap-2 rounded-xl border border-line bg-surface-2 px-3 py-2.5">
            <FileSearch className="h-4 w-4 shrink-0 text-cyan" />
            <span className="truncate font-mono text-xs text-content-muted" title={currentScanningFile}>
              {currentScanningFile || 'C:/...'}
            </span>
          </div>
        )}

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <Stat icon={Files} label={t('files_scanned')} value={formatNumber(filesScanned, appLanguage)} />
          <Stat
            icon={Bug}
            label={t('threats_found')}
            value={String(threatsFound)}
            danger={threatsFound > 0}
          />
          <Stat icon={Timer} label={t('elapsed')} value={formatDuration(elapsedSec)} mono />
        </div>

        {/* Threat log */}
        {liveThreats.length > 0 && (
          <div
            ref={logRef}
            className="mt-4 max-h-28 space-y-1.5 overflow-y-auto rounded-xl border border-danger/20 bg-danger/5 p-3"
          >
            {liveThreats.map((th, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <Bug className="h-3.5 w-3.5 shrink-0 text-danger" />
                <span className="font-semibold text-danger">{th.name}</span>
                <span className="truncate font-mono text-content-dim" title={th.path}>
                  {th.path}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="mt-6">
          {done ? (
            <button onClick={resetScan} className="btn-primary w-full justify-center">
              {t('btn_done')}
            </button>
          ) : (
            <button onClick={stopScan} className="btn-ghost w-full justify-center hover:border-danger/60 hover:text-danger">
              <Square className="h-4 w-4" />
              {t('btn_stop')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
  danger,
  mono,
}: {
  icon: typeof Files
  label: string
  value: string
  danger?: boolean
  mono?: boolean
}) {
  return (
    <div className="rounded-xl border border-line bg-surface-2 p-3 text-center">
      <Icon className={['mx-auto h-4 w-4', danger ? 'text-danger' : 'text-content-dim'].join(' ')} />
      <p
        className={[
          'mt-1.5 text-lg font-bold tabular-nums',
          mono ? 'font-mono' : '',
          danger ? 'text-danger' : 'text-content',
        ].join(' ')}
      >
        {value}
      </p>
      <p className="text-[10px] font-medium text-content-dim">{label}</p>
    </div>
  )
}
