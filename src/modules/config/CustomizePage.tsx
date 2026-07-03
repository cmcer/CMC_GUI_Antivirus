import { SlidersHorizontal, Fingerprint, Flame, Globe, Lock } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import Toggle from '../../components/Toggle'
import { useAppStore } from '../../store/useAppStore'

const icons: Record<string, LucideIcon> = {
  realtime: Fingerprint,
  firewall: Flame,
  web: Globe,
  ransomware: Lock,
}

const descriptions: Record<string, { vn: string; en: string }> = {
  realtime: {
    vn: 'Giám sát liên tục mọi tập tin và tiến trình đang chạy.',
    en: 'Continuously monitors every file and running process.',
  },
  firewall: {
    vn: 'Kiểm soát lưu lượng mạng vào/ra và chặn kết nối lạ.',
    en: 'Controls inbound/outbound traffic and blocks unknown connections.',
  },
  web: {
    vn: 'Chặn trang lừa đảo, mã độc và quảng cáo nguy hiểm.',
    en: 'Blocks phishing sites, malware and dangerous ads.',
  },
  ransomware: {
    vn: 'Bảo vệ tập tin quan trọng khỏi mã hoá trái phép.',
    en: 'Protects important files from unauthorized encryption.',
  },
}

export default function CustomizePage() {
  const { appLanguage, modules, toggleModule, t } = useAppStore()

  return (
    <div className="space-y-6">
      <PageHeader
        icon={SlidersHorizontal}
        title={t('config_custom_title')}
        subtitle={t('config_custom_desc')}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {modules.map((m) => {
          const Icon = icons[m.id]
          return (
            <div
              key={m.id}
              className="card flex items-start gap-4 p-5 animate-fade-up transition-colors hover:border-primary/40"
            >
              <div
                className={[
                  'grid h-11 w-11 shrink-0 place-items-center rounded-xl',
                  m.enabled
                    ? 'bg-accent/15 text-accent'
                    : 'bg-surface-3 text-content-dim',
                ].join(' ')}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-content">{t(m.labelKey)}</h3>
                  <Toggle
                    checked={m.enabled}
                    onChange={() => toggleModule(m.id)}
                    label={t(m.labelKey)}
                  />
                </div>
                <p className="mt-1 text-xs leading-relaxed text-content-muted">
                  {descriptions[m.id][appLanguage === 'VN' ? 'vn' : 'en']}
                </p>
                <span
                  className={[
                    'mt-2 inline-block text-[11px] font-semibold',
                    m.enabled ? 'text-accent' : 'text-content-dim',
                  ].join(' ')}
                >
                  {m.enabled ? t('on') : t('off')}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
