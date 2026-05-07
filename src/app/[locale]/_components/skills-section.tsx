"use client"

import { useTranslations } from "next-intl"
import { SectionHeader } from "@/components/composite/section-header"
import { AnimatedSection } from "@/components/composite/animated-section"
import { skillCategories, type SkillCategory } from "@/lib/data"
import { Badge, type BadgeProps } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const colorMap: Record<string, BadgeProps["variant"]> = {
  violet: "violet",
  sky: "sky",
  emerald: "emerald",
  amber: "amber",
  rose: "rose",
  indigo: "indigo",
}

function SkillGroup({ group, index }: { group: SkillCategory; index: number }) {
  const variant = colorMap[group.color] ?? "default"

  return (
    <AnimatedSection delay={index * 80}>
      <div className="flex gap-4 items-start">
        {/* Category label */}
        <div className="w-32 shrink-0 pt-0.5">
          <span
            className={cn(
              "text-xs font-mono uppercase tracking-wider",
              group.color === "violet" && "text-violet-400",
              group.color === "sky" && "text-sky-400",
              group.color === "emerald" && "text-emerald-400",
              group.color === "amber" && "text-amber-400",
              group.color === "rose" && "text-rose-400",
              group.color === "indigo" && "text-indigo-400"
            )}
          >
            {group.category}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 flex-1">
          {group.skills.map((skill) => (
            <Badge
              key={skill}
              variant={variant}
              className="cursor-default hover:scale-105 transition-transform duration-150"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

export function SkillsSection() {
  const t = useTranslations("skills")

  return (
    <section id="skills" className="py-24 max-w-6xl mx-auto px-6">
      <AnimatedSection>
        <SectionHeader title={t("title")} />
      </AnimatedSection>

      <div className="space-y-6 max-w-3xl">
        {skillCategories.map((group, i) => (
          <SkillGroup key={group.category} group={group} index={i} />
        ))}
      </div>
    </section>
  )
}
