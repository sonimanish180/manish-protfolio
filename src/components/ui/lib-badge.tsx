import * as React from 'react'
import { cn } from '@/lib/utils'

export type LibBadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
export type LibBadgeSize = 'sm' | 'md'

export interface LibBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: LibBadgeVariant
  size?: LibBadgeSize
  dot?: boolean
}

const sizeClasses: Record<LibBadgeSize, string> = {
  sm: 'text-[10px] px-2 py-px',
  md: 'text-xs px-2.5 py-0.5',
}

export function LibBadge({
  variant = 'default',
  size = 'md',
  dot = false,
  children,
  className,
  ...props
}: LibBadgeProps) {
  return (
    <span
      className={cn('ui-badge', `ui-badge-${variant}`, sizeClasses[size], className)}
      {...props}
    >
      {dot && (
        <span
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: 'currentColor' }}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}
