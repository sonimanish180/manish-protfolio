'use client'

import * as React from 'react'

export interface AvatarProps {
  src?: string
  alt?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  online?: boolean
  className?: string
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

export function Avatar({ src, alt, name, size = 'md', online, className }: AvatarProps) {
  return (
    <div className={`ui-avatar ui-avatar-${size}${className ? ` ${className}` : ''}`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt ?? name ?? 'Avatar'} className="ui-avatar-img" />
      ) : (
        <span className="ui-avatar-initials">{name ? getInitials(name) : '?'}</span>
      )}
      {online && <span className="ui-avatar-online" />}
    </div>
  )
}
