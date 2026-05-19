'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { useScrollSpy } from '@/hooks'
import { useUIStore } from '@/stores'
import { MenuIcon, CloseIcon, LayersIcon } from '@/icons'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_SECTIONS = ['about', 'experience', 'skills', 'projects', 'contact']

export function Nav() {
  const t = useTranslations('nav')
  const [mounted, setMounted] = useState(false)
  const activeId = useScrollSpy(['hero', ...NAV_SECTIONS])
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/*
        Floating pill nav — Aurora pattern.
        The centering wrapper uses a plain div so CSS `translate-x-1/2` is never
        overridden by Framer Motion's inline transform on the inner element.
      */}
      <div className="fixed left-1/2 top-4 z-50 w-[92vw] max-w-4xl -translate-x-1/2">
        <motion.header
          initial={{ y: -16, opacity: 0 }}
          animate={mounted ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="veil-nav flex h-14 items-center justify-between rounded-2xl px-5"
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="cursor-pointer text-base font-bold tracking-tight"
          >
            <span className="gradient-text">MS</span>
            <span className="text-sm font-normal text-foreground/40">.dev</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_SECTIONS.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={cn(
                  'relative cursor-pointer rounded-xl px-3.5 py-1.5 text-sm capitalize transition-colors duration-200',
                  activeId === id
                    ? 'font-semibold text-foreground'
                    : 'text-foreground/50 hover:text-foreground/80',
                )}
              >
                {activeId === id && (
                  <motion.span
                    layoutId="veil-nav-pill"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: 'rgba(0, 255, 218, 0.08)',
                      border: '1px solid rgba(0, 255, 218, 0.2)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {t(id as 'about' | 'experience' | 'skills' | 'projects' | 'contact')}
                </span>
              </button>
            ))}
            <Link
              href="/design"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-sm transition-colors duration-200"
              style={{ color: 'hsl(var(--text-muted))' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'hsl(var(--text-heading))')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'hsl(var(--text-muted))')}
            >
              <LayersIcon className="h-3.5 w-3.5" />
              Design
            </Link>
            <Link
              href="/nextjs-skill"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-sm transition-colors duration-200"
              style={{ color: 'hsl(271,70%,68%)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'hsl(271,60%,82%)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'hsl(271,70%,68%)')}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: 'hsl(271,70%,68%)', boxShadow: '0 0 6px hsl(271,70%,68%)' }}
              />
              Skill
            </Link>
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}
              onClick={() => scrollTo('contact')}
              className="gradient-btn ml-2 cursor-pointer rounded-xl px-5 py-2 text-sm font-semibold text-white"
            >
              Hire Me
            </motion.button>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="cursor-pointer p-2 text-foreground/60 transition-colors hover:text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
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
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="veil-nav fixed left-4 right-4 top-20 z-40 rounded-2xl p-5 md:hidden"
            >
              <nav className="flex flex-col gap-1">
                {NAV_SECTIONS.map((id) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={cn(
                      'cursor-pointer rounded-xl px-4 py-3 text-left text-sm capitalize transition-all duration-200',
                      activeId === id
                        ? 'bg-white/40 font-semibold text-foreground'
                        : 'text-foreground/55 hover:bg-white/30 hover:text-foreground',
                    )}
                  >
                    {t(id as 'about' | 'experience' | 'skills' | 'projects' | 'contact')}
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
