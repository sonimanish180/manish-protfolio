"use client"

import { useState, useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { personalInfo, stats } from "@/lib/data"
import { ArrowRightIcon } from "@/icons"
import { MagneticButton } from "@/components/composite/magnetic-button"

const ease = [0.16, 1, 0.3, 1]

type Line = { prefix: string; text: string; color?: string; delay: number }

const BOOT_LINES: Line[] = [
  { prefix: "$", text: " whoami", color: "#00ffda", delay: 0 },
  { prefix: ">", text: " Manish Soni — Lead Software Engineer", color: "#b0ffd6", delay: 0.6 },
  { prefix: "$", text: " cat expertise.txt", color: "#00ffda", delay: 1.1 },
  { prefix: ">", text: " Next.js · Golang · React Native · AWS · Web3", color: "#8be9fd", delay: 1.7 },
  { prefix: "$", text: " ./experience --years", color: "#00ffda", delay: 2.3 },
  { prefix: ">", text: " 5+ years · 5 companies · fintech, blockchain, web3, edtech, kyc", color: "#b0ffd6", delay: 2.9 },
  { prefix: "$", text: " status --availability", color: "#00ffda", delay: 3.5 },
  { prefix: ">", text: " OPEN TO WORK — fintech · infra · platform · remote-first", color: "#50fa7b", delay: 4.1 },
  { prefix: "$", text: " _", color: "#00ffda", delay: 4.7 },
]

function TerminalLine({ line, show }: { line: Line; show: boolean }) {
  const [text, setText] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!show) return
    let i = 0
    const full = line.text
    const tick = () => {
      i++
      setText(full.slice(0, i))
      if (i < full.length) setTimeout(tick, line.prefix === ">" ? 18 : 55)
      else setDone(true)
    }
    const t = setTimeout(tick, 80)
    return () => clearTimeout(t)
  }, [show, line.text, line.prefix])

  if (!show) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      className="flex items-start gap-2 font-mono text-sm leading-6"
    >
      <span style={{ color: line.prefix === "$" ? "#00ffda" : "rgba(0,255,218,0.4)" }} className="flex-shrink-0 select-none">
        {line.prefix}
      </span>
      <span style={{ color: line.color ?? "#b0ffd6" }}>
        {text}
        {!done && <span className="inline-block w-[7px] h-[14px] ml-0.5 align-middle" style={{ background: line.color ?? "#b0ffd6", animation: "blink 0.9s step-end infinite" }} />}
      </span>
    </motion.div>
  )
}

export function HeroTerminal() {
  const t = useTranslations("hero")
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  const [visibleLines, setVisibleLines] = useState(0)
  const [mounted, setMounted] = useState(false)
  const started = useRef(false)

  useEffect(() => {
    setMounted(true)
    if (started.current) return
    started.current = true
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay * 1000)
    })
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ background: "hsl(217,50%,3.5%)" }}>

      {/* CRT scan-line overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 1px, transparent 1px, transparent 3px)",
          zIndex: 1,
        }}
        aria-hidden
      />

      {/* Green ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 80% at 50% 0%, rgba(0,255,100,0.04), transparent)", filter: "blur(40px)" }}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-8 lg:px-12">

        {/* Window chrome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="rounded-2xl overflow-hidden shadow-2xl"
          style={{
            border: "1px solid rgba(0,255,100,0.15)",
            boxShadow: "0 0 80px rgba(0,255,100,0.06), 0 40px 80px rgba(0,0,0,0.6)",
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ background: "rgba(0,20,0,0.9)", borderBottom: "1px solid rgba(0,255,100,0.08)" }}
          >
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f56" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#27c93f" }} />
            </div>
            <span className="flex-1 text-center text-xs font-mono" style={{ color: "rgba(0,255,100,0.4)" }}>
              manish@portfolio:~
            </span>
          </div>

          {/* Terminal body */}
          <div
            className="px-6 py-6 min-h-[380px] space-y-1"
            style={{ background: "rgba(0,12,0,0.92)" }}
          >
            {BOOT_LINES.map((line, i) => (
              <TerminalLine key={i} line={line} show={mounted && i < visibleLines} />
            ))}
          </div>
        </motion.div>

        {/* CTAs — appear after all lines */}
        <AnimatePresence>
          {visibleLines >= BOOT_LINES.length && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="mt-8 flex flex-wrap gap-4 justify-center"
            >
              <MagneticButton
                onClick={() => scrollTo("projects")}
                className="group inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl text-sm font-bold cursor-pointer gradient-btn"
              >
                View My Work
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              <MagneticButton
                onClick={() => scrollTo("contact")}
                className="inline-flex items-center justify-center h-12 px-8 rounded-xl text-sm font-semibold cursor-pointer gradient-btn-outline"
              >
                Get in Touch
              </MagneticButton>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats strip */}
        <AnimatePresence>
          {visibleLines >= BOOT_LINES.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex flex-wrap justify-center gap-8 pt-6"
              style={{ borderTop: "1px solid rgba(0,255,100,0.08)" }}
            >
              {stats.map(s => (
                <div key={s.label} className="flex flex-col items-center gap-0.5">
                  <span className="text-2xl font-black font-mono leading-none" style={{ color: "#00ffda" }}>{s.value}</span>
                  <span className="text-[9px] font-mono tracking-widest uppercase" style={{ color: "rgba(0,255,100,0.4)" }}>{s.label}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </section>
  )
}
