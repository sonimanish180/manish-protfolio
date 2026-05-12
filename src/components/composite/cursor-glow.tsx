'use client'

/**
 * CursorGlow — Scroll Theater pattern.
 * A soft teal orb that follows the mouse cursor with spring physics.
 * Render once at page root — not inside individual sections.
 */

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CursorGlow() {
  const mouseX = useMotionValue(-300)
  const mouseY = useMotionValue(-300)

  // Gentle spring — laggy enough to feel organic, fast enough to track
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="pointer-events-none fixed z-0 hidden md:block"
      /* eslint-disable @typescript-eslint/no-explicit-any */
      style={
        {
          // framer-motion MotionValues (x/y) are not in React.CSSProperties — cast is intentional
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,255,218,0.055) 0%, transparent 68%)',
        } as any
      }
      /* eslint-enable @typescript-eslint/no-explicit-any */
    />
  )
}
