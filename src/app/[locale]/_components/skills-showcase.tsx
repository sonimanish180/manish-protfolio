'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { LayerReveal } from '@/components/composite/layer-reveal'
import { skillCategories } from '@/lib/data'

const CATEGORY_META: Record<
  string,
  { accent: string; glow: string; bg: string; gradient: string }
> = {
  Languages: {
    accent: 'hsl(271,70%,68%)',
    glow: 'rgba(139,92,246,0.18)',
    bg: 'rgba(139,92,246,0.06)',
    gradient: 'from-[rgba(139,92,246,0.12)] to-transparent',
  },
  Frontend: {
    accent: 'hsl(199,89%,62%)',
    glow: 'rgba(56,189,248,0.18)',
    bg: 'rgba(56,189,248,0.06)',
    gradient: 'from-[rgba(56,189,248,0.12)] to-transparent',
  },
  Mobile: {
    accent: 'hsl(160,60%,55%)',
    glow: 'rgba(52,211,153,0.18)',
    bg: 'rgba(52,211,153,0.06)',
    gradient: 'from-[rgba(52,211,153,0.12)] to-transparent',
  },
  Backend: {
    accent: 'hsl(38,92%,60%)',
    glow: 'rgba(245,166,35,0.18)',
    bg: 'rgba(245,166,35,0.06)',
    gradient: 'from-[rgba(245,166,35,0.12)] to-transparent',
  },
  'Cloud & Infra': {
    accent: 'hsl(0,72%,64%)',
    glow: 'rgba(239,68,68,0.18)',
    bg: 'rgba(239,68,68,0.06)',
    gradient: 'from-[rgba(239,68,68,0.12)] to-transparent',
  },
  Expertise: {
    accent: 'hsl(174,100%,50%)',
    glow: 'rgba(0,255,218,0.18)',
    bg: 'rgba(0,255,218,0.06)',
    gradient: 'from-[rgba(0,255,218,0.12)] to-transparent',
  },
}

const CATEGORY_ICONS: Record<string, string> = {
  Languages: '{ }',
  Frontend: '</> ',
  Mobile: '📱',
  Backend: '⚙️',
  'Cloud & Infra': '☁️',
  Expertise: '★',
}

export function SkillsShowcase() {
  const t = useTranslations('skills')

  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <LayerReveal>
          <div className="mb-14 flex flex-wrap items-center gap-4">
            <span className="section-label">{t('title')}</span>
          </div>
        </LayerReveal>

        {/* 3-column grid of large showcase cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((group, groupIdx) => {
            const meta = CATEGORY_META[group.category] ?? CATEGORY_META.Expertise
            return (
              <LayerReveal key={group.category} delay={groupIdx * 70}>
                <motion.div
                  whileHover={{
                    y: -4,
                    boxShadow: `0 0 40px ${meta.glow}, 0 20px 60px rgba(0,0,0,0.35)`,
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative flex flex-col overflow-hidden rounded-2xl"
                  style={{
                    background: 'hsl(var(--surface))',
                    border: `1px solid ${meta.accent}22`,
                    boxShadow: `0 4px 20px rgba(0,0,0,0.2)`,
                  }}
                >
                  {/* Top color band */}
                  <div
                    className="h-1 w-full"
                    style={{
                      background: `linear-gradient(90deg, ${meta.accent}, ${meta.accent}44)`,
                    }}
                  />

                  {/* Header */}
                  <div
                    className="px-6 pb-4 pt-5"
                    style={{ borderBottom: `1px solid ${meta.accent}14` }}
                  >
                    <div className="mb-1 flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl font-mono text-sm font-bold"
                        style={{
                          background: meta.bg,
                          border: `1px solid ${meta.accent}33`,
                          color: meta.accent,
                        }}
                      >
                        {CATEGORY_ICONS[group.category] ?? '◆'}
                      </div>
                      <div>
                        <h3
                          className="text-base font-black"
                          style={{ color: 'hsl(var(--text-heading))' }}
                        >
                          {group.category}
                        </h3>
                        <span className="font-mono text-[10px]" style={{ color: meta.accent }}>
                          {group.skills.length}{' '}
                          {group.skills.length === 1 ? 'technology' : 'technologies'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Skills list */}
                  <div className="flex-1 px-6 py-5">
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, skillIdx) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.2,
                            delay: groupIdx * 0.05 + skillIdx * 0.04,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium"
                          style={{
                            background: meta.bg,
                            border: `1px solid ${meta.accent}22`,
                            color: 'hsl(var(--text-body))',
                          }}
                        >
                          <span
                            className="h-1 w-1 flex-shrink-0 rounded-full"
                            style={{ background: meta.accent }}
                          />
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </LayerReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
