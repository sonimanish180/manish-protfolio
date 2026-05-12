'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { LayerReveal } from '@/components/composite/layer-reveal'
import { AnimatedCounter } from '@/components/composite/animated-counter'
import { personalInfo, stats, education, skillCategories } from '@/lib/data'

const DOMAINS = ['Fintech', 'Blockchain', 'Web3', 'KYC / ID-tech', 'Edtech']

type CardData = {
  id: string
  frontLabel: string
  frontSub: string
  frontAccent: string
  backContent: React.ReactNode
}

function buildCards(bio: string): CardData[] {
  return [
    {
      id: 'bio',
      frontLabel: 'Who I Am',
      frontSub: personalInfo.title,
      frontAccent: 'hsl(var(--primary))',
      backContent: (
        <p className="text-xs leading-relaxed" style={{ color: 'hsl(var(--text-body))' }}>
          {bio}
        </p>
      ),
    },
    {
      id: 'domains',
      frontLabel: 'Domains',
      frontSub: `${DOMAINS.length} industries`,
      frontAccent: 'hsl(173,80%,60%)',
      backContent: (
        <div className="flex flex-wrap gap-1.5">
          {DOMAINS.map((d) => (
            <span
              key={d}
              className="rounded-full px-2 py-0.5 font-mono text-[10px]"
              style={{
                background: 'rgba(0,255,218,0.08)',
                border: '1px solid rgba(0,255,218,0.16)',
                color: 'hsl(var(--primary))',
              }}
            >
              {d}
            </span>
          ))}
        </div>
      ),
    },
    {
      id: 'skills-1',
      frontLabel: skillCategories[0]?.category ?? 'Skills',
      frontSub: `${skillCategories[0]?.skills.length ?? 0} technologies`,
      frontAccent: 'hsl(250,80%,70%)',
      backContent: (
        <div className="flex flex-wrap gap-1.5">
          {skillCategories[0]?.skills.map((s) => (
            <span
              key={s}
              className="rounded-full px-2 py-0.5 font-mono text-[10px]"
              style={{
                background: 'rgba(139,92,246,0.1)',
                border: '1px solid rgba(139,92,246,0.2)',
                color: 'hsl(250,80%,75%)',
              }}
            >
              {s}
            </span>
          ))}
        </div>
      ),
    },
    {
      id: 'skills-2',
      frontLabel: skillCategories[1]?.category ?? 'More Skills',
      frontSub: `${skillCategories[1]?.skills.length ?? 0} technologies`,
      frontAccent: 'hsl(220,80%,70%)',
      backContent: (
        <div className="flex flex-wrap gap-1.5">
          {skillCategories[1]?.skills.map((s) => (
            <span
              key={s}
              className="rounded-full px-2 py-0.5 font-mono text-[10px]"
              style={{
                background: 'rgba(59,130,246,0.1)',
                border: '1px solid rgba(59,130,246,0.2)',
                color: 'hsl(220,80%,75%)',
              }}
            >
              {s}
            </span>
          ))}
        </div>
      ),
    },
    {
      id: 'stats',
      frontLabel: 'By the Numbers',
      frontSub: `${stats.length} metrics`,
      frontAccent: 'hsl(35,90%,65%)',
      backContent: (
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-0.5">
              <span className="gradient-text font-mono text-xl font-black leading-none">
                <AnimatedCounter value={s.value} />
              </span>
              <span
                className="font-mono text-[9px] uppercase leading-tight tracking-widest"
                style={{ color: 'hsl(var(--text-dim))' }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'education',
      frontLabel: 'Education',
      frontSub: education.shortName,
      frontAccent: 'hsl(152,60%,60%)',
      backContent: (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold" style={{ color: 'hsl(var(--text-heading))' }}>
            {education.institution}
          </p>
          <p className="text-xs" style={{ color: 'hsl(var(--text-body))' }}>
            {education.degree}
          </p>
          <p className="font-mono text-xs" style={{ color: 'hsl(var(--text-muted))' }}>
            {education.period}
          </p>
        </div>
      ),
    },
  ]
}

function FlipCard({ card, index }: { card: CardData; index: number }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <LayerReveal delay={index * 50}>
      <div
        className="h-48 cursor-pointer"
        style={{ perspective: '1000px' }}
        onClick={() => setFlipped((f) => !f)}
      >
        <motion.div
          className="relative h-full w-full"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex flex-col justify-between rounded-2xl p-6"
            style={{
              backfaceVisibility: 'hidden',
              background: 'hsl(var(--surface))',
              border: '1px solid rgba(0,255,218,0.1)',
            }}
          >
            <div
              className="h-8 w-8 rounded-lg"
              style={{
                background: `${card.frontAccent}22`,
                border: `1px solid ${card.frontAccent}44`,
              }}
            >
              <div
                className="m-1.5 h-5 w-5 rounded"
                style={{ background: card.frontAccent, opacity: 0.7 }}
              />
            </div>
            <div>
              <p className="text-base font-bold" style={{ color: 'hsl(var(--text-heading))' }}>
                {card.frontLabel}
              </p>
              <p className="font-mono text-xs" style={{ color: 'hsl(var(--text-muted))' }}>
                {card.frontSub}
              </p>
            </div>
            <p
              className="font-mono text-[9px] uppercase tracking-widest"
              style={{ color: 'hsl(var(--text-dim))' }}
            >
              hover / tap to flip
            </p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col justify-center gap-3 overflow-hidden rounded-2xl p-6"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'hsl(var(--surface-2))',
              border: `1px solid ${card.frontAccent}33`,
            }}
          >
            <p
              className="mb-1 font-mono text-[9px] uppercase tracking-widest"
              style={{ color: card.frontAccent }}
            >
              {card.frontLabel}
            </p>
            {card.backContent}
          </div>
        </motion.div>
      </div>
    </LayerReveal>
  )
}

export function AboutFlipCards() {
  const t = useTranslations('about')
  const cards = buildCards(t('bio'))

  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <LayerReveal>
          <div className="mb-6 flex items-center gap-4">
            <span className="section-label">{t('title')}</span>
            <div
              className="h-px max-w-[120px] flex-1"
              style={{ background: 'linear-gradient(to right, rgba(0,255,218,0.2), transparent)' }}
            />
          </div>
          <p className="mb-14 text-2xl font-bold" style={{ color: 'hsl(var(--text-heading))' }}>
            {personalInfo.tagline}
          </p>
        </LayerReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <FlipCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
