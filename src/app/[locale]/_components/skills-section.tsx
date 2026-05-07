"use client"

import { useState, useOptimistic, useTransition } from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { SectionHeader } from "@/components/composite/section-header"
import { LayerReveal } from "@/components/composite/layer-reveal"
import { skillCategories, type SkillCategory } from "@/lib/data"
import { simulateApiCall } from "@/lib/simulate"
import { ThumbsUpIcon } from "@/icons"
import { useInteractionsStore } from "@/stores"

/** EndorsablePill — Optimistic endorsement with floating +1 animation */
function EndorsablePill({ skill, animDelay }: { skill: string; animDelay: number }) {
  const { endorsements, endorsedSkills, pendingEndorsements, endorseSkill } = useInteractionsStore()
  const baseCount = endorsements[skill] ?? 0
  const isEndorsed = endorsedSkills.has(skill)
  const isPending = pendingEndorsements.has(skill)

  // Local optimistic layer: count flips immediately
  const [optimisticCount, addOptimistic] = useOptimistic(baseCount, (_: number, next: number) => next)
  const [optimisticEndorsed, addOptimisticEndorsed] = useOptimistic(isEndorsed, (_: boolean, v: boolean) => v)
  const [, startTransition] = useTransition()

  // "+1" float-up particle
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
        initial={{ opacity: 0, scale: 0.88 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: animDelay, ease: [0.16, 1, 0.3, 1] }}
        whileHover={!optimisticEndorsed ? { scale: 1.08, y: -2 } : {}}
        whileTap={!optimisticEndorsed ? { scale: 0.93 } : {}}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium skill-tag transition-all duration-200"
        style={{
          cursor: optimisticEndorsed ? "default" : "pointer",
          borderColor: optimisticEndorsed ? "hsl(var(--primary) / 0.4)" : undefined,
          background: optimisticEndorsed ? "var(--impact-bg)" : undefined,
        }}
        aria-label={optimisticEndorsed ? `${skill} endorsed` : `Endorse ${skill}`}
        aria-pressed={optimisticEndorsed}
        disabled={optimisticEndorsed || isPending}
      >
        {skill}

        {/* Endorsement count + thumb */}
        <AnimatePresence>
          {(optimisticEndorsed || optimisticCount > 0) && (
            <motion.span
              key="count"
              initial={{ opacity: 0, scale: 0.6, width: 0 }}
              animate={{ opacity: 1, scale: 1, width: "auto" }}
              exit={{ opacity: 0, scale: 0.6, width: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
              className="inline-flex items-center gap-0.5 ml-0.5"
              style={{ color: "hsl(var(--primary))" }}
            >
              <ThumbsUpIcon className="w-2.5 h-2.5" />
              <span className="font-mono text-[10px]">{optimisticCount}</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Floating "+1" */}
      <AnimatePresence>
        {floating && (
          <motion.span
            key="plus1"
            initial={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            animate={{ opacity: 0, y: -28, x: "-50%", scale: 1.15 }}
            exit={{}}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="absolute -top-1 left-1/2 pointer-events-none text-[11px] font-bold font-mono select-none"
            style={{ color: "hsl(var(--primary))" }}
          >
            +1
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Total endorsements counter shown in section header */
function EndorsementCount() {
  const { endorsements } = useInteractionsStore()
  const total = Object.values(endorsements).reduce((a, b) => a + b, 0)
  if (total === 0) return null

  return (
    <motion.span
      key={total}
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
      <ThumbsUpIcon className="w-3 h-3" />
      {total} endorsed
    </motion.span>
  )
}

function SkillGroup({ group, index }: { group: SkillCategory; index: number }) {
  return (
    <LayerReveal delay={index * 70}>
      <div className="flex gap-5 items-start">
        {/* Category label */}
        <div className="w-28 shrink-0 pt-1.5">
          <span className="text-xs font-mono uppercase tracking-wider" style={{ color: "hsl(var(--text-muted))" }}>
            {group.category}
          </span>
        </div>

        {/* Skill pills — each endorsable */}
        <div className="flex flex-wrap gap-2 flex-1">
          {group.skills.map((skill, i) => (
            <EndorsablePill key={skill} skill={skill} animDelay={i * 0.04} />
          ))}
        </div>
      </div>
    </LayerReveal>
  )
}

export function SkillsSection() {
  const t = useTranslations("skills")

  return (
    <section id="skills" className="py-28 max-w-6xl mx-auto px-6">
      <LayerReveal>
        <div className="flex items-center">
          <SectionHeader title={t("title")} className="mb-0 mr-0" />
          <EndorsementCount />
        </div>
      </LayerReveal>
      <LayerReveal delay={40}>
        <p className="text-xs font-mono mt-3 mb-10" style={{ color: "hsl(var(--text-dim))" }}>
          Click any skill to endorse it ↑
        </p>
      </LayerReveal>
      <div className="space-y-6 max-w-3xl">
        {skillCategories.map((group, i) => (
          <SkillGroup key={group.category} group={group} index={i} />
        ))}
      </div>
    </section>
  )
}
