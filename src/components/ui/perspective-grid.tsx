"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface PerspectiveGridProps {
  /** Scroll speed multiplier (default 1) */
  speed?: number
  /** Number of vertical columns (default 14) */
  cols?: number
  /** Number of horizontal row lines (default 18) */
  rows?: number
  className?: string
}

function readPrimary() {
  if (typeof document === "undefined") return "174,100%,50%"
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue("--primary")
      .trim()
      .replace(/ /g, ",") || "174,100%,50%"
  )
}

function readBg() {
  if (typeof document === "undefined") return "217,50%,4%"
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue("--background")
      .trim()
      .replace(/ /g, ",") || "217,50%,4%"
  )
}

export function PerspectiveGrid({
  speed = 1,
  cols = 14,
  rows = 18,
  className,
}: PerspectiveGridProps) {
  const canvasRef  = React.useRef<HTMLCanvasElement>(null)
  const frameRef   = React.useRef<number>(0)
  const offsetRef  = React.useRef(0)
  const colorRef   = React.useRef(readPrimary())
  const bgRef      = React.useRef(readBg())

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    function resize() {
      if (!canvas) return
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const mo = new MutationObserver(() => {
      colorRef.current = readPrimary()
      bgRef.current    = readBg()
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-style"] })

    function draw() {
      if (!canvas || !ctx) return
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      offsetRef.current = (offsetRef.current + speed * 0.9) % (h / rows)

      const c   = colorRef.current
      const bg  = bgRef.current
      const horizon = h * 0.44
      const vp  = { x: w / 2, y: horizon }

      // ── Horizontal lines ──────────────────────────────
      for (let i = 0; i <= rows + 1; i++) {
        const t   = i / rows
        const exp = Math.pow(t, 1.9)
        const raw = horizon + (h - horizon) * exp + offsetRef.current * (1 - exp + 0.02)
        if (raw > h || raw < horizon) continue
        const alpha = t * 0.5
        ctx.beginPath()
        ctx.moveTo(0, raw)
        ctx.lineTo(w, raw)
        ctx.strokeStyle = `hsla(${c},${alpha})`
        ctx.lineWidth   = 0.6
        ctx.stroke()
      }

      // ── Vertical lines (converge to vanishing point) ──
      const colSpacing = w / cols
      for (let i = -cols / 2; i <= cols / 2; i++) {
        const bx    = vp.x + i * colSpacing
        const frac  = 1 - Math.abs(i / (cols / 2 + 1))
        const alpha = frac * 0.42
        ctx.beginPath()
        ctx.moveTo(vp.x, vp.y)
        ctx.lineTo(bx, h)
        ctx.strokeStyle = `hsla(${c},${alpha})`
        ctx.lineWidth   = 0.6
        ctx.stroke()
      }

      // ── Fade gradient (horizon mask) ──────────────────
      const fade = ctx.createLinearGradient(0, horizon - 32, 0, horizon + 48)
      fade.addColorStop(0, `hsl(${bg})`)
      fade.addColorStop(1, "transparent")
      ctx.fillStyle = fade
      ctx.fillRect(0, 0, w, horizon + 48)

      // ── Subtle glow at horizon ────────────────────────
      const grd = ctx.createRadialGradient(vp.x, vp.y, 0, vp.x, vp.y, w * 0.45)
      grd.addColorStop(0, `hsla(${c},0.07)`)
      grd.addColorStop(1, "transparent")
      ctx.fillStyle = grd
      ctx.fillRect(0, horizon - 80, w, 160)

      frameRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(frameRef.current)
      ro.disconnect()
      mo.disconnect()
    }
  }, [speed, cols, rows])

  return (
    <canvas
      ref={canvasRef}
      className={cn("block", className)}
      style={{ width: "100%", height: "100%" }}
    />
  )
}
