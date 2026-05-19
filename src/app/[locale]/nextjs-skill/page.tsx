'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ScrollProgress } from '@/components/composite/scroll-progress'
import { CursorGlow } from '@/components/composite/cursor-glow'
import { StyleApplier } from '@/components/composite/style-applier'
import { LayerReveal } from '@/components/composite/layer-reveal'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ZapIcon,
  LayersIcon,
  CodeIcon,
  SparklesIcon,
  BotIcon,
  ShieldIcon,
  WrenchIcon,
  RefreshIcon,
  FileCodeIcon,
  PackageIcon,
  GitBranchIcon,
  CheckCircleIcon,
  TerminalIcon,
  Globe2Icon,
  FlaskIcon,
  CpuIcon,
  GithubIcon,
  CopyIcon,
  CheckIcon,
} from '@/icons'

const GITHUB_URL = 'https://github.com/sonimanish180/nextjs-skill'

/* ─────────────────────────────────────────────────────────
   Copy button (for code snippets)
───────────────────────────────────────────────────────── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <motion.button
      onClick={handleCopy}
      whileTap={{ scale: 0.9 }}
      className="flex-shrink-0 rounded-lg p-1.5 transition-colors"
      style={{
        color: copied ? 'hsl(var(--primary))' : 'hsl(var(--text-dim))',
        background: copied ? 'rgba(0,255,218,0.08)' : 'transparent',
      }}
      aria-label="Copy to clipboard"
    >
      {copied ? <CheckIcon className="h-3.5 w-3.5" /> : <CopyIcon className="h-3.5 w-3.5" />}
    </motion.button>
  )
}

/* ─────────────────────────────────────────────────────────
   Code snippet row
───────────────────────────────────────────────────────── */
function CodeSnippet({ code, comment }: { code: string; comment?: string }) {
  return (
    <div
      className="flex items-center justify-between gap-3 rounded-xl px-4 py-3"
      style={{
        background: 'hsl(var(--surface-2))',
        border: '1px solid rgba(0,255,218,0.08)',
      }}
    >
      <div className="min-w-0 flex-1">
        {comment && (
          <div className="mb-0.5 font-mono text-[10px]" style={{ color: 'hsl(var(--text-dim))' }}>
            # {comment}
          </div>
        )}
        <code className="block truncate font-mono text-xs" style={{ color: 'hsl(var(--primary))' }}>
          {code}
        </code>
      </div>
      <CopyButton text={code} />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Section wrapper
───────────────────────────────────────────────────────── */
function Section({
  id,
  label,
  title,
  subtitle,
  children,
}: {
  id: string
  label?: string
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <LayerReveal>
      <section id={id} className="border-t py-16" style={{ borderColor: 'rgba(139,92,246,0.1)' }}>
        <div className="mb-10">
          {label && (
            <span
              className="mb-3 inline-block font-mono text-[10px] uppercase tracking-widest"
              style={{ color: 'hsl(271,70%,68%)' }}
            >
              {label}
            </span>
          )}
          <h2 className="mb-2 text-2xl font-black" style={{ color: 'hsl(var(--text-heading))' }}>
            {title}
          </h2>
          {subtitle && (
            <p
              className="max-w-2xl text-sm leading-relaxed"
              style={{ color: 'hsl(var(--text-body))' }}
            >
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </section>
    </LayerReveal>
  )
}

/* ─────────────────────────────────────────────────────────
   Advantage card
───────────────────────────────────────────────────────── */
function AdvantageCard({
  icon: Icon,
  title,
  description,
  accent,
  delay,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  title: string
  description: string
  accent: string
  delay?: number
}) {
  return (
    <LayerReveal delay={delay ?? 0}>
      <motion.div
        whileHover={{ scale: 1.02, y: -3 }}
        transition={{ type: 'spring', stiffness: 380, damping: 24 }}
        className="rounded-2xl p-6"
        style={{
          background: 'hsl(var(--surface))',
          border: '1px solid var(--card-border)',
        }}
      >
        <div
          className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: `${accent}14`, border: `1px solid ${accent}30` }}
        >
          <Icon className="h-5 w-5" style={{ color: accent }} />
        </div>
        <h3 className="mb-2 text-base font-bold" style={{ color: 'hsl(var(--text-heading))' }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--text-body))' }}>
          {description}
        </p>
      </motion.div>
    </LayerReveal>
  )
}

/* ─────────────────────────────────────────────────────────
   Mode card
───────────────────────────────────────────────────────── */
function ModeCard({
  icon: Icon,
  name,
  trigger,
  description,
  bullets,
  accent,
  delay,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  name: string
  trigger: string
  description: string
  bullets: string[]
  accent: string
  delay?: number
}) {
  return (
    <LayerReveal delay={delay ?? 0}>
      <motion.div
        whileHover={{ scale: 1.015, y: -3 }}
        transition={{ type: 'spring', stiffness: 360, damping: 26 }}
        className="flex h-full flex-col rounded-2xl p-7"
        style={{
          background: 'hsl(var(--surface))',
          border: `1px solid ${accent}22`,
        }}
      >
        {/* Icon + name */}
        <div className="mb-5 flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: `${accent}14`, border: `1px solid ${accent}30` }}
          >
            <Icon className="h-5 w-5" style={{ color: accent }} />
          </div>
          <div>
            <div className="text-base font-black" style={{ color: 'hsl(var(--text-heading))' }}>
              {name}
            </div>
            <div className="font-mono text-[10px]" style={{ color: accent }}>
              {trigger}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="mb-5 text-sm leading-relaxed" style={{ color: 'hsl(var(--text-body))' }}>
          {description}
        </p>

        {/* Bullets */}
        <ul className="mt-auto space-y-2">
          {bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2 text-sm"
              style={{ color: 'hsl(var(--text-muted))' }}
            >
              <CheckCircleIcon
                className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                style={{ color: accent }}
              />
              {b}
            </li>
          ))}
        </ul>
      </motion.div>
    </LayerReveal>
  )
}

