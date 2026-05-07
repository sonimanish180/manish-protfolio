"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { personalInfo } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, TerminalIcon } from "@/icons"

function TypewriterRole({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState("")
  const [deleting, setDeleting] = useState(false)
  const [paused, setPaused] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const current = roles[index] ?? ""

    if (paused) {
      const t = setTimeout(() => {
        setPaused(false)
        setDeleting(true)
      }, 2000)
      return () => clearTimeout(t)
    }

    if (deleting && text === "") {
      setDeleting(false)
      setIndex((i) => (i + 1) % roles.length)
      return
    }

    if (!deleting && text === current) {
      setPaused(true)
      return
    }

    const speed = deleting ? 40 : 90
    const t = setTimeout(() => {
      setText(
        deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1)
      )
    }, speed)

    return () => clearTimeout(t)
  }, [text, deleting, paused, index, roles, mounted])

  if (!mounted) return <span className="text-primary">{roles[0]}</span>

  return (
    <span className="text-primary">
      {text}
      <span className="animate-[cursor-blink_1s_step-end_infinite] text-primary/80">
        |
      </span>
    </span>
  )
}

export function HeroSection() {
  const t = useTranslations("hero")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center hero-grid overflow-hidden"
    >
      {/* Radial glow behind content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center md:text-left">
        {/* Terminal tag */}
        <div
          className={`inline-flex items-center gap-2 font-mono text-xs text-primary/70 bg-primary/5 border border-primary/20 rounded-full px-4 py-1.5 mb-8 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          <TerminalIcon className="w-3 h-3" />
          <span>Available for new opportunities</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Greeting */}
        <p
          className={`font-mono text-sm text-muted-foreground mb-3 transition-all duration-700 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {t("greeting")}
        </p>

        {/* Name */}
        <h1
          className={`text-5xl md:text-7xl font-bold tracking-tight mb-4 transition-all duration-700 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="gradient-text">{personalInfo.name}</span>
        </h1>

        {/* Typewriter role */}
        <div
          className={`text-xl md:text-2xl font-mono mb-6 h-8 transition-all duration-700 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <TypewriterRole roles={personalInfo.roles} />
        </div>

        {/* Tagline */}
        <p
          className={`text-muted-foreground text-base md:text-lg max-w-xl md:max-w-2xl leading-relaxed mb-10 transition-all duration-700 delay-[400ms] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {t("intro")}
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center md:justify-start transition-all duration-700 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            size="lg"
            variant="glow"
            onClick={() => scrollTo("projects")}
            className="group"
          >
            View My Work
            <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollTo("contact")}
          >
            Get in Touch
          </Button>
        </div>

        {/* Scroll hint */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-700 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-xs font-mono text-muted-foreground/50">scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-muted-foreground/30 to-transparent" />
        </div>
      </div>
    </section>
  )
}
