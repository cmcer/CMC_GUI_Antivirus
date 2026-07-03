import StatusBanner from '../../components/StatusBanner'
import ScanCard from '../../components/ScanCard'
import LastScanSummary from '../../components/LastScanSummary'
import type { ScanType } from '../../store/useScanStore'

const scanTypes: ScanType[] = ['quick', 'full', 'custom']

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <StatusBanner />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {scanTypes.map((type) => (
          <ScanCard key={type} type={type} />
        ))}
      </div>

      <LastScanSummary />
    </div>
  )
}
