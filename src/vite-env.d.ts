/// <reference types="vite/client" />

export interface ElectronAPI {
  minimize: () => void
  toggleMaximize: () => void
  close: () => void
  isElectron: boolean
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI
  }
}
