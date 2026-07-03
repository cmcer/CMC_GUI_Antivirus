import { ShieldCheck, ShieldAlert, Loader2, Lock, Globe, Flame, Fingerprint } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { useScanStore } from '../store/useScanStore'

type BannerState = 'safe' | 'scanning' | 'risk'

const moduleIcons: Record<string, LucideIcon> = {
  realtime: Fingerprint,
  firewall: Flame,
  web: Globe,
  ransomware: Lock,
}

export default function StatusBanner() {
  const t = useAppStore((s) => s.t)
  const modules = useAppStore((s) => s.modules)
  const { scanStatus, threatsFound } = useScanStore()

  const state: BannerState =
    scanStatus === 'scanning'
      ? 'scanning'
      : scanStatus === 'completed' && threatsFound > 0
        ? 'risk'
        : 'safe'

  const config = {
    safe: {
      Icon: ShieldCheck,
      title: t('status_safe_title'),
      desc: t('status_safe_desc'),
      ring: 'from-accent to-emerald-400',
      glow: 'shadow-glow-accent',
      iconColor: 'text-accent',
      pulse: 'bg-accent/40',
    },
    scanning: {
      Icon: Loader2,
      title: t('status_scanning_title'),
      desc: t('status_scanning_desc'),
      ring: 'from-cyan to-primary',
      glow: 'shadow-glow-cyan',
      iconColor: 'text-cyan',
      pulse: 'bg-cyan/40',
    },
    risk: {
      Icon: ShieldAlert,
      title: t('status_risk_title'),
      desc: t('status_risk_desc'),
      ring: 'from-warning to-danger',
      glow: 'shadow-[0_0_40px_-8px_rgba(239,68,68,0.55)]',
      iconColor: 'text-warning',
      pulse: 'bg-danger/40',
    },
  }[state]

  const { Icon } = config
  const activeCount = modules.filter((m) => m.enabled).length

  return (
    <section
      className={[
        'card relative overflow-hidden animate-fade-up',
        'bg-gradient-to-br from-surface-2 via-surface to-surface',
        config.glow,
      ].join(' ')}
    >
      {/* Ambient decorative glow blobs */}
      <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-cyan/10 blur-3xl" />

      <div className="relative flex flex-col items-center gap-6 px-8 py-9 sm:flex-row sm:items-center sm:gap-8 sm:px-10">
        {/* Shield emblem */}
        <div className="relative shrink-0">
          <span className={['absolute inset-0 rounded-full', config.pulse, 'animate-pulse-ring'].join(' ')} />
          <div
            className={[
              'relative grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br',
              config.ring,
            ].join(' ')}
          >
            <div className="grid h-[104px] w-[104px] place-items-center rounded-full bg-surface/90 backdrop-blur">
              <Icon
                className={[
                  'h-14 w-14',
                  config.iconColor,
                  state === 'scanning' ? 'animate-spin-slow' : '',
                ].join(' ')}
                strokeWidth={1.8}
              />
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-[22px] font-extrabold leading-tight tracking-tight text-content sm:text-2xl">
            {config.title}
          </h2>
          <p className="mt-1.5 text-sm font-medium text-content-muted">{config.desc}</p>

          {/* Module chips */}
          <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
            {modules.map((m) => {
              const MIcon = moduleIcons[m.id] ?? ShieldCheck
              return (
                <span
                  key={m.id}
                  className={[
                    'chip border',
                    m.enabled
                      ? 'border-accent/30 bg-accent/10 text-accent'
                      : 'border-line bg-surface-2 text-content-dim',
                  ].join(' ')}
                >
                  <MIcon className="h-3.5 w-3.5" />
                  {t(m.labelKey)}
                </span>
              )
            })}
          </div>
        </div>

        {/* Score ring */}
        <div className="hidden shrink-0 flex-col items-center gap-1 border-l border-line pl-8 lg:flex">
          <span className="text-4xl font-extrabold text-content">{activeCount}/4</span>
          <span className="text-xs font-medium text-content-muted">
            {t('protection_active')}
          </span>
        </div>
      </div>
    </section>
  )
}
