"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { personalInfo } from "@/lib/data"
import { ArrowRightIcon } from "@/icons"
import { MagneticButton } from "@/components/composite/magnetic-button"

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
    if (deleting && text === "") {
      setDeleting(false)
      setIndex((i) => (i + 1) % roles.length)
      return
    }
    if (!deleting && text === current) { setPaused(true); return }
    const id = setTimeout(() => {
      setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1))
    }, deleting ? 36 : 82)
    return () => clearTimeout(id)
  }, [text, deleting, paused, index, roles, mounted])

  return (
    <span className="gradient-text-soft font-semibold">
      {mounted ? text : roles[0]}
      <span
        className="ml-0.5 inline-block w-0.5 h-6 align-middle rounded-full animate-cursor-blink"
        style={{ background: "hsl(238, 77%, 62%)" }}
      />
    </span>
  )
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
}

export function HeroSection() {
  const t = useTranslations("hero")

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-6xl mx-auto px-6 py-36 text-center"
      >
        {/* Available badge */}
        <motion.div variants={item} className="flex justify-center mb-10">
          <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-mono font-medium glass border-white/40 text-foreground/70 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.7)]" />
            Available for new opportunities
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p variants={item} className="font-mono text-sm text-foreground/45 mb-4 tracking-wider">
          {t("greeting")}
        </motion.p>

        {/* Name — large gradient display */}
        <motion.h1
          variants={item}
          className="text-7xl md:text-9xl font-extrabold tracking-tight mb-6 leading-none"
        >
          <span className="gradient-text">{personalInfo.name}</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div variants={item} className="text-xl md:text-2xl font-mono mb-8 h-10">
          <TypewriterRole roles={personalInfo.roles} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="text-foreground/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-14"
        >
          {t("intro")}
        </motion.p>

        {/* CTAs — with magnetic pull */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <MagneticButton
            onClick={() => scrollTo("projects")}
            className="group inline-flex items-center justify-center h-12 px-9 rounded-2xl text-sm font-semibold cursor-pointer gradient-btn text-white"
          >
            View My Work
            <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollTo("contact")}
            className="inline-flex items-center justify-center h-12 px-9 rounded-2xl text-sm font-semibold cursor-pointer gradient-btn-outline"
          >
            Get in Touch
          </MagneticButton>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          variants={item}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono text-foreground/30 tracking-[0.22em] uppercase">scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-foreground/20 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Decorative floating orbs */}
      <div
        className="absolute top-32 right-[8%] w-64 h-64 rounded-full pointer-events-none opacity-30 animate-float"
        style={{ background: "radial-gradient(circle, hsl(238,77%,72%) 0%, transparent 70%)", animationDelay: "0s" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-32 left-[6%] w-48 h-48 rounded-full pointer-events-none opacity-25 animate-float"
        style={{ background: "radial-gradient(circle, hsl(292,84%,72%) 0%, transparent 70%)", animationDelay: "1.5s" }}
        aria-hidden="true"
      />
    </section>
  )
}
