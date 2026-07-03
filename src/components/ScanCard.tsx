import { Zap, HardDrive, FolderSearch, ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { useScanStore, type ScanType } from '../store/useScanStore'
import type { TranslationKey } from '../i18n/translations'

interface ScanCardProps {
  type: ScanType
}

const meta: Record<
  ScanType,
  {
    icon: LucideIcon
    titleKey: TranslationKey
    descKey: TranslationKey
    ctaKey: TranslationKey
    est: string
    accent: string
    iconBg: string
  }
> = {
  quick: {
    icon: Zap,
    titleKey: 'scan_quick_title',
    descKey: 'scan_quick_desc',
    ctaKey: 'btn_scan_now',
    est: '~2 phút',
    accent: 'text-cyan',
    iconBg: 'from-cyan/25 to-primary/10 text-cyan',
  },
  full: {
    icon: HardDrive,
    titleKey: 'scan_full_title',
    descKey: 'scan_full_desc',
    ctaKey: 'btn_scan_now',
    est: '~30 phút',
    accent: 'text-primary',
    iconBg: 'from-primary/30 to-cyan/10 text-primary',
  },
  custom: {
    icon: FolderSearch,
    titleKey: 'scan_custom_title',
    descKey: 'scan_custom_desc',
    ctaKey: 'btn_choose_file',
    est: '—',
    accent: 'text-accent',
    iconBg: 'from-accent/25 to-emerald-400/10 text-accent',
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
    <div className="card group flex flex-col p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow">
      <div
        className={[
          'grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br',
          m.iconBg,
        ].join(' ')}
      >
        <Icon className="h-6 w-6" strokeWidth={2} />
      </div>

      <h3 className="mt-4 text-base font-bold text-content">{t(m.titleKey)}</h3>
      <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-content-muted">
        {t(m.descKey)}
      </p>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-[11px] font-medium text-content-dim">
          {t('est_time')}: <span className={m.accent}>{m.est}</span>
        </span>
      </div>

      <button
        onClick={() => startScan(type)}
        disabled={busy}
        className="btn-primary mt-4 w-full justify-center"
      >
        {t(m.ctaKey)}
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  )
}
