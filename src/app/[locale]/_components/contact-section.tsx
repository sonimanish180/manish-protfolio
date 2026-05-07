"use client"

import { useState, useOptimistic, useTransition, useRef } from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { SectionHeader } from "@/components/composite/section-header"
import { LayerReveal } from "@/components/composite/layer-reveal"
import { MagneticButton } from "@/components/composite/magnetic-button"
import { personalInfo } from "@/lib/data"
import { simulateApiCall } from "@/lib/simulate"
import {
  MailIcon,
  LinkedinIcon,
  CopyIcon,
  CheckIcon,
  ArrowUpRightIcon,
  SendIcon,
  AlertCircleIcon,
  RetryIcon,
  SparklesIcon,
} from "@/icons"

/* ─── Types ─── */
type FormState = "idle" | "sending" | "sent" | "error"

interface FormFields {
  name: string
  message: string
}

/* ─── Optimistic Contact Form ─── */
function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [fields, setFields] = useState<FormFields>({ name: "", message: "" })
  const [errors, setErrors] = useState<Partial<FormFields>>({})
  const [status, setStatus] = useOptimistic<FormState, FormState>("idle", (_, next) => next)
  const [, startTransition] = useTransition()

  // Track actual (non-optimistic) sent state for re-render after transition
  const [confirmed, setConfirmed] = useState(false)
  const [failed, setFailed] = useState(false)

  const validate = (): boolean => {
    const e: Partial<FormFields> = {}
    if (!fields.name.trim()) e.name = "Name is required"
    if (!fields.message.trim() || fields.message.trim().length < 10)
      e.message = "Message must be at least 10 characters"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    if (status === "sending") return

    setFailed(false)

    startTransition(async () => {
      setStatus("sending")
      try {
        await simulateApiCall(0.88, 1200)
        setStatus("sent")
        setConfirmed(true)
        setFields({ name: "", message: "" })
      } catch {
        setStatus("error")
        setFailed(true)
      }
    })
  }

  const handleRetry = () => {
    setFailed(false)
    setConfirmed(false)
    setStatus("idle")
  }

  /* Sent state — success screen */
  if (confirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="veil-card rounded-2xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.1 }}
          className="mx-auto mb-4 w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: "var(--impact-bg)", border: "1px solid var(--card-border-hover)" }}
        >
          <SparklesIcon className="w-6 h-6" style={{ color: "hsl(var(--primary))" }} />
        </motion.div>
        <h3 className="text-lg font-bold mb-2" style={{ color: "hsl(var(--text-heading))" }}>
          Message sent!
        </h3>
        <p className="text-sm mb-6" style={{ color: "hsl(var(--text-body))" }}>
          Thanks, {fields.name || "there"}! I&apos;ll get back to you soon.
        </p>
        <button
          onClick={handleRetry}
          className="text-xs font-mono underline underline-offset-2 transition-opacity hover:opacity-70"
          style={{ color: "hsl(var(--text-muted))" }}
        >
          Send another message
        </button>
      </motion.div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      <div className="veil-card rounded-2xl p-6 space-y-4">
        {/* Header row */}
        <div className="flex items-center gap-2 mb-1">
          <SendIcon className="w-4 h-4" style={{ color: "hsl(var(--primary))" }} />
          <span className="text-sm font-semibold" style={{ color: "hsl(var(--text-heading))" }}>
            Send a message
          </span>
        </div>

        {/* Name field */}
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-mono mb-1.5 uppercase tracking-wider"
            style={{ color: "hsl(var(--text-muted))" }}
          >
            Your Name
          </label>
          <input
            id="contact-name"
            type="text"
            value={fields.name}
            onChange={(e) => {
              setFields((f) => ({ ...f, name: e.target.value }))
              if (errors.name) setErrors((err) => ({ ...err, name: undefined }))
            }}
            placeholder="Elon Musk"
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 font-medium"
            style={{
              background: "hsl(var(--background) / 0.6)",
              border: `1px solid ${errors.name ? "hsl(var(--accent) / 0.6)" : "var(--card-border)"}`,
              color: "hsl(var(--text-heading))",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "hsl(var(--primary) / 0.5)")}
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = errors.name
                ? "hsl(var(--accent) / 0.6)"
                : "var(--card-border)")
            }
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="text-xs mt-1"
                style={{ color: "hsl(var(--accent))" }}
              >
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Message field */}
        <div>
          <label
            htmlFor="contact-message"
            className="block text-xs font-mono mb-1.5 uppercase tracking-wider"
            style={{ color: "hsl(var(--text-muted))" }}
          >
            Message
          </label>
          <textarea
            id="contact-message"
            rows={4}
            value={fields.message}
            onChange={(e) => {
              setFields((f) => ({ ...f, message: e.target.value }))
              if (errors.message) setErrors((err) => ({ ...err, message: undefined }))
            }}
            placeholder="I'd love to collaborate on..."
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 resize-none font-medium"
            style={{
              background: "hsl(var(--background) / 0.6)",
              border: `1px solid ${errors.message ? "hsl(var(--accent) / 0.6)" : "var(--card-border)"}`,
              color: "hsl(var(--text-heading))",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "hsl(var(--primary) / 0.5)")}
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = errors.message
                ? "hsl(var(--accent) / 0.6)"
                : "var(--card-border)")
            }
          />
          <AnimatePresence>
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="text-xs mt-1"
                style={{ color: "hsl(var(--accent))" }}
              >
                {errors.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Error banner */}
        <AnimatePresence>
          {failed && status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs"
              style={{
                background: "hsl(var(--accent) / 0.08)",
                border: "1px solid hsl(var(--accent) / 0.25)",
                color: "hsl(var(--accent))",
              }}
            >
              <span className="flex items-center gap-1.5">
                <AlertCircleIcon className="w-3.5 h-3.5 shrink-0" />
                Couldn&apos;t send. Your message is saved — try again?
              </span>
              <button
                type="button"
                onClick={handleRetry}
                className="flex items-center gap-1 font-semibold hover:opacity-70 transition-opacity"
              >
                <RetryIcon className="w-3 h-3" />
                Retry
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={status === "sending"}
          whileHover={status !== "sending" ? { scale: 1.02 } : {}}
          whileTap={status !== "sending" ? { scale: 0.97 } : {}}
          className="w-full h-11 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all duration-200 gradient-btn"
          style={{
            opacity: status === "sending" ? 0.75 : 1,
            cursor: status === "sending" ? "wait" : "pointer",
          }}
        >
          <AnimatePresence mode="wait">
            {status === "sending" ? (
              <motion.span
                key="sending"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex items-center gap-2"
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="block w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent"
                />
                Sending…
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex items-center gap-2"
              >
                <SendIcon className="w-3.5 h-3.5" />
                Send Message
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </form>
  )
}

export function ContactSection() {
  const t = useTranslations("contact")
  const tCommon = useTranslations("common")
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch { /* silently fail */ }
  }

  return (
    <section id="contact" className="py-36 max-w-6xl mx-auto px-6">
      <LayerReveal>
        <SectionHeader title={t("title")} align="center" />
      </LayerReveal>

      <div className="max-w-xl mx-auto">
        <LayerReveal delay={80}>
          <p className="text-lg leading-relaxed mb-10 text-center" style={{ color: "hsl(var(--text-body))" }}>
            {t("subtitle")}
          </p>
        </LayerReveal>

        {/* Optimistic contact form */}
        <LayerReveal delay={110}>
          <div className="mb-10">
            <ContactForm />
          </div>
        </LayerReveal>

        {/* Divider */}
        <LayerReveal delay={150}>
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px" style={{ background: "var(--card-border)" }} />
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "hsl(var(--text-dim))" }}>
              or reach out directly
            </span>
            <div className="flex-1 h-px" style={{ background: "var(--card-border)" }} />
          </div>
        </LayerReveal>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          {/* Email */}
          <LayerReveal delay={190}>
            <div className="veil-card rounded-2xl p-7 text-center h-full flex flex-col">
              <div className="flex items-center justify-center mb-4">
                <div
                  className="p-3.5 rounded-xl"
                  style={{ background: "var(--impact-bg)", border: "1px solid var(--card-border-hover)" }}
                >
                  <MailIcon className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />
                </div>
              </div>
              <p className="text-xs font-mono uppercase tracking-wider mb-1.5"
                style={{ color: "hsl(var(--text-muted))" }}>
                {t("emailLabel")}
              </p>
              <p className="text-sm font-semibold mb-5 break-all flex-1"
                style={{ color: "hsl(var(--text-heading))" }}>
                {personalInfo.email}
              </p>
              <button
                onClick={copyEmail}
                className="w-full inline-flex items-center justify-center gap-2 h-9 px-4 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200"
                style={{
                  color: copied ? "hsl(152, 60%, 60%)" : "hsl(var(--primary))",
                  background: copied ? "rgba(52, 211, 153, 0.08)" : "var(--impact-bg)",
                  border: `1px solid ${copied ? "rgba(52,211,153,0.2)" : "var(--card-border-hover)"}`,
                }}
              >
                {copied ? (
                  <><CheckIcon className="w-3.5 h-3.5" />{tCommon("copied")}</>
                ) : (
                  <><CopyIcon className="w-3.5 h-3.5" />{tCommon("copyEmail")}</>
                )}
              </button>
            </div>
          </LayerReveal>

          {/* LinkedIn */}
          <LayerReveal delay={240}>
            <div className="veil-card rounded-2xl p-7 text-center h-full flex flex-col">
              <div className="flex items-center justify-center mb-4">
                <div
                  className="p-3.5 rounded-xl"
                  style={{ background: "var(--accent-glow)", border: "1px solid var(--card-border)" }}
                >
                  <LinkedinIcon className="w-5 h-5" style={{ color: "hsl(var(--accent))" }} />
                </div>
              </div>
              <p className="text-xs font-mono uppercase tracking-wider mb-1.5"
                style={{ color: "hsl(var(--text-muted))" }}>
                LinkedIn
              </p>
              <p className="text-sm font-semibold mb-5 flex-1" style={{ color: "hsl(var(--text-heading))" }}>
                {personalInfo.name}
              </p>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 h-9 px-4 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200"
                style={{
                  color: "hsl(var(--accent))",
                  background: "var(--accent-glow)",
                  border: "1px solid var(--card-border)",
                }}
              >
                <ArrowUpRightIcon className="w-3.5 h-3.5" />
                {tCommon("openLinkedIn")}
              </a>
            </div>
          </LayerReveal>
        </div>

        {/* Primary CTA */}
        <LayerReveal delay={290}>
          <div className="flex justify-center">
            <MagneticButton
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2.5 h-12 px-10 rounded-2xl text-sm font-semibold cursor-pointer gradient-btn"
            >
              <MailIcon className="w-4 h-4" />
              Send me an email
              <ArrowUpRightIcon className="w-4 h-4 opacity-70" />
            </MagneticButton>
          </div>
        </LayerReveal>
      </div>

      {/* Footer */}
      <LayerReveal delay={350}>
        <div className="mt-24 pt-8 text-center" style={{ borderTop: "1px solid var(--card-border)" }}>
          <p className="text-xs font-mono" style={{ color: "hsl(var(--text-dim))" }}>
            Built with Next.js 15 · TypeScript · Tailwind ·{" "}
            <span className="gradient-text-soft">{personalInfo.name}</span>{" "}
            © {new Date().getFullYear()}
          </p>
        </div>
      </LayerReveal>
    </section>
  )
}
