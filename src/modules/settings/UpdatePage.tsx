import { useState } from 'react'
import { RefreshCw, CircleCheck, Loader2, Database, Package } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import { useAppStore } from '../../store/useAppStore'

export default function UpdatePage() {
  const t = useAppStore((s) => s.t)
  const [checking, setChecking] = useState(false)
  const [checkedAt, setCheckedAt] = useState<string | null>(null)

  const handleCheck = () => {
    setChecking(true)
    // Simulate a network round-trip for the update check.
    window.setTimeout(() => {
      setChecking(false)
      setCheckedAt(new Date().toLocaleTimeString('vi-VN', { hour12: false }))
    }, 1800)
  }

  return (
    <div className="space-y-6">
      <PageHeader icon={RefreshCw} title={t('update_title')} subtitle={t('update_desc')} />

      <section className="card animate-fade-up divide-y divide-line">
        <Row icon={Database} label={t('update_db')} value="2026.07.03 — 4.812.309 defs" />
        <Row icon={Package} label={t('appName')} value={t('version')} />
      </section>

      <div className="card flex flex-col items-center gap-4 px-5 py-8 animate-fade-up">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-accent/15">
          {checking ? (
            <Loader2 className="h-7 w-7 animate-spin text-cyan" />
          ) : (
            <CircleCheck className="h-7 w-7 text-accent" />
          )}
        </div>
        <p className="text-sm font-semibold text-content">
          {checking ? t('check_update') + '...' : t('up_to_date')}
        </p>
        {checkedAt && !checking && (
          <p className="text-xs text-content-dim">
            {t('last_updated')}: {checkedAt}
          </p>
        )}
        <button onClick={handleCheck} disabled={checking} className="btn-primary">
          <RefreshCw className={['h-4 w-4', checking ? 'animate-spin' : ''].join(' ')} />
          {t('check_update')}
        </button>
      </div>
    </div>
  )
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Database
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <span className="inline-flex items-center gap-2.5 text-sm font-medium text-content-muted">
        <Icon className="h-4 w-4 text-cyan" />
        {label}
      </span>
      <span className="font-mono text-sm text-content">{value}</span>
    </div>
  )
}
