import type { LucideIcon } from 'lucide-react'

interface PageHeaderProps {
  icon: LucideIcon
  title: string
  subtitle?: string
}

export default function PageHeader({ icon: Icon, title, subtitle }: PageHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-cyan/10 text-cyan">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-content">{title}</h1>
        {subtitle && <p className="text-sm text-content-muted">{subtitle}</p>}
      </div>
    </div>
  )
}
