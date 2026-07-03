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
  safe: { from: '#34D399', to: '#16A34A', glow: 'rgba(34,197,94,0.55)', mark: 'check' },
  scanning: { from: '#38BDF8', to: '#0EA5E9', glow: 'rgba(56,189,248,0.55)', mark: 'check' },
  risk: { from: '#FBBF24', to: '#F97316', glow: 'rgba(249,115,22,0.55)', mark: 'alert' },
}

/** Decorative PCB / circuit traces fading in from the right. */
function CircuitPattern() {
  return (
    <svg
      className="pointer-events-none absolute inset-y-0 right-0 h-full w-[62%]"
      viewBox="0 0 420 240"
      preserveAspectRatio="xMaxYMid slice"
      fill="none"
      style={{
        maskImage: 'linear-gradient(90deg, transparent, black 55%)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 55%)',
      }}
    >
      <g stroke="rgba(150,200,255,0.35)" strokeWidth="1.4">
        <path d="M420 34 H322 V72 H382" />
        <path d="M420 96 H300 V58" />
        <path d="M420 150 H344 V196 H300" />
        <path d="M420 206 H356 V168" />
        <path d="M262 240 V150 H210" />
        <path d="M392 240 V200" />
      </g>
      <g fill="rgba(190,225,255,0.75)">
        <circle cx="322" cy="72" r="3" />
        <circle cx="300" cy="58" r="3" />
        <circle cx="344" cy="196" r="3" />
        <circle cx="356" cy="168" r="3" />
        <circle cx="210" cy="150" r="3" />
        <circle cx="382" cy="72" r="2.5" />
      </g>
      <g fill="rgba(150,200,255,0.35)" fontFamily="Fira Code, monospace" fontSize="11">
        <text x="238" y="60">1010</text>
        <text x="300" y="120">01</text>
        <text x="330" y="228">1101</text>
      </g>
    </svg>
  )
}

function ShieldEmblem({ theme }: { theme: ShieldTheme }) {
  return (
    <div className="relative shrink-0">
      <div
        className="absolute inset-0 -z-0 rounded-full blur-2xl"
        style={{ background: theme.glow }}
        aria-hidden
      />
      <svg
        viewBox="0 0 120 132"
        className="relative h-[130px] w-[118px] drop-shadow-[0_6px_20px_rgba(0,0,0,0.35)]"
        fill="none"
      >
        <defs>
          <linearGradient id="shield-fill" x1="20" y1="8" x2="100" y2="124" gradientUnits="userSpaceOnUse">
            <stop stopColor={theme.from} />
            <stop offset="1" stopColor={theme.to} />
          </linearGradient>
        </defs>
        <path
          d="M60 6 L106 24 V64 C106 92 86 114 60 124 C34 114 14 92 14 64 V24 Z"
          fill="url(#shield-fill)"
        />
        <path d="M60 6 L106 24 V64 C106 92 86 114 60 124 Z" fill="#000" opacity="0.08" />
        {theme.mark === 'check' ? (
          <path
            d="M40 64 L54 79 L82 46"
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
          'linear-gradient(105deg, #0f2a63 0%, #163a8f 46%, #1e50c8 100%)',
      }}
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-10 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-cyan/10 blur-3xl" />
      <CircuitPattern />

      <div className="relative flex items-center gap-7 px-9 py-9 sm:px-12">
        <ShieldEmblem theme={shieldThemes[state]} />
        <div>
          <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-[28px]">
            {copy.title}
          </h2>
          <p className="mt-2 text-[15px] font-medium text-blue-100/80">{copy.desc}</p>
        </div>
      </div>
    </section>
  )
}
