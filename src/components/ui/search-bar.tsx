'use client'

import * as React from 'react'
import { SearchIcon, XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  onValueChange: (v: string) => void
  onClear?: () => void
  wrapperClassName?: string
}

export function SearchBar({
  value,
  onValueChange,
  onClear,
  placeholder = 'Search…',
  wrapperClassName,
  className,
  ...props
}: SearchBarProps) {
  const handleClear = () => {
    onValueChange('')
    onClear?.()
  }

  return (
    <div className={cn('ui-search-wrapper', wrapperClassName)}>
      <SearchIcon className="ui-search-icon" aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        className={cn('ui-search-input', className)}
        {...props}
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="ui-search-clear"
          aria-label="Clear search"
        >
          <XIcon className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}
