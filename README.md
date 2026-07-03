# CMC Antivirus — Desktop Security Antivirus

A native-feeling **Windows desktop antivirus** built with React + Vite + TypeScript, styled with a dark cyber-security aesthetic (deep navy, glowing shields, cyan accents), and packaged as a standalone `.exe` with Electron. Fully functional with **mock data** — the scanning engine, threat detection, and live logs are all simulated.

![status](https://img.shields.io/badge/version-2.2.1-2f6bff) ![stack](https://img.shields.io/badge/React-Vite-TypeScript-22d3ee) ![desktop](https://img.shields.io/badge/Electron-Windows-22c55e)

## ✨ Features

- **Dark cyber theme** — deep navy backgrounds, glowing shield banner, cyan/green accents, animated grid backdrop. Light/Dark toggle included.
- **Bilingual (VN / EN)** — full Vietnamese + English UI with a one-click language switcher.
- **Interactive scanning** — Quick / Full / Custom scans with an animated 0→100% progress ring, rapidly streaming file paths (`C:/Windows/System32/...`), live counters (files scanned, threats, elapsed) and a completion state.
- **Mock scanner service** — timed-interval simulation engine with per-scan-type profiles and randomized threat detection.
- **Zustand state** — `scanStatus`, `scanProgress`, `currentScanningFile`, `scanHistory`, `appLanguage`, protection modules, theme, and navigation.
- **Scan history table** — dynamic recent-scan log (time, type, files, duration, result), persisted to `localStorage`.
- **Real-time log** — streaming protection events (blocked / quarantined / info).
- **Config & settings** — system info, protection module toggles, update check, license page.
- **Frameless native window** — custom draggable title bar with minimize / maximize / close controls.

## 🧱 Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 18 + Vite 5 + TypeScript |
| Styling | TailwindCSS 3 (CSS-variable theming) |
| Icons | lucide-react |
| State | Zustand (with `persist`) |
| Desktop | Electron 33 + electron-builder (NSIS installer) |
| Fonts | Fira Sans / Fira Code |

## 📁 Project Structure

```
├── electron/
│   ├── main.cjs           # Electron main process (frameless window, IPC)
│   └── preload.cjs        # Safe context-bridge (window controls)
├── src/
│   ├── components/        # Reusable UI (TitleBar, TopBar, StatusBanner,
│   │                      #   ScanCard, ScanningOverlay, Toggle, PageHeader)
│   ├── modules/           # Feature modules
│   │   ├── dashboard/     # Home screen (banner + scan cards + history)
│   │   ├── sidebar/       # Sidebar nav + language/theme switchers
│   │   ├── history/       # On-demand history + real-time log
│   │   ├── config/        # System info + protection customization
│   │   └── settings/      # Update + license
│   ├── store/             # Zustand stores (useScanStore, useAppStore)
│   ├── services/          # Mock scanner engine, mock data, formatters
│   ├── i18n/              # VN/EN translations
│   ├── App.tsx            # Shell + routing
│   └── main.tsx           # React entry
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── package.json           # includes electron-builder config
```

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run in the browser (Vite dev server)
npm run dev

# 3. Run as a desktop app (Electron + hot reload)
npm run electron:dev
```

## 📦 Building the Windows Installer (.exe)

```bash
# Build the web bundle and package a Windows NSIS installer
npm run dist
```

The installer and unpacked app are emitted to the **`release/`** folder:

- `release/CMC Antivirus Setup 2.2.1.exe` — the installer
- `release/win-unpacked/CMC Antivirus.exe` — the portable runnable app

> **Custom app icon (optional):** drop a `256×256`+ `icon.ico` into a `build/` folder (`build/icon.ico`). electron-builder picks it up automatically. Without it, the default Electron icon is used.

## 🧪 Notes

- All antivirus behavior is **simulated** — no real files are scanned, modified, or quarantined. This is a UI/UX demonstration app.
- Scan history and preferences persist in `localStorage`.

---

© 2026 CMC Cyber Security — Demo application.
