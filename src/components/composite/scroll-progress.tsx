"use client"

/**
 * ScrollProgress — Scroll Theater pattern.
 * Fixed teal→gold gradient bar at top of page that fills as user scrolls.
 * Spring-smoothed so it never feels jerky.
 */

import { useScroll, useSpring, motion } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] origin-left"
      style={{
        scaleX,
        height: "2px",
        background: "linear-gradient(90deg, hsl(174,100%,50%), hsl(38,92%,58%))",
        boxShadow: "0 0 8px rgba(0,255,218,0.6), 0 0 16px rgba(0,255,218,0.2)",
      }}
    />
  )
}
