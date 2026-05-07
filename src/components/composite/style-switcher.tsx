"use client"

/**
 * StyleSwitcher — Floating tab panel to switch between design systems.
 * Shows a color swatch + name for each style. Sits fixed at bottom-center.
 */

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useUIStore, type DesignStyle } from "@/stores"

interface StyleDef {
  id: DesignStyle
  label: string
  description: string
  /** Two colors for the swatch gradient */
  swatchA: string
  swatchB: string
  /** Background color of the mini preview dot */
  bg: string
}

const STYLES: StyleDef[] = [
  {
    id: "veil",
    label: "Veil",
    description: "Midnight cinematic",
    swatchA: "hsl(174,100%,50%)",
    swatchB: "hsl(38,92%,58%)",
    bg: "hsl(217,50%,4%)",
  },
  {
    id: "aurora",
    label: "Aurora",
    description: "Light glassmorphism",
    swatchA: "hsl(238,77%,62%)",
    swatchB: "hsl(292,84%,61%)",
    bg: "hsl(235,80%,97%)",
  },
  {
    id: "carbon",
    label: "Carbon",
    description: "Deep charcoal + cyan",
    swatchA: "hsl(189,100%,45%)",
    swatchB: "hsl(180,100%,65%)",
    bg: "hsl(220,20%,7%)",
  },
  {
    id: "clay",
    label: "Clay",
    description: "Warm cream + terracotta",
    swatchA: "hsl(15,70%,45%)",
    swatchB: "hsl(30,80%,55%)",
    bg: "hsl(30,40%,94%)",
  },
  {
    id: "pulse",
    label: "Pulse",
    description: "Vibrant coral energy",
    swatchA: "hsl(4,90%,58%)",
    swatchB: "hsl(25,95%,55%)",
    bg: "hsl(0,0%,98%)",
  },
  {
    id: "obsidian",
    label: "Obsidian",
    description: "Pure black + neon lime",
    swatchA: "hsl(84,90%,55%)",
    swatchB: "hsl(55,100%,60%)",
    bg: "hsl(0,0%,3%)",
  },
  {
    id: "neobrutalism",
    label: "Brutal",
    description: "Thick borders, raw energy",
    swatchA: "hsl(55,100%,50%)",
    swatchB: "hsl(328,100%,54%)",
    bg: "hsl(50,100%,96%)",
  },
  {
    id: "neon-noir",
    label: "Neon Noir",
    description: "Cyberpunk hot pink",
    swatchA: "hsl(320,100%,60%)",
    swatchB: "hsl(270,100%,65%)",
    bg: "hsl(0,0%,2%)",
  },
  {
    id: "synthwave",
    label: "Synthwave",
    description: "Retro 80s retrofuture",
    swatchA: "hsl(328,100%,62%)",
    swatchB: "hsl(185,100%,55%)",
    bg: "hsl(260,45%,8%)",
  },
]

export function StyleSwitcher() {
  const { currentStyle, setCurrentStyle } = useUIStore()
  const [open, setOpen] = useState(false)

  const active = STYLES.find((s) => s.id === currentStyle) ?? STYLES[0]

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center gap-2">
      {/* Expanded panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="style-switcher-panel"
          >
            <p className="style-switcher-heading">Design Systems</p>
            <div className="grid grid-cols-3 gap-2">
              {STYLES.map((style) => {
                const isActive = currentStyle === style.id
                return (
                  <motion.button
                    key={style.id}
                    onClick={() => { setCurrentStyle(style.id); setOpen(false) }}
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    className="style-switcher-tab"
                    style={{
                      background: isActive ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
                      borderColor: isActive ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.10)",
                      boxShadow: isActive ? `0 0 12px ${style.swatchA}33` : "none",
                    }}
                    aria-pressed={isActive}
                  >
                    {/* Color swatch */}
                    <span
                      className="style-swatch"
                      style={{
                        background: `linear-gradient(135deg, ${style.swatchA}, ${style.swatchB})`,
                        boxShadow: `0 0 6px ${style.swatchA}55`,
                      }}
                    />
                    {/* Labels */}
                    <span className="flex flex-col items-start gap-0.5">
                      <span
                        className="text-xs font-semibold leading-none"
                        style={{ color: isActive ? style.swatchA : "rgba(255,255,255,0.7)" }}
                      >
                        {style.label}
                      </span>
                      <span className="text-[9px] leading-none" style={{ color: "rgba(255,255,255,0.35)" }}>
                        {style.description}
                      </span>
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle pill */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="style-toggle-pill"
        aria-label="Toggle style switcher"
      >
        {/* Active swatch */}
        <span
          className="style-swatch"
          style={{
            background: `linear-gradient(135deg, ${active.swatchA}, ${active.swatchB})`,
            boxShadow: `0 0 8px ${active.swatchA}66`,
          }}
        />
        <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.82)" }}>
          {active.label}
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.button>
    </div>
  )
}
