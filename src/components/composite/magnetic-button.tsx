'use client'

/**
 * MagneticButton — Kinetic motion enhancement (cross-system pattern).
 * The button physically attracts toward the cursor while hovering.
 * Uses Framer Motion spring physics for a premium, organic feel.
 *
 * NOTE for nextjs-skill: add this to references/design-systems.md
 * under a "Motion Enhancements (cross-system)" section.
 */

import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
  strength?: number // 0–1, how much pull (default 0.28)
}

export function MagneticButton({
  children,
  className,
  onClick,
  href,
  strength = 0.28,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 20 })
  const springY = useSpring(y, { stiffness: 260, damping: 20 })

  function onMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const inner = (
    <motion.div
      ref={ref}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style={{ x: springX, y: springY, display: 'inline-flex' } as any}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileTap={{ scale: 0.95 }}
    >
      {href ? (
        <a href={href} className={className}>
          {children}
        </a>
      ) : (
        <button onClick={onClick} className={className}>
          {children}
        </button>
      )}
    </motion.div>
  )

  return inner
}
