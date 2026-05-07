"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { useScrollSpy } from "@/hooks"
import { useUIStore } from "@/stores"
import { MenuIcon, CloseIcon } from "@/icons"

const NAV_SECTIONS = ["about", "experience", "skills", "projects", "contact"]

export function Nav() {
  const t = useTranslations("nav")
  const [scrolled, setScrolled] = useState(false)
  const activeId = useScrollSpy(["hero", ...NAV_SECTIONS])
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border/60 shadow-lg shadow-black/20"
            : "bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo("hero")}
            className="font-mono text-sm text-primary font-medium tracking-wider cursor-pointer hover:text-primary/80 transition-colors"
          >
            MS<span className="text-muted-foreground">.dev</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_SECTIONS.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={cn(
                  "px-4 py-2 text-sm rounded-md transition-all duration-200 cursor-pointer capitalize",
                  activeId === id
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                {t(id as "about" | "experience" | "skills" | "projects" | "contact")}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="ml-4 px-4 py-2 text-sm font-medium rounded-md bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all duration-200 cursor-pointer"
            >
              Hire Me
            </button>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <CloseIcon className="w-5 h-5" />
            ) : (
              <MenuIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={cn(
            "absolute top-16 left-0 right-0 bg-card border-b border-border p-6 transition-transform duration-300",
            mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          )}
        >
          <nav className="flex flex-col gap-2">
            {NAV_SECTIONS.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={cn(
                  "px-4 py-3 text-left text-sm rounded-md transition-all duration-200 cursor-pointer capitalize",
                  activeId === id
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {t(id as "about" | "experience" | "skills" | "projects" | "contact")}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
