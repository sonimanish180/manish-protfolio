"use client"

import { useState, useOptimistic, useTransition } from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { LayerReveal } from "@/components/composite/layer-reveal"
import { TiltCard3D } from "@/components/ui/tilt-card-3d"
import { projects } from "@/lib/data"
import { simulateApiCall } from "@/lib/simulate"
import { TrendingUpIcon, BuildingIcon, BookmarkIcon, BookmarkCheckIcon } from "@/icons"
import { useInteractionsStore } from "@/stores"

/* ── Bookmark button with optimistic burst ── */
function BookmarkButton({ projectId }: { projectId: string }) {
  const { bookmarkedIds, pendingBookmarks, toggleBookmark } = useInteractionsStore()
  const isBookmarked = bookmarkedIds.has(projectId)
  const isPending = pendingBookmarks.has(projectId)
  const [optimistic, addOptimistic] = useOptimistic(isBookmarked, (_, v: boolean) => v)
  const [, startTransition] = useTransition()
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
        whileTap={{ scale: 0.78 }}
        animate={optimistic ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
        className="p-2 rounded-lg transition-colors duration-200 cursor-pointer"
        style={{
          color: optimistic ? "hsl(var(--primary))" : "hsl(var(--text-muted))",
          background: optimistic ? "rgba(0,255,218,0.08)" : "transparent",
        }}
        aria-label={optimistic ? "Remove bookmark" : "Bookmark project"}
      >
        {optimistic
          ? <BookmarkCheckIcon className="w-4 h-4" />
          : <BookmarkIcon className="w-4 h-4" strokeWidth={1.5} />
        }
      </motion.button>
      <AnimatePresence>
        {burst && (
          <motion.div key="burst" initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{ scale: [0, 1, 0.5], x: Math.cos((i / 6) * Math.PI * 2) * 16, y: Math.sin((i / 6) * Math.PI * 2) * 16, opacity: 0 }}
                transition={{ duration: 0.45, delay: i * 0.03 }}
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

function BookmarkCount() {
  const { bookmarkedIds } = useInteractionsStore()
  const count = bookmarkedIds.size
  if (count === 0) return null
  return (
    <motion.span
      key={count}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 25 }}
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold"
      style={{ background: "rgba(0,255,218,0.08)", border: "1px solid rgba(0,255,218,0.2)", color: "hsl(var(--primary))" }}
    >
      <BookmarkCheckIcon className="w-3 h-3" />
      {count} saved
    </motion.span>
  )
}

/* ── Featured project card (full-width) ── */
function FeaturedCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <LayerReveal delay={60}>
      <TiltCard3D intensity={6} glare shadow className="rounded-2xl w-full">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "hsl(var(--surface))",
            border: "1px solid rgba(0,255,218,0.12)",
          }}
        >
          {/* Top accent bar */}
          <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(174,100%,50%), hsl(38,92%,58%))" }} />

          <div className="p-8 grid md:grid-cols-[1fr_auto] gap-8 items-start">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(0,255,218,0.08)", border: "1px solid rgba(0,255,218,0.16)", color: "hsl(var(--primary))" }}
                >
                  Featured
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "hsl(var(--text-muted))" }}>
                  <BuildingIcon className="w-3 h-3" />
                  {project.company}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-black mb-4 leading-tight" style={{ color: "hsl(var(--text-heading))" }}>
                {project.title}
              </h3>
              <p className="text-base leading-relaxed max-w-2xl mb-6" style={{ color: "hsl(var(--text-body))" }}>
                {project.description}
              </p>

              {project.impact && (
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm mb-6"
                  style={{ background: "rgba(0,255,218,0.07)", border: "1px solid rgba(0,255,218,0.14)", color: "hsl(174,80%,62%)" }}
                >
                  <TrendingUpIcon className="w-3.5 h-3.5 shrink-0" />
                  {project.impact}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full font-mono"
                    style={{ background: "hsl(var(--surface-2))", border: "1px solid rgba(0,255,218,0.1)", color: "hsl(var(--text-muted))" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <BookmarkButton projectId={project.title} />
          </div>
        </div>
      </TiltCard3D>
    </LayerReveal>
  )
}

/* ── Regular project card ── */
function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  return (
    <LayerReveal delay={index * 55}>
      <TiltCard3D intensity={10} glare shadow className="rounded-2xl h-full">
        <div
          className="relative rounded-2xl p-6 flex flex-col h-full group"
          style={{
            background: "hsl(var(--surface))",
            border: "1px solid var(--card-border)",
            transition: "border-color 0.3s",
          }}
        >
          {/* Hover top gradient */}
          <div
            className="absolute top-0 inset-x-0 h-px rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,218,0.5), transparent)" }}
          />

          <div className="flex items-start justify-between mb-4">
            <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "hsl(var(--text-muted))" }}>
              <BuildingIcon className="w-3 h-3" />
              {project.company}
            </span>
            <BookmarkButton projectId={project.title} />
          </div>

          <h3 className="font-bold text-base leading-snug mb-3" style={{ color: "hsl(var(--text-heading))" }}>
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "hsl(var(--text-body))" }}>
            {project.description}
          </p>

          {project.impact && (
            <div
              className="flex items-center gap-1.5 mb-4 text-xs px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(0,255,218,0.06)", border: "1px solid rgba(0,255,218,0.1)", color: "hsl(174,80%,62%)" }}
            >
              <TrendingUpIcon className="w-3 h-3 shrink-0" />
              {project.impact}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.tech.map(t => (
              <span
                key={t}
                className="text-[11px] px-2.5 py-0.5 rounded-full font-mono"
                style={{ background: "hsl(var(--surface-2))", border: "1px solid rgba(0,255,218,0.08)", color: "hsl(var(--text-dim))" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </TiltCard3D>
    </LayerReveal>
  )
}

export function ProjectsSection() {
  const t = useTranslations("projects")
  const [featured, ...rest] = projects

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

        <LayerReveal>
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <span className="section-label">{t("title")}</span>
            <BookmarkCount />
          </div>
        </LayerReveal>

        <div className="space-y-5">
          {/* Featured */}
          {featured && <FeaturedCard project={featured} />}

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
