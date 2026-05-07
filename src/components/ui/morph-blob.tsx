"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const SHAPES = [
  "60% 40% 30% 70% / 60% 30% 70% 40%",
  "30% 60% 70% 40% / 50% 60% 30% 60%",
  "50% 40% 60% 40% / 30% 60% 50% 70%",
  "40% 70% 50% 30% / 60% 40% 70% 30%",
  "70% 30% 40% 60% / 40% 70% 30% 60%",
]

export interface MorphBlobProps {
  size?: number
  speed?: number
  color?: string
  animated?: boolean
  className?: string
}

export function MorphBlob({
  size = 220,
  speed = 1,
  color,
  animated = true,
  className,
}: MorphBlobProps) {
  const [themeColor, setThemeColor] = React.useState("hsl(174,100%,50%)")
  const [shapeIdx, setShapeIdx] = React.useState(0)

  React.useEffect(() => {
    function readColor() {
      const hsl = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim()
        .replace(/ /g, ",")
      setThemeColor(`hsl(${hsl || "174,100%,50%"})`)
    }
    readColor()
    const mo = new MutationObserver(readColor)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-style"] })
    return () => mo.disconnect()
  }, [])

  React.useEffect(() => {
    if (!animated) return
    const ms = Math.max(600, 3000 / speed)
    const id = setInterval(() => setShapeIdx(i => (i + 1) % SHAPES.length), ms)
    return () => clearInterval(id)
  }, [animated, speed])

  const c = color ?? themeColor
  const dur = Math.max(300, Math.round(2800 / speed))

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {/* Ambient halo */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-25%",
          background: `radial-gradient(circle, ${c}1a 0%, transparent 70%)`,
          filter: "blur(24px)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      {/* Blob body */}
      <div
        style={{
          width: size * 0.78,
          height: size * 0.78,
          borderRadius: SHAPES[shapeIdx],
          background: `
            radial-gradient(ellipse at 28% 26%, ${c} 0%, ${c}cc 30%, ${c}55 62%, ${c}11 100%)
          `,
          boxShadow: `0 0 ${size * 0.12}px ${c}88, 0 0 ${size * 0.3}px ${c}22`,
          transition: `border-radius ${dur}ms cubic-bezier(0.45,0,0.55,1)`,
          willChange: "border-radius",
        }}
      />

      {/* Specular highlight */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: size * 0.19,
          height: size * 0.11,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.42)",
          filter: "blur(4px)",
          transform: `translate(${-size * 0.15}px, ${-size * 0.15}px)`,
          pointerEvents: "none",
        }}
      />
    </div>
  )
}
