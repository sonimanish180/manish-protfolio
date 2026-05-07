"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/composite/section-header"
import { AnimatedSection } from "@/components/composite/animated-section"
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
    <AnimatedSection delay={index * 80}>
      <div className="relative flex gap-6">
        {/* Timeline spine */}
        <div className="flex flex-col items-center shrink-0">
          <div
            className={cn(
              "w-3 h-3 rounded-full border-2 mt-2.5 shrink-0 z-10 transition-all duration-300",
              item.current || expanded
                ? "timeline-dot-gradient border-transparent"
                : "bg-white/50 border-white/40"
            )}
          />
          {!isLast && <div className="w-px flex-1 mt-2 timeline-line min-h-[40px]" />}
        </div>

        {/* Content */}
        <div className="pb-8 flex-1 min-w-0">
          <button
            onClick={() => setExpanded(!expanded)}
            className={cn(
              "w-full text-left rounded-2xl p-6 cursor-pointer transition-all duration-300 glass-card"
            )}
            aria-expanded={expanded}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-foreground mb-2">
                  {item.role}
                </h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span
                    className="text-xs font-semibold font-mono px-2.5 py-0.5 rounded-full"
                    style={{ background: "rgba(109, 91, 255, 0.1)", color: "hsl(238, 77%, 52%)", border: "1px solid rgba(109, 91, 255, 0.2)" }}
                  >
                    {item.company}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-foreground/45">
                    <MapPinIcon className="w-3 h-3 flex-shrink-0" />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-foreground/45">
                    <CalendarIcon className="w-3 h-3 flex-shrink-0" />
                    {item.period}
                  </span>
                  {item.current && (
                    <span className="text-xs rounded-full px-2.5 py-0.5 font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
                      Current
                    </span>
                  )}
                </div>
              </div>
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ChevronDownIcon className="w-4 h-4 text-foreground/35 shrink-0 mt-0.5" />
              </motion.div>
            </div>

            {/* Bullet points */}
            <div
              className={cn(
                "overflow-hidden transition-all duration-500 ease-in-out",
                expanded ? "max-h-[700px] opacity-100 mt-5" : "max-h-0 opacity-0"
              )}
            >
              <ul className="space-y-2.5 pl-4 border-l-2 border-white/30">
                {item.bullets.map((bullet, i) => (
                  <li key={i} className="text-sm text-foreground/60 leading-relaxed relative">
                    <span
                      className="absolute -left-[17px] top-2 w-1.5 h-1.5 rounded-full"
                      style={{ background: "hsl(238, 77%, 62%)" }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </button>
        </div>
      </div>
    </AnimatedSection>
  )
}

export function ExperienceSection() {
  const t = useTranslations("experience")

  return (
    <section id="experience" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <SectionHeader title={t("title")} />
        </AnimatedSection>
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
