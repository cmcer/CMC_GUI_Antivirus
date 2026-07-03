import { useAppStore } from '../store/useAppStore'
import { useScanStore } from '../store/useScanStore'

type BannerState = 'safe' | 'scanning' | 'risk'

interface ShieldTheme {
  from: string
  to: string
  glow: string
  mark: 'check' | 'alert'
}

const shieldThemes: Record<BannerState, ShieldTheme> = {
  safe: { from: '#4ADE80', to: '#15A34A', glow: 'rgba(34,197,94,0.65)', mark: 'check' },
  scanning: { from: '#5CC7FA', to: '#0C8FD8', glow: 'rgba(56,189,248,0.6)', mark: 'check' },
  risk: { from: '#FBBF24', to: '#F97316', glow: 'rgba(249,115,22,0.6)', mark: 'alert' },
}

/** Faint tech accents on the right — corner bracket + node, matching the design. */
function RightAccents() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
      viewBox="0 0 1000 150"
      preserveAspectRatio="xMaxYMid slice"
      fill="none"
    >
      <g stroke="rgba(160,195,250,0.45)" strokeWidth="1.4">
        <path d="M872 14 H986 V66" />
        <path d="M986 116 H902" />
      </g>
      <circle cx="900" cy="116" r="5" fill="rgba(195,222,255,0.6)" />
      <circle cx="900" cy="116" r="9.5" stroke="rgba(195,222,255,0.3)" strokeWidth="1.2" />
      <text
        x="930"
        y="78"
        fill="rgba(150,190,245,0.28)"
        fontFamily="Fira Code, monospace"
        fontSize="15"
      >
        01
      </text>
    </svg>
  )
}

function ShieldEmblem({ theme }: { theme: ShieldTheme }) {
  return (
    <div className="relative shrink-0">
      <div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{ background: theme.glow }}
        aria-hidden
      />
      <svg viewBox="0 0 120 132" className="relative h-[104px] w-[95px]" fill="none">
        <defs>
          <linearGradient id="shield-fill" x1="24" y1="6" x2="96" y2="126" gradientUnits="userSpaceOnUse">
            <stop stopColor={theme.from} />
            <stop offset="1" stopColor={theme.to} />
          </linearGradient>
          <radialGradient id="shield-hi" cx="0.36" cy="0.28" r="0.7">
            <stop stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          d="M60 6 C74 6 92 11 100 15 C104 17 106 20 106 26 V62 C106 91 87 113 60 124 C33 113 14 91 14 62 V26 C14 20 16 17 20 15 C28 11 46 6 60 6 Z"
          fill="url(#shield-fill)"
        />
        <path
          d="M60 6 C74 6 92 11 100 15 C104 17 106 20 106 26 V62 C106 91 87 113 60 124 C33 113 14 91 14 62 V26 C14 20 16 17 20 15 C28 11 46 6 60 6 Z"
          fill="url(#shield-hi)"
        />
        {theme.mark === 'check' ? (
          <path
            d="M41 63 L54 77 L81 46"
            stroke="#fff"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <g stroke="#fff" strokeWidth="9" strokeLinecap="round">
            <path d="M60 40 V70" />
            <path d="M60 88 V88.5" />
          </g>
        )}
      </svg>
    </div>
  )
}

export default function StatusBanner() {
  const t = useAppStore((s) => s.t)
  const { scanStatus, threatsFound } = useScanStore()

  const state: BannerState =
    scanStatus === 'scanning'
      ? 'scanning'
      : scanStatus === 'completed' && threatsFound > 0
        ? 'risk'
        : 'safe'

  const copy = {
    safe: { title: t('status_safe_title'), desc: t('status_safe_desc') },
    scanning: { title: t('status_scanning_title'), desc: t('status_scanning_desc') },
    risk: { title: t('status_risk_title'), desc: t('status_risk_desc') },
  }[state]

  return (
    <section
      className="relative overflow-hidden rounded-2xl animate-fade-up"
      style={{
        background:
          'radial-gradient(58% 135% at 13% 50%, rgba(56,189,248,0.30), transparent 58%),' +
          'linear-gradient(100deg, #0e2668 0%, #1a3ca6 50%, #2350cc 100%)',
      }}
    >
      {/* Dotted particle texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.11) 1px, transparent 1.6px)',
          backgroundSize: '12px 12px',
          maskImage: 'linear-gradient(90deg, transparent 6%, black 42%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 6%, black 42%)',
          opacity: 0.55,
        }}
      />
      <RightAccents />

      <div className="relative flex items-center gap-6 px-9 py-7">
        <ShieldEmblem theme={shieldThemes[state]} />
        <div>
          <h2 className="text-xl font-semibold leading-7 tracking-tight text-white">
            {copy.title}
          </h2>
          <p className="mt-1 text-sm font-normal text-blue-100/75">{copy.desc}</p>
        </div>
      </div>
    </section>
  )
}
