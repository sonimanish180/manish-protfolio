'use client'

/**
 * LayerReveal — Scroll Theater pattern.
 * More cinematic replacement for AnimatedSection.
 * Elements rise + blur-clear as they enter the viewport.
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface LayerRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
  distance?: number
}

export function LayerReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 40,
}: LayerRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const initial = {
    opacity: 0,
    y: direction === 'up' ? distance : 0,
    x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
    filter: 'blur(4px)',
  }

  const animate = isInView ? { opacity: 1, y: 0, x: 0, filter: 'blur(0px)' } : initial

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={animate}
      transition={{
        duration: 0.72,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
