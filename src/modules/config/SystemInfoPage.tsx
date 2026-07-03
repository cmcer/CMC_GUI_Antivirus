import { Cpu, CircleCheck } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import { useAppStore } from '../../store/useAppStore'
import { mockSystemInfo } from '../../services/mockData'

export default function SystemInfoPage() {
  const t = useAppStore((s) => s.t)

  return (
    <div className="space-y-6">
      <PageHeader icon={Cpu} title={t('nav_config_system')} subtitle={t('system_info')} />

      <section className="card animate-fade-up divide-y divide-line">
        {mockSystemInfo.map((info) => (
          <div key={info.label} className="flex items-center justify-between px-5 py-4">
            <span className="text-sm font-medium text-content-muted">{info.label}</span>
            <span className="font-mono text-sm text-content">{info.value}</span>
          </div>
        ))}
      </section>

      <div className="card flex items-center gap-3 border-accent/30 bg-accent/5 px-5 py-4 animate-fade-up">
        <CircleCheck className="h-5 w-5 text-accent" />
        <p className="text-sm font-medium text-content">
          {t('status_safe_desc')} — {t('up_to_date')}
        </p>
      </div>
    </div>
  )
}
