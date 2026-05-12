'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { LayerReveal } from '@/components/composite/layer-reveal'
import { skillCategories } from '@/lib/data'

const CATEGORY_COLORS: Record<string, { accent: string; bg: string }> = {
  Languages: { accent: 'hsl(271,70%,68%)', bg: 'rgba(139,92,246,0.07)' },
  Frontend: { accent: 'hsl(199,89%,62%)', bg: 'rgba(56,189,248,0.07)' },
  Mobile: { accent: 'hsl(160,60%,55%)', bg: 'rgba(52,211,153,0.07)' },
  Backend: { accent: 'hsl(38,92%,60%)', bg: 'rgba(245,166,35,0.07)' },
  'Cloud & Infra': { accent: 'hsl(0,72%,64%)', bg: 'rgba(239,68,68,0.07)' },
  Expertise: { accent: 'hsl(174,100%,50%)', bg: 'rgba(0,255,218,0.07)' },
}

function proficiencyLevel(index: number): number {
  if (index === 0 || index === 1) return 5
  if (index === 2 || index === 3) return 4
  return 3
}

function avgProficiency(skills: string[]): number {
  const total = skills.reduce((sum, _, idx) => sum + proficiencyLevel(idx), 0)
  return total / skills.length / 5 // normalized 0-1
}

const CX = 150
const CY = 150
const R = 110

function polarToCart(angleDeg: number, r: number): [number, number] {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)]
}

function hexPoints(r: number): string {
  return Array.from({ length: 6 }, (_, i) => polarToCart(i * 60, r).join(',')).join(' ')
}

function RadarChart({ inView }: { inView: boolean }) {
  const categories = skillCategories.slice(0, 6)
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0]

  const dataPoints = categories.map((group, i) => {
    const pct = avgProficiency(group.skills)
    return polarToCart(i * 60, R * pct)
  })

  const filledPolygon = dataPoints.map((pt) => pt.join(',')).join(' ')

  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[340px]" aria-label="Skills radar chart">
      {/* Grid hexagons */}
      {gridLevels.map((level) => (
        <polygon
          key={level}
          points={hexPoints(R * level)}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="0.5"
          opacity={0.4}
        />
      ))}

      {/* Axis lines */}
      {Array.from({ length: 6 }, (_, i) => {
        const [x, y] = polarToCart(i * 60, R)
        return (
          <line
            key={i}
            x1={CX}
            y1={CY}
            x2={x}
            y2={y}
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
            opacity={0.4}
          />
        )
      })}

      {/* Filled data polygon */}
      <motion.polygon
        points={filledPolygon}
        fill="hsl(var(--primary))"
        fillOpacity={inView ? 0.15 : 0}
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        strokeOpacity={inView ? 0.8 : 0}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      />

      {/* Data point dots */}
      {dataPoints.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={3}
          fill="hsl(var(--primary))"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.4, delay: 0.7 + i * 0.06 }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}

      {/* Category labels */}
      {categories.map((group, i) => {
        const [x, y] = polarToCart(i * 60, R + 22)
        const anchor = x < CX - 5 ? 'end' : x > CX + 5 ? 'start' : 'middle'
        return (
          <text
            key={group.category}
            x={x}
            y={y}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize="8"
            fontFamily="monospace"
            fill={CATEGORY_COLORS[group.category]?.accent ?? 'hsl(var(--text-muted))'}
            fontWeight="600"
          >
            {group.category}
          </text>
        )
      })}
    </svg>
  )
}

export function SkillsRadar() {
  const t = useTranslations('skills')
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <LayerReveal>
          <div className="mb-14">
            <span className="section-label">{t('title')}</span>
            <h2 className="gradient-text mt-4 text-4xl font-bold tracking-tight">
              Skill Landscape
            </h2>
          </div>
        </LayerReveal>

        <div ref={ref} className="flex flex-col items-center gap-16 lg:flex-row lg:items-start">
          {/* Radar chart */}
          <LayerReveal>
            <div
              className="flex w-full max-w-[380px] flex-shrink-0 items-center justify-center rounded-2xl p-8"
              style={{ background: 'hsl(var(--surface))', border: '1px solid hsl(var(--border))' }}
            >
              <RadarChart inView={inView} />
            </div>
          </LayerReveal>

          {/* Skill tags per category */}
          <div className="flex-1 space-y-6">
            {skillCategories.map((group, groupIdx) => {
              const color = CATEGORY_COLORS[group.category] ?? CATEGORY_COLORS.Expertise
              return (
                <LayerReveal key={group.category} delay={groupIdx * 50}>
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: color.accent, boxShadow: `0 0 5px ${color.accent}` }}
                      />
                      <span
                        className="font-mono text-[11px] font-semibold uppercase tracking-wider"
                        style={{ color: color.accent }}
                      >
                        {group.category}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, idx) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, y: 6 }}
                          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                          transition={{ duration: 0.3, delay: groupIdx * 0.08 + idx * 0.04 }}
                          className="rounded-lg px-3 py-1 text-xs font-medium"
                          style={{
                            background: color.bg,
                            border: `1px solid ${color.accent}33`,
                            color: 'hsl(var(--text-body))',
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </LayerReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
