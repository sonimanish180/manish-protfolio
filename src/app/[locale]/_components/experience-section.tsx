"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/composite/section-header"
import { LayerReveal } from "@/components/composite/layer-reveal"
import { experience } from "@/lib/data"
import { cn } from "@/lib/utils"
import { ChevronDownIcon, MapPinIcon, CalendarIcon } from "@/icons"

function ExperienceCard({
  item,
  index,
  isLast,
}: {
  item: (typeof experience)[0]
  index: number
  isLast: boolean
}) {
  const [expanded, setExpanded] = useState(index === 0)

  return (
    <LayerReveal delay={index * 90}>
      <div className="relative flex gap-6">
        {/* Timeline spine */}
        <div className="flex flex-col items-center shrink-0">
          <div
            className={cn(
              "w-3 h-3 rounded-full border-2 mt-2.5 shrink-0 z-10 transition-all duration-300",
              item.current || expanded
                ? "timeline-dot-gradient border-transparent"
                : ""
            )}
            style={!(item.current || expanded) ? {
              background: "hsl(var(--surface-2, 217 35% 12%))",
              borderColor: "hsl(var(--border))",
            } : {}}
          />
          {!isLast && <div className="w-px flex-1 mt-2 timeline-line min-h-[40px]" />}
        </div>

        {/* Content */}
        <div className="pb-8 flex-1 min-w-0">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full text-left rounded-2xl p-6 cursor-pointer veil-card"
            aria-expanded={expanded}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm mb-2" style={{ color: "hsl(var(--text-heading))" }}>
                  {item.role}
                </h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span
                    className="text-xs font-semibold font-mono px-2.5 py-0.5 rounded-full mono-tag"
                  >
                    {item.company}
                  </span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: "hsl(var(--text-muted))" }}>
                    <MapPinIcon className="w-3 h-3 flex-shrink-0" />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: "hsl(var(--text-muted))" }}>
                    <CalendarIcon className="w-3 h-3 flex-shrink-0" />
                    {item.period}
                  </span>
                  {item.current && (
                    <span
                      className="text-xs rounded-full px-2.5 py-0.5 font-medium"
                      style={{
                        background: "rgba(52, 211, 153, 0.10)",
                        color: "hsl(152, 60%, 60%)",
                        border: "1px solid rgba(52, 211, 153, 0.25)",
                      }}
                    >
                      Current
                    </span>
                  )}
                </div>
              </div>
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ChevronDownIcon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--text-muted))" }} />
              </motion.div>
            </div>

            {/* Bullet points */}
            <div
              className={cn(
                "overflow-hidden transition-all duration-500 ease-in-out",
                expanded ? "max-h-[700px] opacity-100 mt-5" : "max-h-0 opacity-0"
              )}
            >
              <ul className="space-y-2.5 pl-4" style={{ borderLeft: "2px solid var(--card-border-hover)" }}>
                {item.bullets.map((bullet, i) => (
                  <li key={i} className="text-sm leading-relaxed relative"
                    style={{ color: "hsl(var(--text-body))" }}>
                    <span
                      className="absolute -left-[17px] top-2 w-1.5 h-1.5 rounded-full"
                      style={{ background: "hsl(var(--primary))" }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </button>
        </div>
      </div>
    </LayerReveal>
  )
}

export function ExperienceSection() {
  const t = useTranslations("experience")

  return (
    <section id="experience" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <LayerReveal>
          <SectionHeader title={t("title")} />
        </LayerReveal>
        <div className="max-w-3xl">
          {experience.map((item, i) => (
            <ExperienceCard
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
