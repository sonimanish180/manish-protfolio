"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface RingConfig {
  scale: number
  rotateX: number
  rotateY: number
  duration: number
  direction: 1 | -1
  opacity: number
}

const RING_PRESETS: RingConfig[] = [
  { scale: 0.62, rotateX: 72, rotateY: 0,  duration: 5.5, direction:  1, opacity: 0.9 },
  { scale: 0.82, rotateX: 28, rotateY: 52, duration: 8,   direction: -1, opacity: 0.60 },
  { scale: 1.00, rotateX: 55, rotateY: 28, duration: 11,  direction:  1, opacity: 0.38 },
]

export interface RingOrbit3DProps {
  size?: number
  rings?: 1 | 2 | 3
  className?: string
  animated?: boolean
}

export function RingOrbit3D({
  size = 200,
  rings = 3,
  className,
  animated = true,
}: RingOrbit3DProps) {
  const [themeColor, setThemeColor] = React.useState("0,255,218")

  React.useEffect(() => {
    function read() {
      const hsl = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary").trim().replace(/ /g, ",")
      setThemeColor(hsl || "174,100%,50%")
    }
    read()
    const mo = new MutationObserver(read)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-style"] })
    return () => mo.disconnect()
  }, [])

  const dotSize = size * 0.13

  return (
    <div
      className={cn("relative flex items-center justify-content-center", className)}
      style={{ width: size, height: size, perspective: size * 3.5 }}
    >
      {/* Rings */}
      {RING_PRESETS.slice(0, rings).map((r, i) => {
        const ringSize = size * r.scale
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: ringSize,
              height: ringSize,
              marginLeft: -ringSize / 2,
              marginTop: -ringSize / 2,
              transform: `rotateX(${r.rotateX}deg) rotateY(${r.rotateY}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                border: `1.5px solid hsla(${themeColor},${r.opacity})`,
                boxShadow: `0 0 14px hsla(${themeColor},${r.opacity * 0.35}), inset 0 0 8px hsla(${themeColor},${r.opacity * 0.12})`,
              }}
              animate={animated ? { rotate: 360 * r.direction } : undefined}
              transition={{ duration: r.duration, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )
      })}

      {/* Center nucleus */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          borderRadius: "50%",
          background: `radial-gradient(circle, hsl(${themeColor}) 0%, hsl(${themeColor} / 0.4) 65%, transparent 85%)`,
          boxShadow: `0 0 ${dotSize * 1.2}px hsla(${themeColor},0.7), 0 0 ${dotSize * 2.4}px hsla(${themeColor},0.25)`,
        }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "10%",
          borderRadius: "50%",
          background: `radial-gradient(circle, hsla(${themeColor},0.08) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
    </div>
  )
}
