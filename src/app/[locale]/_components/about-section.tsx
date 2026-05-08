"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"
import { LayerReveal } from "@/components/composite/layer-reveal"
import { AnimatedCounter } from "@/components/composite/animated-counter"
import { personalInfo, stats, education } from "@/lib/data"
import { GraduationCapIcon, MapPinIcon, MailIcon } from "@/icons"

const GravityOrbit3D = dynamic(
  () => import("@/components/ui/gravity-orbit-3d").then(m => ({ default: m.GravityOrbit3D })),
  { ssr: false }
)

const DOMAINS = ["fintech", "blockchain", "web3", "kyc / id-tech", "edtech"]

export function AboutSection() {
  const t = useTranslations("about")
  const sectionRef = useRef<HTMLElement>(null)
  const [orbitVisible, setOrbitVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setOrbitVisible(true) },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

        {/* Section label */}
        <LayerReveal>
          <div className="flex items-center gap-4 mb-14">
            <span className="section-label">{t("title")}</span>
            <div
              className="h-px flex-1 max-w-[120px]"
              style={{ background: "linear-gradient(to right, rgba(0,255,218,0.2), transparent)" }}
            />
          </div>
        </LayerReveal>

        {/* ── Magazine editorial: bio left, orbit right ── */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-10 lg:gap-16 mb-12">

          {/* LEFT: bio column */}
          <LayerReveal delay={60}>
            <div className="flex flex-col h-full">

              {/* Lead sentence — large, editorial */}
              <p
                className="text-xl md:text-2xl font-semibold leading-[1.5] mb-7"
                style={{ color: "hsl(var(--text-heading))" }}
              >
                {personalInfo.tagline}
              </p>

              {/* Divider */}
              <div
                className="w-12 h-[2px] mb-7 rounded-full"
                style={{ background: "linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))" }}
              />

              {/* Bio body */}
              <p className="text-base leading-[1.85] mb-5" style={{ color: "hsl(var(--text-body))" }}>
                {t("bio")}
              </p>
              <p className="text-base leading-[1.85] mb-8" style={{ color: "hsl(var(--text-body))" }}>
                My background spans fintech (Payram), blockchain infrastructure (Xalts), Web3 platforms,
                KYC systems, and edtech — with a common thread: owning the full stack and shipping things that matter.
              </p>

              {/* Domain tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {DOMAINS.map(d => (
                  <span
                    key={d}
                    className="text-xs px-3 py-1.5 rounded-full font-mono"
                    style={{
                      background: "hsl(var(--surface-2))",
                      border: "1px solid rgba(0,255,218,0.12)",
                      color: "hsl(var(--text-muted))",
                    }}
                  >
                    {d}
                  </span>
                ))}
              </div>

              {/* Contact strip */}
              <div className="mt-auto pt-6 flex flex-col gap-2.5" style={{ borderTop: "1px solid rgba(0,255,218,0.08)" }}>
                <div className="flex items-center gap-2.5 text-sm" style={{ color: "hsl(var(--text-muted))" }}>
                  <MapPinIcon className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(var(--primary))" }} />
                  India · Open to remote worldwide
                </div>
                <div className="flex items-center gap-2.5 text-xs font-mono" style={{ color: "hsl(var(--text-dim))" }}>
                  <MailIcon className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                  {personalInfo.email}
                </div>
              </div>
            </div>
          </LayerReveal>

          {/* RIGHT: orbit visualization */}
          <LayerReveal delay={120}>
            <div
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: "hsl(var(--surface))",
                border: "1px solid rgba(0,255,218,0.1)",
                minHeight: 420,
              }}
            >
              {/* Visual area */}
              <div className="flex-1 relative" style={{ minHeight: 340 }}>
                {orbitVisible && <GravityOrbit3D bodies={5} speed={0.9} />}
                {/* corner label */}
                <div
                  className="absolute bottom-4 left-0 right-0 text-center text-[10px] font-mono tracking-widest uppercase pointer-events-none"
                  style={{ color: "rgba(0,255,218,0.2)" }}
                >
                  system · model
                </div>
              </div>

              {/* Education footer */}
              <div
                className="p-5 flex items-start gap-4"
                style={{ borderTop: "1px solid rgba(0,255,218,0.08)" }}
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(0,255,218,0.07)", border: "1px solid rgba(0,255,218,0.14)" }}
                >
                  <GraduationCapIcon className="w-4.5 h-4.5" style={{ color: "hsl(var(--primary))" }} />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest mb-0.5" style={{ color: "hsl(var(--text-muted))" }}>
                    {t("education")}
                  </p>
                  <p className="text-sm font-bold" style={{ color: "hsl(var(--text-heading))" }}>
                    {education.shortName}
                  </p>
                  <p className="text-xs" style={{ color: "hsl(var(--text-body))" }}>
                    {education.degree} · {education.period}
                  </p>
                </div>
              </div>
            </div>
          </LayerReveal>
        </div>

        {/* ── Stats strip ── */}
        <LayerReveal delay={200}>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(0,255,218,0.08)" }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="relative flex flex-col items-center justify-center py-8 px-4 group transition-colors duration-300"
                style={{
                  background: "hsl(var(--surface))",
                  borderRight: i < stats.length - 1 ? "1px solid rgba(0,255,218,0.06)" : undefined,
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(circle at center, rgba(0,255,218,0.04), transparent 70%)" }}
                />
                <div className="text-4xl md:text-5xl font-black font-mono gradient-text leading-none mb-2">
                  <AnimatedCounter value={s.value} />
                </div>
                <p
                  className="text-[10px] font-mono uppercase tracking-widest text-center leading-tight"
                  style={{ color: "hsl(var(--text-muted))" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </LayerReveal>

        {/* ── Available for work card ── */}
        <LayerReveal delay={280}>
          <div
            className="mt-4 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5"
            style={{
              background: "rgba(52,211,153,0.04)",
              border: "1px solid rgba(52,211,153,0.16)",
            }}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse flex-shrink-0" />
              <span className="text-sm font-mono font-semibold" style={{ color: "hsl(152,60%,65%)" }}>
                Open to work
              </span>
            </div>
            <p className="text-sm leading-relaxed flex-1" style={{ color: "hsl(var(--text-body))" }}>
              Looking for a senior / lead engineering role — fintech, infra, or platform teams.
              Remote-first, open to Dubai / international.
            </p>
            <div className="flex flex-wrap gap-2 flex-shrink-0">
              {["Full-Stack", "Platform", "Golang", "Next.js"].map(tag => (
                <span
                  key={tag}
                  className="text-[11px] px-2.5 py-1 rounded-full font-mono"
                  style={{
                    background: "rgba(0,255,218,0.07)",
                    border: "1px solid rgba(0,255,218,0.14)",
                    color: "hsl(var(--primary))",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </LayerReveal>

      </div>
    </section>
  )
}
