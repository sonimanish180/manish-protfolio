'use client'

import { useState, useOptimistic, useTransition, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { LayerReveal } from '@/components/composite/layer-reveal'
import { MagneticButton } from '@/components/composite/magnetic-button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert } from '@/components/ui/alert'
import { personalInfo } from '@/lib/data'
import { simulateApiCall } from '@/lib/simulate'
import {
  MailIcon,
  LinkedinIcon,
  CopyIcon,
  CheckIcon,
  ArrowUpRightIcon,
  SendIcon,
  RetryIcon,
  SparklesIcon,
} from '@/icons'

const WarpTunnel3D = dynamic(
  () => import('@/components/ui/warp-tunnel-3d').then((m) => ({ default: m.WarpTunnel3D })),
  { ssr: false },
)

type FormState = 'idle' | 'sending' | 'sent' | 'error'
interface FormFields {
  name: string
  message: string
}

/* ─── Contact Form ─── */
function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [fields, setFields] = useState<FormFields>({ name: '', message: '' })
  const [errors, setErrors] = useState<Partial<FormFields>>({})
  const [status, setStatus] = useOptimistic<FormState, FormState>('idle', (_, next) => next)
  const [, startTransition] = useTransition()
  const [confirmed, setConfirmed] = useState(false)
  const [failed, setFailed] = useState(false)
  const savedNameRef = useRef('')

  const validate = (): boolean => {
    const e: Partial<FormFields> = {}
    if (!fields.name.trim()) e.name = 'Name is required'
    if (!fields.message.trim() || fields.message.trim().length < 10)
      e.message = 'Message must be at least 10 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate() || status === 'sending') return
    savedNameRef.current = fields.name
    setFailed(false)
    startTransition(async () => {
      setStatus('sending')
      try {
        await simulateApiCall(0.88, 1200)
        setStatus('sent')
        setConfirmed(true)
        setFields({ name: '', message: '' })
      } catch {
        setStatus('error')
        setFailed(true)
      }
    })
  }

  const handleRetry = () => {
    setFailed(false)
    setConfirmed(false)
    setStatus('idle')
  }

  if (confirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl p-10 text-center"
        style={{
          background: 'hsl(var(--surface) / 0.8)',
          border: '1px solid rgba(0,255,218,0.15)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.1 }}
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{
            background: 'rgba(0,255,218,0.1)',
            border: '1px solid rgba(0,255,218,0.25)',
            boxShadow: '0 0 40px rgba(0,255,218,0.15)',
          }}
        >
          <SparklesIcon className="h-7 w-7" style={{ color: 'hsl(var(--primary))' }} />
        </motion.div>
        <h3 className="mb-3 text-2xl font-black" style={{ color: 'hsl(var(--text-heading))' }}>
          Message sent!
        </h3>
        <p className="mb-8 max-w-xs text-sm" style={{ color: 'hsl(var(--text-body))' }}>
          Thanks, {savedNameRef.current || 'there'}!<br />
          I&apos;ll get back to you shortly.
        </p>
        <button
          onClick={handleRetry}
          className="font-mono text-xs underline underline-offset-4 transition-opacity hover:opacity-60"
          style={{ color: 'hsl(var(--text-muted))' }}
        >
          Send another message
        </button>
      </motion.div>
    )
  }

  return (
    <div
      className="rounded-2xl p-8"
      style={{
        background: 'hsl(var(--surface) / 0.75)',
        border: '1px solid rgba(0,255,218,0.12)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Form header */}
      <div className="mb-8 flex items-center gap-3">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ background: 'rgba(0,255,218,0.1)', border: '1px solid rgba(0,255,218,0.2)' }}
        >
          <SendIcon className="h-4 w-4" style={{ color: 'hsl(var(--primary))' }} />
        </div>
        <div>
          <p className="text-sm font-bold" style={{ color: 'hsl(var(--text-heading))' }}>
            Send a message
          </p>
          <p className="text-xs" style={{ color: 'hsl(var(--text-dim))' }}>
            I usually reply within 24h
          </p>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
        <Input
          label="Your Name"
          placeholder="Elon Musk"
          value={fields.name}
          onChange={(e) => {
            setFields((f) => ({ ...f, name: e.target.value }))
            if (errors.name) setErrors((err) => ({ ...err, name: undefined }))
          }}
          error={errors.name}
        />
        <Textarea
          label="Message"
          placeholder="I'd love to collaborate on..."
          rows={5}
          value={fields.message}
          onChange={(e) => {
            setFields((f) => ({ ...f, message: e.target.value }))
            if (errors.message) setErrors((err) => ({ ...err, message: undefined }))
          }}
          error={errors.message}
        />

        <AnimatePresence>
          {failed && status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Alert variant="error" title="Couldn't send">
                <span>Your message is saved — </span>
                <button
                  type="button"
                  onClick={handleRetry}
                  className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 transition-opacity hover:opacity-70"
                >
                  <RetryIcon className="h-3 w-3" /> try again?
                </button>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          disabled={status === 'sending'}
          whileHover={status !== 'sending' ? { scale: 1.02 } : {}}
          whileTap={status !== 'sending' ? { scale: 0.97 } : {}}
          className="gradient-btn inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold"
          style={{
            opacity: status === 'sending' ? 0.75 : 1,
            cursor: status === 'sending' ? 'wait' : 'pointer',
          }}
        >
          <AnimatePresence mode="wait">
            {status === 'sending' ? (
              <motion.span
                key="s"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex items-center gap-2"
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="block h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent"
                />
                Sending…
              </motion.span>
            ) : (
              <motion.span
                key="i"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex items-center gap-2"
              >
                <SendIcon className="h-3.5 w-3.5" /> Send Message
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </form>
    </div>
  )
}

export function ContactSection() {
  const t = useTranslations('contact')
  const [copied, setCopied] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [tunnelVisible, setTunnelVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTunnelVisible(true)
      },
      { threshold: 0.06 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      /* silently fail */
    }
  }

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden py-32">
      {/* WarpTunnel3D — deferred, very subtle */}
      {tunnelVisible && (
        <div className="pointer-events-none absolute inset-0 opacity-[0.10]" aria-hidden>
          <WarpTunnel3D speed={0.5} rings={14} spokes={7} />
        </div>
      )}

      {/* Ambient glow blobs */}
      <div
        className="pointer-events-none absolute -bottom-20 left-1/4 h-[400px] w-[600px]"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,255,218,0.06) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-[400px] w-[400px]"
        style={{
          background: 'radial-gradient(ellipse, rgba(245,166,35,0.04) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-8 lg:px-16">
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

        {/* Two-panel grid */}
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_460px] lg:gap-20">
          {/* ── LEFT PANEL ── */}
          <div>
            {/* Large headline */}
            <LayerReveal delay={60}>
              <h2 className="mb-7 text-5xl font-black leading-[1.02] tracking-tight md:text-6xl xl:text-7xl">
                <span style={{ color: 'hsl(var(--text-heading))' }}>Let&apos;s build</span>
                <br />
                <span className="gradient-text">something</span>
                <br />
                <span style={{ color: 'hsl(var(--text-heading))' }}>great.</span>
              </h2>
            </LayerReveal>

            <LayerReveal delay={120}>
              <p
                className="mb-10 max-w-sm text-base leading-relaxed md:text-lg"
                style={{ color: 'hsl(var(--text-body))' }}
              >
                {t('subtitle')}
              </p>
            </LayerReveal>

            {/* ── Email card ── */}
            <LayerReveal delay={180}>
              <div
                className="group mb-3 flex items-center gap-4 rounded-2xl p-5 transition-all duration-300"
                style={{
                  background: 'hsl(var(--surface))',
                  border: '1px solid rgba(0,255,218,0.1)',
                }}
              >
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: 'rgba(0,255,218,0.08)',
                    border: '1px solid rgba(0,255,218,0.18)',
                  }}
                >
                  <MailIcon className="h-5 w-5" style={{ color: 'hsl(var(--primary))' }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className="mb-0.5 font-mono text-[10px] uppercase tracking-widest"
                    style={{ color: 'hsl(var(--text-muted))' }}
                  >
                    Email
                  </p>
                  <p
                    className="truncate text-sm font-semibold"
                    style={{ color: 'hsl(var(--text-heading))' }}
                  >
                    {personalInfo.email}
                  </p>
                </div>
                <button
                  onClick={copyEmail}
                  className="inline-flex h-8 flex-shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-all duration-200"
                  style={{
                    color: copied ? 'hsl(152,60%,65%)' : 'hsl(var(--primary))',
                    background: copied ? 'rgba(52,211,153,0.08)' : 'rgba(0,255,218,0.07)',
                    border: `1px solid ${copied ? 'rgba(52,211,153,0.25)' : 'rgba(0,255,218,0.18)'}`,
                  }}
                >
                  {copied ? (
                    <>
                      <CheckIcon className="h-3.5 w-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <CopyIcon className="h-3.5 w-3.5" /> Copy
                    </>
                  )}
                </button>
              </div>
            </LayerReveal>

            {/* ── LinkedIn card ── */}
            <LayerReveal delay={230}>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group block flex items-center gap-4 rounded-2xl p-5 transition-all duration-300"
                style={{
                  background: 'hsl(var(--surface))',
                  border: '1px solid rgba(245,166,35,0.1)',
                  textDecoration: 'none',
                }}
              >
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: 'rgba(245,166,35,0.08)',
                    border: '1px solid rgba(245,166,35,0.2)',
                  }}
                >
                  <LinkedinIcon className="h-5 w-5" style={{ color: 'hsl(var(--accent))' }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className="mb-0.5 font-mono text-[10px] uppercase tracking-widest"
                    style={{ color: 'hsl(var(--text-muted))' }}
                  >
                    LinkedIn
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: 'hsl(var(--text-heading))' }}
                  >
                    {personalInfo.name}
                  </p>
                </div>
                <div
                  className="inline-flex h-8 flex-shrink-0 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold"
                  style={{
                    color: 'hsl(var(--accent))',
                    background: 'rgba(245,166,35,0.08)',
                    border: '1px solid rgba(245,166,35,0.2)',
                  }}
                >
                  <ArrowUpRightIcon className="h-3.5 w-3.5" /> Open
                </div>
              </a>
            </LayerReveal>

            {/* Availability + CTA */}
            <LayerReveal delay={280}>
              <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <MagneticButton
                  href={`mailto:${personalInfo.email}`}
                  className="gradient-btn inline-flex h-12 cursor-pointer items-center gap-2.5 rounded-xl px-8 text-sm font-semibold"
                >
                  <MailIcon className="h-4 w-4" />
                  Email me directly
                  <ArrowUpRightIcon className="h-3.5 w-3.5 opacity-70" />
                </MagneticButton>

                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                  <span className="font-mono text-xs" style={{ color: 'hsl(var(--text-muted))' }}>
                    Available · Remote-first
                  </span>
                </div>
              </div>
            </LayerReveal>
          </div>

          {/* ── RIGHT PANEL: Form ── */}
          <LayerReveal delay={140}>
            <ContactForm />
          </LayerReveal>
        </div>

        {/* Footer */}
        <LayerReveal delay={400}>
          <div
            className="mt-24 pt-8 text-center"
            style={{ borderTop: '1px solid var(--card-border)' }}
          >
            <p className="font-mono text-xs" style={{ color: 'hsl(var(--text-dim))' }}>
              Built with Next.js 15 · TypeScript · Tailwind ·{' '}
              <span className="gradient-text-soft">{personalInfo.name}</span> ©{' '}
              {new Date().getFullYear()}
            </p>
          </div>
        </LayerReveal>
      </div>
    </section>
  )
}
