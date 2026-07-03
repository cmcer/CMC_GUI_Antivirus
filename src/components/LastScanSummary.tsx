import { useAppStore } from '../store/useAppStore'
import { useScanStore } from '../store/useScanStore'
import { formatDateShort } from '../services/format'
import { scanTypeLabels } from '../services/mockData'

/**
 * Compact key-value summary of the most recent scan, matching the
 * reference layout: Lần quét gần nhất / Kiểu quét / Kết quả.
 */
export default function LastScanSummary() {
  const { appLanguage, t } = useAppStore()
  const last = useScanStore((s) => s.scanHistory[0])

  const date = last ? formatDateShort(last.timestamp) : '—'
  const typeLabel = last
    ? scanTypeLabels[last.type][appLanguage === 'VN' ? 'vn' : 'en']
    : t('no_scan_yet')

  // Any completed scan resolves to a safe/handled state (green).
  const resultText = !last
    ? '—'
    : last.threatsFound > 0
      ? t('result_handled')
      : t('result_clean')

  const rows: { label: string; value: string; green?: boolean }[] = [
    { label: t('col_time'), value: date },
    { label: t('col_type'), value: typeLabel },
    { label: t('col_result'), value: resultText, green: true },
  ]

  return (
    <section className="card animate-fade-up px-8 py-6">
      <dl className="space-y-5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-6">
            <dt className="w-44 shrink-0 text-[15px] text-content-muted">{row.label}</dt>
            <dd
              className={[
                'text-[15px] font-bold',
                row.green ? 'text-accent' : 'text-content',
              ].join(' ')}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
