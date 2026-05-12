'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { LayerReveal } from '@/components/composite/layer-reveal'
import { experience } from '@/lib/data'

const COMPANY_ACCENT: Record<string, string> = {
  Payram: 'hsl(174,100%,50%)',
  Xalts: 'hsl(199,89%,60%)',
  'Create Protocol': 'hsl(271,70%,65%)',
  Credenc: 'hsl(38,92%,58%)',
  invoid: 'hsl(160,60%,55%)',
}

const HEADERS = ['Company', 'Role', 'Period', 'Location', 'Highlights']

export function ExperienceTable() {
  const t = useTranslations('experience')
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set([experience[0].company + experience[0].period]),
  )

  function toggleRow(key: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <LayerReveal>
          <div className="mb-14 flex flex-wrap items-center gap-4">
            <span className="section-label">{t('title')}</span>
            <div
              className="h-px max-w-[120px] flex-1"
              style={{ background: 'linear-gradient(to right, rgba(0,255,218,0.2), transparent)' }}
            />
          </div>
        </LayerReveal>

        <LayerReveal delay={60}>
          <div
            className="overflow-hidden rounded-2xl"
            style={{ border: '1px solid hsl(var(--border))' }}
          >
            {/* Table header */}
            <div
              className="grid grid-cols-[1.4fr_1.6fr_1.2fr_1fr_2fr] px-6 py-3"
              style={{ background: 'hsl(var(--surface-2))' }}
            >
              {HEADERS.map((h) => (
                <span
                  key={h}
                  className="font-mono text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: 'hsl(var(--text-muted))' }}
                >
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            <div className="divide-y" style={{ borderColor: 'hsl(var(--border))' }}>
              {experience.map((item, i) => {
                const key = item.company + item.period
                const accent = COMPANY_ACCENT[item.company] ?? 'hsl(174,100%,50%)'
                const isExpanded = expanded.has(key)

                return (
                  <div key={key}>
                    {/* Main row */}
                    <motion.button
                      className="grid w-full cursor-pointer grid-cols-[1.4fr_1.6fr_1.2fr_1fr_2fr] items-center gap-2 px-6 py-4 text-left transition-colors"
                      style={{
                        background: isExpanded ? `${accent}06` : 'hsl(var(--surface))',
                      }}
                      whileHover={{ backgroundColor: `${accent}09` }}
                      onClick={() => toggleRow(key)}
                    >
                      {/* Company */}
                      <div className="flex items-center gap-2.5">
                        <span
                          className="h-5 w-0.5 flex-shrink-0 rounded-full"
                          style={{ background: isExpanded ? accent : 'rgba(255,255,255,0.08)' }}
                        />
                        <div>
                          <span
                            className="block text-sm font-bold leading-tight"
                            style={{ color: 'hsl(var(--text-heading))' }}
                          >
                            {item.company}
                          </span>
                          {item.current && (
                            <span
                              className="mt-0.5 inline-flex items-center gap-1 rounded-full px-1.5 py-px font-mono text-[8px] uppercase tracking-widest"
                              style={{
                                background: 'rgba(52,211,153,0.1)',
                                color: 'hsl(152,60%,65%)',
                              }}
                            >
                              <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
                              now
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Role */}
                      <span className="font-mono text-xs font-medium" style={{ color: accent }}>
                        {item.role}
                      </span>

                      {/* Period */}
                      <span
                        className="font-mono text-xs"
                        style={{ color: 'hsl(var(--text-muted))' }}
                      >
                        {item.period}
                      </span>

                      {/* Location */}
                      <span
                        className="font-mono text-xs"
                        style={{ color: 'hsl(var(--text-muted))' }}
                      >
                        {item.location}
                      </span>

                      {/* Highlights preview */}
                      <span
                        className="truncate text-xs leading-relaxed"
                        style={{ color: 'hsl(var(--text-body))' }}
                        title={item.bullets[0]}
                      >
                        {item.bullets[0]}
                      </span>
                    </motion.button>

                    {/* Expanded bullets */}
                    <AnimatePresence initial={i === 0}>
                      {isExpanded && (
                        <motion.div
                          key="expanded"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-8 py-5" style={{ background: `${accent}05` }}>
                            <p
                              className="mb-3 font-mono text-[10px] uppercase tracking-widest"
                              style={{ color: accent }}
                            >
                              All highlights
                            </p>
                            <div className="grid gap-2 sm:grid-cols-2">
                              {item.bullets.map((bullet, bi) => (
                                <motion.div
                                  key={bi}
                                  initial={{ opacity: 0, x: -6 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.2, delay: bi * 0.03 }}
                                  className="flex items-start gap-2.5"
                                >
                                  <span
                                    className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full opacity-60"
                                    style={{ background: accent }}
                                  />
                                  <p
                                    className="text-sm leading-relaxed"
                                    style={{ color: 'hsl(var(--text-body))' }}
                                  >
                                    {bullet}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </LayerReveal>
      </div>
    </section>
  )
}
