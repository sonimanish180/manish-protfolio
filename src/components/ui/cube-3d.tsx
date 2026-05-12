'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface Cube3DProps {
  /** Side length in px (default 120) */
  size?: number
  /** Up to 6 face elements. Defaults to face labels F/R/B/L/T/D */
  faces?: React.ReactNode[]
  /** Rotation speed multiplier (default 1) */
  speed?: number
  /** Pause on hover */
  pauseOnHover?: boolean
  className?: string
}

export function Cube3D({
  size = 120,
  faces,
  speed = 1,
  pauseOnHover = true,
  className,
}: Cube3DProps) {
  const half = size / 2
  const duration = 8 / speed

  const faceTransforms = [
    `rotateY(0deg)   translateZ(${half}px)`,
    `rotateY(90deg)  translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
    `rotateX(90deg)  translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ]

  const faceLabels = ['F', 'R', 'B', 'L', 'T', 'D']

  return (
    <div
      className={cn(className)}
      style={{
        width: size,
        height: size,
        perspective: `${size * 5}px`,
        perspectiveOrigin: '50% 50%',
      }}
    >
      <div
        className={`ui-cube${pauseOnHover ? 'ui-cube--pause-hover' : ''}`}
        style={
          {
            width: size,
            height: size,
            '--cube-duration': `${duration}s`,
          } as React.CSSProperties
        }
      >
        {faceTransforms.map((transform, i) => (
          <div key={i} className="ui-cube-face" style={{ width: size, height: size, transform }}>
            {faces?.[i] ?? (
              <span
                className="font-mono text-sm font-bold"
                style={{ color: 'hsl(var(--primary))' }}
              >
                {faceLabels[i]}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
