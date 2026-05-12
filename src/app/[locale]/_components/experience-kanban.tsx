'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { LayerReveal } from '@/components/composite/layer-reveal'
import { experience } from '@/lib/data'

const COMPANY_ACCENT: Record<string, string> = {
  Payram: 'hsl(174,100%,50%)',
  Xalts: 'hsl(199,89%,60%)',
  'Create Protocol': 'hsl(271,70%,65%)',
  Credenc: 'hsl(38,92%,58%)',
  invoid: 'hsl(160,60%,55%)',
}

type Column = { label: string; range: string; color: string; keys: string[] }

const COLUMNS: Column[] = [
  {
    label: 'Earlier',
    range: '2020 – 2022',
    color: 'hsl(160,60%,55%)',
    keys: ['invoid', 'Credenc'],
  },
  {
    label: 'Growth',
    range: '2022 – 2023',
    color: 'hsl(271,70%,65%)',
    keys: ['Create Protocol', 'Xalts'],
  },
  {
    label: 'Leadership',
    range: '2024 – present',
    color: 'hsl(174,100%,50%)',
    keys: ['Payram'],
  },
]

function KanbanCard({ item, delay }: { item: (typeof experience)[0]; delay: number }) {
  const [hovered, setHovered] = useState(false)
  const accent = COMPANY_ACCENT[item.company] ?? 'hsl(174,100%,50%)'

  return (
    <LayerReveal delay={delay}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={
          hovered
            ? { y: -6, boxShadow: `0 16px 40px ${accent}20, 0 0 0 1px ${accent}30` }
            : { y: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }
        }
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="cursor-grab rounded-xl p-4 active:cursor-grabbing"
        style={{
          background: 'hsl(var(--surface))',
          border: `1px solid ${hovered ? `${accent}40` : 'hsl(var(--border))'}`,
        }}
      >
        {/* Drag handle dots */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex gap-1">
            {[0, 1].map((row) => (
              <div key={row} className="flex flex-col gap-1">
                {[0, 1, 2].map((dot) => (
                  <div
                    key={dot}
                    className="h-1 w-1 rounded-full opacity-20"
                    style={{ background: accent }}
                  />
                ))}
              </div>
            ))}
          </div>
          {item.current && (
            <span
              className="rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest"
              style={{
                background: 'rgba(52,211,153,0.1)',
                border: '1px solid rgba(52,211,153,0.25)',
                color: 'hsl(152,60%,65%)',
              }}
            >
              now
            </span>
          )}
        </div>

        {/* Company + role */}
        <h3
          className="text-sm font-black leading-snug"
          style={{ color: 'hsl(var(--text-heading))' }}
        >
          {item.company}
        </h3>
        <p className="mt-0.5 font-mono text-xs font-medium" style={{ color: accent }}>
          {item.role}
        </p>
        <p className="mt-1 font-mono text-[11px]" style={{ color: 'hsl(var(--text-muted))' }}>
          {item.period}
        </p>

        {/* Bullets */}
        <div
          className="mt-3 space-y-1.5 border-t pt-3"
          style={{ borderColor: 'hsl(var(--border))' }}
        >
          {item.bullets.slice(0, 2).map((bullet, i) => (
            <div key={i} className="flex items-start gap-2">
              <span
                className="mt-[6px] h-1 w-1 flex-shrink-0 rounded-full opacity-50"
                style={{ background: accent }}
              />
              <p className="text-xs leading-relaxed" style={{ color: 'hsl(var(--text-body))' }}>
                {bullet}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </LayerReveal>
  )
}

export function ExperienceKanban() {
  const t = useTranslations('experience')

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

        <div className="grid gap-5 md:grid-cols-3">
          {COLUMNS.map((col, ci) => {
            const colItems = col.keys
              .map((key) => experience.find((e) => e.company === key))
              .filter(Boolean) as typeof experience

            return (
              <LayerReveal key={col.label} delay={ci * 80}>
                <div
                  className="flex flex-col gap-4 rounded-2xl p-4"
                  style={{ background: 'hsl(var(--surface-2))' }}
                >
                  {/* Column header */}
                  <div className="flex items-center justify-between px-1">
                    <div>
                      <h4 className="text-sm font-black" style={{ color: col.color }}>
                        {col.label}
                      </h4>
                      <p
                        className="font-mono text-[10px]"
                        style={{ color: 'hsl(var(--text-muted))' }}
                      >
                        {col.range}
                      </p>
                    </div>
                    <span
                      className="flex h-5 w-5 items-center justify-center rounded-full font-mono text-[10px] font-bold"
                      style={{ background: `${col.color}20`, color: col.color }}
                    >
                      {colItems.length}
                    </span>
                  </div>

                  {/* Cards */}
                  {colItems.map((item, i) => (
                    <KanbanCard
                      key={item.company + item.period}
                      item={item}
                      delay={ci * 80 + i * 55}
                    />
                  ))}
                </div>
              </LayerReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