/* ─────────────────────────────────────────────────────────
   Theme swatch
───────────────────────────────────────────────────────── */
function ThemeSwatch({
  name,
  desc,
  a,
  b,
  bg,
}: {
  name: string
  desc: string
  a: string
  b: string
  bg: string
}) {
  return (
    <motion.div
      className="rounded-xl p-4"
      style={{ background: 'hsl(var(--surface))', border: '1px solid var(--card-border)' }}
      whileHover={{ scale: 1.03, y: -2 }}
      transition={{ type: 'spring', stiffness: 380, damping: 24 }}
    >
      <div className="mb-2 flex items-center gap-2.5">
        <div
          className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10"
          style={{ background: bg }}
        >
          <div className="h-2.5 w-2.5 rounded-full" style={{ background: a }} />
        </div>
        <span className="text-xs font-semibold" style={{ color: 'hsl(var(--text-heading))' }}>
          {name}
        </span>
      </div>
      <p className="text-[10px] leading-relaxed" style={{ color: 'hsl(var(--text-dim))' }}>
        {desc}
      </p>
      <div className="mt-2.5 flex gap-1">
        <div className="h-1.5 flex-1 rounded-full" style={{ background: a }} />
        <div className="h-1.5 flex-1 rounded-full" style={{ background: b }} />
        <div
          className="h-1.5 flex-1 rounded-full"
          style={{ background: bg, border: '1px solid rgba(255,255,255,0.12)' }}
        />
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────
   Stack row
───────────────────────────────────────────────────────── */
function StackRow({ layer, choice, note }: { layer: string; choice: string; note?: string }) {
  return (
    <div
      className="grid grid-cols-[120px_1fr] items-start gap-4 border-b py-3.5 sm:grid-cols-[160px_1fr_1fr]"
      style={{ borderColor: 'rgba(139,92,246,0.1)' }}
    >
      <span className="font-mono text-xs" style={{ color: 'hsl(var(--text-muted))' }}>
        {layer}
      </span>
      <span className="text-sm font-semibold" style={{ color: 'hsl(var(--text-heading))' }}>
        {choice}
      </span>
      {note && (
        <span className="hidden text-xs sm:block" style={{ color: 'hsl(var(--text-dim))' }}>
          {note}
        </span>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────── */
export default function NextjsSkillPage() {
  return (
    <>
      <div className="veil-bg-fixed" aria-hidden="true" />
      <ScrollProgress />
      <CursorGlow />
      <StyleApplier />

      <div className="mx-auto max-w-5xl px-6 pb-40">
        {/* ── Back link ── */}
        <div className="pb-2 pt-20">
          <LayerReveal>
            <Link
              href="/"
              className="mb-10 inline-flex items-center gap-1.5 font-mono text-xs transition-opacity hover:opacity-70"
              style={{ color: 'hsl(var(--text-muted))' }}
            >
              <ArrowLeftIcon className="h-3 w-3" />
              Back to portfolio
            </Link>
          </LayerReveal>

          {/* ── Hero ── */}
          <LayerReveal delay={30}>
            <div className="flex flex-wrap items-center gap-2 pb-5 pt-6">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-semibold"
                style={{
                  background: 'rgba(139,92,246,0.08)',
                  border: '1px solid rgba(139,92,246,0.22)',
                  color: 'hsl(271,70%,68%)',
                }}
              >
                <BotIcon className="h-3.5 w-3.5" />
                Claude AI Skill
              </span>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-semibold"
                style={{
                  background: 'rgba(0,255,218,0.07)',
                  border: '1px solid rgba(0,255,218,0.16)',
                  color: 'hsl(var(--primary))',
                }}
              >
                v1.2.0 · Next.js 15.3 · May 2026
              </span>
            </div>
          </LayerReveal>

          <LayerReveal delay={55}>
            <h1 className="mb-5 text-5xl font-black leading-[1.05] md:text-6xl">
              <span style={{ color: 'hsl(var(--text-heading))' }}>Next.js apps</span>
              <br />
              <span
                style={{
                  background:
                    'linear-gradient(135deg, hsl(271,70%,68%) 0%, hsl(174,100%,50%) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                that don&apos;t rot.
              </span>
            </h1>
          </LayerReveal>

          <LayerReveal delay={75}>
            <p
              className="mb-6 max-w-2xl text-lg leading-relaxed"
              style={{ color: 'hsl(var(--text-body))' }}
            >
              A Claude AI skill that turns Claude into a senior Next.js engineer with strong
              opinions. It enforces architectural consistency from day one — preventing drift,
              duplication, and rot that accumulates when AI-generated code has no memory of your
              conventions.
            </p>
            <div className="mb-8 flex flex-wrap gap-3">
              <a href="#get-started">
                <motion.div
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold text-white"
                  style={{
                    background: 'linear-gradient(135deg, hsl(271,70%,62%), hsl(271,70%,50%))',
                    boxShadow: '0 0 20px rgba(139,92,246,0.25)',
                  }}
                >
                  <ZapIcon className="h-4 w-4" />
                  Get Started
                </motion.div>
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <motion.div
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold"
                  style={{
                    background: 'hsl(var(--surface))',
                    border: '1px solid rgba(139,92,246,0.22)',
                    color: 'hsl(var(--text-heading))',
                  }}
                >
                  <GithubIcon className="h-4 w-4" />
                  sonimanish180/nextjs-skill
                </motion.div>
              </a>
            </div>
          </LayerReveal>

          {/* ── Stats strip ── */}
          <LayerReveal delay={90}>
            <div className="mb-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { value: '18', label: 'Design Systems' },
                { value: '3', label: 'Skill Modes' },
                { value: '17', label: 'Reference Files' },
                { value: '839K+', label: 'Configurations' },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-2xl p-5 text-center"
                  style={{
                    background: 'hsl(var(--surface))',
                    border: '1px solid rgba(139,92,246,0.14)',
                  }}
                >
                  <div
                    className="mb-1 font-mono text-2xl font-black"
                    style={{
                      background: 'linear-gradient(135deg, hsl(271,70%,68%), hsl(174,100%,50%))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {value}
                  </div>
                  <div className="font-mono text-[11px]" style={{ color: 'hsl(var(--text-dim))' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </LayerReveal>
        </div>

        {/* ─────────────────────────────────────────────────────────
            GET STARTED
        ───────────────────────────────────────────────────────── */}
        <Section
          id="get-started"
          label="Installation"
          title="Three ways to use the skill."
          subtitle="Pick whichever fits your workflow. All three end up with the same intelligence available in your Claude session."
        >
          <div className="grid gap-5 lg:grid-cols-3">
            {/* ── Option 1: Claude Code CLI ── */}
            <LayerReveal delay={0}>
              <div
                className="flex h-full flex-col rounded-2xl p-6"
                style={{
                  background: 'hsl(var(--surface))',
                  border: '1px solid rgba(0,255,218,0.14)',
                }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{
                      background: 'rgba(0,255,218,0.1)',
                      border: '1px solid rgba(0,255,218,0.2)',
                    }}
                  >
                    <TerminalIcon className="h-4 w-4" style={{ color: 'hsl(var(--primary))' }} />
                  </div>
                  <div>
                    <div
                      className="text-sm font-bold"
                      style={{ color: 'hsl(var(--text-heading))' }}
                    >
                      Claude Code
                    </div>
                    <div
                      className="font-mono text-[10px]"
                      style={{ color: 'hsl(var(--text-dim))' }}
                    >
                      CLI · Recommended
                    </div>
                  </div>
                </div>

                <p
                  className="mb-5 text-sm leading-relaxed"
                  style={{ color: 'hsl(var(--text-body))' }}
                >
                  Clone into your Claude skills directory. The skill becomes a slash command
                  available in any project.
                </p>

                <div className="mb-3 space-y-2">
                  <CodeSnippet
                    comment="clone into skills directory"
                    code="git clone https://github.com/sonimanish180/nextjs-skill ~/.claude/skills/nextjs-skill"
                  />
                  <CodeSnippet
                    comment="use in any project"
                    code="/nextjs-skill build me a SaaS dashboard"
                  />
                </div>

                <div className="mt-auto space-y-1.5 pt-2">
                  {[
                    'Works in any terminal session',
                    'Slash command auto-complete',
                    'Reads your project files directly',
                  ].map((b) => (
                    <div
                      key={b}
                      className="flex items-center gap-2 text-xs"
                      style={{ color: 'hsl(var(--text-muted))' }}
                    >
                      <CheckCircleIcon
                        className="h-3.5 w-3.5 flex-shrink-0"
                        style={{ color: 'hsl(var(--primary))' }}
                      />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </LayerReveal>

            {/* ── Option 2: Cowork Desktop ── */}
            <LayerReveal delay={60}>
              <div
                className="flex h-full flex-col rounded-2xl p-6"
                style={{
                  background: 'hsl(var(--surface))',
                  border: '1px solid rgba(139,92,246,0.18)',
                }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{
                      background: 'rgba(139,92,246,0.1)',
                      border: '1px solid rgba(139,92,246,0.25)',
                    }}
                  >
                    <LayersIcon className="h-4 w-4" style={{ color: 'hsl(271,70%,68%)' }} />
                  </div>
                  <div>
                    <div
                      className="text-sm font-bold"
                      style={{ color: 'hsl(var(--text-heading))' }}
                    >
                      Cowork
                    </div>
                    <div
                      className="font-mono text-[10px]"
                      style={{ color: 'hsl(var(--text-dim))' }}
                    >
                      Desktop App
                    </div>
                  </div>
                </div>

                <p
                  className="mb-5 text-sm leading-relaxed"
                  style={{ color: 'hsl(var(--text-body))' }}
                >
                  Install directly from a local folder. The skill auto-activates when you describe a
                  Next.js task.
                </p>

                <div className="mb-3 space-y-2">
                  <CodeSnippet
                    comment="step 1 — clone the repo"
                    code="git clone https://github.com/sonimanish180/nextjs-skill"
                  />
                </div>

                <ol className="mb-4 space-y-2">
                  {[
                    'Open Cowork → Plugins',
                    'Click "Install from folder"',
                    'Point to the cloned directory',
                    'Skill appears in your skill list',
                  ].map((step, i) => (
                    <li
                      key={step}
                      className="flex items-start gap-2.5 text-sm"
                      style={{ color: 'hsl(var(--text-body))' }}
                    >
                      <span
                        className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold"
                        style={{ background: 'rgba(139,92,246,0.15)', color: 'hsl(271,70%,68%)' }}
                      >
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>

                <div className="mt-auto space-y-1.5">
                  {['Auto-triggers on Next.js tasks', 'Works with mounted workspace folders'].map(
                    (b) => (
                      <div
                        key={b}
                        className="flex items-center gap-2 text-xs"
                        style={{ color: 'hsl(var(--text-muted))' }}
                      >
                        <CheckCircleIcon
                          className="h-3.5 w-3.5 flex-shrink-0"
                          style={{ color: 'hsl(271,70%,68%)' }}
                        />
                        {b}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </LayerReveal>

            {/* ── Option 3: Manual ── */}
            <LayerReveal delay={120}>
              <div
                className="flex h-full flex-col rounded-2xl p-6"
                style={{
                  background: 'hsl(var(--surface))',
                  border: '1px solid rgba(38,92,58,0.18)',
                  borderColor: 'rgba(0,200,140,0.14)',
                }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{
                      background: 'rgba(0,200,140,0.1)',
                      border: '1px solid rgba(0,200,140,0.2)',
                    }}
                  >
                    <FileCodeIcon className="h-4 w-4" style={{ color: 'hsl(160,60%,52%)' }} />
                  </div>
                  <div>
                    <div
                      className="text-sm font-bold"
                      style={{ color: 'hsl(var(--text-heading))' }}
                    >
                      Manual
                    </div>
                    <div
                      className="font-mono text-[10px]"
                      style={{ color: 'hsl(var(--text-dim))' }}
                    >
                      Any Claude interface
                    </div>
                  </div>
                </div>

                <p
                  className="mb-5 text-sm leading-relaxed"
                  style={{ color: 'hsl(var(--text-body))' }}
                >
                  Copy the contents of{' '}
                  <code className="font-mono text-xs" style={{ color: 'hsl(var(--primary))' }}>
                    SKILL.md
                  </code>{' '}
                  from the repo and paste it at the start of any Claude conversation. No install
                  required.
                </p>

                <div
                  className="mb-4 rounded-xl p-4"
                  style={{
                    background: 'hsl(var(--surface-2))',
                    border: '1px solid rgba(0,200,140,0.1)',
                  }}
                >
                  <div
                    className="mb-2 font-mono text-[10px] uppercase tracking-widest"
                    style={{ color: 'hsl(var(--text-dim))' }}
                  >
                    works in
                  </div>
                  {[
                    'claude.ai (web)',
                    'Claude desktop app',
                    'Claude API / system prompt',
                    'Any Claude-powered product',
                  ].map((place) => (
                    <div
                      key={place}
                      className="flex items-center gap-2 py-0.5 text-xs"
                      style={{ color: 'hsl(var(--text-body))' }}
                    >
                      <span style={{ color: 'hsl(160,60%,52%)' }}>✓</span> {place}
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <a
                    href={`${GITHUB_URL}/blob/main/SKILL.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs transition-opacity hover:opacity-70"
                    style={{ color: 'hsl(160,60%,52%)' }}
                  >
                    View SKILL.md on GitHub
                    <ArrowRightIcon className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </LayerReveal>
          </div>

          {/* ── GitHub CTA banner ── */}
          <LayerReveal delay={80}>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <motion.div
                whileHover={{ scale: 1.01, y: -2 }}
                transition={{ type: 'spring', stiffness: 360, damping: 26 }}
                className="mt-5 flex items-center justify-between gap-4 overflow-hidden rounded-2xl px-7 py-5"
                style={{
                  background: 'hsl(var(--surface))',
                  border: '1px solid rgba(139,92,246,0.18)',
                  cursor: 'pointer',
                }}
              >
                <div className="flex items-center gap-4">
                  <GithubIcon
                    className="h-7 w-7 flex-shrink-0"
                    style={{ color: 'hsl(var(--text-heading))' }}
                  />
                  <div>
                    <div
                      className="text-sm font-bold"
                      style={{ color: 'hsl(var(--text-heading))' }}
                    >
                      github.com/sonimanish180/nextjs-skill
                    </div>
                    <div className="font-mono text-xs" style={{ color: 'hsl(var(--text-muted))' }}>
                      SKILL.md · 17 reference files · MIT License · v1.2.0
                    </div>
                  </div>
                </div>
                <ArrowRightIcon
                  className="h-4 w-4 flex-shrink-0"
                  style={{ color: 'hsl(271,70%,68%)' }}
                />
              </motion.div>
            </a>
          </LayerReveal>
        </Section>

        {/* ─────────────────────────────────────────────────────────
            THE PROBLEM
        ───────────────────────────────────────────────────────── */}
        <Section
          id="problem"
          label="Why It Exists"
          title="Vanilla AI produces code that rots."
          subtitle="Without an enforced convention system, every AI-generated session drifts. The 10th screen doesn't look like the 1st."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                problem: 'Mixes App Router and Pages Router',
                fix: 'App Router only. Pages Router is in slow deprecation — enforced from file one.',
              },
              {
                problem: 'Duplicates components across sessions',
                fix: "Registry check mandatory before creating any component. Extend, don't duplicate.",
              },
              {
                problem: "Ignores i18n until it's expensive to retrofit",
                fix: 'next-intl wired from day one, even for single-language apps.',
              },
              {
                problem: 'No concept of a living spec',
                fix: '.claude/spec.md is created at Bootstrap and updated after every Build session.',
              },
              {
                problem: 'Client state and server state get muddled',
                fix: 'TanStack Query owns server/async state. Zustand owns client-only global state. No overlap.',
              },
              {
                problem: 'Icons imported from anywhere, inconsistently',
                fix: 'All icons go through src/icons/index.ts barrel. Direct lucide imports are banned.',
              },
            ].map(({ problem, fix }) => (
              <LayerReveal key={problem}>
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: 'hsl(var(--surface))',
                    border: '1px solid var(--card-border)',
                  }}
                >
                  <div className="mb-2 flex items-start gap-2">
                    <span
                      className="mt-0.5 flex-shrink-0 font-mono text-xs font-bold"
                      style={{ color: 'hsl(0,72%,64%)' }}
                    >
                      ✕
                    </span>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: 'hsl(var(--text-heading))' }}
                    >
                      {problem}
                    </p>
                  </div>
                  <div className="flex items-start gap-2 pl-4">
                    <span
                      className="mt-0.5 flex-shrink-0 font-mono text-xs font-bold"
                      style={{ color: 'hsl(174,100%,50%)' }}
                    >
                      ✓
                    </span>
                    <p className="text-sm" style={{ color: 'hsl(var(--text-body))' }}>
                      {fix}
                    </p>
                  </div>
                </div>
              </LayerReveal>
            ))}
          </div>
        </Section>

        {/* ─────────────────────────────────────────────────────────
            THREE MODES
        ───────────────────────────────────────────────────────── */}
        <Section
          id="modes"
          label="How It Works"
          title="Three modes, one consistent codebase."
          subtitle="The skill detects context and switches modes automatically. You never need to explain your project from scratch."
        >
          <div className="grid gap-5 sm:grid-cols-3">
            <ModeCard
              icon={ZapIcon}
              name="Bootstrap"
              trigger='Trigger: "Build me X"'
              description="You have a product brief. The skill runs a 3-question intake, generates a living spec, then scaffolds a full project in one shot — compiles clean, zero TypeScript errors, deploys on first push."
              bullets={[
                'Full src/ folder structure per architecture.md',
                'Design system tokens + Tailwind config',
                'ESLint, Prettier, Husky v9, GitHub Actions CI',
                'Vitest + Playwright test scaffolding',
                'shadcn/ui components + icon barrel',
              ]}
              accent="hsl(38,92%,58%)"
              delay={0}
            />
            <ModeCard
              icon={LayersIcon}
              name="Build"
              trigger="Trigger: Project exists, add a feature"
              description="The skill reads your spec and existing component registry before writing a single line. It checks for reusable components, extends them rather than duplicating, then updates the spec after."
              bullets={[
                'Registry check before any new component',
                'Reads .claude/spec.md first',
                'Correct folder placement per architecture.md',
                'All forms via react-hook-form + zod',
                'All data fetching via TanStack Query',
              ]}
              accent="hsl(174,100%,50%)"
              delay={55}
            />
            <ModeCard
              icon={ShieldIcon}
              name="Audit"
              trigger='Trigger: "Review" / "Audit"'
              description="Six quality gates that check TypeScript cleanliness, lint errors, dark mode consistency, registry violations, spec coverage, and Lighthouse readiness. Findings ranked by severity."
              bullets={[
                'Gate 1: tsc --noEmit — zero errors',
                'Gate 2: ESLint — zero errors',
                'Gate 3: Light + dark mode visual check',
                'Gate 4: Registry violations (duplicate components)',
                'Gate 5: Spec coverage — every screen exists',
                'Gate 6: Lighthouse readiness check',
              ]}
              accent="hsl(271,70%,68%)"
              delay={110}
            />
          </div>
        </Section>

        {/* ─────────────────────────────────────────────────────────
            THE STACK
        ───────────────────────────────────────────────────────── */}
        <Section
          id="stack"
          label="The Stack"
          title="Non-negotiable. No configuration."
          subtitle="Fixed for v1. This is the promise — every project scaffolded by this skill uses the same stack, forever. No drift between sessions."
        >
          <div
            className="overflow-hidden rounded-2xl"
            style={{ background: 'hsl(var(--surface))', border: '1px solid rgba(139,92,246,0.12)' }}
          >
            <div className="px-6 pb-2 pt-5">
              <div
                className="grid grid-cols-[120px_1fr] gap-4 pb-3 sm:grid-cols-[160px_1fr_1fr]"
                style={{ borderBottom: '1px solid rgba(139,92,246,0.15)' }}
              >
                <span
                  className="font-mono text-[10px] uppercase tracking-widest"
                  style={{ color: 'hsl(var(--text-dim))' }}
                >
                  Layer
                </span>
                <span
                  className="font-mono text-[10px] uppercase tracking-widest"
                  style={{ color: 'hsl(var(--text-dim))' }}
                >
                  Choice
                </span>
                <span
                  className="hidden font-mono text-[10px] uppercase tracking-widest sm:block"
                  style={{ color: 'hsl(var(--text-dim))' }}
                >
                  Why
                </span>
              </div>
              <StackRow
                layer="Framework"
                choice="Next.js 15 (App Router)"
                note="Pages Router is in slow deprecation — not used."
              />
              <StackRow
                layer="Language"
                choice="TypeScript 5 (strict)"
                note="No any. No ts-ignore without comment."
              />
              <StackRow
                layer="Styling"
                choice="Tailwind CSS 3 + shadcn/ui"
                note="Utility-first + accessible primitives."
              />
              <StackRow
                layer="Data fetching"
                choice="TanStack Query 5"
                note="Server + client fetching. Caching. Mutations."
              />
              <StackRow
                layer="Client state"
                choice="Zustand 5"
                note="Client-only global state. Server state goes through TQ."
              />
              <StackRow
                layer="Forms"
                choice="react-hook-form 7 + zod 3"
                note="Schema-first, always. No uncontrolled exceptions."
              />
              <StackRow
                layer="i18n"
                choice="next-intl 3"
                note="Even single-language apps. Retrofitting is expensive."
              />
              <StackRow
                layer="Icons"
                choice="Lucide React (barrel only)"
                note="All icons via src/icons/index.ts. Direct imports banned."
              />
              <StackRow
                layer="Linting"
                choice="ESLint flat config"
                note="next/core-web-vitals + next/typescript."
              />
              <StackRow
                layer="Formatting"
                choice="Prettier + tailwind plugin"
                note="No semis, single quotes, 100-char, LF."
              />
              <StackRow
                layer="Git hooks"
                choice="Husky v9 + lint-staged"
                note="Pre-commit: lint-staged + tsc + next build."
              />
              <StackRow
                layer="CI"
                choice="GitHub Actions (Node 22)"
                note="5 parallel jobs: lint, format, typecheck, build, test."
              />
              <StackRow
                layer="Testing"
                choice="Vitest 2 + Playwright 1.45"
                note="Unit/integration (jsdom) + E2E (chromium)."
              />
            </div>
          </div>
        </Section>

        {/* ─────────────────────────────────────────────────────────
            KEY ADVANTAGES
        ───────────────────────────────────────────────────────── */}
        <Section
          id="advantages"
          label="Developer Benefits"
          title="What you actually get."
          subtitle="Concrete outcomes for developers building production products — not marketing copy."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AdvantageCard
              icon={RefreshIcon}
              title="Architectural consistency at scale"
              description="The registry concept prevents component duplication. The 20th screen follows the same patterns as the 1st — because the skill checks what exists before creating anything new."
              accent="hsl(174,100%,50%)"
              delay={0}
            />
            <AdvantageCard
              icon={FileCodeIcon}
              title="A spec that updates itself"
              description=".claude/spec.md is generated at Bootstrap and updated after every Build session. Audit mode uses it to detect drift between what the spec says and what the code actually does."
              accent="hsl(38,92%,58%)"
              delay={55}
            />
            <AdvantageCard
              icon={WrenchIcon}
              title="DX tooling, always"
              description="ESLint flat config, Prettier with Tailwind plugin, Husky v9 pre-commit hooks, and a 5-job GitHub Actions CI pipeline are included in every Bootstrap — never optional, never forgotten."
              accent="hsl(271,70%,68%)"
              delay={110}
            />
            <AdvantageCard
              icon={FlaskIcon}
              title="Tests scaffolded from the start"
              description="Vitest config, Testing Library setup, unit tests for the cn utility, component render tests, Playwright config, and two E2E specs are included in every Bootstrap. You ship with a green test suite."
              accent="hsl(160,60%,52%)"
              delay={0}
            />
            <AdvantageCard
              icon={Globe2Icon}
              title="i18n from day one"
              description="next-intl 3 is wired in every project — even single-language apps. Retrofitting i18n after launch is one of the most expensive refactors a Next.js codebase can face."
              accent="hsl(199,89%,62%)"
              delay={55}
            />
            <AdvantageCard
              icon={ShieldIcon}
              title="Security boundary enforced"
              description="The skill never reads .env files, secret directories, or key files. It announces what it plans to scan before scanning. If a file might contain secrets, it asks first."
              accent="hsl(0,72%,64%)"
              delay={110}
            />
            <AdvantageCard
              icon={CpuIcon}
              title="React 19 + React Compiler"
              description="Targets React 19 with React Compiler enabled. This means memo and useMemo are handled automatically — generated code doesn't pepper manual optimization calls everywhere."
              accent="hsl(38,92%,58%)"
              delay={0}
            />
            <AdvantageCard
              icon={GitBranchIcon}
              title="CI that runs on first push"
              description="The .github/workflows/ci.yml generated in Bootstrap runs 5 parallel jobs on every push. You don't wire up CI after the fact — it ships with the scaffold and runs immediately."
              accent="hsl(174,100%,50%)"
              delay={55}
            />
            <AdvantageCard
              icon={PackageIcon}
              title="Migration path for existing projects"
              description="First contact with an existing project that wasn't scaffolded by the skill triggers Migration submode — a structured path to bring your conventions in line without a full rewrite."
              accent="hsl(271,70%,68%)"
              delay={110}
            />
          </div>
        </Section>

        {/* ─────────────────────────────────────────────────────────
            18 DESIGN SYSTEMS
        ───────────────────────────────────────────────────────── */}
        <Section
          id="design-systems"
          label="Design Systems"
          title="18 systems. Pick one per project."
          subtitle="Each system has a unique border-radius scale, background texture, and typography treatment. Not just a color swap."
        >
          {/* Dark / Cinematic */}
          <div className="mb-3">
            <p
              className="mb-3 font-mono text-[10px] uppercase tracking-widest"
              style={{ color: 'hsl(var(--text-dim))' }}
            >
              Dark / Cinematic (Veil-family — runtime switchable)
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                {
                  name: 'Veil',
                  desc: 'Cinematic dark — teal/amber, midnight navy, radial glow',
                  a: '#00FFDA',
                  b: '#F5A623',
                  bg: '#050d1a',
                },
                {
                  name: 'Aurora',
                  desc: 'Glassmorphism — frosted panels, backdrop-filter',
                  a: '#6D5BFF',
                  b: '#C026D3',
                  bg: '#f5f3ff',
                },
                {
                  name: 'Carbon',
                  desc: 'Terminal grid — cyan, sharp edges, 56px grid overlay',
                  a: '#00D2E6',
                  b: '#00f0ff',
                  bg: '#0d111a',
                },
                {
                  name: 'Clay',
                  desc: 'Organic warmth — terracotta, grain texture',
                  a: '#b44b23',
                  b: '#c66a1e',
                  bg: '#f5eee6',
                },
                {
                  name: 'Pulse',
                  desc: 'High energy — coral, diagonal stripe background',
                  a: '#f0321e',
                  b: '#f58214',
                  bg: '#fafafa',
                },
                {
                  name: 'Obsidian',
                  desc: 'Void aesthetic — lime accent, sub-pixel grid',
                  a: '#82e600',
                  b: '#ffe600',
                  bg: '#080808',
                },
                {
                  name: 'Neobrutalism',
                  desc: 'Raw energy — 0px radius, 5px offset shadows',
                  a: '#ffeb00',
                  b: '#ff1580',
                  bg: '#fffde6',
                },
                {
                  name: 'Neon Noir',
                  desc: 'Cyberpunk — pink grid, glow text-shadow on headings',
                  a: '#ff1ab3',
                  b: '#8000ff',
                  bg: '#050505',
                },
                {
                  name: 'Synthwave',
                  desc: 'Retrofuture — CRT scan lines, neon pink/cyan glow',
                  a: '#ff1ab3',
                  b: '#00e5ff',
                  bg: '#140d22',
                },
              ].map((t) => (
                <ThemeSwatch key={t.name} {...t} />
              ))}
            </div>
          </div>

          {/* Light / Pastel */}
          <div className="mb-3">
            <p
              className="mb-3 font-mono text-[10px] uppercase tracking-widest"
              style={{ color: 'hsl(var(--text-dim))' }}
            >
              Light / Pastel
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                {
                  name: 'Pastel',
                  desc: 'Soft light — lavender primary, pink accent',
                  a: '#9b72e8',
                  b: '#f472b6',
                  bg: '#faf7ff',
                },
                {
                  name: 'Cotton',
                  desc: 'Airy light — sky blue, mint accent',
                  a: '#3b9ede',
                  b: '#34d399',
                  bg: '#f0f9ff',
                },
                {
                  name: 'Blush',
                  desc: 'Warm light — rose primary, peach accent',
                  a: '#f06279',
                  b: '#fb923c',
                  bg: '#fff5f7',
                },
              ].map((t) => (
                <ThemeSwatch key={t.name} {...t} />
              ))}
            </div>
          </div>

          {/* Retro / Terminal */}
          <div className="mb-3">
            <p
              className="mb-3 font-mono text-[10px] uppercase tracking-widest"
              style={{ color: 'hsl(var(--text-dim))' }}
            >
              Retro / Terminal
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                {
                  name: 'Pixel',
                  desc: 'Retro green terminal — pure pixel aesthetic',
                  a: '#00ff00',
                  b: '#00cc00',
                  bg: '#001100',
                },
                {
                  name: 'DOS',
                  desc: 'Amber terminal — classic command-line look',
                  a: '#ff9900',
                  b: '#ffbb44',
                  bg: '#0a0800',
                },
                {
                  name: 'Arcade',
                  desc: 'Dark neon — yellow primary, deep blue-black',
                  a: '#ffe000',
                  b: '#ff4400',
                  bg: '#05060f',
                },
              ].map((t) => (
                <ThemeSwatch key={t.name} {...t} />
              ))}
            </div>
          </div>

          {/* Cyberpunk / Acid */}
          <div className="mb-3">
            <p
              className="mb-3 font-mono text-[10px] uppercase tracking-widest"
              style={{ color: 'hsl(var(--text-dim))' }}
            >
              Cyberpunk / Acid
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                {
                  name: 'Cyberpunk',
                  desc: 'Hot pink + purple — neon dystopia',
                  a: '#ff22bb',
                  b: '#9000ff',
                  bg: '#08000f',
                },
                {
                  name: 'Acid',
                  desc: 'Lime green + magenta — maximum contrast',
                  a: '#aaff00',
                  b: '#ff00aa',
                  bg: '#030300',
                },
                {
                  name: 'Glitch',
                  desc: 'Red + cyan — chromatic aberration aesthetic',
                  a: '#ff1111',
                  b: '#00ffee',
                  bg: '#030303',
                },
              ].map((t) => (
                <ThemeSwatch key={t.name} {...t} />
              ))}
            </div>
          </div>

          {/* Non-portfolio */}
          <div>
            <p
              className="mb-3 font-mono text-[10px] uppercase tracking-widest"
              style={{ color: 'hsl(var(--text-dim))' }}
            >
              Non-portfolio / Standalone
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                {
                  name: 'Slate Pro',
                  desc: 'Enterprise SaaS — dense, blue, authoritative',
                  a: '#3b82f6',
                  b: '#6366f1',
                  bg: '#0f172a',
                },
                {
                  name: 'Carbon Dark',
                  desc: 'Dev & analytics — dark-first, violet, monospace',
                  a: '#8b5cf6',
                  b: '#a78bfa',
                  bg: '#090912',
                },
                {
                  name: 'Ivory Clean',
                  desc: 'Premium light — spacious, warm, editorial',
                  a: '#92400e',
                  b: '#d97706',
                  bg: '#fffff8',
                },
              ].map((t) => (
                <ThemeSwatch key={t.name} {...t} />
              ))}
            </div>
          </div>
        </Section>

        {/* ─────────────────────────────────────────────────────────
            SECTION VARIANT SYSTEM
        ───────────────────────────────────────────────────────── */}
        <Section
          id="variants"
          label="Portfolio Mode"
          title="6 sections × 6 variants = 839,808 configurations."
          subtitle="For portfolio and showcase sites, the skill includes a runtime layout-switching system. Each section has 6 layout variants, switchable live without a page reload."
        >
          <LayerReveal>
            <div
              className="overflow-hidden rounded-2xl"
              style={{
                background: 'hsl(var(--surface))',
                border: '1px solid rgba(139,92,246,0.14)',
              }}
            >
              {/* Top bar */}
              <div
                className="h-1 w-full"
                style={{
                  background: 'linear-gradient(90deg, hsl(271,70%,68%), hsl(174,100%,50%))',
                }}
              />
              <div className="p-8">
                <div className="mb-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
                  {[
                    { value: '6', label: 'Portfolio sections' },
                    { value: '6', label: 'Layout variants each' },
                    { value: '36', label: 'Total components' },
                    { value: '46,656', label: 'Page permutations' },
                  ].map(({ value, label }) => (
                    <div key={label} className="text-center">
                      <div
                        className="mb-1 font-mono text-3xl font-black"
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
                        className="font-mono text-[10px]"
                        style={{ color: 'hsl(var(--text-dim))' }}
                      >
                        {label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      section: 'Hero',
                      variants: ['cinematic', 'split', 'terminal', 'minimal', 'grid', 'glass'],
                    },
                    {
                      section: 'About',
                      variants: ['editorial', 'bento', 'compact', 'story', 'flipcards', 'resume'],
                    },
                    {
                      section: 'Skills',
                      variants: ['cloud', 'grid', 'showcase', 'bars', 'radar', 'mastery'],
                    },
                    {
                      section: 'Experience',
                      variants: ['cards', 'timeline', 'compact', 'magazine', 'kanban', 'table'],
                    },
                    {
                      section: 'Projects',
                      variants: ['featured', 'carousel', 'spotlight', 'pgrid', 'list', 'masonry'],
                    },
                    {
                      section: 'Contact',
                      variants: ['luxury', 'centered', 'split', 'minimal', 'card', 'cli'],
                    },
                  ].map(({ section, variants }) => (
                    <div
                      key={section}
                      className="rounded-xl p-4"
                      style={{
                        background: 'hsl(var(--surface-2))',
                        border: '1px solid rgba(0,255,218,0.06)',
                      }}
                    >
                      <div
                        className="mb-2 font-mono text-xs font-semibold"
                        style={{ color: 'hsl(var(--text-heading))' }}
                      >
                        {section}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {variants.map((v) => (
                          <span
                            key={v}
                            className="rounded-full px-2 py-0.5 font-mono text-[10px]"
                            style={{
                              background: 'hsl(var(--surface))',
                              border: '1px solid rgba(139,92,246,0.12)',
                              color: 'hsl(var(--text-muted))',
                            }}
                          >
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-sm" style={{ color: 'hsl(var(--text-dim))' }}>
                  Combined with 18 design systems:{' '}
                  <span style={{ color: 'hsl(var(--primary))' }}>
                    839,808 possible portfolio configurations
                  </span>
                  . Every combination renders without a page reload, powered by a Zustand-backed
                  floating ⊞ Layout panel.
                </p>
              </div>
            </div>
          </LayerReveal>
        </Section>

        {/* ─────────────────────────────────────────────────────────
            WHO IT'S FOR
        ───────────────────────────────────────────────────────── */}
        <Section
          id="audience"
          label="Who It's For"
          title="Solo devs and small teams building real products."
          subtitle="The skill is optimized for developers who own the entire stack and don't want to maintain a separate style guide."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                label: 'In scope',
                items: [
                  'B2B SaaS products',
                  'Internal tools & admin panels',
                  'Developer tools & dashboards',
                  'Portfolio & showcase sites',
                  'Marketing & landing pages',
                  'Consumer apps (web)',
                ],
                accent: 'hsl(174,100%,50%)',
                mark: '✓',
              },
              {
                label: 'Not a fit for',
                items: [
                  'Mobile-only apps (React Native / Flutter)',
                  'Static sites with zero interactivity — use Astro',
                  'Full games or WebGL-heavy 3D — use Three.js directly',
                  'Projects requiring Pages Router',
                ],
                accent: 'hsl(0,72%,64%)',
                mark: '✕',
              },
            ].map(({ label, items, accent, mark }) => (
              <LayerReveal key={label}>
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: 'hsl(var(--surface))',
                    border: '1px solid var(--card-border)',
                  }}
                >
                  <div
                    className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest"
                    style={{ color: accent }}
                  >
                    {label}
                  </div>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm"
                        style={{ color: 'hsl(var(--text-body))' }}
                      >
                        <span className="mt-0.5 flex-shrink-0 font-bold" style={{ color: accent }}>
                          {mark}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </LayerReveal>
            ))}
          </div>
        </Section>

        {/* ─────────────────────────────────────────────────────────
            DX TOOLING ALWAYS INCLUDED
        ───────────────────────────────────────────────────────── */}
        <Section
          id="dx"
          label="DX Tooling"
          title="Every scaffold ships with production-grade tooling."
          subtitle="None of this is optional. None of it requires a separate setup step. It's all generated in Bootstrap mode."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: CodeIcon,
                title: 'ESLint flat config',
                items: ['next/core-web-vitals', 'next/typescript rules', 'Custom rule overrides'],
                accent: 'hsl(38,92%,58%)',
              },
              {
                icon: SparklesIcon,
                title: 'Prettier',
                items: [
                  'prettier-plugin-tailwindcss',
                  'No semis, single quotes',
                  '100-char line width',
                ],
                accent: 'hsl(271,70%,68%)',
              },
              {
                icon: TerminalIcon,
                title: 'Husky v9',
                items: [
                  'Pre-commit: lint-staged',
                  'Pre-commit: tsc --noEmit',
                  'Pre-commit: next build',
                ],
                accent: 'hsl(174,100%,50%)',
              },
              {
                icon: GitBranchIcon,
                title: 'GitHub Actions CI',
                items: [
                  '5 parallel jobs (Node 22)',
                  'Lint · Format · Typecheck',
                  'Build · Unit tests',
                ],
                accent: 'hsl(199,89%,62%)',
              },
            ].map(({ icon: Icon, title, items, accent }) => (
              <LayerReveal key={title}>
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: 'hsl(var(--surface))',
                    border: '1px solid var(--card-border)',
                  }}
                >
                  <div
                    className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ background: `${accent}14`, border: `1px solid ${accent}30` }}
                  >
                    <Icon className="h-4 w-4" style={{ color: accent }} />
                  </div>
                  <div
                    className="mb-3 text-sm font-bold"
                    style={{ color: 'hsl(var(--text-heading))' }}
                  >
                    {title}
                  </div>
                  <ul className="space-y-1.5">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-1.5 font-mono text-[11px]"
                        style={{ color: 'hsl(var(--text-dim))' }}
                      >
                        <span style={{ color: accent }}>›</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </LayerReveal>
            ))}
          </div>
        </Section>

        {/* ─────────────────────────────────────────────────────────
            FOOTER CTA
        ───────────────────────────────────────────────────────── */}
        <LayerReveal>
          <div
            className="mt-8 overflow-hidden rounded-2xl p-10 text-center"
            style={{
              background: 'hsl(var(--surface))',
              border: '1px solid rgba(139,92,246,0.2)',
            }}
          >
            <div
              className="-mx-10 -mt-10 mb-10 h-1 w-[calc(100%+5rem)]"
              style={{ background: 'linear-gradient(90deg, hsl(271,70%,68%), hsl(174,100%,50%))' }}
            />
            <div
              className="mb-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px]"
              style={{
                background: 'rgba(0,255,218,0.07)',
                border: '1px solid rgba(0,255,218,0.16)',
                color: 'hsl(var(--primary))',
              }}
            >
              <SparklesIcon className="h-3 w-3" />
              This portfolio was built with the Next.js Skill
            </div>
            <h2
              className="mb-3 mt-5 text-3xl font-black"
              style={{ color: 'hsl(var(--text-heading))' }}
            >
              See it in action.
            </h2>
            <p className="mx-auto mb-8 max-w-md text-sm" style={{ color: 'hsl(var(--text-body))' }}>
              Every section on this portfolio — the variant switcher, the design systems, the 3D
              components, the optimistic UI interactions — was scaffolded and extended using this
              skill.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/">
                <motion.div
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white"
                  style={{
                    background: 'linear-gradient(135deg, hsl(271,70%,62%), hsl(271,70%,50%))',
                    boxShadow: '0 0 24px rgba(139,92,246,0.25)',
                  }}
                >
                  Back to portfolio
                  <ArrowRightIcon className="h-4 w-4" />
                </motion.div>
              </Link>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <motion.div
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
                  style={{
                    background: 'hsl(var(--surface-2))',
                    border: '1px solid rgba(139,92,246,0.2)',
                    color: 'hsl(var(--text-heading))',
                  }}
                >
                  <GithubIcon className="h-4 w-4" />
                  Star on GitHub
                </motion.div>
              </a>
            </div>
          </div>
        </LayerReveal>
      </div>
    </>
  )
}
