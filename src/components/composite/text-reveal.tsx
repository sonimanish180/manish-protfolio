'use client'

/**
 * TextReveal — Scroll Theater pattern.
 * Each word blurs in from nothing, staggered left-to-right.
 * The sentence assembles itself as the user reads.
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number // initial delay in ms (default 0)
  stagger?: number // ms between words (default 60)
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 60,
  as: Tag = 'p',
}: TextRevealProps) {
  const ref = useRef<Element>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-60px' })
  const words = text.split(' ')

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger / 1000,
        delayChildren: delay / 1000,
      },
    },
  }

  const word = {
    hidden: { opacity: 0, filter: 'blur(8px)', y: 14 },
    show: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    // ref cast is intentional: Tag is a dynamic element string, ref type varies
    <Tag
      ref={ref as any} // eslint-disable-line @typescript-eslint/no-explicit-any
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em' }}
    >
      <motion.span
        variants={container}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
        style={{ display: 'contents' }}
      >
        {words.map((w, i) => (
          <motion.span key={i} variants={word} style={{ display: 'inline-block' }}>
            {w}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  )
}
