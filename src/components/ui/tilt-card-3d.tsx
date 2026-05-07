"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

export interface TiltCard3DProps {
  children: React.ReactNode
  className?: string
  /** Tilt angle in degrees (default 14) */
  intensity?: number
  /** Sheen highlight follows cursor */
  glare?: boolean
  /** Hover scale (default 1.03) */
  scale?: number
  /** Depth-shifted drop shadow */
  shadow?: boolean
}

export function TiltCard3D({
  children,
  className,
  intensity = 14,
  glare = true,
  scale = 1.03,
  shadow = true,
}: TiltCard3DProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const x = useSpring(rawX, { stiffness: 240, damping: 28 })
  const y = useSpring(rawY, { stiffness: 240, damping: 28 })

  const rotateX = useTransform(y, [-0.5, 0.5], [intensity, -intensity])
  const rotateY = useTransform(x, [-0.5, 0.5], [-intensity, intensity])

  // Glare and shadow as plain state, updated in the mouse handler
  const [glareGradient, setGlareGradient] = React.useState(
    "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.00) 0%, transparent 65%)"
  )
  const [boxShadow, setBoxShadow] = React.useState(
    "0px 0px 40px rgba(0,0,0,0.40), 0 0 0 1px var(--card-border)"
  )

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const nx = (e.clientX - left) / width - 0.5   // -0.5 … 0.5
    const ny = (e.clientY - top)  / height - 0.5

    rawX.set(nx)
    rawY.set(ny)

    const gx = (nx + 0.5) * 100   // 0 … 100 %
    const gy = (ny + 0.5) * 100
    setGlareGradient(
      `radial-gradient(circle at ${gx.toFixed(1)}% ${gy.toFixed(1)}%, rgba(255,255,255,0.18) 0%, transparent 65%)`
    )

    const sx = (-nx * 24).toFixed(1)
    const sy = (-ny * 16).toFixed(1)
    setBoxShadow(
      `${sx}px ${sy}px 40px rgba(0,0,0,0.40), 0 0 0 1px var(--card-border)`
    )
  }

  function onMouseLeave() {
    rawX.set(0)
    rawY.set(0)
    setGlareGradient(
      "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.00) 0%, transparent 65%)"
    )
    setBoxShadow("0px 0px 40px rgba(0,0,0,0.40), 0 0 0 1px var(--card-border)")
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ perspective: "900px" }}
      className={cn("relative", className)}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: shadow ? boxShadow : undefined,
        }}
        whileHover={{ scale }}
        transition={{ scale: { type: "spring", stiffness: 300, damping: 26 } }}
        className="relative w-full h-full rounded-[inherit]"
      >
        {children}

        {/* Glare sheen */}
        {glare && (
          <div
            aria-hidden
            style={{ background: glareGradient }}
            className="absolute inset-0 rounded-[inherit] pointer-events-none z-10 mix-blend-screen transition-[background] duration-75"
          />
        )}

        {/* Edge depth gradient */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-[9]"
          style={{
            background:
              "linear-gradient(135deg,rgba(255,255,255,0.05) 0%,transparent 45%,rgba(0,0,0,0.06) 100%)",
          }}
        />
      </motion.div>
    </div>
  )
}
