"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
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
              "w-3 h-3 rounded-full border-2 mt-1.5 shrink-0 transition-colors duration-300 z-10",
              item.current
                ? "bg-primary border-primary shadow-[0_0_12px_rgba(124,58,237,0.6)]"
                : expanded
                ? "bg-primary/40 border-primary/60"
                : "bg-muted border-border"
            )}
          />
          {!isLast && (
            <div className="w-px flex-1 mt-2 timeline-line min-h-full" />
          )}
        </div>

        {/* Content */}
        <div className="pb-10 flex-1 min-w-0">
          {/* Header */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full text-left group cursor-pointer"
            aria-expanded={expanded}
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                  {item.role}
                </h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                  <span className="text-sm font-medium text-primary/80">
                    {item.company}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPinIcon className="w-3 h-3" />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CalendarIcon className="w-3 h-3" />
                    {item.period}
                  </span>
                  {item.current && (
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full px-2 py-0.5">
                      Current
                    </span>
                  )}
                </div>
              </div>
              <ChevronDownIcon
                className={cn(
                  "w-4 h-4 text-muted-foreground shrink-0 mt-1 transition-transform duration-300",
                  expanded && "rotate-180"
                )}
              />
            </div>
          </button>

          {/* Bullets — animated expand/collapse */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-400 ease-in-out",
              expanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <ul className="mt-3 space-y-2 border-l border-border/50 pl-4">
              {item.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="text-sm text-muted-foreground leading-relaxed relative"
                >
                  <span className="absolute -left-4 top-2 w-1.5 h-1.5 rounded-full bg-border" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

export function ExperienceSection() {
  const t = useTranslations("experience")

  return (
    <section id="experience" className="py-24 bg-card/30">
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
