"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { SectionHeader } from "@/components/composite/section-header"
import { AnimatedSection } from "@/components/composite/animated-section"
import { Button } from "@/components/ui/button"
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
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback — silently fail
    }
  }

  return (
    <section id="contact" className="py-32 max-w-6xl mx-auto px-6">
      <AnimatedSection>
        <SectionHeader title={t("title")} align="center" />
      </AnimatedSection>

      <div className="max-w-2xl mx-auto text-center">
        <AnimatedSection delay={100}>
          <p className="text-muted-foreground text-lg leading-relaxed mb-12">
            {t("subtitle")}
          </p>
        </AnimatedSection>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {/* Email */}
          <AnimatedSection delay={150}>
            <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <MailIcon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-1 font-mono uppercase tracking-wider">
                {t("emailLabel")}
              </p>
              <p className="text-sm text-foreground font-medium mb-4 break-all">
                {personalInfo.email}
              </p>
              <Button
                variant="glow"
                size="sm"
                onClick={copyEmail}
                className="w-full"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                    {tCommon("copied")}
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-3.5 h-3.5 mr-1.5" />
                    {tCommon("copyEmail")}
                  </>
                )}
              </Button>
            </div>
          </AnimatedSection>

          {/* LinkedIn */}
          <AnimatedSection delay={200}>
            <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 rounded-full bg-sky-500/10 group-hover:bg-sky-500/20 transition-colors">
                  <LinkedinIcon className="w-5 h-5 text-sky-400" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-1 font-mono uppercase tracking-wider">
                LinkedIn
              </p>
              <p className="text-sm text-foreground font-medium mb-4">
                {personalInfo.name}
              </p>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="w-full cursor-pointer">
                  <ArrowUpRightIcon className="w-3.5 h-3.5 mr-1.5" />
                  {tCommon("openLinkedIn")}
                </Button>
              </a>
            </div>
          </AnimatedSection>
        </div>

        {/* Direct mailto */}
        <AnimatedSection delay={280}>
          <a href={`mailto:${personalInfo.email}`}>
            <Button size="lg" className="cursor-pointer group">
              <MailIcon className="w-4 h-4 mr-2" />
              Send me an email
              <ArrowUpRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </a>
        </AnimatedSection>
      </div>

      {/* Footer */}
      <AnimatedSection delay={350}>
        <div className="mt-24 pt-8 border-t border-border text-center">
          <p className="text-xs font-mono text-muted-foreground/50">
            Built with Next.js 15 · TypeScript · Tailwind CSS ·{" "}
            <span className="text-primary/50">{personalInfo.name}</span> © {new Date().getFullYear()}
          </p>
        </div>
      </AnimatedSection>
    </section>
  )
}
