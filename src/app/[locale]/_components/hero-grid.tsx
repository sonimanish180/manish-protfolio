'use client'

// hero-grid.tsx — Bento-style grid hero.
// Left col: name + bio + CTAs.
// Right col: stat bento cards + role pills.
// Background: subtle dot-grid via radial-gradient.

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { personalInfo, stats } from '@/lib/data'
import { ArrowRightIcon, MapPinIcon } from '@/icons'
import { MagneticButton } from '@/components/composite/magnetic-button'

const ease = [0.16, 1, 0.3, 1]

/** Stagger children by index — visible immediately, slides up from y offset */
const fadeUp = (delay = 0) => ({
  initial: { y: 24 },
  animate: { y: 0 },
  transition: { duration: 0.55, delay, ease },
})

export function HeroGrid() {
  const t = useTranslations('hero')
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <motion.section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease }}
    >
      {/* ── Dot-grid background ── */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.45,
        }}
      />

      {/* ── Vignette overlay to fade dots at edges ── */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 72% 72% at 50% 50%, transparent 30%, hsl(var(--surface)) 85%)',
        }}
      />

      {/* ── Primary glow — top-left ── */}
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full"
        aria-hidden
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.07) 0%, transparent 65%)',
          filter: 'blur(48px)',
        }}
      />

      {/* ── Main CSS grid layout ── */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-8 py-20 md:grid-cols-2 md:items-center md:gap-14">
        {/* ══ LEFT COLUMN ══ */}
        <div className="flex flex-col">
          {/* Greeting */}
          <motion.p
            {...fadeUp(0)}
            className="mb-5 font-mono text-[11px] uppercase tracking-[0.34em]"
            style={{ color: 'hsl(var(--primary))' }}
          >
            {t('greeting')}
          </motion.p>

          {/* Name */}
          <motion.h1
            {...fadeUp(0.1)}
            className="mb-6 select-none font-black leading-[0.9] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(52px, 9vw, 108px)', color: 'hsl(var(--text-heading))' }}
          >
            {personalInfo.name.split(' ').map((part, i) => (
              <span key={part} className={i === 0 ? 'gradient-text block' : 'block'}>
                {part}
              </span>
            ))}
          </motion.h1>

          {/* Title / subtitle */}
          <motion.p
            {...fadeUp(0.22)}
            className="mb-3 text-sm font-semibold uppercase tracking-widest"
            style={{ color: 'hsl(var(--text-dim))' }}
          >
            {personalInfo.title}
          </motion.p>

          {/* Tagline */}
          <motion.p
            {...fadeUp(0.32)}
            className="mb-8 max-w-sm text-sm leading-relaxed md:text-base"
            style={{ color: 'hsl(var(--text-body))' }}
          >
            {personalInfo.tagline}
          </motion.p>

          {/* Location badge */}
          <motion.span
            {...fadeUp(0.4)}
            className="mb-8 inline-flex w-fit items-center gap-1.5 font-mono text-xs"
            style={{ color: 'hsl(var(--text-dim))' }}
          >
            <MapPinIcon className="h-3.5 w-3.5" style={{ color: 'hsl(var(--primary))' }} />
            India · Remote
          </motion.span>

          {/* CTAs */}
          <motion.div {...fadeUp(0.48)} className="flex flex-wrap gap-3">
            <MagneticButton
              onClick={() => scrollTo('projects')}
              className="gradient-btn group inline-flex h-11 cursor-pointer items-center gap-2 rounded-lg px-7 text-sm font-bold"
            >
              View My Work
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollTo('contact')}
              className="gradient-btn-outline inline-flex h-11 cursor-pointer items-center rounded-lg px-7 text-sm font-semibold"
            >
              Contact Me
            </MagneticButton>
          </motion.div>
        </div>

        {/* ══ RIGHT COLUMN ══ */}
        <div className="flex flex-col gap-4">
          {/* Role pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.18, ease }}
            className="flex flex-wrap gap-2"
          >
            {personalInfo.roles.map((role, i) => (
              <span
                key={role}
                className="rounded-full px-4 py-1.5 font-mono text-[11px] font-medium tracking-wide"
                style={{
                  background: i === 0 ? 'hsl(var(--primary) / 0.12)' : 'hsl(var(--surface-2))',
                  border: `1px solid ${i === 0 ? 'hsl(var(--primary) / 0.3)' : 'hsl(var(--border))'}`,
                  color: i === 0 ? 'hsl(var(--primary))' : 'hsl(var(--text-dim))',
                }}
              >
                {role}
              </span>
            ))}
          </motion.div>

          {/* Stats bento grid */}
          <motion.div
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.55, delay: 0.26, ease }}
            className="grid grid-cols-2 gap-3"
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="flex flex-col justify-between rounded-2xl p-5"
                style={{
                  background: 'hsl(var(--surface-2))',
                  border: '1px solid hsl(var(--border))',
                  // First card gets a subtle primary tint
                  ...(i === 0 && {
                    background: 'hsl(var(--primary) / 0.06)',
                    border: '1px solid hsl(var(--primary) / 0.2)',
                  }),
                }}
              >
                <span className="gradient-text mb-1 font-mono text-3xl font-black leading-none">
                  {s.value}
                </span>
                <span
                  className="font-mono text-[10px] uppercase tracking-widest"
                  style={{ color: 'hsl(var(--text-dim))' }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Email teaser */}
          <motion.a
            href={`mailto:${personalInfo.email}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.34, ease }}
            className="rounded-2xl px-5 py-4 font-mono text-xs transition-colors duration-200 hover:border-primary/40"
            style={{
              background: 'hsl(var(--surface-2))',
              border: '1px solid hsl(var(--border))',
              color: 'hsl(var(--text-dim))',
            }}
          >
            <span style={{ color: 'hsl(var(--primary))' }}>→</span> {personalInfo.email}
          </motion.a>
        </div>
      </div>
    </motion.section>
  )
}
