"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { SectionHeader } from "@/components/composite/section-header"
import { AnimatedSection } from "@/components/composite/animated-section"
import { MagneticButton } from "@/components/composite/magnetic-button"
import { personalInfo } from "@/lib/data"
import { MailIcon, LinkedinIcon, CopyIcon, CheckIcon, ArrowUpRightIcon } from "@/icons"

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
      <AnimatedSection>
        <SectionHeader title={t("title")} align="center" />
      </AnimatedSection>

      <div className="max-w-xl mx-auto text-center">
        <AnimatedSection delay={80}>
          <p className="text-foreground/55 text-lg leading-relaxed mb-14">
            {t("subtitle")}
          </p>
        </AnimatedSection>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          {/* Email */}
          <AnimatedSection delay={130}>
            <div className="glass-card rounded-2xl p-7 text-center h-full flex flex-col">
              <div className="flex items-center justify-center mb-4">
                <div
                  className="p-3.5 rounded-xl"
                  style={{ background: "rgba(109, 91, 255, 0.1)", border: "1px solid rgba(109, 91, 255, 0.2)" }}
                >
                  <MailIcon className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />
                </div>
              </div>
              <p className="text-xs font-mono uppercase tracking-wider text-foreground/40 mb-1.5">
                {t("emailLabel")}
              </p>
              <p className="text-sm font-semibold text-foreground mb-5 break-all flex-1">
                {personalInfo.email}
              </p>
              <button
                onClick={copyEmail}
                className="w-full inline-flex items-center justify-center gap-2 h-9 px-4 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 glass border-white/40"
                style={{
                  color: copied ? "rgb(5, 150, 105)" : "hsl(238, 77%, 52%)",
                  background: copied ? "rgba(16, 185, 129, 0.08)" : undefined,
                }}
              >
                {copied ? (
                  <><CheckIcon className="w-3.5 h-3.5" />{tCommon("copied")}</>
                ) : (
                  <><CopyIcon className="w-3.5 h-3.5" />{tCommon("copyEmail")}</>
                )}
              </button>
            </div>
          </AnimatedSection>

          {/* LinkedIn */}
          <AnimatedSection delay={190}>
            <div className="glass-card rounded-2xl p-7 text-center h-full flex flex-col">
              <div className="flex items-center justify-center mb-4">
                <div
                  className="p-3.5 rounded-xl"
                  style={{ background: "rgba(14, 165, 233, 0.1)", border: "1px solid rgba(14, 165, 233, 0.22)" }}
                >
                  <LinkedinIcon className="w-5 h-5" style={{ color: "hsl(199, 89%, 52%)" }} />
                </div>
              </div>
              <p className="text-xs font-mono uppercase tracking-wider text-foreground/40 mb-1.5">
                LinkedIn
              </p>
              <p className="text-sm font-semibold text-foreground mb-5 flex-1">
                {personalInfo.name}
              </p>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 h-9 px-4 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 glass border-white/40"
                style={{ color: "hsl(199, 89%, 45%)" }}
              >
                <ArrowUpRightIcon className="w-3.5 h-3.5" />
                {tCommon("openLinkedIn")}
              </a>
            </div>
          </AnimatedSection>
        </div>

        {/* Primary CTA — magnetic */}
        <AnimatedSection delay={260}>
          <div className="flex justify-center">
            <MagneticButton
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2.5 h-12 px-10 rounded-2xl text-sm font-semibold cursor-pointer gradient-btn text-white"
            >
              <MailIcon className="w-4 h-4" />
              Send me an email
              <ArrowUpRightIcon className="w-4 h-4 opacity-70" />
            </MagneticButton>
          </div>
        </AnimatedSection>
      </div>

      {/* Footer */}
      <AnimatedSection delay={320}>
        <div className="mt-24 pt-8 border-t border-white/20 text-center">
          <p className="text-xs font-mono text-foreground/30">
            Built with Next.js 15 · TypeScript · Tailwind ·{" "}
            <span className="gradient-text-soft">{personalInfo.name}</span>{" "}
            © {new Date().getFullYear()}
          </p>
        </div>
      </AnimatedSection>
    </section>
  )
}
