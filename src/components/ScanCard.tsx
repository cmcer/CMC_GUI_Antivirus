import { Zap, ScanSearch, Pencil } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { useScanStore, type ScanType } from '../store/useScanStore'
import type { TranslationKey } from '../i18n/translations'

interface ScanCardProps {
  type: ScanType
}

const meta: Record<
  ScanType,
  { icon: LucideIcon; titleKey: TranslationKey; descKey: TranslationKey; ctaKey: TranslationKey }
> = {
  quick: {
    icon: Zap,
    titleKey: 'scan_quick_title',
    descKey: 'scan_quick_desc',
    ctaKey: 'btn_scan_now',
  },
  full: {
    icon: ScanSearch,
    titleKey: 'scan_full_title',
    descKey: 'scan_full_desc',
    ctaKey: 'btn_scan_now',
  },
  custom: {
    icon: Pencil,
    titleKey: 'scan_custom_title',
    descKey: 'scan_custom_desc',
    ctaKey: 'btn_choose_file',
  },
}

export default function ScanCard({ type }: ScanCardProps) {
  const t = useAppStore((s) => s.t)
  const startScan = useScanStore((s) => s.startScan)
  const scanStatus = useScanStore((s) => s.scanStatus)
  const m = meta[type]
  const Icon = m.icon
  const busy = scanStatus === 'scanning'

  return (
    <div className="card flex flex-col p-6 transition-all duration-300 hover:border-primary/40 hover:bg-surface">
      <Icon className="h-7 w-7 text-content" strokeWidth={1.8} />

      <h3 className="mt-5 text-lg font-bold text-content">{t(m.titleKey)}</h3>
      <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-content-muted">
        {t(m.descKey)}
      </p>

      <button
        onClick={() => startScan(type)}
        disabled={busy}
        className="btn-ghost mt-6 w-full justify-center py-3"
      >
        {t(m.ctaKey)}
      </button>
    </div>
  )
}
