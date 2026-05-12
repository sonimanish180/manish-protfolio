'use client'

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

export function ExperienceMagazine() {
  const t = useTranslations('experience')
  const [featured, ...rest] = experience

  const featuredAccent = COMPANY_ACCENT[featured.company] ?? 'hsl(174,100%,50%)'

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

        {/* Feature card — current role */}
        <LayerReveal delay={60}>
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 overflow-hidden rounded-2xl"
            style={{
              background: 'hsl(var(--surface))',
              border: `1px solid ${featuredAccent}30`,
              boxShadow: `0 0 60px ${featuredAccent}10`,
            }}
          >
            <div className="relative p-8 md:p-12">
              {/* Background display text */}
              <div
                className="pointer-events-none absolute inset-0 select-none overflow-hidden"
                aria-hidden
              >
                <span
                  className="absolute -bottom-6 right-0 font-black leading-none tracking-tighter opacity-[0.04]"
                  style={{ fontSize: 'clamp(5rem, 14vw, 11rem)', color: featuredAccent }}
                >
                  {featured.company}
                </span>
              </div>

              {/* Current badge */}
              <div className="mb-6 flex items-center gap-3">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest"
                  style={{
                    background: 'rgba(52,211,153,0.1)',
                    border: '1px solid rgba(52,211,153,0.3)',
                    color: 'hsl(152,60%,65%)',
                  }}
                >
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Current Role
                </span>
                <span className="font-mono text-xs" style={{ color: 'hsl(var(--text-muted))' }}>
                  {featured.period}
                </span>
              </div>

              {/* Role + company */}
              <h2
                className="mb-1 text-2xl font-black leading-tight md:text-4xl"
                style={{ color: 'hsl(var(--text-heading))' }}
              >
                {featured.role}
              </h2>
              <p className="mb-6 font-mono text-lg font-semibold" style={{ color: featuredAccent }}>
                {featured.company} · {featured.location}
              </p>

              {/* First 2 bullets */}
              <div className="space-y-3">
                {featured.bullets.slice(0, 2).map((bullet, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: featuredAccent }}
                    />
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: 'hsl(var(--text-body))' }}
                    >
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </LayerReveal>

        {/* 2-column grid for remaining roles */}
        <div className="grid gap-5 sm:grid-cols-2">
          {rest.map((item, i) => {
            const accent = COMPANY_ACCENT[item.company] ?? 'hsl(174,100%,50%)'
            return (
              <LayerReveal key={item.company + item.period} delay={120 + i * 55}>
                <motion.div
                  whileHover={{ y: -2, borderColor: `${accent}50` }}
                  transition={{ duration: 0.25 }}
                  className="flex h-full flex-col rounded-xl p-6"
                  style={{
                    background: 'hsl(var(--surface))',
                    border: '1px solid hsl(var(--border))',
                  }}
                >
                  {/* Top bar accent */}
                  <div className="mb-4 h-0.5 w-12 rounded-full" style={{ background: accent }} />
                  <div className="mb-3">
                    <h3
                      className="text-base font-black leading-tight"
                      style={{ color: 'hsl(var(--text-heading))' }}
                    >
                      {item.company}
                    </h3>
                    <p className="mt-0.5 font-mono text-sm" style={{ color: accent }}>
                      {item.role}
                    </p>
                    <p
                      className="mt-1 font-mono text-xs"
                      style={{ color: 'hsl(var(--text-muted))' }}
                    >
                      {item.period} · {item.location}
                    </p>
                  </div>
                  <div className="mt-auto space-y-2 pt-3">
                    {item.bullets.slice(0, 2).map((bullet, bi) => (
                      <div key={bi} className="flex items-start gap-2">
                        <span
                          className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full opacity-60"
                          style={{ background: accent }}
                        />
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: 'hsl(var(--text-body))' }}
                        >
                          {bullet}
                        </p>
                      </div>
                    ))}
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
