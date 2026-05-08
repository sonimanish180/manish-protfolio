"use client"

import { useOptimistic, useTransition, useState } from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { LayerReveal } from "@/components/composite/layer-reveal"
import { skillCategories } from "@/lib/data"
import { simulateApiCall } from "@/lib/simulate"
import { ThumbsUpIcon } from "@/icons"
import { useInteractionsStore } from "@/stores"

/* ── Per-category accent colour ── */
const CATEGORY_COLORS: Record<string, { accent: string; glow: string; bg: string }> = {
  Languages:       { accent: "hsl(271,70%,68%)",  glow: "rgba(139,92,246,0.18)",  bg: "rgba(139,92,246,0.07)" },
  Frontend:        { accent: "hsl(199,89%,62%)",  glow: "rgba(56,189,248,0.18)",  bg: "rgba(56,189,248,0.07)" },
  Mobile:          { accent: "hsl(160,60%,55%)",  glow: "rgba(52,211,153,0.18)",  bg: "rgba(52,211,153,0.07)" },
  Backend:         { accent: "hsl(38,92%,60%)",   glow: "rgba(245,166,35,0.18)",  bg: "rgba(245,166,35,0.07)" },
  "Cloud & Infra": { accent: "hsl(0,72%,64%)",    glow: "rgba(239,68,68,0.18)",   bg: "rgba(239,68,68,0.07)"  },
  Expertise:       { accent: "hsl(174,100%,50%)", glow: "rgba(0,255,218,0.18)",   bg: "rgba(0,255,218,0.07)"  },
}

/* ── Endorsable pill with category-aware colour ── */
function EndorsablePill({
  skill,
  animDelay,
  categoryAccent,
  categoryGlow,
  categoryBg,
}: {
  skill: string
  animDelay: number
  categoryAccent: string
  categoryGlow: string
  categoryBg: string
}) {
  const { endorsements, endorsedSkills, pendingEndorsements, endorseSkill } = useInteractionsStore()
  const baseCount = endorsements[skill] ?? 0
  const isEndorsed = endorsedSkills.has(skill)
  const isPending = pendingEndorsements.has(skill)

  const [optimisticCount, addOptimistic] = useOptimistic(baseCount, (_: number, next: number) => next)
  const [optimisticEndorsed, addOptimisticEndorsed] = useOptimistic(isEndorsed, (_: boolean, v: boolean) => v)
  const [, startTransition] = useTransition()
  const [floating, setFloating] = useState(false)

  const handleEndorse = () => {
    if (isPending || isEndorsed) return
    setFloating(true)
    setTimeout(() => setFloating(false), 700)
    startTransition(async () => {
      addOptimistic(baseCount + 1)
      addOptimisticEndorsed(true)
      await endorseSkill(skill, () => simulateApiCall(0.92, 900))
    })
  }

  return (
    <div className="relative inline-flex">
      <motion.button
        onClick={handleEndorse}
        initial={{ opacity: 0, scale: 0.85, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, delay: animDelay, ease: [0.16, 1, 0.3, 1] }}
        whileHover={!optimisticEndorsed ? { scale: 1.07, y: -2 } : {}}
        whileTap={!optimisticEndorsed ? { scale: 0.94 } : {}}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
        style={{
          background: optimisticEndorsed ? categoryBg : "hsl(var(--surface-2))",
          border: `1px solid ${optimisticEndorsed ? categoryAccent + "55" : "rgba(0,255,218,0.1)"}`,
          color: optimisticEndorsed ? categoryAccent : "hsl(var(--text-body))",
          cursor: optimisticEndorsed ? "default" : "pointer",
          boxShadow: optimisticEndorsed ? `0 0 18px ${categoryGlow}` : undefined,
        }}
        disabled={optimisticEndorsed || isPending}
      >
        {skill}
        <AnimatePresence>
          {(optimisticEndorsed || optimisticCount > 0) && (
            <motion.span
              key="count"
              initial={{ opacity: 0, scale: 0.5, width: 0 }}
              animate={{ opacity: 1, scale: 1, width: "auto" }}
              className="inline-flex items-center gap-0.5"
              style={{ color: categoryAccent }}
            >
              <ThumbsUpIcon className="w-3 h-3" />
              <span className="font-mono text-[11px]">{optimisticCount}</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {floating && (
          <motion.span
            key="plus1"
            initial={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            animate={{ opacity: 0, y: -28, x: "-50%", scale: 1.2 }}
            exit={{}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute -top-1 left-1/2 pointer-events-none text-xs font-bold font-mono"
            style={{ color: categoryAccent }}
          >
            +1
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Total endorsements pill ── */
function EndorsementCount() {
  const { endorsements } = useInteractionsStore()
  const total = Object.values(endorsements).reduce((a, b) => a + b, 0)
  if (total === 0) return null
  return (
    <motion.span
      key={total}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold"
      style={{
        background: "rgba(0,255,218,0.08)",
        border: "1px solid rgba(0,255,218,0.2)",
        color: "hsl(var(--primary))",
      }}
    >
      <ThumbsUpIcon className="w-3 h-3" />
      {total} endorsements
    </motion.span>
  )
}

export function SkillsSection() {
  const t = useTranslations("skills")

  /* running pill index for stagger delay */
  let globalIndex = 0

  return (
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

        {/* Header */}
        <LayerReveal>
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <span className="section-label">{t("title")}</span>
            <EndorsementCount />
            <div className="ml-auto text-xs font-mono" style={{ color: "hsl(var(--text-dim))" }}>
              click any skill to endorse ↑
            </div>
          </div>
        </LayerReveal>

        {/* ── Tag cloud: category rows ── */}
        <div className="space-y-8">
          {skillCategories.map((group, groupIdx) => {
            const color = CATEGORY_COLORS[group.category] ?? CATEGORY_COLORS.Expertise
            return (
              <LayerReveal key={group.category} delay={groupIdx * 55}>
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">

                  {/* Category label — fixed width anchor */}
                  <div className="flex-shrink-0 sm:w-[150px] flex sm:flex-col items-center sm:items-start gap-2 sm:gap-1.5 pt-0.5">
                    <span
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-mono font-semibold tracking-wider whitespace-nowrap"
                      style={{
                        background: color.bg,
                        border: `1px solid ${color.accent}33`,
                        color: color.accent,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: color.accent, boxShadow: `0 0 6px ${color.accent}` }}
                      />
                      {group.category}
                    </span>
                    <span className="text-[10px] font-mono hidden sm:block" style={{ color: "hsl(var(--text-dim))" }}>
                      {group.skills.length} skill{group.skills.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Divider (desktop only) */}
                  <div
                    className="hidden sm:block flex-shrink-0 w-px self-stretch mt-1"
                    style={{ background: `linear-gradient(to bottom, ${color.accent}22, transparent)` }}
                  />

                  {/* Pills */}
                  <div className="flex flex-wrap gap-2.5">
                    {group.skills.map((skill) => {
                      const delay = (globalIndex++ * 0.04)
                      return (
                        <EndorsablePill
                          key={skill}
                          skill={skill}
                          animDelay={delay}
                          categoryAccent={color.accent}
                          categoryGlow={color.glow}
                          categoryBg={color.bg}
                        />
                      )
                    })}
                  </div>
                </div>

                {/* Row divider */}
                {groupIdx < skillCategories.length - 1 && (
                  <div
                    className="mt-8 h-px"
                    style={{ background: "linear-gradient(to right, rgba(0,255,218,0.06), transparent 60%)" }}
                  />
                )}
              </LayerReveal>
            )
          })}
        </div>

      </div>
    </section>
  )
}
