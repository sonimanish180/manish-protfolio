'use client'

import { useState, useOptimistic, useTransition, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { LayerReveal } from '@/components/composite/layer-reveal'

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
  SparklesIcon,
} from '@/icons'

type FormState = 'idle' | 'sending' | 'sent' | 'error'
type FormFields = { name: string; message: string }

export function ContactCentered() {
  const t = useTranslations('contact')
  const formRef = useRef<HTMLFormElement>(null)
  const [fields, setFields] = useState<FormFields>({ name: '', message: '' })
  const [errors, setErrors] = useState<Partial<FormFields>>({})
  const [status, setStatus] = useOptimistic<FormState, FormState>('idle', (_, next) => next)
  const [, startTransition] = useTransition()
  const [confirmed, setConfirmed] = useState(false)
  const [failed, setFailed] = useState(false)
  const savedNameRef = useRef('')
  const [copied, setCopied] = useState(false)

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

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,255,218,0.05), transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-8">
        <LayerReveal>
          <div className="mb-12 text-center">
            <span className="section-label mb-4 inline-block">{t('title')}</span>
            <h2
              className="mb-4 text-4xl font-black leading-tight md:text-5xl"
              style={{ color: 'hsl(var(--text-heading))' }}
            >
              Let&apos;s build something <span className="gradient-text">great.</span>
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--text-body))' }}>
              Open for senior / lead engineering roles — fintech, infra, and platform teams.
            </p>
          </div>
        </LayerReveal>

        {/* Quick links */}
        <LayerReveal delay={80}>
          <div className="mb-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={copyEmail}
              className="group flex flex-1 cursor-pointer items-center gap-3 rounded-xl px-4 py-3.5 transition-all duration-200"
              style={{
                background: 'hsl(var(--surface))',
                border: '1px solid rgba(0,255,218,0.12)',
              }}
            >
              <MailIcon
                className="h-4 w-4 flex-shrink-0"
                style={{ color: 'hsl(var(--primary))' }}
              />
              <span
                className="flex-1 truncate text-left font-mono text-sm"
                style={{ color: 'hsl(var(--text-body))' }}
              >
                {personalInfo.email}
              </span>
              <motion.span animate={copied ? { scale: [1.2, 1] } : {}}>
                {copied ? (
                  <CheckIcon className="h-3.5 w-3.5" style={{ color: 'hsl(var(--primary))' }} />
                ) : (
                  <CopyIcon
                    className="h-3.5 w-3.5 opacity-40 group-hover:opacity-70"
                    style={{ color: 'hsl(var(--text-muted))' }}
                  />
                )}
              </motion.span>
            </button>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-1 cursor-pointer items-center gap-3 rounded-xl px-4 py-3.5 transition-all duration-200"
              style={{
                background: 'hsl(var(--surface))',
                border: '1px solid rgba(245,166,35,0.12)',
              }}
            >
              <LinkedinIcon
                className="h-4 w-4 flex-shrink-0"
                style={{ color: 'hsl(38,92%,58%)' }}
              />
              <span className="flex-1 font-mono text-sm" style={{ color: 'hsl(var(--text-body))' }}>
                linkedin
              </span>
              <ArrowUpRightIcon
                className="h-3.5 w-3.5 opacity-40 group-hover:opacity-70"
                style={{ color: 'hsl(var(--text-muted))' }}
              />
            </a>
          </div>
        </LayerReveal>

        {/* Form */}
        <LayerReveal delay={140}>
          <div
            className="rounded-2xl p-8"
            style={{
              background: 'hsl(var(--surface))',
              border: '1px solid rgba(0,255,218,0.12)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
            }}
          >
            <AnimatePresence mode="wait">
              {confirmed ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-8 text-center"
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
                    className="cursor-pointer font-mono text-xs underline underline-offset-4 transition-opacity hover:opacity-60"
                    style={{ color: 'hsl(var(--text-muted))' }}
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-4"
                >
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
                            className="cursor-pointer font-semibold underline underline-offset-2 hover:opacity-70"
                          >
                            Try again?
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
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </LayerReveal>
      </div>
    </section>
  )
}
