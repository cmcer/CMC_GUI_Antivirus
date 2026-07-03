import { useEffect } from 'react'
import WindowControls from './components/WindowControls'
import ScanningOverlay from './components/ScanningOverlay'
import Sidebar from './modules/sidebar/Sidebar'
import Dashboard from './modules/dashboard/Dashboard'
import OnDemandHistory from './modules/history/OnDemandHistory'
import RealtimeLog from './modules/history/RealtimeLog'
import SystemInfoPage from './modules/config/SystemInfoPage'
import CustomizePage from './modules/config/CustomizePage'
import UpdatePage from './modules/settings/UpdatePage'
import LicensePage from './modules/settings/LicensePage'
import { useAppStore, type NavKey } from './store/useAppStore'

const pages: Record<NavKey, () => JSX.Element> = {
  home: Dashboard,
  'history-ondemand': OnDemandHistory,
  'history-realtime': RealtimeLog,
  'config-system': SystemInfoPage,
  'config-custom': CustomizePage,
  'settings-update': UpdatePage,
  'settings-license': LicensePage,
}

export default function App() {
  const theme = useAppStore((s) => s.theme)
  const appLanguage = useAppStore((s) => s.appLanguage)
  const activeNav = useAppStore((s) => s.activeNav)
  const t = useAppStore((s) => s.t)

  // Sync theme class + document language with the store.
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.classList.toggle('light', theme === 'light')
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = appLanguage === 'VN' ? 'vi' : 'en'
  }, [appLanguage])

  const Page = pages[activeNav]

  return (
    <div className="app-backdrop relative flex h-screen w-screen overflow-hidden">
      <Sidebar />

      <main className="relative flex min-w-0 flex-1 flex-col">
        <WindowControls />

        <div key={activeNav} className="flex-1 overflow-y-auto px-8 pb-12 pt-1">
          <Page />
        </div>

        {/* Version — bottom-right of the content area */}
        <span className="pointer-events-none absolute bottom-3 right-7 text-xs font-medium text-content-dim">
          {t('version')}
        </span>
      </main>

      <ScanningOverlay />
    </div>
  )
}
