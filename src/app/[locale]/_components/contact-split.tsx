'use client'

import { useState, useOptimistic, useTransition, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { LayerReveal } from '@/components/composite/layer-reveal'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert } from '@/components/ui/alert'
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
  MapPinIcon,
} from '@/icons'

type FormState = 'idle' | 'sending' | 'sent' | 'error'
type FormFields = { name: string; message: string }

const CONTACT_ITEMS = [
  {
    icon: MailIcon,
    label: 'Email',
    value: 'manish@stablebridge.money',
    accent: 'hsl(174,100%,50%)',
    glow: 'rgba(0,255,218,0.12)',
    copyable: true,
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'linkedin.com/in/manish-soni',
    accent: 'hsl(38,92%,60%)',
    glow: 'rgba(245,166,35,0.12)',
    href: 'https://www.linkedin.com/in/manish-soni',
    copyable: false,
  },
  {
    icon: MapPinIcon,
    label: 'Location',
    value: 'India · Remote-first · Open to Dubai',
    accent: 'hsl(271,70%,65%)',
    glow: 'rgba(139,92,246,0.12)',
    copyable: false,
  },
]

export function ContactSplit() {
  const t = useTranslations('contact')
  const formRef = useRef<HTMLFormElement>(null)
  const [fields, setFields] = useState<FormFields>({ name: '', message: '' })
  const [errors, setErrors] = useState<Partial<FormFields>>({})
  const [status, setStatus] = useOptimistic<FormState, FormState>('idle', (_, next) => next)
  const [, startTransition] = useTransition()
  const [confirmed, setConfirmed] = useState(false)
  const [failed, setFailed] = useState(false)
  const savedNameRef = useRef('')
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

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

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      {/* Subtle ambient blobs */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-96 w-96"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,218,0.04), transparent 70%)',
          filter: 'blur(80px)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-80 w-80"
        style={{
          background: 'radial-gradient(circle, rgba(245,166,35,0.04), transparent 70%)',
          filter: 'blur(80px)',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-8 lg:px-16">
        <LayerReveal>
          <div className="mb-14 flex items-center gap-4">
            <span className="section-label">{t('title')}</span>
            <div
              className="h-px max-w-[120px] flex-1"
              style={{ background: 'linear-gradient(to right, rgba(0,255,218,0.2), transparent)' }}
            />
          </div>
        </LayerReveal>

        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* LEFT: contact info */}
          <LayerReveal delay={60}>
            <div>
              <h2
                className="mb-8 text-4xl font-black leading-[0.95] md:text-5xl"
                style={{ color: 'hsl(var(--text-heading))' }}
              >
                Let&apos;s build
                <br />
                <span className="gradient-text">something</span>
                <br />
                great.
              </h2>

              <p
                className="mb-10 text-base leading-relaxed"
                style={{ color: 'hsl(var(--text-body))' }}
              >
                Open for senior / lead engineering roles in fintech, infra, and platform
                engineering. Remote-first, open to Dubai and international.
              </p>

              {/* Contact cards */}
              <div className="space-y-3">
                {CONTACT_ITEMS.map((item, i) => {
                  const Icon = item.icon
                  const isCopied = copiedIdx === i

                  const inner = (
                    <div
                      className="group flex cursor-pointer items-center gap-4 rounded-xl p-4 transition-all duration-200"
                      style={{
                        background: 'hsl(var(--surface))',
                        border: `1px solid ${item.accent}18`,
                      }}
                    >
                      <div
                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                        style={{ background: item.glow, border: `1px solid ${item.accent}28` }}
                      >
                        <Icon className="h-4 w-4" style={{ color: item.accent }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className="mb-0.5 font-mono text-[9px] uppercase tracking-widest"
                          style={{ color: 'hsl(var(--text-muted))' }}
                        >
                          {item.label}
                        </p>
                        <p
                          className="truncate font-mono text-sm"
                          style={{ color: 'hsl(var(--text-body))' }}
                        >
                          {item.value}
                        </p>
                      </div>
                      {item.copyable ? (
                        <motion.span animate={isCopied ? { scale: [1.3, 1] } : {}}>
                          {isCopied ? (
                            <CheckIcon className="h-3.5 w-3.5" style={{ color: item.accent }} />
                          ) : (
                            <CopyIcon
                              className="h-3.5 w-3.5 opacity-30 group-hover:opacity-60"
                              style={{ color: 'hsl(var(--text-muted))' }}
                            />
                          )}
                        </motion.span>
                      ) : item.href ? (
                        <ArrowUpRightIcon
                          className="h-3.5 w-3.5 opacity-30 group-hover:opacity-60"
                          style={{ color: 'hsl(var(--text-muted))' }}
                        />
                      ) : null}
                    </div>
                  )

                  if (item.copyable) {
                    return (
                      <button
                        key={i}
                        className="w-full text-left"
                        onClick={() => {
                          navigator.clipboard.writeText(item.value)
                          setCopiedIdx(i)
                          setTimeout(() => setCopiedIdx(null), 2000)
                        }}
                      >
                        {inner}
                      </button>
                    )
                  }
                  if (item.href) {
                    return (
                      <a key={i} href={item.href} target="_blank" rel="noopener noreferrer">
                        {inner}
                      </a>
                    )
                  }
                  return <div key={i}>{inner}</div>
                })}
              </div>

              {/* Availability */}
              <div className="mt-6 flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                <span
                  className="font-mono text-sm font-semibold"
                  style={{ color: 'hsl(152,60%,65%)' }}
                >
                  Open to work — available now
                </span>
              </div>
            </div>
          </LayerReveal>

          {/* RIGHT: form */}
          <LayerReveal delay={140}>
            <div
              className="rounded-2xl p-8"
              style={{
                background: 'hsl(var(--surface))',
                border: '1px solid rgba(0,255,218,0.1)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
              }}
            >
              <AnimatePresence mode="wait">
                {confirmed ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center py-10 text-center"
                  >
                    <div
                      className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                      style={{
                        background: 'rgba(0,255,218,0.1)',
                        border: '1px solid rgba(0,255,218,0.2)',
                      }}
                    >
                      <SparklesIcon className="h-6 w-6" style={{ color: 'hsl(var(--primary))' }} />
                    </div>
                    <h3
                      className="mb-2 text-xl font-black"
                      style={{ color: 'hsl(var(--text-heading))' }}
                    >
                      Message sent!
                    </h3>
                    <p className="mb-6 text-sm" style={{ color: 'hsl(var(--text-body))' }}>
                      Thanks, {savedNameRef.current || 'there'}! I&apos;ll reply soon.
                    </p>
                    <button
                      onClick={() => {
                        setConfirmed(false)
                        setStatus('idle')
                      }}
                      className="cursor-pointer font-mono text-xs underline underline-offset-4 hover:opacity-60"
                      style={{ color: 'hsl(var(--text-muted))' }}
                    >
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form">
                    <div className="mb-6">
                      <p
                        className="mb-0.5 text-sm font-bold"
                        style={{ color: 'hsl(var(--text-heading))' }}
                      >
                        Send a message
                      </p>
                      <p className="text-xs" style={{ color: 'hsl(var(--text-dim))' }}>
                        Usually reply within 24h
                      </p>
                    </div>
                    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
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
                        {failed && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <Alert variant="error" title="Couldn't send">
                              <button
                                type="button"
                                onClick={() => setFailed(false)}
                                className="flex cursor-pointer items-center gap-1 font-semibold underline underline-offset-2 hover:opacity-70"
                              >
                                <RetryIcon className="h-3 w-3" /> Try again?
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
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
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
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2"
                            >
                              <SendIcon className="h-3.5 w-3.5" /> Send Message
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </LayerReveal>
        </div>
      </div>
    </section>
  )
}
