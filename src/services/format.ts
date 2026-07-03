import type { Language } from '../i18n/translations'

/** 1234567 -> "1,234,567" (locale-aware). */
export function formatNumber(n: number, lang: Language = 'VN'): string {
  return n.toLocaleString(lang === 'VN' ? 'vi-VN' : 'en-US')
}

/** seconds -> "mm:ss". */
export function formatDuration(totalSec: number): string {
  const s = Math.max(0, Math.round(totalSec))
  const mm = Math.floor(s / 60)
  const ss = s % 60
  return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`
}

/** Relative "x giờ trước" / "x hours ago" timestamp. */
export function formatRelative(ts: number, lang: Language = 'VN'): string {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(mins / 60)
  const days = Math.floor(hours / 24)
  if (lang === 'VN') {
    if (mins < 1) return 'Vừa xong'
    if (mins < 60) return `${mins} phút trước`
    if (hours < 24) return `${hours} giờ trước`
    return `${days} ngày trước`
  }
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins} min ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

/** Absolute date-time string. */
export function formatDateTime(ts: number, lang: Language = 'VN'): string {
  return new Date(ts).toLocaleString(lang === 'VN' ? 'vi-VN' : 'en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}
