import { Search, Bell, ShieldCheck } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { useScanStore } from '../store/useScanStore'

export default function TopBar() {
  const t = useAppStore((s) => s.t)
  const scanStatus = useScanStore((s) => s.scanStatus)
  const threatsFound = useScanStore((s) => s.threatsFound)
  const secure = !(scanStatus === 'completed' && threatsFound > 0)

  return (
    <div className="flex items-center justify-between gap-4 px-7 py-4">
      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-dim" />
        <input
          type="text"
          placeholder={t('search')}
          className="w-full rounded-xl border border-line bg-surface-2 py-2.5 pl-9 pr-3 text-sm text-content placeholder:text-content-dim focus:border-primary/60 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-3">
        <span
          className={[
            'chip border',
            secure
              ? 'border-accent/30 bg-accent/10 text-accent'
              : 'border-danger/30 bg-danger/10 text-danger',
          ].join(' ')}
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          {secure ? t('status_safe_title') : t('status_risk_title')}
        </span>

        <button
          aria-label="Notifications"
          className="relative grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface-2 text-content-muted transition-colors hover:text-content"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-cyan" />
        </button>

        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-cyan text-sm font-bold text-white">
          AD
        </div>
      </div>
    </div>
  )
}
