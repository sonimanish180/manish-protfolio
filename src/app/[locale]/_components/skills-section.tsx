"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/composite/section-header"
import { AnimatedSection } from "@/components/composite/animated-section"
import { skillCategories, type SkillCategory } from "@/lib/data"

function SkillGroup({ group, index }: { group: SkillCategory; index: number }) {
  return (
    <AnimatedSection delay={index * 70}>
      <div className="flex gap-5 items-start">
        {/* Category label */}
        <div className="w-28 shrink-0 pt-1.5">
          <span className="text-xs font-mono uppercase tracking-wider text-foreground/40">
            {group.category}
          </span>
        </div>

        {/* Skill pills */}
        <div className="flex flex-wrap gap-2 flex-1">
          {group.skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.08, y: -2 }}
              className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium cursor-default glass border-white/35"
              style={{ color: "hsl(238, 60%, 40%)" }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

export function SkillsSection() {
  const t = useTranslations("skills")

  return (
    <section id="skills" className="py-28 max-w-6xl mx-auto px-6">
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
