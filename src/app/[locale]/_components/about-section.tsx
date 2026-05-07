"use client"

import { useTranslations } from "next-intl"
import { SectionHeader } from "@/components/composite/section-header"
import { AnimatedSection } from "@/components/composite/animated-section"
import { personalInfo, stats, education } from "@/lib/data"
import { GraduationCapIcon, MapPinIcon } from "@/icons"

export function AboutSection() {
  const t = useTranslations("about")

  return (
    <section id="about" className="py-24 max-w-6xl mx-auto px-6">
      <AnimatedSection>
        <SectionHeader title={t("title")} />
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Bio */}
        <AnimatedSection delay={100}>
          <p className="text-muted-foreground leading-relaxed text-base mb-6">
            {t("bio")}
          </p>
          <p className="text-muted-foreground leading-relaxed text-base">
            My background spans fintech (Payram), blockchain infrastructure (Xalts), Web3 platforms, KYC systems, and edtech — with a common thread: owning the full stack and shipping things that matter.
          </p>

          {/* Location */}
          <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
            <MapPinIcon className="w-4 h-4 text-primary/60" />
            <span>India · Open to remote roles worldwide</span>
          </div>
        </AnimatedSection>

        {/* Stats + Education */}
        <div className="space-y-6">
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={150 + i * 60}>
                <div className="bg-card border border-border rounded-lg p-5 hover:border-primary/30 transition-colors duration-300">
                  <div className="text-2xl font-bold text-primary font-mono mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Education */}
          <AnimatedSection delay={400}>
            <div className="bg-card border border-border rounded-lg p-5 hover:border-primary/30 transition-colors duration-300">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-2 rounded-md bg-primary/10 shrink-0">
                  <GraduationCapIcon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider">
                    {t("education")}
                  </div>
                  <div className="font-semibold text-sm text-foreground">
                    {education.institution}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {education.degree} · {education.period}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
