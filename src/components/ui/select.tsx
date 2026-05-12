'use client'

import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  hint?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
  wrapperClassName?: string
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, hint, error, options, placeholder, className, wrapperClassName, id, ...props },
    ref,
  ) => {
    const generatedId = React.useId()
    const selectId = id ?? generatedId
    return (
      <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
        {label && (
          <label
            htmlFor={selectId}
            className="select-none font-mono text-xs uppercase tracking-wider"
            style={{ color: 'hsl(var(--text-muted))' }}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn('ui-select', error && 'error', className)}
            aria-invalid={!!error}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDownIcon
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
            style={{ color: 'hsl(var(--text-muted))' }}
          />
        </div>
        {error && (
          <p className="text-xs" style={{ color: 'hsl(var(--destructive))' }}>
            {error}
          </p>
        )}
        {!error && hint && (
          <p className="text-xs" style={{ color: 'hsl(var(--text-dim))' }}>
            {hint}
          </p>
        )}
      </div>
    )
  },
)
Select.displayName = 'Select'
