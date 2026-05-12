'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { LayerReveal } from '@/components/composite/layer-reveal'
import { projects } from '@/lib/data'
import { TrendingUpIcon, BuildingIcon } from '@/icons'

const COMPANY_ACCENT: Record<string, string> = {
  Payram: 'hsl(174,100%,50%)',
  Xalts: 'hsl(199,89%,60%)',
  'Create Protocol': 'hsl(271,70%,65%)',
  Credenc: 'hsl(38,92%,58%)',
  invoid: 'hsl(160,60%,55%)',
}

export function ProjectsCarousel() {
  const t = useTranslations('projects')
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const amount = el.clientWidth * 0.7
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <LayerReveal>
          <div className="mb-10 flex flex-wrap items-center gap-4">
            <span className="section-label">{t('title')}</span>
            <div className="ml-auto flex items-center gap-2">
              {/* Prev / next */}
              {['left', 'right'].map((dir) => (
                <button
                  key={dir}
                  onClick={() => scroll(dir as 'left' | 'right')}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl transition-colors duration-200"
                  style={{
                    background: 'hsl(var(--surface))',
                    border: '1px solid rgba(0,255,218,0.14)',
                    color: 'hsl(var(--text-muted))',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'hsl(var(--primary))')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'hsl(var(--text-muted))')}
                >
                  {dir === 'left' ? '←' : '→'}
                </button>
              ))}
            </div>
          </div>
        </LayerReveal>

        {/* Horizontal scroll track */}
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={(e) => {
            const el = e.currentTarget
            const idx = Math.round(el.scrollLeft / (el.scrollWidth / projects.length))
            setActiveIdx(Math.max(0, Math.min(idx, projects.length - 1)))
          }}
        >
          {projects.map((project, i) => {
            const accent = COMPANY_ACCENT[project.company] ?? 'hsl(174,100%,50%)'
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-shrink-0 snap-center flex-col overflow-hidden rounded-2xl"
                style={{
                  width: 'min(420px, 80vw)',
                  background: 'hsl(var(--surface))',
                  border: `1px solid ${accent}22`,
                  boxShadow: `0 4px 24px rgba(0,0,0,0.25)`,
                }}
              >
                {/* Top bar */}
                <div
                  className="h-1"
                  style={{ background: `linear-gradient(90deg, ${accent}, ${accent}44)` }}
                />

                <div className="flex flex-1 flex-col p-7">
                  <div className="mb-5 flex items-center gap-2.5">
                    <span
                      className="flex items-center gap-1.5 font-mono text-xs"
                      style={{ color: 'hsl(var(--text-muted))' }}
                    >
                      <BuildingIcon className="h-3 w-3" /> {project.company}
                    </span>
                    <span
                      className="ml-auto rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest"
                      style={{
                        background: `${accent}15`,
                        border: `1px solid ${accent}33`,
                        color: accent,
                      }}
                    >
                      #{i + 1}
                    </span>
                  </div>

                  <h3
                    className="mb-3 text-xl font-black leading-tight"
                    style={{ color: 'hsl(var(--text-heading))' }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="mb-5 flex-1 text-sm leading-relaxed"
                    style={{ color: 'hsl(var(--text-body))' }}
                  >
                    {project.description}
                  </p>

                  {project.impact && (
                    <div
                      className="mb-5 flex items-center gap-2 rounded-xl px-3 py-2 text-xs"
                      style={{
                        background: `${accent}0d`,
                        border: `1px solid ${accent}22`,
                        color: accent,
                      }}
                    >
                      <TrendingUpIcon className="h-3 w-3 flex-shrink-0" />
                      {project.impact}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full px-2.5 py-1 font-mono text-[11px]"
                        style={{
                          background: 'hsl(var(--surface-2))',
                          border: '1px solid rgba(0,255,218,0.1)',
                          color: 'hsl(var(--text-dim))',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Progress dots */}
        <div className="mt-6 flex justify-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const el = scrollRef.current
                if (!el) return
                const cardW = el.scrollWidth / projects.length
                el.scrollTo({ left: cardW * i, behavior: 'smooth' })
              }}
              className="cursor-pointer rounded-full transition-all duration-300"
              style={{
                width: activeIdx === i ? 20 : 6,
                height: 6,
                background: activeIdx === i ? 'hsl(var(--primary))' : 'rgba(0,255,218,0.2)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
