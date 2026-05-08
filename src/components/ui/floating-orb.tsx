'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface FloatingOrbProps {
  size?: number
  /** CSS color string, defaults to theme primary */
  color?: string
  rings?: number
  animated?: boolean
  className?: string
}

export function FloatingOrb({
  size = 200,
  color,
  rings = 2,
  animated = true,
  className,
}: FloatingOrbProps) {
  const [themeColor, setThemeColor] = React.useState('rgba(0,255,218,1)')

  React.useEffect(() => {
    function readColor() {
      const hsl = getComputedStyle(document.documentElement)
        .getPropertyValue('--primary')
        .trim()
        .replace(/ /g, ',')
      setThemeColor(`hsl(${hsl})`)
    }
    readColor()
    const mo = new MutationObserver(readColor)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-style'] })
    return () => mo.disconnect()
  }, [])

  const c = color ?? themeColor

  return (
    <div
      className={cn('relative flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      {/* Ambient glow halo */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '-35%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${c}28 0%, transparent 68%)`,
          filter: 'blur(18px)',
        }}
        animate={animated ? { scale: [1, 1.18, 1], opacity: [0.55, 0.85, 0.55] } : undefined}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Orbital rings */}
      {Array.from({ length: rings }).map((_, i) => {
        const ringSize = size * (0.9 + i * 0.28)
        return (
          <motion.div
            key={i}
            aria-hidden
            style={{
              position: 'absolute',
              width: ringSize,
              height: ringSize,
              border: `1px solid ${c}${i === 0 ? '55' : '28'}`,
              borderRadius: '50%',
              transform: `rotateX(${58 + i * 14}deg)`,
            }}
            animate={animated ? { rotate: i % 2 === 0 ? 360 : -360 } : undefined}
            transition={{ duration: 7 + i * 2.5, repeat: Infinity, ease: 'linear' }}
          />
        )
      })}

      {/* Core sphere */}
      <motion.div
        aria-hidden
        style={{
          position: 'relative',
          width: size * 0.52,
          height: size * 0.52,
          borderRadius: '50%',
          background: `
            radial-gradient(circle at 33% 28%, ${c}EE 0%, ${c}66 32%, ${c}22 58%, transparent 78%),
            radial-gradient(circle at 70% 72%, ${c}18 0%, transparent 45%)
          `,
          boxShadow: `
            0 0 ${size * 0.13}px ${c}88,
            0 0 ${size * 0.32}px ${c}30,
            inset 0 0 ${size * 0.08}px ${c}55
          `,
        }}
        animate={animated ? { scale: [1, 1.05, 1] } : undefined}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Specular highlight */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          width: size * 0.16,
          height: size * 0.1,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.40)',
          filter: 'blur(3px)',
          transform: `translate(${-size * 0.09}px, ${-size * 0.11}px)`,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
