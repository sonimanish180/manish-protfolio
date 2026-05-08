"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { personalInfo, stats } from "@/lib/data"
import { ArrowRightIcon, MapPinIcon, ChevronDownIcon } from "@/icons"
import { MagneticButton } from "@/components/composite/magnetic-button"

const NeuralNet3D = dynamic(
  () => import("@/components/ui/neural-net-3d").then(m => ({ default: m.NeuralNet3D })),
  { ssr: false }
)
const PerspectiveGrid = dynamic(
  () => import("@/components/ui/perspective-grid").then(m => ({ default: m.PerspectiveGrid })),
  { ssr: false }
)

const ease = [0.16, 1, 0.3, 1]

function TypewriterRole({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState("")
  const [deleting, setDeleting] = useState(false)
  const [paused, setPaused] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    const current = roles[index] ?? ""
    if (paused) {
      const id = setTimeout(() => { setPaused(false); setDeleting(true) }, 2400)
      return () => clearTimeout(id)
    }
    if (deleting && text === "") { setDeleting(false); setIndex(i => (i + 1) % roles.length); return }
    if (!deleting && text === current) { setPaused(true); return }
    const id = setTimeout(
      () => setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1)),
      deleting ? 34 : 78
    )
    return () => clearTimeout(id)
  }, [text, deleting, paused, index, roles, mounted])

  return (
    <span>
      {mounted ? text : roles[0]}
      <span
        className="ml-0.5 inline-block w-0.5 h-[1em] align-middle rounded-full animate-cursor-blink"
        style={{ background: "hsl(var(--primary))" }}
      />
    </span>
  )
}

export function HeroSection() {
  const t = useTranslations("hero")
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* ── Full-bleed NeuralNet3D backdrop ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <NeuralNet3D nodeCount={42} connectionDensity={0.14} speed={0.65} />
      </div>

      {/* ── Perspective grid — bottom half ── */}
      <div className="absolute inset-x-0 bottom-0 h-[48%] pointer-events-none" aria-hidden>
        <PerspectiveGrid speed={0.3} cols={14} rows={16} className="opacity-[0.14] w-full h-full" />
      </div>

      {/* ── Cinematic vignette: dark edges, transparent centre ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 50% 48%, transparent 30%, hsl(217,50%,4%) 88%)",
        }}
        aria-hidden
      />

      {/* ── Corner glow accents ── */}
      <div
        className="absolute -top-40 -left-40 w-[560px] h-[560px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,255,218,0.06) 0%, transparent 65%)", filter: "blur(60px)" }}
        aria-hidden
      />
      <div
        className="absolute -bottom-40 -right-40 w-[480px] h-[480px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(245,166,35,0.05) 0%, transparent 65%)", filter: "blur(60px)" }}
        aria-hidden
      />

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-8 text-center flex flex-col items-center">

        {/* Available badge + location */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono font-medium tracking-widest uppercase"
            style={{
              background: "rgba(52,211,153,0.08)",
              border: "1px solid rgba(52,211,153,0.22)",
              color: "hsl(152,60%,65%)",
              backdropFilter: "blur(16px)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
            Available for opportunities
          </span>
          <span
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono"
            style={{ color: "hsl(var(--text-muted))" }}
          >
            <MapPinIcon className="w-3 h-3" style={{ color: "hsl(var(--primary))" }} />
            India · Remote
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.12, ease }}
          className="font-mono text-xs mb-5 tracking-[0.32em] uppercase"
          style={{ color: "hsl(var(--accent))" }}
        >
          {t("greeting")}
        </motion.p>

        {/* Name — fills the viewport width */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.18, ease }}
          className="font-black tracking-[-0.03em] leading-[0.86] mb-7 select-none"
          style={{ fontSize: "clamp(64px, 13vw, 148px)" }}
        >
          <span className="gradient-text block">{personalInfo.name.split(" ")[0]}</span>
          <span
            className="block"
            style={{
              color: "hsl(var(--text-heading))",
              WebkitTextStroke: "1px rgba(0,255,218,0.25)",
            }}
          >
            {personalInfo.name.split(" ")[1]}
          </span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35, ease }}
          className="text-base md:text-xl font-mono mb-5 h-8"
          style={{ color: "hsl(var(--primary))" }}
        >
          <TypewriterRole roles={personalInfo.roles} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45, ease }}
          className="text-sm md:text-base max-w-md leading-relaxed mb-10"
          style={{ color: "hsl(var(--text-body))" }}
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55, ease }}
          className="flex flex-wrap gap-3 justify-center mb-14"
        >
          <MagneticButton
            onClick={() => scrollTo("projects")}
            className="group inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl text-sm font-bold cursor-pointer gradient-btn"
          >
            View My Work
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollTo("contact")}
            className="inline-flex items-center justify-center h-12 px-8 rounded-xl text-sm font-semibold cursor-pointer gradient-btn-outline"
          >
            Get in Touch
          </MagneticButton>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.68, ease }}
          className="flex flex-wrap gap-8 md:gap-14 justify-center pt-8 w-full"
          style={{ borderTop: "1px solid rgba(0,255,218,0.08)" }}
        >
          {stats.map(s => (
            <div key={s.label} className="flex flex-col items-center gap-0.5">
              <span className="text-3xl md:text-4xl font-black font-mono gradient-text leading-none">{s.value}</span>
              <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: "hsl(var(--text-dim))" }}>
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={() => scrollTo("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer group"
        aria-label="Scroll to about"
      >
        <span
          className="text-[9px] font-mono tracking-[0.32em] uppercase transition-opacity group-hover:opacity-80"
          style={{ color: "hsl(var(--text-dim))" }}
        >
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDownIcon
            className="w-4 h-4 transition-opacity group-hover:opacity-80"
            style={{ color: "rgba(0,255,218,0.45)" }}
          />
        </motion.div>
      </motion.button>
    </section>
  )
}
