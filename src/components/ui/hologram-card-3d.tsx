"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface HologramCard3DProps {
  children: React.ReactNode
  className?: string
  /** Show moving scan line (default true) */
  scanline?: boolean
  /** Random opacity flicker (default true) */
  flicker?: boolean
  /** Rotate slightly on hover (default true) */
  tilt?: boolean
}

export function HologramCard3D({
  children,
  className,
  scanline = true,
  flicker = true,
  tilt = true,
}: HologramCard3DProps) {
  const [themeColor, setThemeColor] = React.useState("hsl(174,100%,50%)")
  const [hovered, setHovered] = React.useState(false)
  const [scanY, setScanY] = React.useState(0)
  const [opacity, setOpacity] = React.useState(1)
  const frameRef = React.useRef(0)
  const scanRef = React.useRef(0)
  const timeRef = React.useRef(0)

  React.useEffect(() => {
    function readColor() {
      const hsl = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary").trim().replace(/ /g, ",")
      setThemeColor(`hsl(${hsl || "174,100%,50%"})`)
    }
    readColor()
    const mo = new MutationObserver(readColor)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-style"] })
    return () => mo.disconnect()
  }, [])

  React.useEffect(() => {
    let raf = 0
    function tick(t: number) {
      const dt = t - timeRef.current
      timeRef.current = t

      if (scanline) {
        scanRef.current = (scanRef.current + dt * 0.12) % 110
        setScanY(scanRef.current)
      }

      if (flicker && Math.random() < 0.008) {
        setOpacity(0.72 + Math.random() * 0.28)
        setTimeout(() => setOpacity(1), 60 + Math.random() * 80)
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [scanline, flicker])

  return (
    <div
      className={cn("relative", className)}
      style={{
        perspective: "800px",
        opacity,
        transition: "opacity 0.06s linear",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          transform: tilt && hovered ? "rotateX(4deg) rotateY(-6deg) scale(1.02)" : "rotateX(0) rotateY(0) scale(1)",
          transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
          transformStyle: "preserve-3d",
          position: "relative",
          borderRadius: "inherit",
        }}
      >
        {/* Card content */}
        {children}

        {/* Holographic shimmer overlay */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            backgroundImage: `
              repeating-linear-gradient(
                105deg,
                transparent 0%,
                ${themeColor}08 2%,
                transparent 4%,
                ${themeColor}05 6%,
                transparent 8%
              )
            `,
            backgroundSize: "200% 100%",
            backgroundColor: "transparent",
            animation: "holo-shimmer 3s linear infinite",
            pointerEvents: "none",
            mixBlendMode: "screen",
          }}
        />

        {/* Scan line */}
        {scanline && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: `${scanY}%`,
                height: "3px",
                background: `linear-gradient(90deg, transparent, ${themeColor}55, ${themeColor}99, ${themeColor}55, transparent)`,
                filter: `blur(1px)`,
                boxShadow: `0 0 8px ${themeColor}66`,
              }}
            />
          </div>
        )}

        {/* Horizontal scanlines texture */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)",
            pointerEvents: "none",
          }}
        />

        {/* Edge neon border */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            border: `1px solid ${themeColor}44`,
            boxShadow: `0 0 12px ${themeColor}33, inset 0 0 12px ${themeColor}11`,
            pointerEvents: "none",
          }}
        />
      </div>

      <style>{`
        @keyframes holo-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  )
}
