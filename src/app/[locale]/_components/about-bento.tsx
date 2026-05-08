'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { LayerReveal } from '@/components/composite/layer-reveal'
import { AnimatedCounter } from '@/components/composite/animated-counter'
import { personalInfo, stats, education } from '@/lib/data'
import { GraduationCapIcon, MapPinIcon } from '@/icons'

const GravityOrbit3D = dynamic(
  () => import('@/components/ui/gravity-orbit-3d').then((m) => ({ default: m.GravityOrbit3D })),
  { ssr: false },
)

const DOMAINS = ['fintech', 'blockchain', 'web3', 'kyc / id-tech', 'edtech']

export function AboutBento() {
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
        <LayerReveal>
          <div className="mb-14 flex items-center gap-4">
            <span className="section-label">{t('title')}</span>
            <div
              className="h-px max-w-[120px] flex-1"
              style={{ background: 'linear-gradient(to right, rgba(0,255,218,0.2), transparent)' }}
            />
          </div>
        </LayerReveal>

        {/* Bento grid */}
        <div className="grid auto-rows-[160px] grid-cols-2 gap-4 lg:grid-cols-4">
          {/* Bio card — spans 2 cols × 2 rows */}
          <LayerReveal delay={40} className="col-span-2 row-span-2">
            <div
              className="flex h-full flex-col rounded-2xl p-7"
              style={{
                background: 'hsl(var(--surface))',
                border: '1px solid rgba(0,255,218,0.1)',
              }}
            >
              <p
                className="mb-4 font-mono text-[10px] uppercase tracking-widest"
                style={{ color: 'hsl(var(--text-muted))' }}
              >
                {t('title')}
              </p>
              <p
                className="mb-4 text-xl font-bold leading-snug"
                style={{ color: 'hsl(var(--text-heading))' }}
              >
                {personalInfo.tagline}
              </p>
              <p
                className="flex-1 text-sm leading-relaxed"
                style={{ color: 'hsl(var(--text-body))' }}
              >
                {t('bio')}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {DOMAINS.map((d) => (
                  <span
                    key={d}
                    className="rounded-full px-2.5 py-1 font-mono text-[10px]"
                    style={{
                      background: 'hsl(var(--surface-2))',
                      border: '1px solid rgba(0,255,218,0.1)',
                      color: 'hsl(var(--text-muted))',
                    }}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </LayerReveal>

          {/* Orbit card — spans 1 col × 2 rows */}
          <LayerReveal delay={80} className="row-span-2 hidden lg:col-span-1 lg:block">
            <div
              className="relative h-full overflow-hidden rounded-2xl"
              style={{ background: 'hsl(var(--surface))', border: '1px solid rgba(0,255,218,0.1)' }}
            >
              {orbitVisible && <GravityOrbit3D bodies={4} speed={0.8} />}
              <div
                className="pointer-events-none absolute bottom-3 left-0 right-0 text-center font-mono text-[9px] uppercase tracking-widest"
                style={{ color: 'rgba(0,255,218,0.2)' }}
              >
                system · model
              </div>
            </div>
          </LayerReveal>

          {/* Education card */}
          <LayerReveal delay={120} className="lg:col-span-1">
            <div
              className="flex h-full flex-col justify-between rounded-2xl p-5"
              style={{ background: 'hsl(var(--surface))', border: '1px solid rgba(0,255,218,0.1)' }}
            >
              <div
                className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  background: 'rgba(0,255,218,0.07)',
                  border: '1px solid rgba(0,255,218,0.14)',
                }}
              >
                <GraduationCapIcon className="h-4 w-4" style={{ color: 'hsl(var(--primary))' }} />
              </div>
              <div>
                <p
                  className="mb-1 font-mono text-[9px] uppercase tracking-widest"
                  style={{ color: 'hsl(var(--text-muted))' }}
                >
                  {t('education')}
                </p>
                <p
                  className="text-sm font-bold leading-tight"
                  style={{ color: 'hsl(var(--text-heading))' }}
                >
                  {education.shortName}
                </p>
                <p className="mt-0.5 text-xs" style={{ color: 'hsl(var(--text-body))' }}>
                  {education.degree} · {education.period}
                </p>
              </div>
            </div>
          </LayerReveal>

          {/* Location card */}
          <LayerReveal delay={160} className="lg:col-span-1">
            <div
              className="flex h-full flex-col justify-between rounded-2xl p-5"
              style={{ background: 'hsl(var(--surface))', border: '1px solid rgba(0,255,218,0.1)' }}
            >
              <MapPinIcon className="mb-auto h-5 w-5" style={{ color: 'hsl(var(--primary))' }} />
              <div>
                <p className="text-sm font-semibold" style={{ color: 'hsl(var(--text-heading))' }}>
                  India
                </p>
                <p className="font-mono text-xs" style={{ color: 'hsl(var(--text-muted))' }}>
                  Open to remote worldwide
                </p>
                <p className="mt-1 font-mono text-[10px]" style={{ color: 'hsl(var(--text-dim))' }}>
                  {personalInfo.email}
                </p>
              </div>
            </div>
          </LayerReveal>

          {/* Stats — each stat is its own mini tile (4 tiles × 1 row) */}
          {stats.map((s, i) => (
            <LayerReveal key={s.label} delay={200 + i * 30}>
              <div
                className="group relative flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl p-5 transition-colors duration-300"
                style={{
                  background: 'hsl(var(--surface))',
                  border: '1px solid rgba(0,255,218,0.08)',
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at center, rgba(0,255,218,0.05), transparent 70%)',
                  }}
                />
                <div className="gradient-text mb-1 font-mono text-3xl font-black leading-none">
                  <AnimatedCounter value={s.value} />
                </div>
                <p
                  className="text-center font-mono text-[9px] uppercase leading-tight tracking-widest"
                  style={{ color: 'hsl(var(--text-muted))' }}
                >
                  {s.label}
                </p>
              </div>
            </LayerReveal>
          ))}

          {/* Open to work — spans full remaining width */}
          <LayerReveal delay={320} className="col-span-2 lg:col-span-4">
            <div
              className="flex h-full flex-col items-center gap-4 rounded-2xl px-6 sm:flex-row"
              style={{
                background: 'rgba(52,211,153,0.04)',
                border: '1px solid rgba(52,211,153,0.16)',
              }}
            >
              <div className="flex flex-shrink-0 items-center gap-2.5">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                <span
                  className="font-mono text-sm font-semibold"
                  style={{ color: 'hsl(152,60%,65%)' }}
                >
                  Open to work
                </span>
              </div>
              <p className="flex-1 text-sm" style={{ color: 'hsl(var(--text-body))' }}>
                Looking for a senior / lead engineering role — fintech, infra, or platform teams.
                Remote-first, open to Dubai / international.
              </p>
              <div className="flex flex-shrink-0 flex-wrap gap-2">
                {['Full-Stack', 'Platform', 'Golang', 'Next.js'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-2.5 py-1 font-mono text-[10px]"
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
      </div>
    </section>
  )
}
