import StatusBanner from '../../components/StatusBanner'
import ScanCard from '../../components/ScanCard'
import HistoryTable from '../history/HistoryTable'
import { useAppStore } from '../../store/useAppStore'
import type { ScanType } from '../../store/useScanStore'

const scanTypes: ScanType[] = ['quick', 'full', 'custom']

export default function Dashboard() {
  const t = useAppStore((s) => s.t)

  return (
    <div className="space-y-6">
      <StatusBanner />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {scanTypes.map((type) => (
          <ScanCard key={type} type={type} />
        ))}
      </div>

      <HistoryTable limit={4} title={t('history_recent')} />
    </div>
  )
}
