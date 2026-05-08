'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface DNAHelix3DProps {
  /** Canvas width in px (default 200) */
  width?: number
  /** Canvas height in px (default 280) */
  height?: number
  /** Rotation speed multiplier (default 1) */
  speed?: number
  /** Number of base pairs (default 16) */
  pairs?: number
  className?: string
  animated?: boolean
}

export function DNAHelix3D({
  width = 200,
  height = 280,
  speed = 1,
  pairs = 16,
  className,
  animated = true,
}: DNAHelix3DProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const frameRef = React.useRef(0)
  const angleRef = React.useRef(0)
  const colorRef = React.useRef('174,100%,50%')

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

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    function draw() {
      if (!canvas || !ctx) return
      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)

      if (animated) angleRef.current += speed * 0.022

      const c = colorRef.current
      const cx = w / 2
      const radius = w * 0.26
      const vSpacing = h / (pairs + 1)

      // Collect all points for both strands and rungs
      type HelixPoint = {
        x: number
        y: number
        z: number
        alpha: number
        isNode: boolean
        rung?: boolean
        pair?: number
      }
      const points: HelixPoint[] = []

      for (let i = 0; i <= pairs; i++) {
        const t = i / pairs
        const baseAngle = angleRef.current + t * Math.PI * 3.5

        const y = vSpacing + t * (h - vSpacing * 2)

        // Strand A
        const ax = cx + Math.cos(baseAngle) * radius
        const az = Math.sin(baseAngle)

        // Strand B (opposite)
        const bx = cx + Math.cos(baseAngle + Math.PI) * radius
        const bz = Math.sin(baseAngle + Math.PI)

        // Depth alpha
        const alphaA = 0.35 + ((az + 1) / 2) * 0.65
        const alphaB = 0.35 + ((bz + 1) / 2) * 0.65

        points.push({ x: ax, y, z: az, alpha: alphaA, isNode: true, pair: i })
        points.push({ x: bx, y, z: bz, alpha: alphaB, isNode: true, pair: i })

        // Cross-rung connector
        const rungAlpha = 0.2 + Math.max(az, bz) * 0.3
        points.push({
          x: ax,
          y,
          z: Math.max(az, bz),
          alpha: rungAlpha,
          isNode: false,
          rung: true,
          pair: i,
        })
        // store bx in separate pass below
      }

      // Draw backbone curves (two passes: back then front)
      for (let pass = 0; pass < 2; pass++) {
        const strand = pass === 0 ? 0 : Math.PI
        ctx.beginPath()
        for (let i = 0; i <= pairs; i++) {
          const t = i / pairs
          const baseAngle = angleRef.current + t * Math.PI * 3.5 + strand
          const y = vSpacing + t * (h - vSpacing * 2)
          const x = cx + Math.cos(baseAngle) * radius
          const z = Math.sin(baseAngle)
          const alpha = 0.25 + ((z + 1) / 2) * 0.55
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
          ctx.strokeStyle = `hsla(${c},${alpha * 0.7})`
        }
        ctx.strokeStyle = `hsla(${c},0.5)`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      // Draw rungs
      for (let i = 0; i <= pairs; i++) {
        const t = i / pairs
        const baseAngle = angleRef.current + t * Math.PI * 3.5
        const y = vSpacing + t * (h - vSpacing * 2)
        const ax = cx + Math.cos(baseAngle) * radius
        const bx = cx + Math.cos(baseAngle + Math.PI) * radius
        const az = Math.sin(baseAngle)

        const rungAlpha = 0.15 + ((az + 1) / 2) * 0.45

        // Two-color rung (base pair colors)
        const gradR = ctx.createLinearGradient(ax, y, bx, y)
        gradR.addColorStop(0, `hsla(${c},${rungAlpha})`)
        gradR.addColorStop(0.5, `hsla(${c},${rungAlpha * 1.4})`)
        gradR.addColorStop(1, `hsla(${c},${rungAlpha})`)

        ctx.beginPath()
        ctx.moveTo(ax, y)
        ctx.lineTo(bx, y)
        ctx.strokeStyle = gradR
        ctx.lineWidth = 1
        ctx.stroke()

        // Node dots
        const nodeR = 3.5
        for (const nx of [ax, bx]) {
          const nz = nx === ax ? az : Math.sin(baseAngle + Math.PI)
          const na = 0.45 + ((nz + 1) / 2) * 0.55
          ctx.beginPath()
          ctx.arc(nx, y, nodeR, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${c},${na})`
          ctx.fill()
        }
      }

      frameRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(frameRef.current)
      mo.disconnect()
    }
  }, [speed, pairs, animated])

  return <canvas ref={canvasRef} className={cn('block', className)} style={{ width, height }} />
}
