import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { translations, type Language, type TranslationKey } from '../i18n/translations'

export type Theme = 'dark' | 'light'

export type NavKey =
  | 'home'
  | 'history-ondemand'
  | 'history-realtime'
  | 'config-system'
  | 'config-custom'
  | 'settings-update'
  | 'settings-license'

export interface ProtectionModule {
  id: string
  labelKey: TranslationKey
  enabled: boolean
}

interface AppState {
  appLanguage: Language
  theme: Theme
  activeNav: NavKey
  modules: ProtectionModule[]

  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  setActiveNav: (nav: NavKey) => void
  toggleModule: (id: string) => void

  /** Translation helper bound to the current language. */
  t: (key: TranslationKey) => string
}

const defaultModules: ProtectionModule[] = [
  { id: 'realtime', labelKey: 'mod_realtime', enabled: true },
  { id: 'firewall', labelKey: 'mod_firewall', enabled: true },
  { id: 'web', labelKey: 'mod_web', enabled: true },
  { id: 'ransomware', labelKey: 'mod_ransomware', enabled: true },
]

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      appLanguage: 'VN',
      theme: 'dark',
      activeNav: 'home',
      modules: defaultModules,

      setLanguage: (appLanguage) => set({ appLanguage }),
      toggleLanguage: () =>
        set((s) => ({ appLanguage: s.appLanguage === 'VN' ? 'EN' : 'VN' })),

      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),

      setActiveNav: (activeNav) => set({ activeNav }),

      toggleModule: (id) =>
        set((s) => ({
          modules: s.modules.map((m) =>
            m.id === id ? { ...m, enabled: !m.enabled } : m,
          ),
        })),

      t: (key) => translations[get().appLanguage][key] ?? key,
    }),
    {
      name: 'cmc-av-app',
      partialize: (s) => ({
        appLanguage: s.appLanguage,
        theme: s.theme,
        modules: s.modules,
      }),
    },
  ),
)
