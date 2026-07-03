import type { ScanType } from '../store/useScanStore'

/** Realistic Windows file paths streamed during a fake scan. */
export const mockScanPaths: string[] = [
  'C:/Windows/System32/kernel32.dll',
  'C:/Windows/System32/ntdll.dll',
  'C:/Windows/System32/drivers/etc/hosts',
  'C:/Windows/System32/svchost.exe',
  'C:/Windows/SysWOW64/user32.dll',
  'C:/Windows/explorer.exe',
  'C:/Program Files/Common Files/microsoft shared/ClickToRun/OfficeClickToRun.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Users/Public/Documents/report_final.docx',
  'C:/Users/Public/Downloads/setup_installer.exe',
  'C:/ProgramData/Microsoft/Windows Defender/Scans/History',
  'C:/Windows/Temp/tmp8F2A.tmp',
  'C:/Windows/Prefetch/CHROME.EXE-9A3B1C.pf',
  'C:/Users/Admin/AppData/Local/Temp/cache_v2.bin',
  'C:/Users/Admin/AppData/Roaming/Microsoft/Templates/Normal.dotm',
  'C:/Windows/System32/config/SYSTEM',
  'C:/Windows/assembly/GAC_MSIL/System.Data.dll',
  'C:/Program Files/CMC/Antivirus/engine/scanner.core',
  'C:/Users/Admin/Desktop/quarterly_budget.xlsx',
  'C:/Windows/WinSxS/amd64_microsoft-windows-crypto/bcrypt.dll',
  'C:/Windows/System32/wbem/WMIC.exe',
  'C:/Program Files/Java/jre1.8.0/bin/java.exe',
  'C:/Users/Admin/AppData/Local/Packages/Microsoft.Windows/settings.dat',
  'C:/Windows/System32/spool/drivers/x64/3/unidrv.dll',
  'D:/Backup/images/vacation_2025.zip',
  'D:/Projects/source/build/output.log',
  'C:/Windows/Fonts/segoeui.ttf',
  'C:/Windows/System32/mstsc.exe',
]

/** Occasionally a "suspicious" file surfaces during a scan. */
export const mockSuspiciousPaths: string[] = [
  'C:/Users/Admin/Downloads/invoice_scan.exe',
  'C:/Windows/Temp/xR7z_payload.dll',
  'C:/Users/Public/crack_keygen.exe',
  'C:/ProgramData/svhost32.vbs',
]

export const mockThreatNames: string[] = [
  'Trojan.Win32.Generic',
  'Adware.MultiPlug',
  'Worm.AutoRun.VBS',
  'PUA.CryptoMiner',
  'Backdoor.Agent.Gen',
]

export interface SystemInfo {
  label: string
  value: string
}

export const mockSystemInfo: SystemInfo[] = [
  { label: 'OS', value: 'Windows 11 Pro (22H2)' },
  { label: 'CPU', value: 'Intel Core i7-12700 @ 2.10GHz' },
  { label: 'RAM', value: '16 GB DDR4' },
  { label: 'Engine', value: 'CMC Threat Engine v9.4.2' },
  { label: 'Signature DB', value: '2026.07.03 — 4.812.309 defs' },
  { label: 'Protection', value: 'Premium — Total Security' },
]

export interface RealtimeEvent {
  id: number
  time: string
  level: 'info' | 'blocked' | 'quarantined'
  message: string
}

const realtimeMessages: { level: RealtimeEvent['level']; message: string }[] = [
  { level: 'blocked', message: 'Chặn kết nối đáng ngờ tới 45.132.88.10:8080' },
  { level: 'info', message: 'Quét nền hoàn tất cho C:/Users/Admin/Downloads' },
  { level: 'quarantined', message: 'Cách ly PUA.CryptoMiner từ setup_installer.exe' },
  { level: 'blocked', message: 'Tường lửa chặn tiến trình lạ truy cập mạng' },
  { level: 'info', message: 'Cập nhật cơ sở dữ liệu virus thành công' },
  { level: 'blocked', message: 'Chặn trang web lừa đảo secure-login-verify.top' },
  { level: 'info', message: 'Bảo vệ thời gian thực đã kiểm tra 1.204 tập tin' },
  { level: 'quarantined', message: 'Cách ly Trojan.Win32.Generic khỏi Temp' },
]

let realtimeCounter = 1000

/** Build a fake realtime event with a HH:MM:SS timestamp. */
export function makeRealtimeEvent(): RealtimeEvent {
  const pick = realtimeMessages[Math.floor(Math.random() * realtimeMessages.length)]
  const now = new Date()
  const time = now.toLocaleTimeString('vi-VN', { hour12: false })
  return { id: realtimeCounter++, time, level: pick.level, message: pick.message }
}

export const scanTypeLabels: Record<ScanType, { vn: string; en: string }> = {
  quick: { vn: 'Quét nhanh', en: 'Quick Scan' },
  full: { vn: 'Quét toàn bộ', en: 'Full Scan' },
  custom: { vn: 'Quét tùy chọn', en: 'Custom Scan' },
}

/** Seed history so the table isn't empty on first launch. */
export function seedHistory() {
  const now = Date.now()
  const hour = 3600_000
  return [
    {
      id: 'seed-1',
      type: 'quick' as ScanType,
      timestamp: now - 2 * hour,
      filesScanned: 12480,
      threatsFound: 0,
      durationSec: 92,
    },
    {
      id: 'seed-2',
      type: 'full' as ScanType,
      timestamp: now - 26 * hour,
      filesScanned: 284133,
      threatsFound: 2,
      durationSec: 1875,
    },
    {
      id: 'seed-3',
      type: 'custom' as ScanType,
      timestamp: now - 74 * hour,
      filesScanned: 3421,
      threatsFound: 0,
      durationSec: 41,
    },
  ]
}
