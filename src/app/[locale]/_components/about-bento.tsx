"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { LayerReveal } from "@/components/composite/layer-reveal"
import { AnimatedCounter } from "@/components/composite/animated-counter"
import { personalInfo, stats, education } from "@/lib/data"
import { GraduationCapIcon, MapPinIcon, MailIcon } from "@/icons"

const GravityOrbit3D = dynamic(
  () => import("@/components/ui/gravity-orbit-3d").then(m => ({ default: m.GravityOrbit3D })),
  { ssr: false }
)

const DOMAINS = ["fintech", "blockchain", "web3", "kyc / id-tech", "edtech"]

export function AboutBento() {
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

        <LayerReveal>
          <div className="flex items-center gap-4 mb-14">
            <span className="section-label">{t("title")}</span>
            <div className="h-px flex-1 max-w-[120px]" style={{ background: "linear-gradient(to right, rgba(0,255,218,0.2), transparent)" }}/>
          </div>
        </LayerReveal>

        {/* Bento grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[160px] gap-4">

          {/* Bio card — spans 2 cols × 2 rows */}
          <LayerReveal delay={40} className="col-span-2 row-span-2">
            <div
              className="h-full rounded-2xl p-7 flex flex-col"
              style={{
                background: "hsl(var(--surface))",
                border: "1px solid rgba(0,255,218,0.1)",
              }}
            >
              <p className="text-[10px] font-mono uppercase tracking-widest mb-4" style={{ color: "hsl(var(--text-muted))" }}>
                {t("title")}
              </p>
              <p className="text-xl font-bold leading-snug mb-4" style={{ color: "hsl(var(--text-heading))" }}>
                {personalInfo.tagline}
              </p>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "hsl(var(--text-body))" }}>
                {t("bio")}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {DOMAINS.map(d => (
                  <span key={d} className="text-[10px] px-2.5 py-1 rounded-full font-mono"
                    style={{ background: "hsl(var(--surface-2))", border: "1px solid rgba(0,255,218,0.1)", color: "hsl(var(--text-muted))" }}>
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </LayerReveal>

          {/* Orbit card — spans 1 col × 2 rows */}
          <LayerReveal delay={80} className="lg:col-span-1 row-span-2 hidden lg:block">
            <div
              className="h-full rounded-2xl overflow-hidden relative"
              style={{ background: "hsl(var(--surface))", border: "1px solid rgba(0,255,218,0.1)" }}
            >
              {orbitVisible && <GravityOrbit3D bodies={4} speed={0.8} />}
              <div className="absolute bottom-3 left-0 right-0 text-center text-[9px] font-mono tracking-widest uppercase pointer-events-none"
                style={{ color: "rgba(0,255,218,0.2)" }}>
                system · model
              </div>
            </div>
          </LayerReveal>

          {/* Education card */}
          <LayerReveal delay={120} className="lg:col-span-1">
            <div
              className="h-full rounded-2xl p-5 flex flex-col justify-between"
              style={{ background: "hsl(var(--surface))", border: "1px solid rgba(0,255,218,0.1)" }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                style={{ background: "rgba(0,255,218,0.07)", border: "1px solid rgba(0,255,218,0.14)" }}>
                <GraduationCapIcon className="w-4 h-4" style={{ color: "hsl(var(--primary))" }} />
              </div>
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest mb-1" style={{ color: "hsl(var(--text-muted))" }}>{t("education")}</p>
                <p className="text-sm font-bold leading-tight" style={{ color: "hsl(var(--text-heading))" }}>{education.shortName}</p>
                <p className="text-xs mt-0.5" style={{ color: "hsl(var(--text-body))" }}>{education.degree} · {education.period}</p>
              </div>
            </div>
          </LayerReveal>

          {/* Location card */}
          <LayerReveal delay={160} className="lg:col-span-1">
            <div
              className="h-full rounded-2xl p-5 flex flex-col justify-between"
              style={{ background: "hsl(var(--surface))", border: "1px solid rgba(0,255,218,0.1)" }}
            >
              <MapPinIcon className="w-5 h-5 mb-auto" style={{ color: "hsl(var(--primary))" }} />
              <div>
                <p className="text-sm font-semibold" style={{ color: "hsl(var(--text-heading))" }}>India</p>
                <p className="text-xs font-mono" style={{ color: "hsl(var(--text-muted))" }}>Open to remote worldwide</p>
                <p className="text-[10px] font-mono mt-1" style={{ color: "hsl(var(--text-dim))" }}>{personalInfo.email}</p>
              </div>
            </div>
          </LayerReveal>

          {/* Stats — each stat is its own mini tile (4 tiles × 1 row) */}
          {stats.map((s, i) => (
            <LayerReveal key={s.label} delay={200 + i * 30}>
              <div
                className="h-full rounded-2xl p-5 flex flex-col justify-center items-center group transition-colors duration-300 relative overflow-hidden"
                style={{ background: "hsl(var(--surface))", border: "1px solid rgba(0,255,218,0.08)" }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(circle at center, rgba(0,255,218,0.05), transparent 70%)" }}
                />
                <div className="text-3xl font-black font-mono gradient-text leading-none mb-1">
                  <AnimatedCounter value={s.value} />
                </div>
                <p className="text-[9px] font-mono uppercase tracking-widest text-center leading-tight" style={{ color: "hsl(var(--text-muted))" }}>
                  {s.label}
                </p>
              </div>
            </LayerReveal>
          ))}

          {/* Open to work — spans full remaining width */}
          <LayerReveal delay={320} className="col-span-2 lg:col-span-4">
            <div
              className="h-full rounded-2xl px-6 flex flex-col sm:flex-row items-center gap-4"
              style={{ background: "rgba(52,211,153,0.04)", border: "1px solid rgba(52,211,153,0.16)" }}
            >
              <div className="flex items-center gap-2.5 flex-shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse" />
                <span className="text-sm font-mono font-semibold" style={{ color: "hsl(152,60%,65%)" }}>Open to work</span>
              </div>
              <p className="text-sm flex-1" style={{ color: "hsl(var(--text-body))" }}>
                Looking for a senior / lead engineering role — fintech, infra, or platform teams. Remote-first, open to Dubai / international.
              </p>
              <div className="flex flex-wrap gap-2 flex-shrink-0">
                {["Full-Stack", "Platform", "Golang", "Next.js"].map(tag => (
                  <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full font-mono"
                    style={{ background: "rgba(0,255,218,0.07)", border: "1px solid rgba(0,255,218,0.14)", color: "hsl(var(--primary))" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </LayerReveal>

        </div>
      </div>
    </section>
  )
}
