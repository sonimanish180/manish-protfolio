"use client"

/**
 * AnimatedCounter — Kinetic motion enhancement (cross-system pattern).
 * Numbers count up with an ease-out animation when scrolled into view.
 * Accepts value strings like "5+", "~30%", "2", "4+".
 *
 * Uses rAF instead of MotionValue.onChange so it works with any framer-motion version.
 *
 * NOTE for nextjs-skill: add to references/design-systems.md
 * under "Motion Enhancements (cross-system)".
 */

import { useRef, useEffect, useState } from "react"
import { useInView } from "framer-motion"

function parseValue(raw: string): { n: number; pre: string; suf: string } {
  const m = raw.match(/^([~]?)(\d+)([+%]*)$/)
  if (!m) return { n: 0, pre: "", suf: raw }
  return { n: parseInt(m[2]), pre: m[1], suf: m[3] }
}

interface AnimatedCounterProps {
  value: string
  className?: string
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const { n, pre, suf } = parseValue(value)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isInView || n === 0) return

    const duration = 1100 // ms
    let startTime: number | null = null

    function tick(ts: number) {
      if (!startTime) startTime = ts
      const elapsed = ts - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * n))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [isInView, n])

  return (
    <span ref={ref} className={className}>
      {pre}
      {display}
      {suf}
    </span>
  )
}
