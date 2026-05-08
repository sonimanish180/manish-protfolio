import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({ title, subtitle, align = 'left', className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-14', align === 'center' && 'text-center', className)}>
      <div className={cn('mb-3', align === 'center' && 'flex justify-center')}>
        {/* Aurora — glass pill label */}
        <span className="section-label">{title}</span>
      </div>
      {subtitle && <p className="mt-3 max-w-2xl text-sm text-foreground/50">{subtitle}</p>}
    </div>
  )
}
