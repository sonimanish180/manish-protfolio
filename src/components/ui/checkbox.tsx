'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  description?: string
  wrapperClassName?: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, className, wrapperClassName, id, ...props }, ref) => {
    const generatedId = React.useId()
    const checkId = id ?? generatedId
    return (
      <div className={cn('flex items-start gap-2.5', wrapperClassName)}>
        <input
          ref={ref}
          type="checkbox"
          id={checkId}
          className={cn('ui-checkbox mt-0.5', className)}
          {...props}
        />
        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <label
                htmlFor={checkId}
                className="cursor-pointer select-none text-sm font-medium leading-tight"
                style={{ color: 'hsl(var(--text-heading))' }}
              >
                {label}
              </label>
            )}
            {description && (
              <span className="text-xs leading-relaxed" style={{ color: 'hsl(var(--text-muted))' }}>
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    )
  },
)
Checkbox.displayName = 'Checkbox'
