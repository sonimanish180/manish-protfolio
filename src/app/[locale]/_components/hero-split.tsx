'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { personalInfo, stats } from '@/lib/data'
import { ArrowRightIcon, MapPinIcon } from '@/icons'
import { MagneticButton } from '@/components/composite/magnetic-button'

const ParticleField = dynamic(
  () => import('@/components/ui/particle-field').then((m) => ({ default: m.ParticleField })),
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

export function HeroSplit() {
  const t = useTranslations('hero')
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,255,218,0.07), transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(245,166,35,0.05), transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16 lg:px-16">
        {/* LEFT: text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mb-8 flex flex-wrap items-center gap-3"
          >
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-widest"
              style={{
                background: 'rgba(52,211,153,0.08)',
                border: '1px solid rgba(52,211,153,0.22)',
                color: 'hsl(152,60%,65%)',
              }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
              Available for opportunities
            </span>
            <span
              className="hidden items-center gap-1.5 font-mono text-xs sm:flex"
              style={{ color: 'hsl(var(--text-muted))' }}
            >
              <MapPinIcon className="h-3 w-3" style={{ color: 'hsl(var(--primary))' }} />
              India · Remote
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1, ease }}
            className="mb-4 font-mono text-xs uppercase tracking-[0.28em]"
            style={{ color: 'hsl(var(--accent))' }}
          >
            {t('greeting')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="mb-6 font-black leading-[0.88] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(52px, 8vw, 112px)' }}
          >
            <span className="gradient-text block">{personalInfo.name.split(' ')[0]}</span>
            <span
              className="block"
              style={{
                color: 'hsl(var(--text-heading))',
                WebkitTextStroke: '1px rgba(0,255,218,0.2)',
              }}
            >
              {personalInfo.name.split(' ')[1]}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3, ease }}
            className="mb-4 h-7 font-mono text-base"
            style={{ color: 'hsl(var(--primary))' }}
          >
            <TypewriterRole roles={personalInfo.roles} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.38, ease }}
            className="mb-8 max-w-sm text-sm leading-relaxed"
            style={{ color: 'hsl(var(--text-body))' }}
          >
            {personalInfo.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.46, ease }}
            className="mb-10 flex flex-wrap gap-3"
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

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.56, ease }}
            className="grid grid-cols-2 gap-4 pt-8 sm:grid-cols-4"
            style={{ borderTop: '1px solid rgba(0,255,218,0.08)' }}
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-0.5">
                <span className="gradient-text font-mono text-2xl font-black leading-none">
                  {s.value}
                </span>
                <span
                  className="font-mono text-[9px] uppercase tracking-widest"
                  style={{ color: 'hsl(var(--text-dim))' }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: 3D visual panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="relative hidden lg:block"
        >
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{
              height: '520px',
              background: 'hsl(var(--surface))',
              border: '1px solid rgba(0,255,218,0.12)',
              boxShadow: '0 0 80px rgba(0,255,218,0.06), 0 32px 80px rgba(0,0,0,0.4)',
            }}
          >
            <ParticleField />

            {/* Corner badge */}
            <div
              className="pointer-events-none absolute bottom-5 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-widest"
              style={{ color: 'rgba(0,255,218,0.25)' }}
            >
              particle · field
            </div>
          </div>

          {/* Floating info chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="absolute -left-6 top-12 rounded-xl px-3 py-2 font-mono text-xs"
            style={{
              background: 'hsl(var(--surface))',
              border: '1px solid rgba(0,255,218,0.18)',
              color: 'hsl(var(--primary))',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}
          >
            ⚡ Next.js 15
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            className="absolute -right-4 bottom-20 rounded-xl px-3 py-2 font-mono text-xs"
            style={{
              background: 'hsl(var(--surface))',
              border: '1px solid rgba(245,166,35,0.25)',
              color: 'hsl(38,92%,60%)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}
          >
            🔥 Golang
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
