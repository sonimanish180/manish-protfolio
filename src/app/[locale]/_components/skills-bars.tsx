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

function proficiencyPercent(level: number): number {
  return (level / 5) * 100
}

function SkillBar({
  skill,
  level,
  accent,
  delay,
  inView,
}: {
  skill: string
  level: number
  accent: string
  delay: number
  inView: boolean
}) {
  const pct = proficiencyPercent(level)
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium" style={{ color: 'hsl(var(--text-heading))' }}>
          {skill}
        </span>
        <span className="font-mono text-[11px]" style={{ color: accent }}>
          {pct}%
        </span>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full"
        style={{ background: 'hsl(var(--surface-2))' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${accent}99, ${accent})`,
            boxShadow: `0 0 8px ${accent}55`,
          }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${pct}%` : 0 }}
          transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

function CategorySection({
  category,
  skills,
  groupIdx,
}: {
  category: string
  skills: string[]
  groupIdx: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const color = CATEGORY_COLORS[category] ?? CATEGORY_COLORS.Expertise

  return (
    <LayerReveal delay={groupIdx * 60}>
      <div
        ref={ref}
        className="rounded-2xl p-6"
        style={{ background: color.bg, border: `1px solid ${color.accent}22` }}
      >
        <div className="mb-5 flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: color.accent, boxShadow: `0 0 6px ${color.accent}` }}
          />
          <span
            className="font-mono text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: color.accent }}
          >
            {category}
          </span>
          <span className="ml-auto font-mono text-[10px]" style={{ color: 'hsl(var(--text-dim))' }}>
            {skills.length} skills
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map((skill, idx) => (
            <SkillBar
              key={skill}
              skill={skill}
              level={proficiencyLevel(idx)}
              accent={color.accent}
              delay={idx * 0.06}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </LayerReveal>
  )
}

export function SkillsBars() {
  const t = useTranslations('skills')

  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <LayerReveal>
          <div className="mb-14">
            <span className="section-label">{t('title')}</span>
            <h2 className="gradient-text mt-4 text-4xl font-bold tracking-tight">
              Technical Proficiency
            </h2>
          </div>
        </LayerReveal>

        <div className="grid gap-6 md:grid-cols-2">
          {skillCategories.map((group, groupIdx) => (
            <CategorySection
              key={group.category}
              category={group.category}
              skills={group.skills}
              groupIdx={groupIdx}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
