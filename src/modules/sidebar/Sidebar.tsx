import {
  Home,
  ScanSearch,
  ShieldCheck,
  MonitorCog,
  SlidersHorizontal,
  CloudDownload,
  ScrollText,
  Headset,
  Moon,
  Sun,
  Star,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Logo from '../../components/Logo'
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
      { key: 'history-ondemand', labelKey: 'nav_history_ondemand', icon: ScanSearch },
      { key: 'history-realtime', labelKey: 'nav_history_realtime', icon: ShieldCheck },
    ],
  },
  {
    titleKey: 'nav_config_group',
    items: [
      { key: 'config-system', labelKey: 'nav_config_system', icon: MonitorCog },
      { key: 'config-custom', labelKey: 'nav_config_custom', icon: SlidersHorizontal },
    ],
  },
  {
    titleKey: 'nav_settings_group',
    items: [
      { key: 'settings-update', labelKey: 'nav_settings_update', icon: CloudDownload },
      { key: 'settings-license', labelKey: 'nav_settings_license', icon: ScrollText },
    ],
  },
]

export default function Sidebar() {
  const { activeNav, setActiveNav, appLanguage, toggleLanguage, theme, toggleTheme, t } =
    useAppStore()

  return (
    <aside className="flex w-[248px] shrink-0 flex-col bg-surface/40">
      {/* Brand */}
      <div className="drag-region flex items-center gap-3 px-6 py-6">
        <Logo className="h-9 w-9 shrink-0" />
        <div className="leading-tight">
          <p className="text-[17px] font-extrabold tracking-tight text-content">CMC EPP</p>
          <p className="text-[10px] font-medium tracking-tight text-content-dim">
            {t('appTagline')}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 pb-4">
        {groups.map((group, gi) => (
          <div key={gi}>
            {group.titleKey && (
              <p className="px-3 pb-2 pt-5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-content-dim">
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
                    'group mb-0.5 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[15px] transition-all duration-200',
                    active
                      ? 'bg-white/[0.06] font-semibold text-content ring-1 ring-white/10'
                      : 'font-medium text-content-muted hover:bg-white/[0.03] hover:text-content',
                  ].join(' ')}
                >
                  <Icon
                    className={[
                      'h-[19px] w-[19px] shrink-0 transition-colors',
                      active ? 'text-primary' : 'text-content-dim group-hover:text-content-muted',
                    ].join(' ')}
                    strokeWidth={2}
                  />
                  <span>{t(item.labelKey)}</span>
                </button>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Footer controls */}
      <div className="flex items-center gap-2.5 px-6 py-5">
        {/* Language switcher (flag toggles VN/EN) */}
        <button
          onClick={toggleLanguage}
          aria-label="Language"
          className="flex items-center gap-2 rounded-full pr-1 transition-opacity hover:opacity-80"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-danger shadow-sm ring-1 ring-white/10">
            <Star className="h-4 w-4 fill-warning text-warning" />
          </span>
          <span className="text-sm font-bold text-content">{appLanguage}</span>
        </button>

        <span className="flex-1" />

        {/* Support */}
        <button
          aria-label={t('support')}
          title={t('support')}
          className="grid h-9 w-9 place-items-center rounded-lg text-content-muted transition-colors hover:bg-white/[0.05] hover:text-content"
        >
          <Headset className="h-[19px] w-[19px]" />
        </button>
        {/* Theme toggle */}
        <button
          aria-label={theme === 'dark' ? t('theme_light') : t('theme_dark')}
          title={theme === 'dark' ? t('theme_light') : t('theme_dark')}
          onClick={toggleTheme}
          className="grid h-9 w-9 place-items-center rounded-lg text-content-muted transition-colors hover:bg-white/[0.05] hover:text-content"
        >
          {theme === 'dark' ? (
            <Sun className="h-[19px] w-[19px]" />
          ) : (
            <Moon className="h-[19px] w-[19px]" />
          )}
        </button>
      </div>
    </aside>
  )
}
