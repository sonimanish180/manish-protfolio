"use client"

import { useRef } from "react"
import { useTranslations } from "next-intl"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { SectionHeader } from "@/components/composite/section-header"
import { AnimatedSection } from "@/components/composite/animated-section"
import { projects } from "@/lib/data"
import { TrendingUpIcon, BuildingIcon } from "@/icons"

/** Card3D — Kinetic × Aurora: glass card with 3D mouse-tilt. */
function Card3D({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [6, -6])
  const rotateY = useTransform(x, [-100, 100], [-6, 6])

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }
  function onMouseLeave() { x.set(0); y.set(0) }

  return (
    <div style={{ perspective: 900 }}>
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="glass-card rounded-2xl h-full"
      >
        {children}
      </motion.div>
    </div>
  )
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  return (
    <AnimatedSection delay={index * 65}>
      <Card3D>
        <div className="p-6 flex flex-col h-full min-h-[280px]">
          {/* Company */}
          <div className="flex items-center gap-2 mb-4">
            <BuildingIcon className="w-3 h-3 text-foreground/35" />
            <span className="text-xs font-mono text-foreground/35 tracking-wider">
              {project.company}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-foreground mb-3 text-base leading-snug">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-foreground/60 leading-relaxed flex-1 mb-5">
            {project.description}
          </p>

          {/* Impact badge */}
          {project.impact && (
            <div className="flex items-center gap-2 mb-4 text-xs rounded-xl px-3 py-2 bg-emerald-50/80 border border-emerald-200/60 text-emerald-700">
              <TrendingUpIcon className="w-3 h-3 shrink-0" />
              <span>{project.impact}</span>
            </div>
          )}

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs"
                style={{
                  background: "rgba(109, 91, 255, 0.08)",
                  border: "1px solid rgba(109, 91, 255, 0.18)",
                  color: "hsl(238, 60%, 48%)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Card3D>
    </AnimatedSection>
  )
}

export function ProjectsSection() {
  const t = useTranslations("projects")

  return (
    <section id="projects" className="py-28">
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
