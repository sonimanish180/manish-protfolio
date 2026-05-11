'use client'

// hero-glass.tsx — Glassmorphism hero.
// Central frosted-glass card holds all content: name, typewriter role,
// tagline, and CTAs. Colorful background blobs create a dreamy backdrop.

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { personalInfo, stats } from '@/lib/data'
import { ArrowRightIcon, ChevronDownIcon } from '@/icons'
import { MagneticButton } from '@/components/composite/magnetic-button'

const ease = [0.16, 1, 0.3, 1]

// ── Inline typewriter (mirrors hero-section.tsx exactly) ──────────────────
function TypewriterRole({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [paused, setPaused] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  useEffect(() => {
    if (!mounted) return
    const current = roles[index] ?? ''
    if (paused) {
      const id = setTimeout(() => {
        setPaused(false)
        setDeleting(true)
      }, 2400)
      return () => clearTimeout(id)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % roles.length)
      return
    }
    if (!deleting && text === current) {
      setPaused(true)
      return
    }
    const id = setTimeout(
      () =>
        setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1)),
      deleting ? 34 : 78,
    )
    return () => clearTimeout(id)
  }, [text, deleting, paused, index, roles, mounted])
  return (
    <span>
      {mounted ? text : roles[0]}
      <span
        className="ml-0.5 inline-block h-[1em] w-0.5 animate-cursor-blink rounded-full align-middle"
        style={{ background: 'hsl(var(--primary))' }}
      />
    </span>
  )
}

// ── Background blob component ─────────────────────────────────────────────
function Blob({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="pointer-events-none absolute rounded-full"
      aria-hidden
      style={{ filter: 'blur(80px)', opacity: 0.55, ...style }}
    />
  )
}

export function HeroGlass() {
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
      {/* ── Colorful background blobs ── */}
      <Blob
        style={{
          width: 560,
          height: 560,
          top: '-10%',
          left: '-12%',
          background: 'hsl(var(--primary) / 0.28)',
        }}
      />
      <Blob
        style={{
          width: 480,
          height: 480,
          bottom: '-8%',
          right: '-10%',
          background: 'hsl(280 70% 65% / 0.22)',
        }}
      />
      <Blob
        style={{
          width: 360,
          height: 360,
          top: '30%',
          right: '15%',
          background: 'hsl(210 80% 60% / 0.18)',
        }}
      />
      <Blob
        style={{
          width: 300,
          height: 300,
          bottom: '20%',
          left: '10%',
          background: 'hsl(340 70% 65% / 0.16)',
        }}
      />

      {/* ── Subtle noise texture over blobs ── */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          backgroundSize: '180px',
        }}
      />

      {/* ── Central frosted-glass card ── */}
      <motion.div
        initial={{ scale: 0.96, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="relative z-10 mx-auto w-full max-w-2xl rounded-3xl px-10 py-12 text-center md:px-14 md:py-16"
        style={{
          background: 'hsl(var(--surface) / 0.55)',
          backdropFilter: 'blur(28px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(28px) saturate(1.6)',
          border: '1px solid hsl(var(--border) / 0.6)',
          boxShadow:
            '0 8px 60px hsl(var(--primary) / 0.08), 0 2px 8px hsl(0 0% 0% / 0.18), inset 0 1px 0 hsl(var(--surface-2) / 0.5)',
        }}
      >
        {/* Available pulse */}
        <motion.div
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease }}
          className="mb-7 flex justify-center"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest"
            style={{
              background: 'hsl(152 60% 65% / 0.1)',
              border: '1px solid hsl(152 60% 65% / 0.25)',
              color: 'hsl(152 55% 65%)',
            }}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Available for work
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.18, ease }}
          className="mb-4 font-mono text-[11px] uppercase tracking-[0.34em]"
          style={{ color: 'hsl(var(--primary))' }}
        >
          {t('greeting')}
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease }}
          className="mb-5 select-none font-black leading-[0.9] tracking-[-0.04em]"
          style={{ fontSize: 'clamp(52px, 10vw, 100px)' }}
        >
          <span className="gradient-text block">{personalInfo.name.split(' ')[0]}</span>
          <span className="block" style={{ color: 'hsl(var(--text-heading))' }}>
            {personalInfo.name.split(' ')[1]}
          </span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.3, ease }}
          className="mb-4 h-7 font-mono text-sm md:text-base"
          style={{ color: 'hsl(var(--primary))' }}
        >
          <TypewriterRole roles={personalInfo.roles} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.36, ease }}
          className="mb-9 text-sm leading-relaxed md:text-base"
          style={{ color: 'hsl(var(--text-body))' }}
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.42, ease }}
          className="mb-10 flex flex-wrap justify-center gap-3"
        >
          <MagneticButton
            onClick={() => scrollTo('projects')}
            className="gradient-btn group inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl px-7 text-sm font-bold"
          >
            View My Work
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollTo('contact')}
            className="gradient-btn-outline inline-flex h-11 cursor-pointer items-center rounded-xl px-7 text-sm font-semibold"
          >
            Get in Touch
          </MagneticButton>
        </motion.div>

        {/* Stats strip inside card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5, ease }}
          className="flex flex-wrap justify-center gap-8 pt-8"
          style={{ borderTop: '1px solid hsl(var(--border) / 0.5)' }}
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-0.5">
              <span className="gradient-text font-mono text-2xl font-black leading-none">
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
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.5 }}
        onClick={() => scrollTo('about')}
        className="group absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-1"
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
