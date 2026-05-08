"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { LayerReveal } from "@/components/composite/layer-reveal"
import { projects } from "@/lib/data"
import { TrendingUpIcon, BuildingIcon } from "@/icons"

const COMPANY_ACCENT: Record<string, string> = {
  "Payram":          "hsl(174,100%,50%)",
  "Xalts":           "hsl(199,89%,60%)",
  "Create Protocol": "hsl(271,70%,65%)",
  "Credenc":         "hsl(38,92%,58%)",
  "invoid":          "hsl(160,60%,55%)",
}

export function ProjectsSpotlight() {
  const t = useTranslations("projects")
  const [current, setCurrent] = useState(0)

  const go = (delta: number) => {
    setCurrent((prev) => (prev + delta + projects.length) % projects.length)
  }

  const project = projects[current]!
  const accent = COMPANY_ACCENT[project.company] ?? "hsl(174,100%,50%)"

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

        <LayerReveal>
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <span className="section-label">{t("title")}</span>
            <span className="ml-auto text-xs font-mono" style={{ color: "hsl(var(--text-dim))" }}>
              {current + 1} / {projects.length}
            </span>
          </div>
        </LayerReveal>

        {/* Main spotlight card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl overflow-hidden mb-8"
            style={{
              background: "hsl(var(--surface))",
              border: `1px solid ${accent}28`,
              boxShadow: `0 0 60px ${accent}0d, 0 24px 60px rgba(0,0,0,0.35)`,
            }}
          >
            {/* Top accent bar */}
            <div className="h-1" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}55, transparent)` }}/>

            <div className="p-10 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ background: `${accent}12`, border: `1px solid ${accent}30`, color: accent }}
                >
                  #{current + 1} of {projects.length}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "hsl(var(--text-muted))" }}>
                  <BuildingIcon className="w-3.5 h-3.5" /> {project.company}
                </span>
              </div>

              <h3
                className="font-black leading-tight mb-5"
                style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "hsl(var(--text-heading))" }}
              >
                {project.title}
              </h3>

              <p className="text-base leading-[1.8] mb-8 max-w-2xl" style={{ color: "hsl(var(--text-body))" }}>
                {project.description}
              </p>

              {project.impact && (
                <div
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm mb-8"
                  style={{ background: `${accent}0d`, border: `1px solid ${accent}22`, color: accent }}
                >
                  <TrendingUpIcon className="w-4 h-4 flex-shrink-0" />
                  {project.impact}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {project.tech.map(tech => (
                  <span key={tech} className="text-xs px-3 py-1.5 rounded-full font-mono"
                    style={{ background: "hsl(var(--surface-2))", border: "1px solid rgba(0,255,218,0.1)", color: "hsl(var(--text-muted))" }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation row */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => go(-1)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-mono font-semibold cursor-pointer transition-all duration-200"
            style={{
              background: "hsl(var(--surface))",
              border: "1px solid rgba(0,255,218,0.12)",
              color: "hsl(var(--text-muted))",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(var(--primary))")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(var(--text-muted))")}
          >
            ← Prev
          </button>

          {/* Dot indicators */}
          <div className="flex gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="cursor-pointer rounded-full transition-all duration-300"
                style={{
                  width: current === i ? 24 : 8,
                  height: 8,
                  background: current === i ? accent : "rgba(0,255,218,0.18)",
                  boxShadow: current === i ? `0 0 10px ${accent}80` : undefined,
                }}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-mono font-semibold cursor-pointer transition-all duration-200"
            style={{
              background: "hsl(var(--surface))",
              border: "1px solid rgba(0,255,218,0.12)",
              color: "hsl(var(--text-muted))",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(var(--primary))")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(var(--text-muted))")}
          >
            Next →
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-3 mt-6 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {projects.map((p, i) => {
            const pAccent = COMPANY_ACCENT[p.company] ?? "hsl(174,100%,50%)"
            return (
              <button
                key={p.title}
                onClick={() => setCurrent(i)}
                className="flex-shrink-0 px-4 py-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer"
                style={{
                  background: current === i ? `${pAccent}0d` : "hsl(var(--surface))",
                  border: `1px solid ${current === i ? pAccent + "33" : "rgba(0,255,218,0.07)"}`,
                  minWidth: 140,
                }}
              >
                <p className="text-xs font-semibold leading-tight" style={{ color: current === i ? pAccent : "hsl(var(--text-muted))" }}>
                  {p.title}
                </p>
                <p className="text-[9px] font-mono mt-0.5" style={{ color: "hsl(var(--text-dim))" }}>{p.company}</p>
              </button>
            )
          })}
        </div>

      </div>
    </section>
  )
}
