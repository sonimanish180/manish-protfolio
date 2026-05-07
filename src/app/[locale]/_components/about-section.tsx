"use client"

import { useTranslations } from "next-intl"
import { SectionHeader } from "@/components/composite/section-header"
import { LayerReveal } from "@/components/composite/layer-reveal"
import { AnimatedCounter } from "@/components/composite/animated-counter"
import { personalInfo, stats, education } from "@/lib/data"
import { GraduationCapIcon, MapPinIcon } from "@/icons"

export function AboutSection() {
  const t = useTranslations("about")

  return (
    <section id="about" className="py-28 max-w-6xl mx-auto px-6">
      <LayerReveal>
        <SectionHeader title={t("title")} />
      </LayerReveal>

      <div className="grid md:grid-cols-2 gap-14 items-start">
        {/* Bio */}
        <LayerReveal delay={100}>
          <div className="veil-card rounded-2xl p-8">
            <p className="leading-relaxed text-base mb-5" style={{ color: "hsl(var(--text-body))" }}>
              {t("bio")}
            </p>
            <p className="leading-relaxed text-base" style={{ color: "hsl(var(--text-body))" }}>
              My background spans fintech (Payram), blockchain infrastructure (Xalts), Web3 platforms,
              KYC systems, and edtech — with a common thread: owning the full stack and shipping things that matter.
            </p>
            <div className="flex items-center gap-2 mt-7 text-sm" style={{ color: "hsl(var(--text-muted))" }}>
              <MapPinIcon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} />
              <span>India · Open to remote roles worldwide</span>
            </div>
            <div className="mt-3 text-xs font-mono" style={{ color: "hsl(var(--text-dim))" }}>
              {personalInfo.email}
            </div>
          </div>
        </LayerReveal>

        {/* Stats + Education */}
        <div className="space-y-4">
          {/* Animated stat counters */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, i) => (
              <LayerReveal key={stat.label} delay={150 + i * 60}>
                <div className="veil-card rounded-2xl p-5 text-center">
                  <div className="text-3xl font-extrabold font-mono mb-1.5 gradient-text">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-xs leading-snug" style={{ color: "hsl(var(--text-muted))" }}>
                    {stat.label}
                  </div>
                </div>
              </LayerReveal>
            ))}
          </div>

          {/* Education card */}
          <LayerReveal delay={440}>
            <div className="veil-card rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div
                  className="mt-0.5 p-3 rounded-xl flex-shrink-0"
                  style={{
                    background: "var(--impact-bg)",
                    border: "1px solid var(--card-border-hover)",
                  }}
                >
                  <GraduationCapIcon className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider mb-1.5"
                    style={{ color: "hsl(var(--text-muted))" }}>
                    {t("education")}
                  </p>
                  <p className="font-bold text-sm" style={{ color: "hsl(var(--text-heading))" }}>
                    {education.institution}
                  </p>
                  <p className="text-sm mt-0.5" style={{ color: "hsl(var(--text-body))" }}>
                    {education.degree} · {education.period}
                  </p>
                </div>
              </div>
            </div>
          </LayerReveal>
        </div>
      </div>
    </section>
  )
}
