'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { LayerReveal } from '@/components/composite/layer-reveal'
import { AnimatedCounter } from '@/components/composite/animated-counter'
import { personalInfo, stats, education } from '@/lib/data'
import { GraduationCapIcon, MapPinIcon, MailIcon } from '@/icons'

const GravityOrbit3D = dynamic(
  () => import('@/components/ui/gravity-orbit-3d').then((m) => ({ default: m.GravityOrbit3D })),
  { ssr: false },
)

const DOMAINS = ['fintech', 'blockchain', 'web3', 'kyc / id-tech', 'edtech']

export function AboutSection() {
  const t = useTranslations('about')
  const sectionRef = useRef<HTMLElement>(null)
  const [orbitVisible, setOrbitVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setOrbitVisible(true)
      },
      { threshold: 0.08 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        {/* Section label */}
        <LayerReveal>
          <div className="mb-14 flex items-center gap-4">
            <span className="section-label">{t('title')}</span>
            <div
              className="h-px max-w-[120px] flex-1"
              style={{ background: 'linear-gradient(to right, rgba(0,255,218,0.2), transparent)' }}
            />
          </div>
        </LayerReveal>

        {/* ── Magazine editorial: bio left, orbit right ── */}
        <div className="mb-12 grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-16">
          {/* LEFT: bio column */}
          <LayerReveal delay={60}>
            <div className="flex h-full flex-col">
              {/* Lead sentence — large, editorial */}
              <p
                className="mb-7 text-xl font-semibold leading-[1.5] md:text-2xl"
                style={{ color: 'hsl(var(--text-heading))' }}
              >
                {personalInfo.tagline}
              </p>

              {/* Divider */}
              <div
                className="mb-7 h-[2px] w-12 rounded-full"
                style={{
                  background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))',
                }}
              />

              {/* Bio body */}
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

              {/* Domain tags */}
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

              {/* Contact strip */}
              <div
                className="mt-auto flex flex-col gap-2.5 pt-6"
                style={{ borderTop: '1px solid rgba(0,255,218,0.08)' }}
              >
                <div
                  className="flex items-center gap-2.5 text-sm"
                  style={{ color: 'hsl(var(--text-muted))' }}
                >
                  <MapPinIcon
                    className="h-3.5 w-3.5 shrink-0"
                    style={{ color: 'hsl(var(--primary))' }}
                  />
                  India · Open to remote worldwide
                </div>
                <div
                  className="flex items-center gap-2.5 font-mono text-xs"
                  style={{ color: 'hsl(var(--text-dim))' }}
                >
                  <MailIcon
                    className="h-3.5 w-3.5 shrink-0"
                    style={{ color: 'hsl(var(--accent))' }}
                  />
                  {personalInfo.email}
                </div>
              </div>
            </div>
          </LayerReveal>

          {/* RIGHT: orbit visualization */}
          <LayerReveal delay={120}>
            <div
              className="flex flex-col overflow-hidden rounded-2xl"
              style={{
                background: 'hsl(var(--surface))',
                border: '1px solid rgba(0,255,218,0.1)',
                minHeight: 420,
              }}
            >
              {/* Visual area */}
              <div className="relative flex-1" style={{ minHeight: 340 }}>
                {orbitVisible && <GravityOrbit3D bodies={5} speed={0.9} />}
                {/* corner label */}
                <div
                  className="pointer-events-none absolute bottom-4 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-widest"
                  style={{ color: 'rgba(0,255,218,0.2)' }}
                >
                  system · model
                </div>
              </div>

              {/* Education footer */}
              <div
                className="flex items-start gap-4 p-5"
                style={{ borderTop: '1px solid rgba(0,255,218,0.08)' }}
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
                    className="mb-0.5 font-mono text-[10px] uppercase tracking-widest"
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
            </div>
          </LayerReveal>
        </div>

        {/* ── Stats strip ── */}
        <LayerReveal delay={200}>
          <div
            className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl md:grid-cols-4"
            style={{ border: '1px solid rgba(0,255,218,0.08)' }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="group relative flex flex-col items-center justify-center px-4 py-8 transition-colors duration-300"
                style={{
                  background: 'hsl(var(--surface))',
                  borderRight: i < stats.length - 1 ? '1px solid rgba(0,255,218,0.06)' : undefined,
                }}
              >
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at center, rgba(0,255,218,0.04), transparent 70%)',
                  }}
                />
                <div className="gradient-text mb-2 font-mono text-4xl font-black leading-none md:text-5xl">
                  <AnimatedCounter value={s.value} />
                </div>
                <p
                  className="text-center font-mono text-[10px] uppercase leading-tight tracking-widest"
                  style={{ color: 'hsl(var(--text-muted))' }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </LayerReveal>

        {/* ── Available for work card ── */}
        <LayerReveal delay={280}>
          <div
            className="mt-4 flex flex-col items-start gap-5 rounded-2xl p-6 sm:flex-row sm:items-center"
            style={{
              background: 'rgba(52,211,153,0.04)',
              border: '1px solid rgba(52,211,153,0.16)',
            }}
          >
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 flex-shrink-0 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              <span
                className="font-mono text-sm font-semibold"
                style={{ color: 'hsl(152,60%,65%)' }}
              >
                Open to work
              </span>
            </div>
            <p
              className="flex-1 text-sm leading-relaxed"
              style={{ color: 'hsl(var(--text-body))' }}
            >
              Looking for a senior / lead engineering role — fintech, infra, or platform teams.
              Remote-first, open to Dubai / international.
            </p>
            <div className="flex flex-shrink-0 flex-wrap gap-2">
              {['Full-Stack', 'Platform', 'Golang', 'Next.js'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-2.5 py-1 font-mono text-[11px]"
                  style={{
                    background: 'rgba(0,255,218,0.07)',
                    border: '1px solid rgba(0,255,218,0.14)',
                    color: 'hsl(var(--primary))',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </LayerReveal>
      </div>
    </section>
  )
}
