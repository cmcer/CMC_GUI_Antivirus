import { KeyRound, BadgeCheck, CalendarClock, Crown } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import { useAppStore } from '../../store/useAppStore'

export default function LicensePage() {
  const t = useAppStore((s) => s.t)

  return (
    <div className="space-y-6">
      <PageHeader icon={KeyRound} title={t('license_title')} subtitle={t('license_premium')} />

      {/* License hero card */}
      <section className="card relative overflow-hidden px-6 py-7 animate-fade-up shadow-glow">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
        <div className="relative flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-warning to-amber-500 shadow-glow">
            <Crown className="h-7 w-7 text-white" />
          </div>
          <div>
            <p className="text-lg font-extrabold text-content">{t('license_premium')}</p>
            <p className="font-mono text-xs text-content-muted">
              KEY: CMC-PREM-A1B2-C3D4-E5F6
            </p>
          </div>
        </div>
      </section>

      <section className="card animate-fade-up divide-y divide-line">
        <Row icon={BadgeCheck} label={t('license_status')} value={t('license_active')} accent />
        <Row icon={Crown} label={t('license_type')} value={t('license_premium')} />
        <Row icon={CalendarClock} label={t('license_expiry')} value="03/07/2027" />
      </section>
    </div>
  )
}

function Row({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof BadgeCheck
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <span className="inline-flex items-center gap-2.5 text-sm font-medium text-content-muted">
        <Icon className="h-4 w-4 text-cyan" />
        {label}
      </span>
      <span
        className={[
          'text-sm font-semibold',
          accent ? 'text-accent' : 'text-content',
        ].join(' ')}
      >
        {value}
      </span>
    </div>
  )
}
