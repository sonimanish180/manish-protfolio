"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { LayerReveal } from "@/components/composite/layer-reveal"
import { experience } from "@/lib/data"
import { MapPinIcon } from "@/icons"

const COMPANY_META: Record<string, { accent: string; glow: string; domain: string }> = {
  "Payram":          { accent: "hsl(174,100%,50%)", glow: "rgba(0,255,218,0.14)",   domain: "fintech" },
  "Xalts":           { accent: "hsl(199,89%,60%)",  glow: "rgba(56,189,248,0.14)",  domain: "blockchain" },
  "Create Protocol": { accent: "hsl(271,70%,65%)",  glow: "rgba(139,92,246,0.14)",  domain: "web3" },
  "Credenc":         { accent: "hsl(38,92%,58%)",   glow: "rgba(245,166,35,0.14)",  domain: "edtech" },
  "invoid":          { accent: "hsl(160,60%,55%)",  glow: "rgba(52,211,153,0.14)",  domain: "kyc / id-tech" },
}

function TimelineNode({ item, index, isLast }: { item: typeof experience[0]; index: number; isLast: boolean }) {
  const [open, setOpen] = useState(index === 0)
  const meta = COMPANY_META[item.company] ?? COMPANY_META["Payram"]

  return (
    <LayerReveal delay={index * 70}>
      <div className="relative flex gap-6">
        {/* Left: timeline spine + node */}
        <div className="relative flex flex-col items-center" style={{ width: 40, flexShrink: 0 }}>
          {/* Node */}
          <motion.div
            animate={open ? { scale: 1.2, boxShadow: `0 0 20px ${meta.glow}, 0 0 6px ${meta.accent}` } : { scale: 1, boxShadow: "none" }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-black font-mono flex-shrink-0 cursor-pointer"
            style={{
              background: open ? `${meta.glow}` : "hsl(var(--surface-2))",
              border: `2px solid ${open ? meta.accent : "rgba(0,255,218,0.15)"}`,
              color: meta.accent,
            }}
            onClick={() => setOpen(v => !v)}
          >
            {item.company.slice(0, 2).toUpperCase()}
          </motion.div>
          {/* Spine below node */}
          {!isLast && (
            <div
              className="flex-1 w-px mt-2"
              style={{ background: `linear-gradient(to bottom, ${meta.accent}40, rgba(0,255,218,0.05))`, minHeight: 40 }}
            />
          )}
        </div>

        {/* Right: content */}
        <div className="flex-1 pb-8">
          {/* Header */}
          <div
            className="flex items-start justify-between gap-3 mb-2 cursor-pointer"
            onClick={() => setOpen(v => !v)}
          >
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-black" style={{ color: "hsl(var(--text-heading))" }}>
                  {item.company}
                </h3>
                {item.current && (
                  <span
                    className="inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", color: "hsl(152,60%,65%)" }}
                  >
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                    current
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold font-mono mt-0.5" style={{ color: meta.accent }}>
                {item.role}
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-col items-end gap-1.5">
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full"
                style={{ background: "hsl(var(--surface-2))", border: "1px solid rgba(0,255,218,0.08)", color: "hsl(var(--text-dim))" }}>
                {item.period}
              </span>
              <span className="flex items-center gap-1 text-xs font-mono" style={{ color: "hsl(var(--text-muted))" }}>
                <MapPinIcon className="w-3 h-3" /> {item.location}
              </span>
            </div>
          </div>

          {/* Expandable bullets */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="bullets"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="space-y-2.5 pt-3 pl-0">
                  {item.bullets.map((bullet, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.22, delay: i * 0.04 }}
                      className="flex items-start gap-2.5"
                    >
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-[7px]" style={{ background: meta.accent, opacity: 0.6 }}/>
                      <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>{bullet}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </LayerReveal>
  )
}

export function ExperienceTimeline() {
  const t = useTranslations("experience")

  return (
    <section id="experience" className="py-24">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

        <LayerReveal>
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <span className="section-label">{t("title")}</span>
            <div className="h-px flex-1 max-w-[120px]" style={{ background: "linear-gradient(to right, rgba(0,255,218,0.2), transparent)" }}/>
            <span className="text-[11px] font-mono" style={{ color: "hsl(var(--text-dim))" }}>click node to expand ↓</span>
          </div>
        </LayerReveal>

        <div className="max-w-2xl">
          {experience.map((item, i) => (
            <TimelineNode
              key={item.company + item.period}
              item={item}
              index={i}
              isLast={i === experience.length - 1}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
