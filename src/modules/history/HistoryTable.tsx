import { Zap, HardDrive, FolderSearch, ShieldCheck, ShieldAlert, Clock } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { useScanStore, type ScanType } from '../../store/useScanStore'
import { formatNumber, formatDuration, formatRelative } from '../../services/format'
import { scanTypeLabels } from '../../services/mockData'

const typeIcon: Record<ScanType, LucideIcon> = {
  quick: Zap,
  full: HardDrive,
  custom: FolderSearch,
}

interface HistoryTableProps {
  /** Show only the most recent N rows (dashboard preview). */
  limit?: number
  title?: string
}

export default function HistoryTable({ limit, title }: HistoryTableProps) {
  const { appLanguage, t } = useAppStore()
  const scanHistory = useScanStore((s) => s.scanHistory)
  const rows = limit ? scanHistory.slice(0, limit) : scanHistory

  return (
    <section className="card animate-fade-up overflow-hidden">
      <div className="flex items-center gap-2 border-b border-line px-5 py-4">
        <Clock className="h-[18px] w-[18px] text-cyan" />
        <h3 className="text-sm font-bold text-content">{title ?? t('history_title')}</h3>
      </div>

      {rows.length === 0 ? (
        <div className="px-5 py-10 text-center text-sm text-content-muted">
          {t('empty_history')}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-content-dim">
                <th className="px-5 py-3 font-semibold">{t('col_time')}</th>
                <th className="px-5 py-3 font-semibold">{t('col_type')}</th>
                <th className="px-5 py-3 font-semibold">{t('col_files')}</th>
                <th className="px-5 py-3 font-semibold">{t('col_duration')}</th>
                <th className="px-5 py-3 text-right font-semibold">{t('col_result')}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const Icon = typeIcon[row.type]
                const clean = row.threatsFound === 0
                return (
                  <tr
                    key={row.id}
                    className="border-t border-line/70 transition-colors hover:bg-surface-2/60"
                  >
                    <td className="whitespace-nowrap px-5 py-3.5 text-content-muted">
                      {formatRelative(row.timestamp, appLanguage)}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-2 font-medium text-content">
                        <Icon className="h-4 w-4 text-cyan" />
                        {scanTypeLabels[row.type][appLanguage === 'VN' ? 'vn' : 'en']}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 font-mono tabular-nums text-content-muted">
                      {formatNumber(row.filesScanned, appLanguage)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 font-mono tabular-nums text-content-muted">
                      {formatDuration(row.durationSec)}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span
                        className={[
                          'chip border',
                          clean
                            ? 'border-accent/30 bg-accent/10 text-accent'
                            : 'border-danger/30 bg-danger/10 text-danger',
                        ].join(' ')}
                      >
                        {clean ? (
                          <>
                            <ShieldCheck className="h-3.5 w-3.5" />
                            {t('result_clean')}
                          </>
                        ) : (
                          <>
                            <ShieldAlert className="h-3.5 w-3.5" />
                            {row.threatsFound} {t('result_threats')}
                          </>
                        )}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
