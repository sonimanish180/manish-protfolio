'use client'

import { useTranslations } from 'next-intl'
import { LayerReveal } from '@/components/composite/layer-reveal'
import { AnimatedCounter } from '@/components/composite/animated-counter'
import { personalInfo, stats, education, experience } from '@/lib/data'
import { GraduationCapIcon, MapPinIcon, MailIcon, BuildingIcon } from '@/icons'

const DOMAINS = ['fintech', 'blockchain', 'web3', 'kyc / id-tech', 'edtech']

export function AboutCompact() {
  const t = useTranslations('about')

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

        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-16">
          {/* LEFT: bio */}
          <LayerReveal delay={60}>
            <div>
              <p
                className="mb-6 text-2xl font-bold leading-snug"
                style={{ color: 'hsl(var(--text-heading))' }}
              >
                {personalInfo.tagline}
              </p>

              <div
                className="mb-6 h-0.5 w-10 rounded-full"
                style={{
                  background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))',
                }}
              />

              <p
                className="mb-5 text-base leading-[1.85]"
                style={{ color: 'hsl(var(--text-body))' }}
              >
                {t('bio')}
              </p>
              <p
                className="mb-8 text-base leading-[1.85]"
                style={{ color: 'hsl(var(--text-body))' }}
              >
                My background spans fintech (Payram), blockchain infrastructure (Xalts), Web3
                platforms, KYC systems, and edtech — with a common thread: owning the full stack and
                shipping things that matter.
              </p>

              <div className="mb-8 flex flex-wrap gap-2">
                {DOMAINS.map((d) => (
                  <span
                    key={d}
                    className="rounded-full px-3 py-1.5 font-mono text-xs"
                    style={{
                      background: 'hsl(var(--surface-2))',
                      border: '1px solid rgba(0,255,218,0.12)',
                      color: 'hsl(var(--text-muted))',
                    }}
                  >
                    {d}
                  </span>
                ))}
              </div>

              {/* Stats inline */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label} className="flex flex-col gap-0.5">
                    <span className="gradient-text font-mono text-3xl font-black leading-none">
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
            </div>
          </LayerReveal>

          {/* RIGHT: stacked info cards */}
          <LayerReveal delay={140}>
            <div className="flex flex-col gap-3">
              {/* Education */}
              <div
                className="flex items-start gap-4 rounded-2xl p-5"
                style={{
                  background: 'hsl(var(--surface))',
                  border: '1px solid rgba(0,255,218,0.1)',
                }}
              >
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: 'rgba(0,255,218,0.07)',
                    border: '1px solid rgba(0,255,218,0.14)',
                  }}
                >
                  <GraduationCapIcon
                    className="w-4.5 h-4.5"
                    style={{ color: 'hsl(var(--primary))' }}
                  />
                </div>
                <div>
                  <p
                    className="mb-0.5 font-mono text-[9px] uppercase tracking-widest"
                    style={{ color: 'hsl(var(--text-muted))' }}
                  >
                    {t('education')}
                  </p>
                  <p className="text-sm font-bold" style={{ color: 'hsl(var(--text-heading))' }}>
                    {education.shortName}
                  </p>
                  <p className="text-xs" style={{ color: 'hsl(var(--text-body))' }}>
                    {education.degree} · {education.period}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div
                className="flex items-center gap-4 rounded-2xl p-5"
                style={{
                  background: 'hsl(var(--surface))',
                  border: '1px solid rgba(0,255,218,0.1)',
                }}
              >
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: 'rgba(0,255,218,0.07)',
                    border: '1px solid rgba(0,255,218,0.14)',
                  }}
                >
                  <MapPinIcon className="w-4.5 h-4.5" style={{ color: 'hsl(var(--primary))' }} />
                </div>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: 'hsl(var(--text-heading))' }}
                  >
                    India · Remote
                  </p>
                  <p className="font-mono text-xs" style={{ color: 'hsl(var(--text-muted))' }}>
                    Open to remote worldwide
                  </p>
                </div>
              </div>

              {/* Email */}
              <div
                className="flex items-center gap-4 rounded-2xl p-5"
                style={{
                  background: 'hsl(var(--surface))',
                  border: '1px solid rgba(0,255,218,0.1)',
                }}
              >
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: 'rgba(0,255,218,0.07)',
                    border: '1px solid rgba(0,255,218,0.14)',
                  }}
                >
                  <MailIcon className="w-4.5 h-4.5" style={{ color: 'hsl(var(--accent))' }} />
                </div>
                <div>
                  <p
                    className="mb-0.5 font-mono text-[9px] uppercase tracking-widest"
                    style={{ color: 'hsl(var(--text-muted))' }}
                  >
                    Email
                  </p>
                  <p className="font-mono text-xs" style={{ color: 'hsl(var(--text-body))' }}>
                    {personalInfo.email}
                  </p>
                </div>
              </div>

              {/* Current role */}
              <div
                className="flex items-start gap-4 rounded-2xl p-5"
                style={{
                  background: 'rgba(52,211,153,0.04)',
                  border: '1px solid rgba(52,211,153,0.16)',
                }}
              >
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: 'rgba(52,211,153,0.08)',
                    border: '1px solid rgba(52,211,153,0.2)',
                  }}
                >
                  <BuildingIcon className="w-4.5 h-4.5" style={{ color: 'hsl(152,60%,65%)' }} />
                </div>
                <div>
                  <div className="mb-0.5 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    <p
                      className="font-mono text-[9px] uppercase tracking-widest"
                      style={{ color: 'hsl(152,60%,65%)' }}
                    >
                      Current
                    </p>
                  </div>
                  <p className="text-sm font-bold" style={{ color: 'hsl(var(--text-heading))' }}>
                    {experience[0]?.role}
                  </p>
                  <p className="text-xs" style={{ color: 'hsl(var(--text-muted))' }}>
                    {experience[0]?.company} · {experience[0]?.period}
                  </p>
                </div>
              </div>

              {/* Available banner */}
              <div
                className="rounded-2xl p-4"
                style={{
                  background: 'hsl(var(--surface))',
                  border: '1px solid rgba(0,255,218,0.08)',
                }}
              >
                <p className="text-xs leading-relaxed" style={{ color: 'hsl(var(--text-body))' }}>
                  Looking for a senior / lead engineering role — fintech, infra, or platform teams.
                  Remote-first, open to Dubai / international.
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {['Full-Stack', 'Platform', 'Golang', 'Next.js'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-2 py-0.5 font-mono text-[10px]"
                      style={{
                        background: 'rgba(0,255,218,0.07)',
                        border: '1px solid rgba(0,255,218,0.12)',
                        color: 'hsl(var(--primary))',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </LayerReveal>
        </div>
      </div>
    </section>
  )
}
