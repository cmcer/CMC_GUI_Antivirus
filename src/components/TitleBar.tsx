import { Minus, Square, X, ShieldCheck } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

/**
 * Custom draggable title bar for the frameless Electron window.
 * Falls back gracefully in a normal browser (buttons no-op).
 */
export default function TitleBar() {
  const t = useAppStore((s) => s.t)
  const api = window.electronAPI

  return (
    <header className="drag-region flex h-9 items-center justify-between border-b border-line bg-surface/60 pl-3 pr-1 backdrop-blur">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-accent" />
        <span className="text-xs font-semibold tracking-wide text-content">
          {t('appName')}
        </span>
        <span className="text-[10px] font-medium text-content-dim">{t('version')}</span>
      </div>

      <div className="no-drag flex items-center">
        <button
          aria-label="Minimize"
          onClick={() => api?.minimize()}
          className="flex h-9 w-11 items-center justify-center text-content-muted transition-colors hover:bg-surface-3 hover:text-content"
        >
          <Minus className="h-4 w-4" />
        </button>
        <button
          aria-label="Maximize"
          onClick={() => api?.toggleMaximize()}
          className="flex h-9 w-11 items-center justify-center text-content-muted transition-colors hover:bg-surface-3 hover:text-content"
        >
          <Square className="h-3.5 w-3.5" />
        </button>
        <button
          aria-label="Close"
          onClick={() => api?.close()}
          className="flex h-9 w-11 items-center justify-center text-content-muted transition-colors hover:bg-danger hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}
