"use client"

import { useRef, useState, useOptimistic, useTransition } from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { SectionHeader } from "@/components/composite/section-header"
import { LayerReveal } from "@/components/composite/layer-reveal"
import { projects } from "@/lib/data"
import { simulateApiCall } from "@/lib/simulate"
import { TrendingUpIcon, BuildingIcon, BookmarkIcon, BookmarkCheckIcon } from "@/icons"
import { useInteractionsStore } from "@/stores"

/** Card3D — 3D mouse-tilt + primary glow on hover */
function Card3D({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [5, -5])
  const rotateY = useTransform(x, [-100, 100], [-5, 5])

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" } as any}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="veil-card rounded-2xl h-full"
      >
        {children}
      </motion.div>
    </div>
  )
}

/** BookmarkButton — Optimistic UI: fills instantly, rolls back on failure */
function BookmarkButton({ projectId }: { projectId: string }) {
  const { bookmarkedIds, pendingBookmarks, toggleBookmark } = useInteractionsStore()
  const isBookmarked = bookmarkedIds.has(projectId)
  const isPending = pendingBookmarks.has(projectId)

  // Local optimistic layer on top of Zustand
  const [optimistic, addOptimistic] = useOptimistic(isBookmarked, (_, v: boolean) => v)
  const [, startTransition] = useTransition()

  // Burst particle state
  const [burst, setBurst] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isPending) return

    const next = !isBookmarked
    if (next) { setBurst(true); setTimeout(() => setBurst(false), 600) }

    startTransition(async () => {
      addOptimistic(next)
      await toggleBookmark(projectId, () => simulateApiCall(0.92, 900))
    })
  }

  return (
    <div className="relative">
      <motion.button
        onClick={handleClick}
        whileTap={{ scale: 0.80 }}
        animate={optimistic
          ? { scale: [1, 1.35, 1], rotate: [0, -12, 8, 0] }
          : { scale: 1, rotate: 0 }
        }
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative p-1.5 rounded-lg transition-colors duration-200 cursor-pointer"
        style={{
          color: optimistic ? "hsl(var(--primary))" : "hsl(var(--text-muted))",
          background: optimistic ? "var(--impact-bg)" : "transparent",
        }}
        aria-label={optimistic ? "Remove bookmark" : "Bookmark project"}
        aria-pressed={optimistic}
      >
        {optimistic
          ? <BookmarkCheckIcon className="w-4 h-4" strokeWidth={2} />
          : <BookmarkIcon className="w-4 h-4" strokeWidth={1.5} />
        }
      </motion.button>

      {/* Burst particles on bookmark */}
      <AnimatePresence>
        {burst && (
          <motion.div
            key="burst"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1, 0.5],
                  x: Math.cos((i / 6) * Math.PI * 2) * 18,
                  y: Math.sin((i / 6) * Math.PI * 2) * 18,
                  opacity: 0,
                }}
                transition={{ duration: 0.5, delay: i * 0.03, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full -translate-x-1/2 -translate-y-1/2"
                style={{ background: "hsl(var(--primary))" }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Bookmarks counter shown in section header */
function BookmarkCount() {
  const { bookmarkedIds } = useInteractionsStore()
  const count = bookmarkedIds.size
  if (count === 0) return null

  return (
    <motion.span
      key={count}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 25 }}
      className="inline-flex items-center gap-1.5 ml-3 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold"
      style={{
        background: "var(--impact-bg)",
        border: "1px solid var(--card-border-hover)",
        color: "hsl(var(--primary))",
      }}
    >
      <BookmarkCheckIcon className="w-3 h-3" />
      {count} saved
    </motion.span>
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
    <LayerReveal delay={index * 65}>
      <Card3D>
        <div className="p-6 flex flex-col h-full min-h-[280px]">
          {/* Company + bookmark row */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <BuildingIcon className="w-3 h-3" style={{ color: "hsl(var(--text-muted))" }} />
              <span className="text-xs font-mono tracking-wider" style={{ color: "hsl(var(--text-muted))" }}>
                {project.company}
              </span>
            </div>
            {/* ── Optimistic bookmark ── */}
            <BookmarkButton projectId={project.title} />
          </div>

          {/* Title */}
          <h3 className="font-bold mb-3 text-base leading-snug" style={{ color: "hsl(var(--text-heading))" }}>
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "hsl(var(--text-body))" }}>
            {project.description}
          </p>

          {/* Impact badge */}
          {project.impact && (
            <div
              className="flex items-center gap-2 mb-4 text-xs rounded-xl px-3 py-2"
              style={{
                background: "var(--impact-bg)",
                border: "1px solid var(--impact-border)",
                color: "hsl(var(--impact-text))",
              }}
            >
              <TrendingUpIcon className="w-3 h-3 shrink-0" />
              <span>{project.impact}</span>
            </div>
          )}

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.tech.map((tech) => (
              <span key={tech} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs mono-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Card3D>
    </LayerReveal>
  )
}

export function ProjectsSection() {
  const t = useTranslations("projects")

  return (
    <section id="projects" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <LayerReveal>
          <div className="flex items-center">
            <SectionHeader title={t("title")} className="mb-0 mr-0" />
            <BookmarkCount />
          </div>
        </LayerReveal>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
