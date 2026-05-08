"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { LayerReveal } from "@/components/composite/layer-reveal"
import { experience } from "@/lib/data"
import { MapPinIcon, ChevronDownIcon } from "@/icons"

/* ── Per-company accent colours ── */
const COMPANY_META: Record<string, { accent: string; glow: string; domain: string }> = {
  "Payram":          { accent: "hsl(174,100%,50%)", glow: "rgba(0,255,218,0.14)",   domain: "fintech" },
  "Xalts":           { accent: "hsl(199,89%,60%)",  glow: "rgba(56,189,248,0.14)",  domain: "blockchain" },
  "Create Protocol": { accent: "hsl(271,70%,65%)",  glow: "rgba(139,92,246,0.14)",  domain: "web3" },
  "Credenc":         { accent: "hsl(38,92%,58%)",   glow: "rgba(245,166,35,0.14)",  domain: "edtech" },
  "invoid":          { accent: "hsl(160,60%,55%)",  glow: "rgba(52,211,153,0.14)",  domain: "kyc / id-tech" },
}

function getInitials(name: string) {
  return name.split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase()
}

function ExperienceCard({
  item,
  index,
}: {
  item: (typeof experience)[0]
  index: number
}) {
  const [open, setOpen] = useState(index === 0)
  const meta = COMPANY_META[item.company] ?? COMPANY_META["Payram"]

  return (
    <LayerReveal delay={index * 80}>
      <motion.div
        initial={false}
        animate={{
          boxShadow: open
            ? `0 0 0 1px ${meta.accent}33, 0 16px 48px ${meta.glow}, 0 4px 16px rgba(0,0,0,0.4)`
            : "0 0 0 1px rgba(0,255,218,0.08), 0 4px 16px rgba(0,0,0,0.25)",
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl overflow-hidden cursor-pointer group"
        style={{ background: "hsl(var(--surface))" }}
        onClick={() => setOpen(v => !v)}
      >
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300"
          style={{
            background: `linear-gradient(to bottom, ${meta.accent}, ${meta.accent}44)`,
            opacity: open ? 1 : 0.35,
          }}
        />

        {/* Top gradient reveal on hover */}
        <div
          className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, transparent, ${meta.accent}66, transparent)` }}
        />

        {/* Card body */}
        <div className="pl-7 pr-6 pt-6 pb-6">

          {/* Header row */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-4 min-w-0">

              {/* Company badge */}
              <div
                className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-[11px] font-black font-mono transition-all duration-300"
                style={{
                  background: open ? `${meta.glow}` : "hsl(var(--surface-2))",
                  border: `1px solid ${open ? meta.accent + "44" : "rgba(0,255,218,0.1)"}`,
                  color: meta.accent,
                  boxShadow: open ? `0 0 16px ${meta.glow}` : undefined,
                }}
              >
                {getInitials(item.company)}
              </div>

              {/* Company + role */}
              <div className="min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap mb-0.5">
                  <h3 className="text-lg font-black leading-none" style={{ color: "hsl(var(--text-heading))" }}>
                    {item.company}
                  </h3>
                  {item.current && (
                    <span
                      className="inline-flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        background: "rgba(52,211,153,0.1)",
                        border: "1px solid rgba(52,211,153,0.3)",
                        color: "hsl(152,60%,65%)",
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      current
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold font-mono" style={{ color: meta.accent }}>
                  {item.role}
                </p>
              </div>
            </div>

            {/* Right: period + chevron */}
            <div className="flex-shrink-0 flex flex-col items-end gap-2">
              <span
                className="text-[11px] font-mono px-2.5 py-1 rounded-full"
                style={{
                  background: "hsl(var(--surface-2))",
                  border: "1px solid rgba(0,255,218,0.08)",
                  color: "hsl(var(--text-dim))",
                }}
              >
                {item.period}
              </span>
              <motion.div
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <ChevronDownIcon className="w-4 h-4 opacity-40" style={{ color: "hsl(var(--text-muted))" }} />
              </motion.div>
            </div>
          </div>

          {/* Metadata row */}
          <div className="flex items-center gap-4 ml-[60px]">
            <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "hsl(var(--text-muted))" }}>
              <MapPinIcon className="w-3 h-3" />
              {item.location}
            </span>
            <span
              className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{
                background: `${meta.glow}`,
                border: `1px solid ${meta.accent}22`,
                color: meta.accent,
                opacity: 0.8,
              }}
            >
              {COMPANY_META[item.company]?.domain ?? "engineering"}
            </span>
          </div>

          {/* Expandable bullets */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="bullets"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div
                  className="mt-5 ml-[60px] pt-5 space-y-3"
                  style={{ borderTop: `1px solid rgba(0,255,218,0.08)` }}
                >
                  {item.bullets.map((bullet, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-start gap-3"
                    >
                      <span
                        className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-[7px]"
                        style={{ background: meta.accent, opacity: 0.6 }}
                      />
                      <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                        {bullet}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </LayerReveal>
  )
}

export function ExperienceSection() {
  const t = useTranslations("experience")

  return (
    <section id="experience" className="py-24">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

        {/* Header */}
        <LayerReveal>
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <span className="section-label">{t("title")}</span>
            <div
              className="h-px flex-1 max-w-[120px]"
              style={{ background: "linear-gradient(to right, rgba(0,255,218,0.2), transparent)" }}
            />
            <span
              className="text-[11px] font-mono"
              style={{ color: "hsl(var(--text-dim))" }}
            >
              click to expand ↓
            </span>
          </div>
        </LayerReveal>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-10 items-start">

          {/* Timeline cards */}
          <div className="space-y-4">
            {experience.map((item, i) => (
              <ExperienceCard
                key={item.company + item.period}
                item={item}
                index={i}
              />
            ))}
          </div>

          {/* Right sticky panel */}
          <LayerReveal delay={240}>
            <div className="hidden lg:block sticky top-28 space-y-4">

              {/* Career snapshot */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "hsl(var(--surface))",
                  border: "1px solid rgba(0,255,218,0.1)",
                }}
              >
                <p className="text-[10px] font-mono uppercase tracking-widest mb-5" style={{ color: "hsl(var(--text-muted))" }}>
                  career snapshot
                </p>

                <div className="space-y-4">
                  {[
                    { value: "5+", label: "years of experience" },
                    { value: "5",  label: "companies" },
                    { value: "4+", label: "engineers mentored" },
                  ].map(s => (
                    <div key={s.label} className="flex items-baseline gap-3">
                      <span className="text-2xl font-black font-mono leading-none gradient-text">{s.value}</span>
                      <span className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>{s.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-5 space-y-1.5" style={{ borderTop: "1px solid rgba(0,255,218,0.07)" }}>
                  <p className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{ color: "hsl(var(--text-muted))" }}>domains</p>
                  {Object.values(COMPANY_META).map(m => (
                    <div key={m.domain} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: m.accent }} />
                      <span className="text-xs font-mono" style={{ color: "hsl(var(--text-dim))" }}>{m.domain}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Open to work pill */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(52,211,153,0.04)",
                  border: "1px solid rgba(52,211,153,0.18)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                  <span className="text-xs font-mono font-semibold" style={{ color: "hsl(152,60%,65%)" }}>
                    Open to work
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--text-dim))" }}>
                  Senior / lead engineering — fintech, infra, platform. Remote-first, open to Dubai&nbsp;/ international.
                </p>
              </div>

            </div>
          </LayerReveal>

        </div>
      </div>
    </section>
  )
}
