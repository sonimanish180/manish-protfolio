'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { LayerReveal } from '@/components/composite/layer-reveal'
import { AnimatedCounter } from '@/components/composite/animated-counter'
import { personalInfo, stats, education, skillCategories } from '@/lib/data'

const CHAPTERS = [
  {
    id: 'origins',
    label: 'Early Career',
    period: '2016 – 2019',
    heading: 'Building the Foundation',
    body: `Started as a full-stack engineer, diving deep into distributed systems and payment infrastructure. Learned that great software is built at the intersection of rigorous engineering and real business problems.`,
    tags: ['Go', 'Node.js', 'PostgreSQL', 'REST APIs'],
  },
  {
    id: 'products',
    label: 'Products Built',
    period: '2019 – 2022',
    heading: 'Shipping at Scale',
    body: `Led engineering on fintech and KYC platforms — building compliance engines, blockchain infrastructure, and multi-tenant SaaS products used by thousands. Ownership over the full stack became the norm.`,
    tags: ['Fintech', 'Blockchain', 'KYC / ID-tech', 'Web3'],
  },
  {
    id: 'today',
    label: 'Today',
    period: '2022 – Present',
    heading: 'Platform & Leadership',
    body: `Now focused on platform engineering and technical leadership — designing systems that scale, mentoring teams, and driving product strategy alongside engineering execution.`,
    tags: ['Platform', 'Leadership', 'Architecture', 'Next.js'],
  },
  {
    id: 'next',
    label: "What's Next",
    period: 'Open',
    heading: 'The Next Chapter',
    body: `Seeking a senior / lead engineering role at the intersection of fintech, infrastructure, or developer tooling. Remote-first, open to Dubai and international opportunities.`,
    tags: ['Full-Stack', 'Golang', 'Remote', 'Leadership'],
  },
]

export function AboutStory() {
  const t = useTranslations('about')
  const [active, setActive] = useState(0)

  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <LayerReveal>
          <div className="mb-14 flex items-center gap-4">
            <span className="section-label">{t('title')}</span>
            <div
              className="h-px max-w-[120px] flex-1"
              style={{ background: 'linear-gradient(to right, rgba(0,255,218,0.2), transparent)' }}
            />
          </div>
        </LayerReveal>

        <div className="grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
          {/* LEFT: chapter timeline */}
          <LayerReveal delay={40}>
            <div className="relative flex flex-row gap-0 lg:flex-col">
              {/* vertical track (desktop) */}
              <div
                className="absolute bottom-0 left-3.5 top-0 hidden w-px lg:block"
                style={{ background: 'hsl(var(--border))' }}
              />

              {CHAPTERS.map((ch, i) => (
                <button
                  key={ch.id}
                  onClick={() => setActive(i)}
                  className="group relative flex flex-1 flex-col items-start gap-0.5 py-3 pl-10 pr-4 text-left transition-opacity lg:flex-none"
                  style={{ opacity: active === i ? 1 : 0.45 }}
                >
                  {/* dot */}
                  <span
                    className="absolute left-2 top-4 h-3 w-3 rounded-full border-2 transition-colors duration-200"
                    style={{
                      borderColor: active === i ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                      background: active === i ? 'hsl(var(--primary))' : 'hsl(var(--surface))',
                    }}
                  />
                  <span
                    className="font-mono text-[9px] uppercase tracking-widest"
                    style={{ color: 'hsl(var(--text-dim))' }}
                  >
                    {ch.period}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{
                      color: active === i ? 'hsl(var(--text-heading))' : 'hsl(var(--text-muted))',
                    }}
                  >
                    {ch.label}
                  </span>
                </button>
              ))}
            </div>
          </LayerReveal>

          {/* RIGHT: chapter content */}
          <LayerReveal delay={80}>
            <div
              className="relative min-h-[340px] overflow-hidden rounded-2xl p-8 lg:p-10"
              style={{
                background: 'hsl(var(--surface))',
                border: '1px solid rgba(0,255,218,0.1)',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={CHAPTERS[active].id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                >
                  <p
                    className="mb-1 font-mono text-[10px] uppercase tracking-widest"
                    style={{ color: 'hsl(var(--primary))' }}
                  >
                    {CHAPTERS[active].period}
                  </p>
                  <h3
                    className="mb-4 text-2xl font-bold leading-snug"
                    style={{ color: 'hsl(var(--text-heading))' }}
                  >
                    {CHAPTERS[active].heading}
                  </h3>
                  <p
                    className="mb-6 max-w-xl text-base leading-[1.85]"
                    style={{ color: 'hsl(var(--text-body))' }}
                  >
                    {active === 0 ? t('bio') : CHAPTERS[active].body}
                  </p>
                  <div className="mb-8 flex flex-wrap gap-2">
                    {CHAPTERS[active].tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-3 py-1 font-mono text-xs"
                        style={{
                          background: 'hsl(var(--surface-2))',
                          border: '1px solid rgba(0,255,218,0.12)',
                          color: 'hsl(var(--text-muted))',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {active === 0 && (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {stats.map((s) => (
                        <div key={s.label} className="flex flex-col gap-0.5">
                          <span className="gradient-text font-mono text-2xl font-black leading-none">
                            <AnimatedCounter value={s.value} />
                          </span>
                          <span
                            className="font-mono text-[9px] uppercase tracking-widest"
                            style={{ color: 'hsl(var(--text-dim))' }}
                          >
                            {s.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {active === 1 && (
                    <div className="text-sm" style={{ color: 'hsl(var(--text-muted))' }}>
                      <span className="font-mono text-[10px] uppercase tracking-widest">
                        Education ·{' '}
                      </span>
                      <span className="font-semibold" style={{ color: 'hsl(var(--text-body))' }}>
                        {education.shortName}
                      </span>
                      {' · '}
                      {education.degree} · {education.period}
                    </div>
                  )}

                  {active === 2 && (
                    <div className="flex flex-wrap gap-2">
                      {skillCategories
                        .slice(0, 2)
                        .flatMap((sc) => sc.skills.slice(0, 3))
                        .map((sk) => (
                          <span
                            key={sk}
                            className="rounded-full px-2.5 py-1 font-mono text-[10px]"
                            style={{
                              background: 'rgba(0,255,218,0.06)',
                              border: '1px solid rgba(0,255,218,0.12)',
                              color: 'hsl(var(--primary))',
                            }}
                          >
                            {sk}
                          </span>
                        ))}
                    </div>
                  )}

                  {active === 3 && (
                    <p className="font-mono text-xs" style={{ color: 'hsl(var(--text-muted))' }}>
                      {personalInfo.tagline}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </LayerReveal>
        </div>
      </div>
    </section>
  )
}
