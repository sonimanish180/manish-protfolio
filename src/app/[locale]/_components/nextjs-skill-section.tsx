'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { LayerReveal } from '@/components/composite/layer-reveal'
import { TiltCard3D } from '@/components/ui/tilt-card-3d'
import {
  ArrowRightIcon,
  ZapIcon,
  LayersIcon,
  CodeIcon,
  SparklesIcon,
  BotIcon,
  PaletteIcon,
  GithubIcon,
} from '@/icons'

/* ── Stack chips ── */
const STACK = ['Next.js 15', 'React 19', 'TypeScript', 'TanStack Query 5', 'Zustand 5', 'shadcn/ui']

/* ── Stats ── */
const STATS = [
  { value: '18', label: 'Design Systems' },
  { value: '3', label: 'Skill Modes' },
  { value: '17', label: 'Reference Files' },
  { value: '839K+', label: 'Possible Configurations' },
]

/* ── Feature chips ── */
const FEATURES = [
  { icon: ZapIcon, label: 'Bootstrap in one shot' },
  { icon: LayersIcon, label: 'Living spec, zero drift' },
  { icon: CodeIcon, label: 'DX tooling always included' },
  { icon: PaletteIcon, label: '18 design systems' },
  { icon: SparklesIcon, label: 'Test scaffolding built-in' },
  { icon: BotIcon, label: 'Claude-powered engineering' },
]

export function NextjsSkillSection() {
  return (
    <section id="nextjs-skill" className="py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        {/* ── Header ── */}
        <LayerReveal>
          <div className="mb-14 flex flex-wrap items-center gap-4">
            <span className="section-label">Claude Skill</span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-semibold"
              style={{
                background: 'rgba(139,92,246,0.08)',
                border: '1px solid rgba(139,92,246,0.2)',
                color: 'hsl(271,70%,68%)',
              }}
            >
              <BotIcon className="h-3 w-3" />
              v1.2.0 · Next.js 15.3
            </span>
          </div>
        </LayerReveal>

        {/* ── Main card ── */}
        <LayerReveal delay={60}>
          <TiltCard3D intensity={5} glare shadow className="w-full rounded-2xl">
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                background: 'hsl(var(--surface))',
                border: '1px solid rgba(139,92,246,0.18)',
              }}
            >
              {/* Top accent bar — purple → teal gradient */}
              <div
                className="h-1 w-full"
                style={{
                  background: 'linear-gradient(90deg, hsl(271,70%,68%), hsl(174,100%,50%))',
                }}
              />

              <div className="grid gap-10 p-8 lg:grid-cols-[1fr_auto] lg:items-start">
                {/* ── Left: title + description ── */}
                <div>
                  {/* Badges row */}
                  <div className="mb-5 flex flex-wrap items-center gap-2.5">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest"
                      style={{
                        background: 'rgba(139,92,246,0.08)',
                        border: '1px solid rgba(139,92,246,0.2)',
                        color: 'hsl(271,70%,68%)',
                      }}
                    >
                      <BotIcon className="h-3 w-3" />
                      Claude Skill
                    </span>
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest"
                      style={{
                        background: 'rgba(0,255,218,0.07)',
                        border: '1px solid rgba(0,255,218,0.15)',
                        color: 'hsl(var(--primary))',
                      }}
                    >
                      Next.js 15 · React 19
                    </span>
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest"
                      style={{
                        background: 'rgba(0,255,218,0.07)',
                        border: '1px solid rgba(0,255,218,0.12)',
                        color: 'hsl(174,80%,62%)',
                      }}
                    >
                      Used on this portfolio
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    className="mb-4 text-3xl font-black leading-tight md:text-4xl"
                    style={{ color: 'hsl(var(--text-heading))' }}
                  >
                    Next.js Skill —{' '}
                    <span
                      style={{
                        background: 'linear-gradient(135deg, hsl(271,70%,68%), hsl(174,100%,50%))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      apps that don&apos;t rot.
                    </span>
                  </h2>

                  {/* Description */}
                  <p
                    className="mb-7 max-w-2xl text-base leading-relaxed"
                    style={{ color: 'hsl(var(--text-body))' }}
                  >
                    A Claude AI skill that turns me into a senior Next.js engineer with strong
                    opinions. It enforces architectural consistency from day one — preventing the
                    drift, duplication, and rot that accumulates when AI-generated code has no
                    memory of your conventions. Point it at a brief and it ships a production-grade
                    scaffold. Add it to an existing project and it extends without breaking
                    what&apos;s already there.
                  </p>

                  {/* Features */}
                  <div className="mb-8 flex flex-wrap gap-2">
                    {FEATURES.map(({ icon: Icon, label }) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium"
                        style={{
                          background: 'hsl(var(--surface-2))',
                          border: '1px solid rgba(0,255,218,0.08)',
                          color: 'hsl(var(--text-body))',
                        }}
                      >
                        <Icon className="h-3.5 w-3.5" style={{ color: 'hsl(var(--primary))' }} />
                        {label}
                      </span>
                    ))}
                  </div>

                  {/* Stack chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {STACK.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full px-3 py-1 font-mono text-xs"
                        style={{
                          background: 'hsl(var(--surface-2))',
                          border: '1px solid rgba(139,92,246,0.12)',
                          color: 'hsl(var(--text-muted))',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── Right: stats + CTA ── */}
                <div className="flex flex-col items-start gap-6 lg:items-end">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    {STATS.map(({ value, label }) => (
                      <div
                        key={label}
                        className="rounded-xl p-4 text-center"
                        style={{
                          background: 'hsl(var(--surface-2))',
                          border: '1px solid rgba(139,92,246,0.1)',
                        }}
                      >
                        <div
                          className="mb-0.5 font-mono text-xl font-black"
                          style={{
                            background:
                              'linear-gradient(135deg, hsl(271,70%,68%), hsl(174,100%,50%))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}
                        >
                          {value}
                        </div>
                        <div
                          className="font-mono text-[10px] leading-tight"
                          style={{ color: 'hsl(var(--text-dim))' }}
                        >
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3">
                    <Link href="/nextjs-skill">
                      <motion.div
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white"
                        style={{
                          background: 'linear-gradient(135deg, hsl(271,70%,62%), hsl(271,70%,50%))',
                          boxShadow: '0 0 24px rgba(139,92,246,0.25)',
                        }}
                      >
                        Explore the Skill
                        <ArrowRightIcon className="h-4 w-4" />
                      </motion.div>
                    </Link>
                    <a
                      href="https://github.com/sonimanish180/nextjs-skill"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <motion.div
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
                        style={{
                          background: 'hsl(var(--surface-2))',
                          border: '1px solid rgba(139,92,246,0.2)',
                          color: 'hsl(var(--text-body))',
                        }}
                      >
                        <GithubIcon className="h-4 w-4" />
                        GitHub
                      </motion.div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard3D>
        </LayerReveal>
      </div>
    </section>
  )
}
