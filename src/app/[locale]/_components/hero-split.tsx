"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { personalInfo, stats } from "@/lib/data"
import { ArrowRightIcon, MapPinIcon } from "@/icons"
import { MagneticButton } from "@/components/composite/magnetic-button"

const ParticleField = dynamic(
  () => import("@/components/ui/particle-field").then(m => ({ default: m.ParticleField })),
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
      <span className="ml-0.5 inline-block w-0.5 h-[1em] align-middle rounded-full animate-cursor-blink" style={{ background: "hsl(var(--primary))" }} />
    </span>
  )
}

export function HeroSplit() {
  const t = useTranslations("hero")
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(0,255,218,0.07), transparent 70%)", filter: "blur(60px)" }}/>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(245,166,35,0.05), transparent 70%)", filter: "blur(60px)" }}/>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16 py-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* LEFT: text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex flex-wrap items-center gap-3 mb-8"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono font-medium tracking-widest uppercase"
              style={{
                background: "rgba(52,211,153,0.08)",
                border: "1px solid rgba(52,211,153,0.22)",
                color: "hsl(152,60%,65%)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
              Available for opportunities
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-xs font-mono" style={{ color: "hsl(var(--text-muted))" }}>
              <MapPinIcon className="w-3 h-3" style={{ color: "hsl(var(--primary))" }} />
              India · Remote
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1, ease }}
            className="font-mono text-xs mb-4 tracking-[0.28em] uppercase"
            style={{ color: "hsl(var(--accent))" }}
          >
            {t("greeting")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="font-black tracking-[-0.03em] leading-[0.88] mb-6"
            style={{ fontSize: "clamp(52px, 8vw, 112px)" }}
          >
            <span className="gradient-text block">{personalInfo.name.split(" ")[0]}</span>
            <span className="block" style={{ color: "hsl(var(--text-heading))", WebkitTextStroke: "1px rgba(0,255,218,0.2)" }}>
              {personalInfo.name.split(" ")[1]}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3, ease }}
            className="text-base font-mono mb-4 h-7"
            style={{ color: "hsl(var(--primary))" }}
          >
            <TypewriterRole roles={personalInfo.roles} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.38, ease }}
            className="text-sm leading-relaxed mb-8 max-w-sm"
            style={{ color: "hsl(var(--text-body))" }}
          >
            {personalInfo.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.46, ease }}
            className="flex flex-wrap gap-3 mb-10"
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

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.56, ease }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8"
            style={{ borderTop: "1px solid rgba(0,255,218,0.08)" }}
          >
            {stats.map(s => (
              <div key={s.label} className="flex flex-col gap-0.5">
                <span className="text-2xl font-black font-mono gradient-text leading-none">{s.value}</span>
                <span className="text-[9px] font-mono tracking-widest uppercase" style={{ color: "hsl(var(--text-dim))" }}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: 3D visual panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="relative hidden lg:block"
        >
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              height: "520px",
              background: "hsl(var(--surface))",
              border: "1px solid rgba(0,255,218,0.12)",
              boxShadow: "0 0 80px rgba(0,255,218,0.06), 0 32px 80px rgba(0,0,0,0.4)",
            }}
          >
            <ParticleField />

            {/* Corner badge */}
            <div
              className="absolute bottom-5 left-0 right-0 text-center text-[10px] font-mono tracking-widest uppercase pointer-events-none"
              style={{ color: "rgba(0,255,218,0.25)" }}
            >
              particle · field
            </div>
          </div>

          {/* Floating info chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="absolute -left-6 top-12 px-3 py-2 rounded-xl text-xs font-mono"
            style={{
              background: "hsl(var(--surface))",
              border: "1px solid rgba(0,255,218,0.18)",
              color: "hsl(var(--primary))",
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            }}
          >
            ⚡ Next.js 15
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            className="absolute -right-4 bottom-20 px-3 py-2 rounded-xl text-xs font-mono"
            style={{
              background: "hsl(var(--surface))",
              border: "1px solid rgba(245,166,35,0.25)",
              color: "hsl(38,92%,60%)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            }}
          >
            🔥 Golang
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
