"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { useScrollSpy } from "@/hooks"
import { useUIStore } from "@/stores"
import { MenuIcon, CloseIcon } from "@/icons"
import { motion, AnimatePresence } from "framer-motion"

const NAV_SECTIONS = ["about", "experience", "skills", "projects", "contact"]

export function Nav() {
  const t = useTranslations("nav")
  const [mounted, setMounted] = useState(false)
  const activeId = useScrollSpy(["hero", ...NAV_SECTIONS])
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore()

  useEffect(() => { setMounted(true) }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/*
        Floating pill nav — Aurora pattern.
        The centering wrapper uses a plain div so CSS `translate-x-1/2` is never
        overridden by Framer Motion's inline transform on the inner element.
      */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-4xl">
        <motion.header
          initial={{ y: -16, opacity: 0 }}
          animate={mounted ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="glass-nav rounded-2xl px-5 h-14 flex items-center justify-between"
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo("hero")}
            className="font-bold text-base tracking-tight cursor-pointer"
          >
            <span className="gradient-text">MS</span>
            <span className="text-foreground/40 font-normal text-sm">.dev</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_SECTIONS.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={cn(
                  "relative px-3.5 py-1.5 text-sm rounded-xl transition-colors duration-200 cursor-pointer capitalize",
                  activeId === id
                    ? "text-foreground font-semibold"
                    : "text-foreground/50 hover:text-foreground/80"
                )}
              >
                {activeId === id && (
                  <motion.span
                    layoutId="aurora-nav-pill"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: "rgba(109, 91, 255, 0.1)", border: "1px solid rgba(109, 91, 255, 0.2)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {t(id as "about" | "experience" | "skills" | "projects" | "contact")}
                </span>
              </button>
            ))}
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
              onClick={() => scrollTo("contact")}
              className="ml-2 px-5 py-2 text-sm font-semibold rounded-xl cursor-pointer gradient-btn text-white"
            >
              Hire Me
            </motion.button>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </motion.header>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 md:hidden bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed top-20 left-4 right-4 z-40 md:hidden glass-nav rounded-2xl p-5"
            >
              <nav className="flex flex-col gap-1">
                {NAV_SECTIONS.map((id) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={cn(
                      "px-4 py-3 text-left text-sm rounded-xl transition-all duration-200 cursor-pointer capitalize",
                      activeId === id
                        ? "text-foreground font-semibold bg-white/40"
                        : "text-foreground/55 hover:text-foreground hover:bg-white/30"
                    )}
                  >
                    {t(id as "about" | "experience" | "skills" | "projects" | "contact")}
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
