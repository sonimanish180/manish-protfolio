'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
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

type SkillEntry = { skill: string; accent: string; bg: string; category: string }

function buildTiers(): { expert: SkillEntry[]; proficient: SkillEntry[]; familiar: SkillEntry[] } {
  const expert: SkillEntry[] = []
  const proficient: SkillEntry[] = []
  const familiar: SkillEntry[] = []

  for (const group of skillCategories) {
    const color = CATEGORY_COLORS[group.category] ?? CATEGORY_COLORS.Expertise
    group.skills.forEach((skill, idx) => {
      const entry: SkillEntry = {
        skill,
        accent: color.accent,
        bg: color.bg,
        category: group.category,
      }
      if (idx === 0 || idx === 1) expert.push(entry)
      else if (idx === 2 || idx === 3) proficient.push(entry)
      else familiar.push(entry)
    })
  }

  return { expert, proficient, familiar }
}

function ExpertBadge({ entry, delay }: { entry: SkillEntry; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-2"
    >
      <div
        className="relative flex h-20 w-20 items-center justify-center rounded-full"
        style={{
          background: entry.bg,
          border: `2px solid ${entry.accent}55`,
          boxShadow: `0 0 20px ${entry.accent}22, inset 0 0 20px ${entry.accent}11`,
        }}
      >
        <span
          className="text-center text-[10px] font-bold leading-tight"
          style={{ color: entry.accent }}
        >
          {entry.skill}
        </span>
        <span
          className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-bold"
          style={{ background: entry.accent, color: 'hsl(var(--surface))' }}
        >
          5
        </span>
      </div>
      <span className="font-mono text-[9px]" style={{ color: 'hsl(var(--text-dim))' }}>
        {entry.category}
      </span>
    </motion.div>
  )
}

function ProficientCard({ entry, delay }: { entry: SkillEntry; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-3 rounded-xl px-4 py-3"
      style={{
        background: entry.bg,
        border: `1px solid ${entry.accent}33`,
      }}
    >
      <span
        className="h-2 w-2 flex-shrink-0 rounded-full"
        style={{ background: entry.accent, boxShadow: `0 0 6px ${entry.accent}` }}
      />
      <span className="flex-1 text-sm font-medium" style={{ color: 'hsl(var(--text-heading))' }}>
        {entry.skill}
      </span>
      <span className="font-mono text-[9px]" style={{ color: entry.accent }}>
        L4
      </span>
    </motion.div>
  )
}

function FamiliarPill({ entry, delay }: { entry: SkillEntry; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-full px-3 py-1 text-xs font-medium"
      style={{
        background: 'hsl(var(--surface-2))',
        border: '1px solid hsl(var(--border))',
        color: 'hsl(var(--text-muted))',
      }}
    >
      {entry.skill}
    </motion.span>
  )
}

const TIER_META = {
  expert: {
    label: 'Expert',
    description: 'Daily tools, deep mastery',
    color: 'hsl(var(--primary))',
    bg: 'rgba(0,255,218,0.05)',
    border: 'rgba(0,255,218,0.15)',
  },
  proficient: {
    label: 'Proficient',
    description: 'Strong working knowledge',
    color: 'hsl(var(--text-heading))',
    bg: 'hsl(var(--surface))',
    border: 'hsl(var(--border))',
  },
  familiar: {
    label: 'Familiar',
    description: 'Comfortable & expanding',
    color: 'hsl(var(--text-muted))',
    bg: 'transparent',
    border: 'hsl(var(--border))',
  },
}

export function SkillsMastery() {
  const t = useTranslations('skills')
  const { expert, proficient, familiar } = buildTiers()

  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <LayerReveal>
          <div className="mb-14">
            <span className="section-label">{t('title')}</span>
            <h2 className="gradient-text mt-4 text-4xl font-bold tracking-tight">Mastery Levels</h2>
          </div>
        </LayerReveal>

        <div className="space-y-10">
          {/* Expert tier */}
          <LayerReveal>
            <div
              className="rounded-2xl p-8"
              style={{
                background: TIER_META.expert.bg,
                border: `1px solid ${TIER_META.expert.border}`,
              }}
            >
              <div className="mb-6 flex items-baseline gap-3">
                <span className="text-xl font-bold" style={{ color: TIER_META.expert.color }}>
                  {TIER_META.expert.label}
                </span>
                <span className="text-sm" style={{ color: 'hsl(var(--text-muted))' }}>
                  {TIER_META.expert.description}
                </span>
                <span
                  className="ml-auto font-mono text-xs"
                  style={{ color: 'hsl(var(--text-dim))' }}
                >
                  {expert.length} skills
                </span>
              </div>
              <div className="flex flex-wrap gap-6">
                {expert.map((entry, idx) => (
                  <ExpertBadge key={entry.skill} entry={entry} delay={idx * 0.05} />
                ))}
              </div>
            </div>
          </LayerReveal>

          {/* Proficient tier */}
          <LayerReveal delay={80}>
            <div
              className="rounded-2xl p-8"
              style={{
                background: TIER_META.proficient.bg,
                border: `1px solid ${TIER_META.proficient.border}`,
              }}
            >
              <div className="mb-6 flex items-baseline gap-3">
                <span className="text-xl font-bold" style={{ color: TIER_META.proficient.color }}>
                  {TIER_META.proficient.label}
                </span>
                <span className="text-sm" style={{ color: 'hsl(var(--text-muted))' }}>
                  {TIER_META.proficient.description}
                </span>
                <span
                  className="ml-auto font-mono text-xs"
                  style={{ color: 'hsl(var(--text-dim))' }}
                >
                  {proficient.length} skills
                </span>
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {proficient.map((entry, idx) => (
                  <ProficientCard key={entry.skill} entry={entry} delay={idx * 0.04} />
                ))}
              </div>
            </div>
          </LayerReveal>

          {/* Familiar tier */}
          <LayerReveal delay={140}>
            <div
              className="rounded-2xl p-8"
              style={{
                background: TIER_META.familiar.bg,
                border: `1px solid ${TIER_META.familiar.border}`,
              }}
            >
              <div className="mb-6 flex items-baseline gap-3">
                <span className="text-xl font-bold" style={{ color: TIER_META.familiar.color }}>
                  {TIER_META.familiar.label}
                </span>
                <span className="text-sm" style={{ color: 'hsl(var(--text-muted))' }}>
                  {TIER_META.familiar.description}
                </span>
                <span
                  className="ml-auto font-mono text-xs"
                  style={{ color: 'hsl(var(--text-dim))' }}
                >
                  {familiar.length} skills
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {familiar.map((entry, idx) => (
                  <FamiliarPill key={entry.skill} entry={entry} delay={idx * 0.03} />
                ))}
              </div>
            </div>
          </LayerReveal>
        </div>
      </div>
    </section>
  )
}
