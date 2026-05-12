'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  size: number
}

export interface ParticleFieldProps {
  /** Number of particles (default 90) */
  count?: number
  /** Movement speed multiplier (default 1) */
  speed?: number
  /** Max connection distance 0–1 (default 0.38) */
  linkDistance?: number
  /** Mouse parallax interaction */
  interactive?: boolean
  className?: string
}

function readPrimary(): string {
  if (typeof document === 'undefined') return '174,100%,50%'
  const v = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()
  return v ? v.replace(/ /g, ',') : '174,100%,50%'
}

export function ParticleField({
  count = 90,
  speed = 1,
  linkDistance = 0.38,
  interactive = true,
  className,
}: ParticleFieldProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const frameRef = React.useRef<number>(0)
  const mouseRef = React.useRef({ x: 0, y: 0 })
  const partsRef = React.useRef<Particle[]>([])
  const colorRef = React.useRef(readPrimary())

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    partsRef.current = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: Math.random(),
      vx: (Math.random() - 0.5) * 0.0018 * speed,
      vy: (Math.random() - 0.5) * 0.0018 * speed,
      vz: (Math.random() - 0.5) * 0.001 * speed,
      size: Math.random() * 1.8 + 0.4,
    }))

    function project(x: number, y: number, z: number, w: number, h: number) {
      const fov = 1.4
      const pz = z + 1.6
      const scale = fov / pz
      const dim = Math.min(w, h)
      return {
        sx: (x * scale * dim) / 2 + w / 2,
        sy: (y * scale * dim) / 2 + h / 2,
        alpha: Math.min(1, (z + 0.8) / 1.4),
        radius: Math.max(0.3, scale * 2.8),
      }
    }

    // Reread color when theme changes (observe html attribute)
    const mo = new MutationObserver(() => {
      colorRef.current = readPrimary()
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-style'] })

    function draw() {
      if (!canvas || !ctx) return
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const c = colorRef.current
      const parts = partsRef.current

      // Nudge toward mouse
      if (interactive) {
        const mx = mouseRef.current.x
        const my = mouseRef.current.y
        for (const p of parts) {
          p.vx += (mx - p.x) * 0.000012
          p.vy += (my - p.y) * 0.000012
        }
      }

      // Move + wrap
      for (const p of parts) {
        p.x += p.vx
        p.y += p.vy
        p.z += p.vz
        // Dampen velocity slightly so mouse nudge doesn't explode
        p.vx *= 0.998
        p.vy *= 0.998
        if (p.x > 1) p.x = -1
        if (p.x < -1) p.x = 1
        if (p.y > 1) p.y = -1
        if (p.y < -1) p.y = 1
        if (p.z > 1) p.z = 0
        if (p.z < 0) p.z = 1
      }

      // Sort back→front for proper alpha layering
      const sorted = [...parts].sort((a, b) => a.z - b.z)

      // Draw connections
      for (let i = 0; i < sorted.length; i++) {
        const a = sorted[i]
        const pa = project(a.x, a.y, a.z, w, h)
        for (let j = i + 1; j < sorted.length; j++) {
          const b = sorted[j]
          const dx = a.x - b.x,
            dy = a.y - b.y,
            dz = a.z - b.z
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (dist > linkDistance) continue
          const pb = project(b.x, b.y, b.z, w, h)
          const alpha = (1 - dist / linkDistance) * 0.18
          ctx.beginPath()
          ctx.moveTo(pa.sx, pa.sy)
          ctx.lineTo(pb.sx, pb.sy)
          ctx.strokeStyle = `hsla(${c},${alpha})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }
      }

      // Draw particles
      for (const p of sorted) {
        const { sx, sy, alpha, radius } = project(p.x, p.y, p.z, w, h)
        ctx.beginPath()
        ctx.arc(sx, sy, radius * p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${c},${alpha * 0.85})`
        ctx.fill()
      }

      frameRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    function onMouse(e: MouseEvent) {
      if (!canvas) return
      const r = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: ((e.clientX - r.left) / r.width) * 2 - 1,
        y: ((e.clientY - r.top) / r.height) * 2 - 1,
      }
    }
    if (interactive) canvas.addEventListener('mousemove', onMouse)

    return () => {
      cancelAnimationFrame(frameRef.current)
      ro.disconnect()
      mo.disconnect()
      if (interactive) canvas?.removeEventListener('mousemove', onMouse)
    }
  }, [count, speed, linkDistance, interactive])

  return (
    <canvas
      ref={canvasRef}
      className={cn('block', className)}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
