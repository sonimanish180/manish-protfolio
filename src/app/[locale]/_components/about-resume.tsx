'use client'

import { useTranslations } from 'next-intl'
import { LayerReveal } from '@/components/composite/layer-reveal'
import { AnimatedCounter } from '@/components/composite/animated-counter'
import { personalInfo, stats, education, skillCategories } from '@/lib/data'

const EXPERIENCE_HIGHLIGHTS = [
  {
    role: 'Senior Software Engineer',
    company: 'Xalts',
    period: '2022 – Present',
    bullets: [
      'Architected blockchain infrastructure and multi-chain asset tokenisation platform',
      'Led a team of 5 engineers, driving technical roadmap and code quality standards',
      'Reduced onboarding latency by 60% through async KYC pipeline redesign',
    ],
  },
  {
    role: 'Full-Stack Engineer',
    company: 'Payram',
    period: '2020 – 2022',
    bullets: [
      'Built core payment rails and compliance engine processing $2M+ daily volume',
      'Designed multi-tenant SaaS architecture with role-based access control',
      'Integrated 8 banking partners via ISO 20022 and proprietary APIs',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Early-stage startups',
    period: '2016 – 2020',
    bullets: [
      'Delivered edtech platform serving 10k+ learners across 3 countries',
      'Built Web3 voting and credential verification dApps on Ethereum',
    ],
  },
]

export function AboutResume() {
  const t = useTranslations('about')

  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <LayerReveal>
          <span className="section-label">{t('title')}</span>
        </LayerReveal>

        {/* Resume card */}
        <LayerReveal delay={40}>
          <div
            className="mt-10 overflow-hidden rounded-2xl"
            style={{
              background: 'hsl(var(--surface))',
              border: '1px solid rgba(0,255,218,0.1)',
            }}
          >
            {/* Header bar */}
            <div
              className="px-8 py-8 lg:px-12"
              style={{
                background: 'hsl(var(--surface-2))',
                borderBottom: '1px solid rgba(0,255,218,0.08)',
              }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="gradient-text text-3xl font-black tracking-tight lg:text-4xl">
                    {personalInfo.name}
                  </h2>
                  <p
                    className="mt-1 text-lg font-semibold"
                    style={{ color: 'hsl(var(--text-heading))' }}
                  >
                    {personalInfo.title}
                  </p>
                  <p
                    className="mt-0.5 font-mono text-sm"
                    style={{ color: 'hsl(var(--text-muted))' }}
                  >
                    {personalInfo.subtitle}
                  </p>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-right">
                  <div>
                    <p
                      className="font-mono text-[9px] uppercase tracking-widest"
                      style={{ color: 'hsl(var(--text-dim))' }}
                    >
                      Location
                    </p>
                    <p className="text-sm font-medium" style={{ color: 'hsl(var(--text-body))' }}>
                      India · Remote
                    </p>
                  </div>
                  <div>
                    <p
                      className="font-mono text-[9px] uppercase tracking-widest"
                      style={{ color: 'hsl(var(--text-dim))' }}
                    >
                      Status
                    </p>
                    <p
                      className="flex items-center gap-1.5 text-sm font-medium"
                      style={{ color: 'hsl(152,60%,65%)' }}
                    >
                      <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      Open to work
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats strip */}
              <div
                className="mt-6 flex flex-wrap gap-6 border-t pt-5"
                style={{ borderColor: 'rgba(0,255,218,0.08)' }}
              >
                {stats.map((s) => (
                  <div key={s.label} className="flex items-baseline gap-1.5">
                    <span className="gradient-text font-mono text-xl font-black leading-none">
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

            {/* Body: two-column */}
            <div className="grid gap-0 lg:grid-cols-[280px_1fr]">
              {/* LEFT column */}
              <div
                className="flex flex-col gap-8 px-8 py-8 lg:px-10"
                style={{ borderRight: '1px solid rgba(0,255,218,0.06)' }}
              >
                {/* Summary */}
                <div>
                  <h3
                    className="mb-3 font-mono text-[10px] uppercase tracking-widest"
                    style={{ color: 'hsl(var(--primary))' }}
                  >
                    Summary
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--text-body))' }}>
                    {t('bio')}
                  </p>
                </div>

                {/* Education */}
                <div>
                  <h3
                    className="mb-3 font-mono text-[10px] uppercase tracking-widest"
                    style={{ color: 'hsl(var(--primary))' }}
                  >
                    Education
                  </h3>
                  <p className="text-sm font-bold" style={{ color: 'hsl(var(--text-heading))' }}>
                    {education.shortName}
                  </p>
                  <p className="text-xs" style={{ color: 'hsl(var(--text-body))' }}>
                    {education.degree}
                  </p>
                  <p
                    className="mt-0.5 font-mono text-xs"
                    style={{ color: 'hsl(var(--text-muted))' }}
                  >
                    {education.period}
                  </p>
                </div>

                {/* Skills */}
                <div>
                  <h3
                    className="mb-3 font-mono text-[10px] uppercase tracking-widest"
                    style={{ color: 'hsl(var(--primary))' }}
                  >
                    Core Skills
                  </h3>
                  <div className="flex flex-col gap-3">
                    {skillCategories.map((sc) => (
                      <div key={sc.category}>
                        <p
                          className="mb-1.5 font-mono text-[9px] uppercase tracking-widest"
                          style={{ color: 'hsl(var(--text-dim))' }}
                        >
                          {sc.category}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {sc.skills.map((sk) => (
                            <span
                              key={sk}
                              className="rounded px-1.5 py-0.5 font-mono text-[10px]"
                              style={{
                                background: 'hsl(var(--surface-2))',
                                border: '1px solid rgba(0,255,218,0.08)',
                                color: 'hsl(var(--text-muted))',
                              }}
                            >
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT column: experience */}
              <div className="flex flex-col gap-8 px-8 py-8 lg:px-10">
                <h3
                  className="font-mono text-[10px] uppercase tracking-widest"
                  style={{ color: 'hsl(var(--primary))' }}
                >
                  Experience
                </h3>

                <div className="relative flex flex-col gap-8">
                  {/* vertical track */}
                  <div
                    className="absolute bottom-0 left-[5px] top-2 w-px"
                    style={{ background: 'hsl(var(--border))' }}
                  />

                  {EXPERIENCE_HIGHLIGHTS.map((exp) => (
                    <div key={exp.company} className="relative pl-6">
                      {/* dot */}
                      <span
                        className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full border-2"
                        style={{
                          borderColor: 'hsl(var(--primary))',
                          background: 'hsl(var(--surface))',
                        }}
                      />

                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                        <p
                          className="text-sm font-bold"
                          style={{ color: 'hsl(var(--text-heading))' }}
                        >
                          {exp.role}
                        </p>
                        <p
                          className="font-mono text-xs"
                          style={{ color: 'hsl(var(--text-muted))' }}
                        >
                          {exp.company}
                        </p>
                        <p
                          className="font-mono text-[10px]"
                          style={{ color: 'hsl(var(--text-dim))' }}
                        >
                          {exp.period}
                        </p>
                      </div>

                      <ul className="mt-2 flex flex-col gap-1.5">
                        {exp.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2 text-xs leading-relaxed"
                            style={{ color: 'hsl(var(--text-body))' }}
                          >
                            <span
                              className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full"
                              style={{ background: 'hsl(var(--primary))' }}
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </LayerReveal>
      </div>
    </section>
  )
}
