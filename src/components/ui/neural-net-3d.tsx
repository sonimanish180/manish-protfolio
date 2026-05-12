'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface Node3D {
  x: number
  y: number
  z: number
  connections: number[]
  pulsePhase: number
}

interface Signal {
  from: number
  to: number
  t: number // 0 → 1 travel progress
  speed: number
}

export interface NeuralNet3DProps {
  nodeCount?: number
  connectionDensity?: number // 0–1, default 0.22
  speed?: number
  className?: string
  animated?: boolean
}

function buildGraph(n: number, density: number): Node3D[] {
  const nodes: Node3D[] = Array.from({ length: n }, (_) => ({
    x: (Math.random() - 0.5) * 220,
    y: (Math.random() - 0.5) * 220,
    z: (Math.random() - 0.5) * 220,
    connections: [],
    pulsePhase: Math.random() * Math.PI * 2,
  }))

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      const dz = nodes[i].z - nodes[j].z
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz)
      if (d < 130 && Math.random() < density) {
        nodes[i].connections.push(j)
        nodes[j].connections.push(i)
      }
    }
  }
  return nodes
}

export function NeuralNet3D({
  nodeCount = 22,
  connectionDensity = 0.22,
  speed = 1,
  className,
  animated = true,
}: NeuralNet3DProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const frameRef = React.useRef(0)
  const rotXRef = React.useRef(0.3)
  const rotYRef = React.useRef(0)
  const nodesRef = React.useRef<Node3D[]>([])
  const signalsRef = React.useRef<Signal[]>([])
  const colorRef = React.useRef('174,100%,50%')
  const timeRef = React.useRef(0)

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
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    nodesRef.current = buildGraph(nodeCount, connectionDensity)

    // Seed some signals
    function spawnSignal() {
      const nodes = nodesRef.current
      const from = Math.floor(Math.random() * nodes.length)
      const conns = nodes[from].connections
      if (conns.length === 0) return
      const to = conns[Math.floor(Math.random() * conns.length)]
      signalsRef.current.push({ from, to, t: 0, speed: 0.4 + Math.random() * 0.6 })
    }
    for (let i = 0; i < 4; i++) spawnSignal()

    function project(x: number, y: number, z: number, w: number, h: number) {
      // Rotate around Y axis
      const ry = rotYRef.current
      const rx = rotXRef.current
      const cosY = Math.cos(ry),
        sinY = Math.sin(ry)
      const cosX = Math.cos(rx),
        sinX = Math.sin(rx)

      // Y rotation
      const x1 = x * cosY - z * sinY
      const z1 = z * cosY + x * sinY
      // X rotation
      const y2 = y * cosX - z1 * sinX
      const z2 = z1 * cosX + y * sinX

      const fov = 350
      const scale = fov / (fov + z2 + 120)
      return { sx: w / 2 + x1 * scale, sy: h / 2 + y2 * scale, scale, depth: z2 }
    }

    function draw(timestamp: number) {
      if (!canvas || !ctx) return
      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)

      const dt = Math.min((timestamp - timeRef.current) / 1000, 0.05)
      timeRef.current = timestamp

      if (animated) {
        rotYRef.current += speed * 0.004
        // Tilt slowly
        rotXRef.current = 0.3 + Math.sin(rotYRef.current * 0.3) * 0.15
      }

      // Advance signals
      const sigs = signalsRef.current
      for (let i = sigs.length - 1; i >= 0; i--) {
        sigs[i].t += dt * speed * sigs[i].speed
        if (sigs[i].t >= 1) sigs.splice(i, 1)
      }

      // Spawn new signals occasionally
      if (animated && Math.random() < 0.06) spawnSignal()
      if (sigs.length < 2 && animated) spawnSignal()

      const c = colorRef.current
      const nodes = nodesRef.current

      // Project all nodes
      const projected = nodes.map((n) => project(n.x, n.y, n.z, w, h))

      // Draw edges (back to front via average depth)
      const edges: Array<[number, number, number]> = []
      for (let i = 0; i < nodes.length; i++) {
        for (const j of nodes[i].connections) {
          if (j > i) edges.push([i, j, (projected[i].depth + projected[j].depth) / 2])
        }
      }
      edges.sort((a, b) => a[2] - b[2])

      for (const [i, j] of edges) {
        const pi = projected[i],
          pj = projected[j]
        const depthAlpha = 0.08 + ((pi.scale + pj.scale) / 2) * 0.18
        ctx.beginPath()
        ctx.moveTo(pi.sx, pi.sy)
        ctx.lineTo(pj.sx, pj.sy)
        ctx.strokeStyle = `hsla(${c},${depthAlpha})`
        ctx.lineWidth = 0.6
        ctx.stroke()
      }

      // Draw signals traveling along edges
      for (const sig of sigs) {
        const pi = projected[sig.from]
        const pj = projected[sig.to]
        const sx = pi.sx + (pj.sx - pi.sx) * sig.t
        const sy = pi.sy + (pj.sy - pi.sy) * sig.t
        const pulse = Math.sin(sig.t * Math.PI)
        const r = 3 * pulse * ((pi.scale + pj.scale) / 2)
        const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 3)
        grd.addColorStop(0, `hsla(${c},${pulse * 0.95})`)
        grd.addColorStop(0.5, `hsla(${c},${pulse * 0.35})`)
        grd.addColorStop(1, 'transparent')
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(sx, sy, r * 3, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw nodes (back to front)
      const sortedNodes = nodes
        .map((_, i) => i)
        .sort((a, b) => projected[a].depth - projected[b].depth)

      for (const i of sortedNodes) {
        const p = projected[i]
        const pulse = 0.7 + Math.sin(timeRef.current * 0.002 + nodes[i].pulsePhase) * 0.3
        const r = (3 + nodes[i].connections.length * 0.4) * p.scale * pulse
        const alpha = 0.4 + p.scale * 0.5

        const grd = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, r * 2.5)
        grd.addColorStop(0, `hsla(${c},${alpha})`)
        grd.addColorStop(0.5, `hsla(${c},${alpha * 0.5})`)
        grd.addColorStop(1, 'transparent')
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, r * 2.5, 0, Math.PI * 2)
        ctx.fill()
      }

      frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frameRef.current)
      ro.disconnect()
      mo.disconnect()
    }
  }, [nodeCount, connectionDensity, speed, animated])

  return (
    <canvas
      ref={canvasRef}
      className={cn('block', className)}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
