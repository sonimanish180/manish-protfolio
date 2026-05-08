'use client'

import { useState, useOptimistic, useTransition } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { LayerReveal } from '@/components/composite/layer-reveal'
import { TiltCard3D } from '@/components/ui/tilt-card-3d'
import { projects } from '@/lib/data'
import { simulateApiCall } from '@/lib/simulate'
import { TrendingUpIcon, BuildingIcon, BookmarkIcon, BookmarkCheckIcon } from '@/icons'
import { useInteractionsStore } from '@/stores'

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
    if (next) {
      setBurst(true)
      setTimeout(() => setBurst(false), 600)
    }
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
        className="cursor-pointer rounded-lg p-2 transition-colors duration-200"
        style={{
          color: optimistic ? 'hsl(var(--primary))' : 'hsl(var(--text-muted))',
          background: optimistic ? 'rgba(0,255,218,0.08)' : 'transparent',
        }}
        aria-label={optimistic ? 'Remove bookmark' : 'Bookmark project'}
      >
        {optimistic ? (
          <BookmarkCheckIcon className="h-4 w-4" />
        ) : (
          <BookmarkIcon className="h-4 w-4" strokeWidth={1.5} />
        )}
      </motion.button>
      <AnimatePresence>
        {burst && (
          <motion.div
            key="burst"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute inset-0"
          >
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1, 0.5],
                  x: Math.cos((i / 6) * Math.PI * 2) * 16,
                  y: Math.sin((i / 6) * Math.PI * 2) * 16,
                  opacity: 0,
                }}
                transition={{ duration: 0.45, delay: i * 0.03 }}
                className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ background: 'hsl(var(--primary))' }}
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
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-semibold"
      style={{
        background: 'rgba(0,255,218,0.08)',
        border: '1px solid rgba(0,255,218,0.2)',
        color: 'hsl(var(--primary))',
      }}
    >
      <BookmarkCheckIcon className="h-3 w-3" />
      {count} saved
    </motion.span>
  )
}

/* ── Featured project card (full-width) ── */
function FeaturedCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <LayerReveal delay={60}>
      <TiltCard3D intensity={6} glare shadow className="w-full rounded-2xl">
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: 'hsl(var(--surface))',
            border: '1px solid rgba(0,255,218,0.12)',
          }}
        >
          {/* Top accent bar */}
          <div
            className="h-1 w-full"
            style={{ background: 'linear-gradient(90deg, hsl(174,100%,50%), hsl(38,92%,58%))' }}
          />

          <div className="grid items-start gap-8 p-8 md:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span
                  className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest"
                  style={{
                    background: 'rgba(0,255,218,0.08)',
                    border: '1px solid rgba(0,255,218,0.16)',
                    color: 'hsl(var(--primary))',
                  }}
                >
                  Featured
                </span>
                <span
                  className="flex items-center gap-1.5 font-mono text-xs"
                  style={{ color: 'hsl(var(--text-muted))' }}
                >
                  <BuildingIcon className="h-3 w-3" />
                  {project.company}
                </span>
              </div>

              <h3
                className="mb-4 text-2xl font-black leading-tight md:text-3xl"
                style={{ color: 'hsl(var(--text-heading))' }}
              >
                {project.title}
              </h3>
              <p
                className="mb-6 max-w-2xl text-base leading-relaxed"
                style={{ color: 'hsl(var(--text-body))' }}
              >
                {project.description}
              </p>

              {project.impact && (
                <div
                  className="mb-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm"
                  style={{
                    background: 'rgba(0,255,218,0.07)',
                    border: '1px solid rgba(0,255,218,0.14)',
                    color: 'hsl(174,80%,62%)',
                  }}
                >
                  <TrendingUpIcon className="h-3.5 w-3.5 shrink-0" />
                  {project.impact}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full px-3 py-1 font-mono text-xs"
                    style={{
                      background: 'hsl(var(--surface-2))',
                      border: '1px solid rgba(0,255,218,0.1)',
                      color: 'hsl(var(--text-muted))',
                    }}
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
      <TiltCard3D intensity={10} glare shadow className="h-full rounded-2xl">
        <div
          className="group relative flex h-full flex-col rounded-2xl p-6"
          style={{
            background: 'hsl(var(--surface))',
            border: '1px solid var(--card-border)',
            transition: 'border-color 0.3s',
          }}
        >
          {/* Hover top gradient */}
          <div
            className="absolute inset-x-0 top-0 h-px rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(0,255,218,0.5), transparent)',
            }}
          />

          <div className="mb-4 flex items-start justify-between">
            <span
              className="flex items-center gap-1.5 font-mono text-xs"
              style={{ color: 'hsl(var(--text-muted))' }}
            >
              <BuildingIcon className="h-3 w-3" />
              {project.company}
            </span>
            <BookmarkButton projectId={project.title} />
          </div>

          <h3
            className="mb-3 text-base font-bold leading-snug"
            style={{ color: 'hsl(var(--text-heading))' }}
          >
            {project.title}
          </h3>
          <p
            className="mb-5 flex-1 text-sm leading-relaxed"
            style={{ color: 'hsl(var(--text-body))' }}
          >
            {project.description}
          </p>

          {project.impact && (
            <div
              className="mb-4 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs"
              style={{
                background: 'rgba(0,255,218,0.06)',
                border: '1px solid rgba(0,255,218,0.1)',
                color: 'hsl(174,80%,62%)',
              }}
            >
              <TrendingUpIcon className="h-3 w-3 shrink-0" />
              {project.impact}
            </div>
          )}

          <div className="mt-auto flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full px-2.5 py-0.5 font-mono text-[11px]"
                style={{
                  background: 'hsl(var(--surface-2))',
                  border: '1px solid rgba(0,255,218,0.08)',
                  color: 'hsl(var(--text-dim))',
                }}
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
  const t = useTranslations('projects')
  const [featured, ...rest] = projects

  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <LayerReveal>
          <div className="mb-14 flex flex-wrap items-center gap-4">
            <span className="section-label">{t('title')}</span>
            <BookmarkCount />
          </div>
        </LayerReveal>

        <div className="space-y-5">
          {/* Featured */}
          {featured && <FeaturedCard project={featured} />}

          {/* Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
