"use client"

import { useTranslations } from "next-intl"
import { SectionHeader } from "@/components/composite/section-header"
import { AnimatedSection } from "@/components/composite/animated-section"
import { AnimatedCounter } from "@/components/composite/animated-counter"
import { personalInfo, stats, education } from "@/lib/data"
import { GraduationCapIcon, MapPinIcon } from "@/icons"

export function AboutSection() {
  const t = useTranslations("about")

  return (
    <section id="about" className="py-28 max-w-6xl mx-auto px-6">
      <AnimatedSection>
        <SectionHeader title={t("title")} />
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-14 items-start">
        {/* Bio */}
        <AnimatedSection delay={100}>
          <div className="glass-card rounded-2xl p-8">
            <p className="text-foreground/70 leading-relaxed text-base mb-5">
              {t("bio")}
            </p>
            <p className="text-foreground/70 leading-relaxed text-base">
              My background spans fintech (Payram), blockchain infrastructure (Xalts), Web3 platforms,
              KYC systems, and edtech — with a common thread: owning the full stack and shipping things that matter.
            </p>
            <div className="flex items-center gap-2 mt-7 text-sm text-foreground/45">
              <MapPinIcon className="w-3.5 h-3.5 flex-shrink-0 text-primary" />
              <span>India · Open to remote roles worldwide</span>
            </div>
            <div className="mt-3 text-xs font-mono text-foreground/35">
              {personalInfo.email}
            </div>
          </div>
        </AnimatedSection>

        {/* Stats + Education */}
        <div className="space-y-4">
          {/* Animated stat counters */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={150 + i * 60}>
                <div className="glass-card rounded-2xl p-5 text-center">
                  <div className="text-3xl font-extrabold font-mono mb-1.5 gradient-text">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-xs text-foreground/50 leading-snug">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Education card */}
          <AnimatedSection delay={440}>
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div
                  className="mt-0.5 p-3 rounded-xl flex-shrink-0"
                  style={{ background: "rgba(109, 91, 255, 0.12)", border: "1px solid rgba(109, 91, 255, 0.22)" }}
                >
                  <GraduationCapIcon className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />
                </div>
                <div>
                  <p className="text-xs font-mono text-foreground/40 uppercase tracking-wider mb-1.5">
                    {t("education")}
                  </p>
                  <p className="font-bold text-sm text-foreground">{education.institution}</p>
                  <p className="text-sm text-foreground/55 mt-0.5">
                    {education.degree} · {education.period}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
