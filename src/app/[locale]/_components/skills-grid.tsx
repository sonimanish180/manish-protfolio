'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { LayerReveal } from '@/components/composite/layer-reveal'
import { skillCategories } from '@/lib/data'
import { useInteractionsStore } from '@/stores'

const CATEGORY_COLORS: Record<string, { accent: string; bg: string }> = {
  Languages: { accent: 'hsl(271,70%,68%)', bg: 'rgba(139,92,246,0.07)' },
  Frontend: { accent: 'hsl(199,89%,62%)', bg: 'rgba(56,189,248,0.07)' },
  Mobile: { accent: 'hsl(160,60%,55%)', bg: 'rgba(52,211,153,0.07)' },
  Backend: { accent: 'hsl(38,92%,60%)', bg: 'rgba(245,166,35,0.07)' },
  'Cloud & Infra': { accent: 'hsl(0,72%,64%)', bg: 'rgba(239,68,68,0.07)' },
  Expertise: { accent: 'hsl(174,100%,50%)', bg: 'rgba(0,255,218,0.07)' },
}

/* Proficiency dots — visual weight implied by category position */
function ProficiencyDots({ level, accent }: { level: number; accent: string }) {
  return (
    <div className="mt-1.5 flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background: i <= level ? accent : 'rgba(255,255,255,0.08)',
            boxShadow: i <= level ? `0 0 4px ${accent}80` : undefined,
          }}
        />
      ))}
    </div>
  )
}

function SkillCell({
  skill,
  accent,
  bg,
  delay,
  level,
}: {
  skill: string
  accent: string
  bg: string
  delay: number
  level: number
}) {
  const { endorsements } = useInteractionsStore()
  const count = endorsements[skill] ?? 0

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col rounded-xl p-3 transition-all duration-200"
      style={{
        background: bg,
        border: `1px solid ${accent}22`,
      }}
    >
      <span
        className="text-xs font-medium leading-tight"
        style={{ color: 'hsl(var(--text-heading))' }}
      >
        {skill}
      </span>
      <ProficiencyDots level={level} accent={accent} />
      {count > 0 && (
        <span
          className="absolute right-2 top-1.5 font-mono text-[9px]"
          style={{ color: accent, opacity: 0.7 }}
        >
          +{count}
        </span>
      )}
    </motion.div>
  )
}

/* deterministic "proficiency level" from skill name for visual variety */
function pseudoLevel(skill: string): number {
  const h = skill.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return (h % 3) + 3 // returns 3, 4, or 5
}

export function SkillsGrid() {
  const t = useTranslations('skills')
  let globalIndex = 0

  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <LayerReveal>
          <div className="mb-14 flex flex-wrap items-center gap-4">
            <span className="section-label">{t('title')}</span>
            <div className="ml-auto font-mono text-xs" style={{ color: 'hsl(var(--text-dim))' }}>
              proficiency indicators ↑
            </div>
          </div>
        </LayerReveal>

        <div className="space-y-10">
          {skillCategories.map((group, groupIdx) => {
            const color = CATEGORY_COLORS[group.category] ?? CATEGORY_COLORS.Expertise
            return (
              <LayerReveal key={group.category} delay={groupIdx * 60}>
                <div>
                  {/* Category header */}
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1 font-mono text-[10px] font-semibold tracking-wider"
                      style={{
                        background: color.bg,
                        border: `1px solid ${color.accent}33`,
                        color: color.accent,
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{ background: color.accent }}
                      />
                      {group.category}
                    </span>
                    <span
                      className="font-mono text-[10px]"
                      style={{ color: 'hsl(var(--text-dim))' }}
                    >
                      {group.skills.length} skills
                    </span>
                  </div>

                  {/* Skill cells grid */}
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {group.skills.map((skill) => {
                      const delay = globalIndex++ * 0.03
                      const level = pseudoLevel(skill)
                      return (
                        <SkillCell
                          key={skill}
                          skill={skill}
                          accent={color.accent}
                          bg={color.bg}
                          delay={delay}
                          level={level}
                        />
                      )
                    })}
                  </div>
                </div>
              </LayerReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
