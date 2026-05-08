import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border border-primary/20 bg-primary/10 text-primary',
        violet:
          'border border-violet-500/20 bg-violet-500/10 text-violet-400 hover:border-violet-400/40',
        sky: 'border border-sky-500/20 bg-sky-500/10 text-sky-400 hover:border-sky-400/40',
        emerald:
          'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:border-emerald-400/40',
        amber:
          'border border-amber-500/20 bg-amber-500/10 text-amber-400 hover:border-amber-400/40',
        rose: 'border border-rose-500/20 bg-rose-500/10 text-rose-400 hover:border-rose-400/40',
        indigo:
          'border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 hover:border-indigo-400/40',
        muted: 'border border-border bg-muted text-muted-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
