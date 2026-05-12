'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface Body {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  mass: number
  trail: Array<{ x: number; y: number; a: number }>
  color: number // hue offset
}

export interface GravityOrbit3DProps {
  className?: string
  bodies?: number
  speed?: number
  animated?: boolean
}

export function GravityOrbit3D({
  className,
  bodies: bodyCount = 5,
  speed = 1,
  animated = true,
}: GravityOrbit3DProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const frameRef = React.useRef(0)
  const bodiesRef = React.useRef<Body[]>([])
  const colorRef = React.useRef('174,100%,50%')
  const rotRef = React.useRef(0)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function readColor() {
      colorRef.current =
        getComputedStyle(document.documentElement)
          .getPropertyValue('--primary')
          .trim()
          .replace(/ /g, ',') || '174,100%,50%'
    }
    readColor()
    const mo = new MutationObserver(readColor)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-style'] })

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initBodies()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    function initBodies() {
      if (!canvas) return
      bodiesRef.current = Array.from({ length: bodyCount }, (_, i) => {
        const angle = (i / bodyCount) * Math.PI * 2
        const r = 60 + Math.random() * 50
        const x = Math.cos(angle) * r
        const y = (Math.random() - 0.5) * 40
        const z = Math.sin(angle) * r
        const speed_mag = Math.sqrt(8 / r) * (0.85 + Math.random() * 0.3)
        const perpAngle = angle + Math.PI / 2
        return {
          x,
          y,
          z,
          vx: Math.cos(perpAngle) * speed_mag,
          vy: (Math.random() - 0.5) * 0.3,
          vz: Math.sin(perpAngle) * speed_mag,
          mass: 0.4 + Math.random() * 0.8,
          trail: [],
          color: (i / bodyCount) * 60 - 30,
        }
      })
    }

    function project(x: number, y: number, z: number, w: number, h: number) {
      const fov = 320
      const cosR = Math.cos(rotRef.current)
      const sinR = Math.sin(rotRef.current)
      const rx = x * cosR - z * sinR
      const rz = z * cosR + x * sinR
      const scale = fov / (fov + rz + 200)
      return {
        sx: w / 2 + rx * scale,
        sy: h / 2 + y * scale,
        scale,
        depth: rz,
      }
    }

    function draw() {
      if (!canvas || !ctx) return
      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)

      if (animated) {
        rotRef.current += speed * 0.005

        // Gravity integration
        const G = 300
        const dt = 0.016 * speed
        const bs = bodiesRef.current

        for (let i = 0; i < bs.length; i++) {
          let fx = 0,
            fy = 0,
            fz = 0
          // Attract to center
          const dx = -bs[i].x
          const dy = -bs[i].y
          const dz = -bs[i].z
          const d2 = dx * dx + dy * dy + dz * dz + 400
          const f = G / d2
          fx += dx * f
          fy += dy * f
          fz += dz * f

          bs[i].vx += fx * dt
          bs[i].vy += fy * dt
          bs[i].vz += fz * dt
          bs[i].x += bs[i].vx * dt
          bs[i].y += bs[i].vy * dt
          bs[i].z += bs[i].vz * dt

          // Store trail
          const p = project(bs[i].x, bs[i].y, bs[i].z, w, h)
          bs[i].trail.push({ x: p.sx, y: p.sy, a: p.scale })
          if (bs[i].trail.length > 40) bs[i].trail.shift()
        }
      }

      const c = colorRef.current
      // Parse hue from "H,S%,L%"
      const hue = parseInt(c.split(',')[0]) || 174

      // Draw trails + bodies
      const sorted = [...bodiesRef.current].sort(
        (a, b) =>
          b.z * Math.cos(rotRef.current) +
          b.x * Math.sin(rotRef.current) -
          (a.z * Math.cos(rotRef.current) + a.x * Math.sin(rotRef.current)),
      )

      for (const body of sorted) {
        // Trail
        const trail = body.trail
        if (trail.length > 1) {
          for (let t = 1; t < trail.length; t++) {
            const ta = (t / trail.length) * 0.5
            ctx.beginPath()
            ctx.moveTo(trail[t - 1].x, trail[t - 1].y)
            ctx.lineTo(trail[t].x, trail[t].y)
            ctx.strokeStyle = `hsla(${hue + body.color},80%,65%,${ta})`
            ctx.lineWidth = trail[t].a * 1.5
            ctx.stroke()
          }
        }

        // Body
        const p = project(body.x, body.y, body.z, w, h)
        const r = (3 + body.mass * 3) * p.scale
        const grd = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, r * 2)
        grd.addColorStop(0, `hsla(${hue + body.color},90%,75%,0.95)`)
        grd.addColorStop(0.5, `hsla(${hue + body.color},80%,60%,0.4)`)
        grd.addColorStop(1, 'transparent')
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, r * 2.5, 0, Math.PI * 2)
        ctx.fill()
      }

      // Central attractor glow
      const cp = project(0, 0, 0, w, h)
      const cg = ctx.createRadialGradient(cp.sx, cp.sy, 0, cp.sx, cp.sy, 18)
      cg.addColorStop(0, `hsla(${c},0.95)`)
      cg.addColorStop(0.4, `hsla(${c},0.3)`)
      cg.addColorStop(1, 'transparent')
      ctx.fillStyle = cg
      ctx.beginPath()
      ctx.arc(cp.sx, cp.sy, 18, 0, Math.PI * 2)
      ctx.fill()

      frameRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(frameRef.current)
      ro.disconnect()
      mo.disconnect()
    }
  }, [bodyCount, speed, animated])

  return (
    <canvas
      ref={canvasRef}
      className={cn('block', className)}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
