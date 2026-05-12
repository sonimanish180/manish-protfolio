'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface RadioOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export interface RadioGroupProps {
  label?: string
  name: string
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  orientation?: 'vertical' | 'horizontal'
  className?: string
}

export function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  orientation = 'vertical',
  className,
}: RadioGroupProps) {
  return (
    <fieldset className={cn('m-0 border-0 p-0', className)}>
      {label && (
        <legend
          className="mb-2.5 select-none font-mono text-xs uppercase tracking-wider"
          style={{ color: 'hsl(var(--text-muted))' }}
        >
          {label}
        </legend>
      )}
      <div
        className={cn('flex gap-3', orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap')}
      >
        {options.map((opt) => (
          <RadioItem
            key={opt.value}
            name={name}
            option={opt}
            checked={value === opt.value}
            onChange={() => onChange?.(opt.value)}
          />
        ))}
      </div>
    </fieldset>
  )
}

function RadioItem({
  name,
  option,
  checked,
  onChange,
}: {
  name: string
  option: RadioOption
  checked: boolean
  onChange: () => void
}) {
  const radioId = React.useId()
  return (
    <div className="flex items-start gap-2.5">
      <input
        type="radio"
        id={radioId}
        name={name}
        value={option.value}
        checked={checked}
        onChange={onChange}
        disabled={option.disabled}
        className="ui-radio mt-0.5"
      />
      <div className="flex flex-col gap-0.5">
        <label
          htmlFor={radioId}
          className="cursor-pointer select-none text-sm font-medium leading-tight"
          style={{ color: option.disabled ? 'hsl(var(--text-dim))' : 'hsl(var(--text-heading))' }}
        >
          {option.label}
        </label>
        {option.description && (
          <span className="text-xs leading-relaxed" style={{ color: 'hsl(var(--text-muted))' }}>
            {option.description}
          </span>
        )}
      </div>
    </div>
  )
}
