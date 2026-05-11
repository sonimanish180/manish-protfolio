'use client'

// hero-minimal.tsx — Pure typographic hero. Massive centered name with
// subtle underline accent, static role display, minimal CTAs. Ultra clean.

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { personalInfo, stats } from '@/lib/data'
import { ArrowRightIcon, ChevronDownIcon } from '@/icons'
import { MagneticButton } from '@/components/composite/magnetic-button'

const ease = [0.16, 1, 0.3, 1]

export function HeroMinimal() {
  const t = useTranslations('hero')
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const [firstName, lastName] = personalInfo.name.split(' ')

  return (
    <motion.section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease }}
    >
      {/* ── Faint radial wash — keeps bg from being pure flat ── */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 42%, hsl(var(--primary) / 0.04) 0%, transparent 70%)',
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-8 text-center">
        {/* Greeting label */}
        <motion.p
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.55, ease }}
          className="mb-10 font-mono text-[11px] uppercase tracking-[0.38em]"
          style={{ color: 'hsl(var(--primary))' }}
        >
          {t('greeting')}
        </motion.p>

        {/* Massive name — fills viewport */}
        <h1
          className="mb-0 select-none font-black leading-[0.88] tracking-[-0.04em]"
          style={{ fontSize: 'clamp(72px, 14vw, 160px)' }}
        >
          <motion.span
            className="block"
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            style={{ color: 'hsl(var(--text-heading))' }}
          >
            {firstName}
          </motion.span>

          {/* Last name with primary-tinted underline accent */}
          <motion.span
            className="relative block"
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease }}
            style={{ color: 'hsl(var(--text-heading))' }}
          >
            {lastName}
            {/* Animated underline */}
            <motion.span
              className="absolute -bottom-3 left-0 h-[5px] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.9, delay: 0.5, ease }}
              style={{ background: 'hsl(var(--primary))' }}
              aria-hidden
            />
          </motion.span>
        </h1>

        {/* Static role — first item from roles array */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.28, ease }}
          className="mb-4 mt-10 font-mono text-sm uppercase tracking-[0.22em] md:text-base"
          style={{ color: 'hsl(var(--text-dim))' }}
        >
          {personalInfo.roles[0]}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.36, ease }}
          className="mb-12 max-w-sm text-sm leading-relaxed md:text-base"
          style={{ color: 'hsl(var(--text-body))' }}
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTAs — minimal, text-only feel */}
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.44, ease }}
          className="mb-16 flex flex-wrap justify-center gap-4"
        >
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
            Get in Touch
          </MagneticButton>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.52, ease }}
          className="flex w-full flex-wrap justify-center gap-10 pt-8 md:gap-16"
          style={{ borderTop: '1px solid hsl(var(--border))' }}
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span
                className="font-mono text-3xl font-black leading-none"
                style={{ color: 'hsl(var(--text-heading))' }}
              >
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
      </div>

      {/* ── Scroll cue ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        onClick={() => scrollTo('about')}
        className="group absolute bottom-8 left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-1"
        aria-label="Scroll to about"
      >
        <span
          className="font-mono text-[9px] uppercase tracking-[0.3em]"
          style={{ color: 'hsl(var(--text-dim))' }}
        >
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDownIcon className="h-4 w-4" style={{ color: 'hsl(var(--primary) / 0.5)' }} />
        </motion.div>
      </motion.button>
    </motion.section>
  )
}
