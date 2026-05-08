"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { LayerReveal } from "@/components/composite/layer-reveal"
import { experience } from "@/lib/data"
import { ChevronDownIcon } from "@/icons"

const COMPANY_ACCENT: Record<string, string> = {
  "Payram":          "hsl(174,100%,50%)",
  "Xalts":           "hsl(199,89%,60%)",
  "Create Protocol": "hsl(271,70%,65%)",
  "Credenc":         "hsl(38,92%,58%)",
  "invoid":          "hsl(160,60%,55%)",
}

export function ExperienceCompact() {
  const t = useTranslations("experience")
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section id="experience" className="py-24">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

        <LayerReveal>
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <span className="section-label">{t("title")}</span>
            <div className="h-px flex-1 max-w-[120px]" style={{ background: "linear-gradient(to right, rgba(0,255,218,0.2), transparent)" }}/>
          </div>
        </LayerReveal>

        {/* Dense list */}
        <div className="max-w-3xl divide-y" style={{ borderColor: "rgba(0,255,218,0.06)" }}>
          {experience.map((item, i) => {
            const accent = COMPANY_ACCENT[item.company] ?? "hsl(174,100%,50%)"
            const isOpen = openIdx === i

            return (
              <LayerReveal key={item.company + item.period} delay={i * 55}>
                <div>
                  {/* Row */}
                  <button
                    className="w-full flex items-center gap-4 py-4 text-left cursor-pointer group"
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                  >
                    {/* Accent bar */}
                    <div className="flex-shrink-0 w-1 h-10 rounded-full transition-all duration-300"
                      style={{ background: isOpen ? accent : "rgba(0,255,218,0.12)" }}/>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-sm font-black" style={{ color: "hsl(var(--text-heading))" }}>
                          {item.company}
                        </span>
                        {item.current && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full"
                            style={{ background: "rgba(52,211,153,0.1)", color: "hsl(152,60%,65%)" }}>
                            now
                          </span>
                        )}
                        <span className="text-xs font-mono" style={{ color: accent }}>· {item.role}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-[11px] font-mono" style={{ color: "hsl(var(--text-dim))" }}>{item.period}</span>
                        <span className="text-[11px] font-mono" style={{ color: "hsl(var(--text-dim))" }}>· {item.location}</span>
                      </div>
                    </div>

                    {/* Chevron */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDownIcon className="w-4 h-4 opacity-30 group-hover:opacity-60 transition-opacity"
                        style={{ color: "hsl(var(--text-muted))" }}/>
                    </motion.div>
                  </button>

                  {/* Expanded bullets */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="expanded"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 pl-5 space-y-2">
                          {item.bullets.map((bullet, bi) => (
                            <motion.div
                              key={bi}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: bi * 0.035 }}
                              className="flex items-start gap-2.5"
                            >
                              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-[7px]" style={{ background: accent, opacity: 0.55 }}/>
                              <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>{bullet}</p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </LayerReveal>
            )
          })}
        </div>

      </div>
    </section>
  )
}
