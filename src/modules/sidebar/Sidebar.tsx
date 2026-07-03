import {
  Home,
  Clock,
  Activity,
  Cpu,
  SlidersHorizontal,
  RefreshCw,
  KeyRound,
  LifeBuoy,
  Moon,
  Sun,
  Shield,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useAppStore, type NavKey } from '../../store/useAppStore'
import type { TranslationKey } from '../../i18n/translations'

interface NavItem {
  key: NavKey
  labelKey: TranslationKey
  icon: LucideIcon
}

interface NavGroup {
  titleKey?: TranslationKey
  items: NavItem[]
}

const groups: NavGroup[] = [
  {
    items: [{ key: 'home', labelKey: 'nav_home', icon: Home }],
  },
  {
    titleKey: 'nav_history_group',
    items: [
      { key: 'history-ondemand', labelKey: 'nav_history_ondemand', icon: Clock },
      { key: 'history-realtime', labelKey: 'nav_history_realtime', icon: Activity },
    ],
  },
  {
    titleKey: 'nav_config_group',
    items: [
      { key: 'config-system', labelKey: 'nav_config_system', icon: Cpu },
      { key: 'config-custom', labelKey: 'nav_config_custom', icon: SlidersHorizontal },
    ],
  },
  {
    titleKey: 'nav_settings_group',
    items: [
      { key: 'settings-update', labelKey: 'nav_settings_update', icon: RefreshCw },
      { key: 'settings-license', labelKey: 'nav_settings_license', icon: KeyRound },
    ],
  },
]

export default function Sidebar() {
  const { activeNav, setActiveNav, appLanguage, toggleLanguage, theme, toggleTheme, t } =
    useAppStore()

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-line bg-surface/50 backdrop-blur-md">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-cyan shadow-glow">
          <Shield className="h-6 w-6 text-white" />
          <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
        </div>
        <div className="leading-tight">
          <p className="text-[15px] font-extrabold tracking-tight text-content">
            CMC<span className="text-cyan"> Antivirus</span>
          </p>
          <p className="text-[11px] font-medium text-content-dim">Total Security</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {groups.map((group, gi) => (
          <div key={gi} className="mb-1.5">
            {group.titleKey && (
              <p className="px-3 pb-1.5 pt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-content-dim">
                {t(group.titleKey)}
              </p>
            )}
            {group.items.map((item) => {
              const Icon = item.icon
              const active = activeNav === item.key
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveNav(item.key)}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    active
                      ? 'bg-gradient-to-r from-primary/90 to-primary/70 text-white shadow-glow'
                      : 'text-content-muted hover:bg-surface-2 hover:text-content',
                  ].join(' ')}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-cyan" />
                  )}
                  <Icon
                    className={[
                      'h-[18px] w-[18px] shrink-0 transition-transform group-hover:scale-110',
                      active ? 'text-white' : 'text-content-dim group-hover:text-cyan',
                    ].join(' ')}
                  />
                  <span>{t(item.labelKey)}</span>
                </button>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Footer controls */}
      <div className="border-t border-line px-4 py-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          {/* Language switcher */}
          <div className="flex overflow-hidden rounded-lg border border-line bg-surface-2">
            {(['VN', 'EN'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => appLanguage !== lang && toggleLanguage()}
                className={[
                  'px-3 py-1.5 text-xs font-bold transition-colors',
                  appLanguage === lang
                    ? 'bg-primary text-white'
                    : 'text-content-muted hover:text-content',
                ].join(' ')}
              >
                {lang}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Support */}
            <button
              aria-label={t('support')}
              title={t('support')}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface-2 text-content-muted transition-colors hover:border-cyan/50 hover:text-cyan"
            >
              <LifeBuoy className="h-[18px] w-[18px]" />
            </button>
            {/* Theme toggle */}
            <button
              aria-label={theme === 'dark' ? t('theme_light') : t('theme_dark')}
              title={theme === 'dark' ? t('theme_light') : t('theme_dark')}
              onClick={toggleTheme}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface-2 text-content-muted transition-colors hover:border-warning/60 hover:text-warning"
            >
              {theme === 'dark' ? (
                <Sun className="h-[18px] w-[18px]" />
              ) : (
                <Moon className="h-[18px] w-[18px]" />
              )}
            </button>
          </div>
        </div>
        <p className="text-center text-[11px] font-medium text-content-dim">
          {t('version')}
        </p>
      </div>
    </aside>
  )
}
