'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface FlipCard3DProps {
  front: React.ReactNode
  back: React.ReactNode
  className?: string
  height?: string | number
  /** "hover" flips on mouse-enter; "click" toggles on click */
  trigger?: 'hover' | 'click'
  /** Axis of flip */
  axis?: 'y' | 'x'
}

export function FlipCard3D({
  front,
  back,
  className,
  height = 240,
  trigger = 'hover',
  axis = 'y',
}: FlipCard3DProps) {
  const [flipped, setFlipped] = React.useState(false)

  const hoverProps =
    trigger === 'hover'
      ? { onHoverStart: () => setFlipped(true), onHoverEnd: () => setFlipped(false) }
      : { onClick: () => setFlipped((f) => !f) }

  const animateProp = axis === 'y' ? { rotateY: flipped ? 180 : 0 } : { rotateX: flipped ? 180 : 0 }

  return (
    <motion.div
      {...hoverProps}
      style={{ perspective: '1200px', height }}
      className={cn('relative w-full cursor-pointer select-none', className)}
    >
      <motion.div
        animate={animateProp}
        transition={{ type: 'spring', stiffness: 200, damping: 26 }}
        style={{ transformStyle: 'preserve-3d', height: '100%', position: 'relative' }}
      >
        {/* Front face */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            position: 'absolute',
            inset: 0,
          }}
        >
          {front}
        </div>

        {/* Back face */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: axis === 'y' ? 'rotateY(180deg)' : 'rotateX(180deg)',
            position: 'absolute',
            inset: 0,
          }}
        >
          {back}
        </div>
      </motion.div>
    </motion.div>
  )
}
