"use client"

import { useTranslations } from "next-intl"
import { SectionHeader } from "@/components/composite/section-header"
import { AnimatedSection } from "@/components/composite/animated-section"
import { projects } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { TrendingUpIcon, BuildingIcon } from "@/icons"

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  return (
    <AnimatedSection delay={index * 70}>
      <div className="group relative bg-card border border-border rounded-xl p-6 h-full flex flex-col hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-default">
        {/* Top glow on hover */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl" />

        {/* Company badge */}
        <div className="flex items-center gap-2 mb-3">
          <BuildingIcon className="w-3 h-3 text-muted-foreground/60" />
          <span className="text-xs font-mono text-muted-foreground/60">
            {project.company}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-200 text-base">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
          {project.description}
        </p>

        {/* Impact */}
        {project.impact && (
          <div className="flex items-center gap-2 mb-4 text-xs text-emerald-400 bg-emerald-500/5 border border-emerald-500/15 rounded-md px-3 py-2">
            <TrendingUpIcon className="w-3 h-3 shrink-0" />
            <span>{project.impact}</span>
          </div>
        )}

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tech.map((t) => (
            <Badge key={t} variant="muted" className="text-xs">
              {t}
            </Badge>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

export function ProjectsSection() {
  const t = useTranslations("projects")

  return (
    <section id="projects" className="py-24 bg-card/30">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <SectionHeader title={t("title")} />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
