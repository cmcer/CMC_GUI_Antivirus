const { contextBridge, ipcRenderer } = require('electron')

// Minimal, safe bridge exposing only window controls to the renderer.
contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window:minimize'),
  toggleMaximize: () => ipcRenderer.send('window:toggle-maximize'),
  close: () => ipcRenderer.send('window:close'),
  isElectron: true,
})
