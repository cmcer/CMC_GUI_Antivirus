import { Clock } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import HistoryTable from './HistoryTable'
import { useAppStore } from '../../store/useAppStore'

export default function OnDemandHistory() {
  const t = useAppStore((s) => s.t)
  return (
    <div className="space-y-6">
      <PageHeader
        icon={Clock}
        title={t('nav_history_ondemand')}
        subtitle={t('history_title')}
      />
      <HistoryTable />
    </div>
  )
}
