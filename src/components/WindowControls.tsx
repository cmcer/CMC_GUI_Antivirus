import { Minus, X } from 'lucide-react'

/**
 * Minimal draggable top strip for the frameless window.
 * Matches the reference: only minimize + close, floated top-right.
 */
export default function WindowControls() {
  const api = window.electronAPI

  return (
    <div className="drag-region flex h-11 shrink-0 items-center justify-end pr-1">
      <button
        aria-label="Minimize"
        onClick={() => api?.minimize()}
        className="no-drag flex h-11 w-12 items-center justify-center text-content-muted transition-colors hover:bg-surface-3 hover:text-content"
      >
        <Minus className="h-4 w-4" />
      </button>
      <button
        aria-label="Close"
        onClick={() => api?.close()}
        className="no-drag flex h-11 w-12 items-center justify-center text-content-muted transition-colors hover:bg-danger hover:text-white"
      >
        <X className="h-[18px] w-[18px]" />
      </button>
    </div>
  )
}
