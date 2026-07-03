import { useEffect, useState } from 'react'
import { Activity, ShieldBan, Info, Archive, Radio } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import { useAppStore } from '../../store/useAppStore'
import { makeRealtimeEvent, type RealtimeEvent } from '../../services/mockData'

const levelMeta: Record<
  RealtimeEvent['level'],
  { icon: LucideIcon; color: string; bg: string }
> = {
  blocked: { icon: ShieldBan, color: 'text-danger', bg: 'bg-danger/10 border-danger/20' },
  quarantined: { icon: Archive, color: 'text-warning', bg: 'bg-warning/10 border-warning/20' },
  info: { icon: Info, color: 'text-cyan', bg: 'bg-cyan/10 border-cyan/20' },
}

export default function RealtimeLog() {
  const t = useAppStore((s) => s.t)
  const [events, setEvents] = useState<RealtimeEvent[]>(() =>
    Array.from({ length: 5 }, makeRealtimeEvent),
  )

  // Stream a new event every few seconds while this page is mounted.
  useEffect(() => {
    const id = window.setInterval(() => {
      setEvents((prev) => [makeRealtimeEvent(), ...prev].slice(0, 40))
    }, 3200)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Activity}
        title={t('realtime_title')}
        subtitle={t('realtime_desc')}
      />

      <div className="chip w-max border border-accent/30 bg-accent/10 text-accent">
        <Radio className="h-3.5 w-3.5 animate-pulse" />
        LIVE
      </div>

      <section className="card animate-fade-up divide-y divide-line/70">
        {events.map((ev) => {
          const meta = levelMeta[ev.level]
          const Icon = meta.icon
          return (
            <div key={ev.id} className="flex items-center gap-3 px-5 py-3.5 animate-fade-up">
              <div className={['grid h-9 w-9 shrink-0 place-items-center rounded-lg border', meta.bg].join(' ')}>
                <Icon className={['h-4 w-4', meta.color].join(' ')} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-content">{ev.message}</p>
              </div>
              <span className="shrink-0 font-mono text-xs tabular-nums text-content-dim">
                {ev.time}
              </span>
            </div>
          )
        })}
      </section>
    </div>
  )
}
