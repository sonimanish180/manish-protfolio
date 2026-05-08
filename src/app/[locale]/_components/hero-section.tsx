'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { personalInfo, stats } from '@/lib/data'
import { ArrowRightIcon, MapPinIcon, ChevronDownIcon } from '@/icons'
import { MagneticButton } from '@/components/composite/magnetic-button'

const NeuralNet3D = dynamic(
  () => import('@/components/ui/neural-net-3d').then((m) => ({ default: m.NeuralNet3D })),
  { ssr: false },
)
const PerspectiveGrid = dynamic(
  () => import('@/components/ui/perspective-grid').then((m) => ({ default: m.PerspectiveGrid })),
  { ssr: false },
)

const ease = [0.16, 1, 0.3, 1]

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

export function HeroSection() {
  const t = useTranslations('hero')
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Full-bleed NeuralNet3D backdrop ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <NeuralNet3D nodeCount={42} connectionDensity={0.14} speed={0.65} />
      </div>

      {/* ── Perspective grid — bottom half ── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%]" aria-hidden>
        <PerspectiveGrid speed={0.3} cols={14} rows={16} className="h-full w-full opacity-[0.14]" />
      </div>

      {/* ── Cinematic vignette: dark edges, transparent centre ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 48%, transparent 30%, hsl(217,50%,4%) 88%)',
        }}
        aria-hidden
      />

      {/* ── Corner glow accents ── */}
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-[560px] w-[560px]"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,218,0.06) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-[480px] w-[480px]"
        style={{
          background: 'radial-gradient(circle, rgba(245,166,35,0.05) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
        aria-hidden
      />

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-8 text-center">
        {/* Available badge + location */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-8 flex flex-wrap items-center justify-center gap-3"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-widest"
            style={{
              background: 'rgba(52,211,153,0.08)',
              border: '1px solid rgba(52,211,153,0.22)',
              color: 'hsl(152,60%,65%)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            Available for opportunities
          </span>
          <span
            className="hidden items-center gap-1.5 font-mono text-xs sm:inline-flex"
            style={{ color: 'hsl(var(--text-muted))' }}
          >
            <MapPinIcon className="h-3 w-3" style={{ color: 'hsl(var(--primary))' }} />
            India · Remote
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.12, ease }}
          className="mb-5 font-mono text-xs uppercase tracking-[0.32em]"
          style={{ color: 'hsl(var(--accent))' }}
        >
          {t('greeting')}
        </motion.p>

        {/* Name — fills the viewport width */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.18, ease }}
          className="mb-7 select-none font-black leading-[0.86] tracking-[-0.03em]"
          style={{ fontSize: 'clamp(64px, 13vw, 148px)' }}
        >
          <span className="gradient-text block">{personalInfo.name.split(' ')[0]}</span>
          <span
            className="block"
            style={{
              color: 'hsl(var(--text-heading))',
              WebkitTextStroke: '1px rgba(0,255,218,0.25)',
            }}
          >
            {personalInfo.name.split(' ')[1]}
          </span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35, ease }}
          className="mb-5 h-8 font-mono text-base md:text-xl"
          style={{ color: 'hsl(var(--primary))' }}
        >
          <TypewriterRole roles={personalInfo.roles} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45, ease }}
          className="mb-10 max-w-md text-sm leading-relaxed md:text-base"
          style={{ color: 'hsl(var(--text-body))' }}
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55, ease }}
          className="mb-14 flex flex-wrap justify-center gap-3"
        >
          <MagneticButton
            onClick={() => scrollTo('projects')}
            className="gradient-btn group inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl px-8 text-sm font-bold"
          >
            View My Work
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollTo('contact')}
            className="gradient-btn-outline inline-flex h-12 cursor-pointer items-center justify-center rounded-xl px-8 text-sm font-semibold"
          >
            Get in Touch
          </MagneticButton>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.68, ease }}
          className="flex w-full flex-wrap justify-center gap-8 pt-8 md:gap-14"
          style={{ borderTop: '1px solid rgba(0,255,218,0.08)' }}
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-0.5">
              <span className="gradient-text font-mono text-3xl font-black leading-none md:text-4xl">
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
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={() => scrollTo('about')}
        className="group absolute bottom-8 left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-1.5"
        aria-label="Scroll to about"
      >
        <span
          className="font-mono text-[9px] uppercase tracking-[0.32em] transition-opacity group-hover:opacity-80"
          style={{ color: 'hsl(var(--text-dim))' }}
        >
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDownIcon
            className="h-4 w-4 transition-opacity group-hover:opacity-80"
            style={{ color: 'rgba(0,255,218,0.45)' }}
          />
        </motion.div>
      </motion.button>
    </section>
  )
}
