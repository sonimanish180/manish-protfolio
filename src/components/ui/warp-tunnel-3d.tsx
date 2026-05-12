'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface WarpTunnel3DProps {
  speed?: number
  rings?: number
  spokes?: number
  className?: string
  animated?: boolean
}

export function WarpTunnel3D({
  speed = 1,
  rings = 18,
  spokes = 8,
  className,
  animated = true,
}: WarpTunnel3DProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const frameRef = React.useRef(0)
  const zRef = React.useRef(0)
  const colorRef = React.useRef('174,100%,50%')
  const bgRef = React.useRef('217,50%,4%')

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function readColors() {
      if (typeof document === 'undefined') return
      colorRef.current =
        getComputedStyle(document.documentElement)
          .getPropertyValue('--primary')
          .trim()
          .replace(/ /g, ',') || '174,100%,50%'
      bgRef.current =
        getComputedStyle(document.documentElement)
          .getPropertyValue('--background')
          .trim()
          .replace(/ /g, ',') || '217,50%,4%'
    }
    readColors()

    const mo = new MutationObserver(readColors)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-style'] })

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    function draw() {
      if (!canvas || !ctx) return
      const w = canvas.width
      const h = canvas.height
      const cx = w / 2
      const cy = h / 2

      ctx.clearRect(0, 0, w, h)

      if (animated) zRef.current = (zRef.current + speed * 0.7) % (400 / rings)

      const c = colorRef.current
      const segment = 400 / rings

      for (let i = rings; i >= 0; i--) {
        const z = (i * segment + zRef.current) % 400
        const t = z / 400 // 0 = far, 1 = close
        const persp = 1 + t * 3.2
        const rx = w * 0.44 * persp
        const ry = h * 0.42 * persp
        if (rx > w * 2) continue

        const alpha = t * 0.55
        const lw = 0.5 + t * 1.2

        // Elliptical ring
        ctx.beginPath()
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(${c},${alpha})`
        ctx.lineWidth = lw
        ctx.stroke()

        // Spokes on every Nth ring
        if (i % 3 === 0) {
          for (let s = 0; s < spokes; s++) {
            const angle = (s / spokes) * Math.PI * 2
            const innerScale = 0.25
            const x1 = cx + Math.cos(angle) * rx * innerScale
            const y1 = cy + Math.sin(angle) * ry * innerScale
            const x2 = cx + Math.cos(angle) * rx
            const y2 = cy + Math.sin(angle) * ry
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.strokeStyle = `hsla(${c},${alpha * 0.38})`
            ctx.lineWidth = lw * 0.45
            ctx.stroke()
          }
        }
      }

      // Center burst glow
      const r = Math.min(w, h) * 0.1
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
      grd.addColorStop(0, `hsla(${c},0.95)`)
      grd.addColorStop(0.35, `hsla(${c},0.30)`)
      grd.addColorStop(1, 'transparent')
      ctx.fillStyle = grd
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fill()

      // Outer vignette to sell depth
      const vig = ctx.createRadialGradient(
        cx,
        cy,
        Math.min(w, h) * 0.3,
        cx,
        cy,
        Math.min(w, h) * 0.72,
      )
      vig.addColorStop(0, 'transparent')
      vig.addColorStop(1, `hsla(${bgRef.current},0.82)`)
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, w, h)

      frameRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(frameRef.current)
      ro.disconnect()
      mo.disconnect()
    }
  }, [speed, rings, spokes, animated])

  return (
    <canvas
      ref={canvasRef}
      className={cn('block', className)}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
