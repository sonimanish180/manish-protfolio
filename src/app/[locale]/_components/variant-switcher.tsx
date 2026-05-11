'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore, type SectionVariants } from '@/stores/ui-store'
import { SECTION_VARIANT_CONFIG } from '@/lib/section-variants'

/* ── Tiny SVG schematic previews for each variant ── */
function VariantPreview({ type }: { type: string }) {
  const s = { fill: 'none', stroke: 'currentColor', strokeWidth: '1.5' }

  const previews: Record<string, React.ReactNode> = {
    /* Hero */
    cinematic: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        {/* grid lines */}
        <line x1="0" y1="20" x2="48" y2="20" stroke="rgba(0,255,218,0.08)" strokeWidth="0.5" />
        {/* centered name block */}
        <rect
          x="10"
          y="11"
          width="28"
          height="4"
          rx="1"
          fill="rgba(0,255,218,0.25)"
          stroke="none"
        />
        <rect
          x="16"
          y="17"
          width="16"
          height="2"
          rx="0.5"
          fill="rgba(0,255,218,0.12)"
          stroke="none"
        />
        <rect x="14" y="21" width="8" height="2" rx="1" fill="rgba(0,255,218,0.18)" stroke="none" />
        <rect
          x="24"
          y="21"
          width="10"
          height="2"
          rx="1"
          fill="rgba(0,255,218,0.08)"
          stroke="none"
        />
      </svg>
    ),
    split: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        {/* left text */}
        <rect
          x="3"
          y="8"
          width="18"
          height="3"
          rx="0.5"
          fill="rgba(0,255,218,0.22)"
          stroke="none"
        />
        <rect
          x="3"
          y="13"
          width="14"
          height="2"
          rx="0.5"
          fill="rgba(0,255,218,0.12)"
          stroke="none"
        />
        <rect
          x="3"
          y="17"
          width="16"
          height="2"
          rx="0.5"
          fill="rgba(0,255,218,0.08)"
          stroke="none"
        />
        <rect x="3" y="22" width="7" height="2.5" rx="1" fill="rgba(0,255,218,0.2)" stroke="none" />
        <rect
          x="12"
          y="22"
          width="7"
          height="2.5"
          rx="1"
          fill="rgba(0,255,218,0.07)"
          stroke="none"
        />
        {/* divider */}
        <line x1="25" y1="4" x2="25" y2="28" stroke="rgba(0,255,218,0.12)" strokeWidth="0.5" />
        {/* right 3D box */}
        <rect
          x="27"
          y="6"
          width="18"
          height="20"
          rx="2"
          fill="rgba(0,255,218,0.06)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <circle cx="36" cy="16" r="5" fill="none" stroke="rgba(0,255,218,0.2)" strokeWidth="0.5" />
        <circle cx="36" cy="16" r="2" fill="rgba(0,255,218,0.15)" stroke="none" />
      </svg>
    ),
    terminal: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,40,0,0.4)"
          stroke="rgba(0,255,100,0.2)"
          strokeWidth="0.5"
        />
        <rect x="0" y="0" width="48" height="5" rx="2" fill="rgba(0,100,0,0.15)" stroke="none" />
        <circle cx="4" cy="2.5" r="1" fill="rgba(255,80,80,0.5)" stroke="none" />
        <circle cx="8" cy="2.5" r="1" fill="rgba(255,180,0,0.5)" stroke="none" />
        <circle cx="12" cy="2.5" r="1" fill="rgba(0,200,80,0.5)" stroke="none" />
        <rect
          x="3"
          y="9"
          width="6"
          height="1.5"
          rx="0.3"
          fill="rgba(0,255,100,0.5)"
          stroke="none"
        />
        <rect
          x="10"
          y="9"
          width="20"
          height="1.5"
          rx="0.3"
          fill="rgba(0,255,100,0.25)"
          stroke="none"
        />
        <rect
          x="3"
          y="13"
          width="4"
          height="1.5"
          rx="0.3"
          fill="rgba(0,255,100,0.5)"
          stroke="none"
        />
        <rect
          x="8"
          y="13"
          width="26"
          height="1.5"
          rx="0.3"
          fill="rgba(0,255,100,0.25)"
          stroke="none"
        />
        <rect
          x="3"
          y="17"
          width="8"
          height="1.5"
          rx="0.3"
          fill="rgba(0,255,100,0.5)"
          stroke="none"
        />
        <rect
          x="12"
          y="17"
          width="14"
          height="1.5"
          rx="0.3"
          fill="rgba(0,255,100,0.25)"
          stroke="none"
        />
        <rect x="3" y="22" width="2" height="2" rx="0.3" fill="rgba(0,255,100,0.7)" stroke="none" />
      </svg>
    ),
    /* About */
    editorial: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <rect x="3" y="5" width="26" height="2" rx="0.5" fill="rgba(0,255,218,0.2)" stroke="none" />
        <rect
          x="3"
          y="9"
          width="24"
          height="1.5"
          rx="0.5"
          fill="rgba(0,255,218,0.1)"
          stroke="none"
        />
        <rect
          x="3"
          y="12"
          width="22"
          height="1.5"
          rx="0.5"
          fill="rgba(0,255,218,0.08)"
          stroke="none"
        />
        <rect
          x="3"
          y="15"
          width="20"
          height="1.5"
          rx="0.5"
          fill="rgba(0,255,218,0.08)"
          stroke="none"
        />
        <rect
          x="3"
          y="20"
          width="6"
          height="1.5"
          rx="0.5"
          fill="rgba(0,255,218,0.15)"
          stroke="none"
        />
        <rect
          x="11"
          y="20"
          width="6"
          height="1.5"
          rx="0.5"
          fill="rgba(0,255,218,0.1)"
          stroke="none"
        />
        <rect
          x="32"
          y="5"
          width="13"
          height="20"
          rx="2"
          fill="rgba(0,255,218,0.06)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <circle
          cx="38.5"
          cy="14"
          r="4"
          fill="none"
          stroke="rgba(0,255,218,0.2)"
          strokeWidth="0.5"
        />
      </svg>
    ),
    bento: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <rect
          x="2"
          y="2"
          width="28"
          height="12"
          rx="1.5"
          fill="rgba(0,255,218,0.08)"
          stroke="rgba(0,255,218,0.12)"
          strokeWidth="0.5"
        />
        <rect
          x="32"
          y="2"
          width="14"
          height="12"
          rx="1.5"
          fill="rgba(0,255,218,0.05)"
          stroke="rgba(0,255,218,0.12)"
          strokeWidth="0.5"
        />
        <rect
          x="2"
          y="16"
          width="14"
          height="14"
          rx="1.5"
          fill="rgba(0,255,218,0.05)"
          stroke="rgba(0,255,218,0.12)"
          strokeWidth="0.5"
        />
        <rect
          x="18"
          y="16"
          width="13"
          height="14"
          rx="1.5"
          fill="rgba(0,255,218,0.07)"
          stroke="rgba(0,255,218,0.12)"
          strokeWidth="0.5"
        />
        <rect
          x="33"
          y="16"
          width="13"
          height="14"
          rx="1.5"
          fill="rgba(0,255,218,0.05)"
          stroke="rgba(0,255,218,0.12)"
          strokeWidth="0.5"
        />
      </svg>
    ),
    compact: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <line x1="25" y1="2" x2="25" y2="30" stroke="rgba(0,255,218,0.1)" strokeWidth="0.5" />
        <rect x="2" y="4" width="21" height="2" rx="0.5" fill="rgba(0,255,218,0.2)" stroke="none" />
        <rect
          x="2"
          y="8"
          width="19"
          height="1.5"
          rx="0.5"
          fill="rgba(0,255,218,0.1)"
          stroke="none"
        />
        <rect
          x="2"
          y="11"
          width="17"
          height="1.5"
          rx="0.5"
          fill="rgba(0,255,218,0.08)"
          stroke="none"
        />
        <rect
          x="27"
          y="4"
          width="19"
          height="6"
          rx="1"
          fill="rgba(0,255,218,0.06)"
          stroke="rgba(0,255,218,0.12)"
          strokeWidth="0.5"
        />
        <rect
          x="27"
          y="12"
          width="19"
          height="6"
          rx="1"
          fill="rgba(0,255,218,0.06)"
          stroke="rgba(0,255,218,0.12)"
          strokeWidth="0.5"
        />
        <rect
          x="27"
          y="20"
          width="19"
          height="6"
          rx="1"
          fill="rgba(0,255,218,0.06)"
          stroke="rgba(0,255,218,0.12)"
          strokeWidth="0.5"
        />
      </svg>
    ),
    /* Skills */
    cloud: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        {[
          [2, 4, 10],
          [14, 4, 14],
          [30, 4, 8],
          [40, 4, 6],
          [2, 10, 8],
          [12, 10, 16],
          [30, 10, 12],
          [2, 16, 12],
          [16, 16, 10],
          [28, 16, 14],
          [2, 22, 18],
          [22, 22, 10],
          [34, 22, 12],
        ].map(([x, y, w], i) => (
          <rect
            key={i}
            x={x}
            y={y}
            width={w}
            height="3"
            rx="1.5"
            fill="rgba(0,255,218,0.15)"
            stroke="none"
          />
        ))}
      </svg>
    ),
    grid: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
          const col = i % 4
          const row = Math.floor(i / 4)
          return (
            <rect
              key={i}
              x={2 + col * 12}
              y={4 + row * 9}
              width="10"
              height="7"
              rx="1"
              fill="rgba(0,255,218,0.08)"
              stroke="rgba(0,255,218,0.12)"
              strokeWidth="0.5"
            />
          )
        })}
      </svg>
    ),
    showcase: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <rect
          x="2"
          y="2"
          width="13"
          height="28"
          rx="1.5"
          fill="rgba(139,92,246,0.1)"
          stroke="rgba(139,92,246,0.2)"
          strokeWidth="0.5"
        />
        <rect
          x="17"
          y="2"
          width="13"
          height="28"
          rx="1.5"
          fill="rgba(56,189,248,0.1)"
          stroke="rgba(56,189,248,0.2)"
          strokeWidth="0.5"
        />
        <rect
          x="32"
          y="2"
          width="14"
          height="28"
          rx="1.5"
          fill="rgba(245,166,35,0.1)"
          stroke="rgba(245,166,35,0.2)"
          strokeWidth="0.5"
        />
      </svg>
    ),
    /* Experience */
    cards: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        {[2, 11, 20].map((y, i) => (
          <g key={i}>
            <rect
              x="3"
              y={y}
              width="42"
              height="7"
              rx="1.5"
              fill="rgba(0,255,218,0.06)"
              stroke="rgba(0,255,218,0.12)"
              strokeWidth="0.5"
            />
            <rect
              x="5"
              y={y + 1.5}
              width="3"
              height="3"
              rx="0.5"
              fill="rgba(0,255,218,0.2)"
              stroke="none"
            />
            <rect
              x="10"
              y={y + 1.5}
              width="16"
              height="1.5"
              rx="0.3"
              fill="rgba(0,255,218,0.2)"
              stroke="none"
            />
            <rect
              x="10"
              y={y + 4}
              width="10"
              height="1"
              rx="0.3"
              fill="rgba(0,255,218,0.1)"
              stroke="none"
            />
          </g>
        ))}
      </svg>
    ),
    timeline: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <line x1="12" y1="2" x2="12" y2="30" stroke="rgba(0,255,218,0.2)" strokeWidth="0.5" />
        {[5, 12, 19, 26].map((y, i) => (
          <g key={i}>
            <circle
              cx="12"
              cy={y}
              r="2"
              fill="rgba(0,255,218,0.3)"
              stroke="rgba(0,255,218,0.5)"
              strokeWidth="0.5"
            />
            <rect
              x="17"
              y={y - 2}
              width="26"
              height="5"
              rx="1"
              fill="rgba(0,255,218,0.06)"
              stroke="rgba(0,255,218,0.1)"
              strokeWidth="0.5"
            />
          </g>
        ))}
      </svg>
    ),
    /* Projects */
    featured: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <rect
          x="2"
          y="2"
          width="44"
          height="14"
          rx="1.5"
          fill="rgba(0,255,218,0.08)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <rect
          x="4"
          y="18"
          width="13"
          height="12"
          rx="1.5"
          fill="rgba(0,255,218,0.06)"
          stroke="rgba(0,255,218,0.1)"
          strokeWidth="0.5"
        />
        <rect
          x="19"
          y="18"
          width="13"
          height="12"
          rx="1.5"
          fill="rgba(0,255,218,0.06)"
          stroke="rgba(0,255,218,0.1)"
          strokeWidth="0.5"
        />
        <rect
          x="34"
          y="18"
          width="12"
          height="12"
          rx="1.5"
          fill="rgba(0,255,218,0.06)"
          stroke="rgba(0,255,218,0.1)"
          strokeWidth="0.5"
        />
      </svg>
    ),
    carousel: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <rect
          x="-4"
          y="4"
          width="22"
          height="24"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.08)"
          strokeWidth="0.5"
        />
        <rect
          x="20"
          y="2"
          width="24"
          height="28"
          rx="2"
          fill="rgba(0,255,218,0.1)"
          stroke="rgba(0,255,218,0.2)"
          strokeWidth="0.5"
        />
        <rect
          x="46"
          y="4"
          width="22"
          height="24"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.08)"
          strokeWidth="0.5"
        />
        <circle
          cx="4"
          cy="16"
          r="3"
          fill="rgba(0,255,218,0.12)"
          stroke="rgba(0,255,218,0.2)"
          strokeWidth="0.5"
        />
        <circle
          cx="44"
          cy="16"
          r="3"
          fill="rgba(0,255,218,0.12)"
          stroke="rgba(0,255,218,0.2)"
          strokeWidth="0.5"
        />
      </svg>
    ),
    spotlight: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <rect
          x="6"
          y="3"
          width="36"
          height="22"
          rx="2"
          fill="rgba(0,255,218,0.08)"
          stroke="rgba(0,255,218,0.18)"
          strokeWidth="0.5"
        />
        <rect
          x="9"
          y="6"
          width="20"
          height="2.5"
          rx="0.5"
          fill="rgba(0,255,218,0.22)"
          stroke="none"
        />
        <rect
          x="9"
          y="10"
          width="26"
          height="1.5"
          rx="0.3"
          fill="rgba(0,255,218,0.1)"
          stroke="none"
        />
        <rect
          x="9"
          y="13"
          width="22"
          height="1.5"
          rx="0.3"
          fill="rgba(0,255,218,0.08)"
          stroke="none"
        />
        <circle cx="7" cy="27.5" r="1.5" fill="rgba(0,255,218,0.3)" stroke="none" />
        <circle cx="12" cy="27.5" r="1.5" fill="rgba(0,255,218,0.5)" stroke="none" />
        <circle cx="17" cy="27.5" r="1.5" fill="rgba(0,255,218,0.15)" stroke="none" />
        <circle cx="22" cy="27.5" r="1.5" fill="rgba(0,255,218,0.15)" stroke="none" />
        <circle cx="27" cy="27.5" r="1.5" fill="rgba(0,255,218,0.15)" stroke="none" />
        <circle cx="32" cy="27.5" r="1.5" fill="rgba(0,255,218,0.15)" stroke="none" />
        <rect
          x="35"
          y="25"
          width="7"
          height="5"
          rx="1"
          fill="rgba(0,255,218,0.12)"
          stroke="rgba(0,255,218,0.2)"
          strokeWidth="0.5"
        />
        <line
          x1="36.5"
          y1="27.5"
          x2="40.5"
          y2="27.5"
          stroke="rgba(0,255,218,0.5)"
          strokeWidth="0.8"
        />
        <polyline
          points="39.5,26.2 40.5,27.5 39.5,28.8"
          stroke="rgba(0,255,218,0.5)"
          strokeWidth="0.8"
          fill="none"
        />
      </svg>
    ),
    /* ── New Hero variants ── */
    minimal: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <rect
          x="8"
          y="10"
          width="32"
          height="4"
          rx="0.5"
          fill="rgba(0,255,218,0.3)"
          stroke="none"
        />
        <rect
          x="14"
          y="16"
          width="20"
          height="2"
          rx="0.5"
          fill="rgba(0,255,218,0.15)"
          stroke="none"
        />
        <rect x="18" y="20" width="7" height="2" rx="1" fill="rgba(0,255,218,0.2)" stroke="none" />
        <rect x="27" y="20" width="7" height="2" rx="1" fill="rgba(0,255,218,0.08)" stroke="none" />
      </svg>
    ),
    'hero-grid': (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <line x1="24" y1="2" x2="24" y2="30" stroke="rgba(0,255,218,0.1)" strokeWidth="0.5" />
        <rect
          x="2"
          y="6"
          width="19"
          height="3"
          rx="0.5"
          fill="rgba(0,255,218,0.25)"
          stroke="none"
        />
        <rect
          x="2"
          y="11"
          width="15"
          height="2"
          rx="0.5"
          fill="rgba(0,255,218,0.12)"
          stroke="none"
        />
        <rect
          x="2"
          y="15"
          width="17"
          height="2"
          rx="0.5"
          fill="rgba(0,255,218,0.08)"
          stroke="none"
        />
        <rect x="2" y="21" width="8" height="2.5" rx="1" fill="rgba(0,255,218,0.2)" stroke="none" />
        <rect
          x="26"
          y="4"
          width="20"
          height="6"
          rx="1"
          fill="rgba(0,255,218,0.08)"
          stroke="rgba(0,255,218,0.12)"
          strokeWidth="0.5"
        />
        <rect
          x="26"
          y="12"
          width="9"
          height="6"
          rx="1"
          fill="rgba(0,255,218,0.06)"
          stroke="rgba(0,255,218,0.1)"
          strokeWidth="0.5"
        />
        <rect
          x="37"
          y="12"
          width="9"
          height="6"
          rx="1"
          fill="rgba(0,255,218,0.06)"
          stroke="rgba(0,255,218,0.1)"
          strokeWidth="0.5"
        />
        <rect
          x="26"
          y="20"
          width="20"
          height="6"
          rx="1"
          fill="rgba(0,255,218,0.05)"
          stroke="rgba(0,255,218,0.1)"
          strokeWidth="0.5"
        />
      </svg>
    ),
    'hero-glass': (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <circle cx="12" cy="12" r="8" fill="rgba(0,255,218,0.08)" stroke="none" />
        <circle cx="36" cy="20" r="10" fill="rgba(139,92,246,0.08)" stroke="none" />
        <rect
          x="6"
          y="7"
          width="36"
          height="18"
          rx="3"
          fill="rgba(255,255,255,0.07)"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.5"
        />
        <rect
          x="14"
          y="11"
          width="20"
          height="3"
          rx="0.5"
          fill="rgba(0,255,218,0.25)"
          stroke="none"
        />
        <rect
          x="16"
          y="16"
          width="16"
          height="1.5"
          rx="0.5"
          fill="rgba(0,255,218,0.12)"
          stroke="none"
        />
        <rect x="17" y="20" width="6" height="2" rx="1" fill="rgba(0,255,218,0.2)" stroke="none" />
        <rect x="25" y="20" width="6" height="2" rx="1" fill="rgba(0,255,218,0.07)" stroke="none" />
      </svg>
    ),
    /* ── New About variants ── */
    story: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <line x1="10" y1="2" x2="10" y2="30" stroke="rgba(0,255,218,0.15)" strokeWidth="0.5" />
        {[5, 11, 17, 23].map((y, i) => (
          <g key={i}>
            <circle
              cx="10"
              cy={y}
              r="2"
              fill={i === 0 ? 'rgba(0,255,218,0.5)' : 'rgba(0,255,218,0.15)'}
              stroke="none"
            />
            <rect
              x="14"
              y={y - 1.5}
              width={i === 0 ? 28 : 20}
              height="3"
              rx="0.5"
              fill={i === 0 ? 'rgba(0,255,218,0.15)' : 'rgba(0,255,218,0.07)'}
              stroke="none"
            />
          </g>
        ))}
      </svg>
    ),
    flipcards: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        {[2, 18].map((x, col) =>
          [2, 17].map((y, row) => (
            <g key={`${col}-${row}`}>
              <rect
                x={x}
                y={y}
                width={14}
                height={12}
                rx="1.5"
                fill={col === 0 && row === 0 ? 'rgba(0,255,218,0.1)' : 'rgba(0,255,218,0.05)'}
                stroke="rgba(0,255,218,0.15)"
                strokeWidth="0.5"
              />
            </g>
          )),
        )}
        <rect
          x="34"
          y="2"
          width="14"
          height="12"
          rx="1.5"
          fill="rgba(139,92,246,0.1)"
          stroke="rgba(139,92,246,0.2)"
          strokeWidth="0.5"
        />
        <rect
          x="34"
          y="17"
          width="14"
          height="12"
          rx="1.5"
          fill="rgba(0,255,218,0.05)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
      </svg>
    ),
    resume: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <rect x="0" y="0" width="48" height="6" rx="2" fill="rgba(0,255,218,0.08)" stroke="none" />
        <rect
          x="3"
          y="1.5"
          width="16"
          height="2"
          rx="0.5"
          fill="rgba(0,255,218,0.3)"
          stroke="none"
        />
        <line x1="0" y1="6" x2="48" y2="6" stroke="rgba(0,255,218,0.1)" strokeWidth="0.5" />
        <line x1="24" y1="6" x2="24" y2="32" stroke="rgba(0,255,218,0.1)" strokeWidth="0.5" />
        {[9, 13, 17, 21, 25].map((y) => (
          <rect
            key={y}
            x="2"
            y={y}
            width={14}
            height="1.5"
            rx="0.3"
            fill="rgba(0,255,218,0.1)"
            stroke="none"
          />
        ))}
        {[9, 14, 19, 24].map((y) => (
          <rect
            key={y}
            x="26"
            y={y}
            width={18}
            height="2"
            rx="0.3"
            fill="rgba(0,255,218,0.08)"
            stroke="none"
          />
        ))}
      </svg>
    ),
    /* ── New Skills variants ── */
    bars: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        {[4, 9, 14, 19, 24].map((y, i) => (
          <g key={i}>
            <rect
              x="2"
              y={y}
              width={[38, 30, 42, 26, 34][i]}
              height="3"
              rx="1.5"
              fill="rgba(0,255,218,0.12)"
              stroke="none"
            />
            <rect
              x="2"
              y={y}
              width={[32, 22, 38, 18, 28][i]}
              height="3"
              rx="1.5"
              fill="rgba(0,255,218,0.28)"
              stroke="none"
            />
          </g>
        ))}
      </svg>
    ),
    radar: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <polygon
          points="24,4 38,11 38,21 24,28 10,21 10,11"
          fill="none"
          stroke="rgba(0,255,218,0.1)"
          strokeWidth="0.5"
        />
        <polygon
          points="24,9 33,13 33,19 24,23 15,19 15,13"
          fill="none"
          stroke="rgba(0,255,218,0.08)"
          strokeWidth="0.5"
        />
        <polygon
          points="24,6 36,12 35,20 24,26 13,20 12,12"
          fill="rgba(0,255,218,0.12)"
          stroke="rgba(0,255,218,0.3)"
          strokeWidth="0.5"
        />
      </svg>
    ),
    mastery: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <circle
          cx="10"
          cy="10"
          r="6"
          fill="rgba(0,255,218,0.15)"
          stroke="rgba(0,255,218,0.3)"
          strokeWidth="0.5"
        />
        <circle
          cx="24"
          cy="10"
          r="6"
          fill="rgba(139,92,246,0.12)"
          stroke="rgba(139,92,246,0.25)"
          strokeWidth="0.5"
        />
        <circle
          cx="38"
          cy="10"
          r="6"
          fill="rgba(56,189,248,0.12)"
          stroke="rgba(56,189,248,0.25)"
          strokeWidth="0.5"
        />
        {[2, 8, 14, 20, 26, 32, 38, 44].map((x) => (
          <rect
            key={x}
            x={x}
            y="20"
            width="4"
            height="2.5"
            rx="1"
            fill="rgba(0,255,218,0.1)"
            stroke="none"
          />
        ))}
        {[2, 8, 14, 20, 26, 32].map((x) => (
          <rect
            key={x}
            x={x}
            y="25"
            width="5"
            height="2"
            rx="1"
            fill="rgba(0,255,218,0.06)"
            stroke="none"
          />
        ))}
      </svg>
    ),
    /* ── New Experience variants ── */
    magazine: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <rect
          x="2"
          y="2"
          width="44"
          height="14"
          rx="1.5"
          fill="rgba(0,255,218,0.1)"
          stroke="rgba(0,255,218,0.2)"
          strokeWidth="0.5"
        />
        <rect
          x="4"
          y="4"
          width="20"
          height="4"
          rx="0.5"
          fill="rgba(0,255,218,0.25)"
          stroke="none"
        />
        <rect
          x="4"
          y="10"
          width="30"
          height="1.5"
          rx="0.3"
          fill="rgba(0,255,218,0.1)"
          stroke="none"
        />
        <rect
          x="2"
          y="18"
          width="21"
          height="12"
          rx="1.5"
          fill="rgba(0,255,218,0.06)"
          stroke="rgba(0,255,218,0.12)"
          strokeWidth="0.5"
        />
        <rect
          x="25"
          y="18"
          width="21"
          height="12"
          rx="1.5"
          fill="rgba(0,255,218,0.06)"
          stroke="rgba(0,255,218,0.12)"
          strokeWidth="0.5"
        />
      </svg>
    ),
    kanban: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        {[1, 17, 33].map((x, col) => (
          <g key={col}>
            <rect
              x={x}
              y="2"
              width="14"
              height="3"
              rx="0.5"
              fill="rgba(0,255,218,0.12)"
              stroke="none"
            />
            <rect
              x={x}
              y="7"
              width="14"
              height="7"
              rx="1"
              fill="rgba(0,255,218,0.07)"
              stroke="rgba(0,255,218,0.12)"
              strokeWidth="0.5"
            />
            {col < 2 && (
              <rect
                x={x}
                y="16"
                width="14"
                height="7"
                rx="1"
                fill="rgba(0,255,218,0.05)"
                stroke="rgba(0,255,218,0.1)"
                strokeWidth="0.5"
              />
            )}
            {col === 0 && (
              <rect
                x={x}
                y="25"
                width="14"
                height="5"
                rx="1"
                fill="rgba(0,255,218,0.04)"
                stroke="rgba(0,255,218,0.08)"
                strokeWidth="0.5"
              />
            )}
          </g>
        ))}
      </svg>
    ),
    'exp-table': (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <rect x="0" y="0" width="48" height="5" rx="2" fill="rgba(0,255,218,0.08)" stroke="none" />
        {[6, 11, 16, 21, 26].map((y, i) => (
          <g key={i}>
            <rect
              x="2"
              y={y}
              width="10"
              height="3"
              rx="0.3"
              fill={i === 0 ? 'rgba(0,255,218,0.2)' : 'rgba(0,255,218,0.07)'}
              stroke="none"
            />
            <rect
              x="14"
              y={y}
              width="14"
              height="3"
              rx="0.3"
              fill="rgba(0,255,218,0.06)"
              stroke="none"
            />
            <rect
              x="30"
              y={y}
              width="16"
              height="3"
              rx="0.3"
              fill="rgba(0,255,218,0.05)"
              stroke="none"
            />
          </g>
        ))}
      </svg>
    ),
    /* ── New Projects variants ── */
    pgrid: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <rect
          x="2"
          y="2"
          width="21"
          height="17"
          rx="1.5"
          fill="rgba(0,255,218,0.1)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <rect
          x="25"
          y="2"
          width="21"
          height="8"
          rx="1.5"
          fill="rgba(0,255,218,0.07)"
          stroke="rgba(0,255,218,0.12)"
          strokeWidth="0.5"
        />
        <rect
          x="25"
          y="12"
          width="21"
          height="7"
          rx="1.5"
          fill="rgba(0,255,218,0.06)"
          stroke="rgba(0,255,218,0.1)"
          strokeWidth="0.5"
        />
        <rect
          x="2"
          y="21"
          width="13"
          height="9"
          rx="1.5"
          fill="rgba(0,255,218,0.06)"
          stroke="rgba(0,255,218,0.1)"
          strokeWidth="0.5"
        />
        <rect
          x="17"
          y="21"
          width="30"
          height="9"
          rx="1.5"
          fill="rgba(0,255,218,0.07)"
          stroke="rgba(0,255,218,0.12)"
          strokeWidth="0.5"
        />
      </svg>
    ),
    'proj-list': (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        {[3, 11, 19, 27].map((y, i) => (
          <g key={i}>
            <rect
              x="2"
              y={y}
              width="5"
              height="6"
              rx="0.5"
              fill="rgba(0,255,218,0.06)"
              stroke="rgba(0,255,218,0.1)"
              strokeWidth="0.5"
            />
            <rect
              x="9"
              y={y + 0.5}
              width="20"
              height="2.5"
              rx="0.5"
              fill="rgba(0,255,218,0.18)"
              stroke="none"
            />
            <rect
              x="9"
              y={y + 4}
              width="32"
              height="1.5"
              rx="0.3"
              fill="rgba(0,255,218,0.07)"
              stroke="none"
            />
          </g>
        ))}
      </svg>
    ),
    masonry: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <rect
          x="2"
          y="2"
          width="13"
          height="18"
          rx="1.5"
          fill="rgba(0,255,218,0.1)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <rect
          x="17"
          y="2"
          width="13"
          height="10"
          rx="1.5"
          fill="rgba(0,255,218,0.07)"
          stroke="rgba(0,255,218,0.12)"
          strokeWidth="0.5"
        />
        <rect
          x="32"
          y="2"
          width="14"
          height="14"
          rx="1.5"
          fill="rgba(0,255,218,0.08)"
          stroke="rgba(0,255,218,0.12)"
          strokeWidth="0.5"
        />
        <rect
          x="2"
          y="22"
          width="13"
          height="8"
          rx="1.5"
          fill="rgba(0,255,218,0.06)"
          stroke="rgba(0,255,218,0.1)"
          strokeWidth="0.5"
        />
        <rect
          x="17"
          y="14"
          width="13"
          height="16"
          rx="1.5"
          fill="rgba(0,255,218,0.08)"
          stroke="rgba(0,255,218,0.12)"
          strokeWidth="0.5"
        />
        <rect
          x="32"
          y="18"
          width="14"
          height="12"
          rx="1.5"
          fill="rgba(0,255,218,0.06)"
          stroke="rgba(0,255,218,0.1)"
          strokeWidth="0.5"
        />
      </svg>
    ),
    /* ── New Contact variants ── */
    'con-minimal': (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <rect x="8" y="9" width="32" height="4" rx="0.5" fill="rgba(0,255,218,0.2)" stroke="none" />
        <rect
          x="14"
          y="15"
          width="20"
          height="2"
          rx="0.5"
          fill="rgba(0,255,218,0.1)"
          stroke="none"
        />
        <rect
          x="18"
          y="19"
          width="12"
          height="1.5"
          rx="0.5"
          fill="rgba(0,255,218,0.08)"
          stroke="none"
        />
      </svg>
    ),
    'con-card': (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <rect
          x="5"
          y="4"
          width="38"
          height="24"
          rx="2"
          fill="rgba(0,255,218,0.06)"
          stroke="rgba(0,255,218,0.2)"
          strokeWidth="0.5"
        />
        <rect x="5" y="4" width="38" height="3" rx="2" fill="rgba(0,255,218,0.15)" stroke="none" />
        <rect
          x="8"
          y="10"
          width="18"
          height="2.5"
          rx="0.5"
          fill="rgba(0,255,218,0.22)"
          stroke="none"
        />
        <rect
          x="8"
          y="14"
          width="12"
          height="1.5"
          rx="0.3"
          fill="rgba(0,255,218,0.1)"
          stroke="none"
        />
        <rect
          x="8"
          y="17"
          width="20"
          height="1.5"
          rx="0.3"
          fill="rgba(0,255,218,0.08)"
          stroke="none"
        />
        <rect
          x="8"
          y="20"
          width="14"
          height="1.5"
          rx="0.3"
          fill="rgba(0,255,218,0.08)"
          stroke="none"
        />
      </svg>
    ),
    cli: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,20,0,0.5)"
          stroke="rgba(0,255,100,0.2)"
          strokeWidth="0.5"
        />
        <rect x="0" y="0" width="48" height="5" rx="2" fill="rgba(0,80,0,0.2)" stroke="none" />
        <circle cx="4" cy="2.5" r="1" fill="rgba(255,80,80,0.5)" stroke="none" />
        <circle cx="8" cy="2.5" r="1" fill="rgba(255,180,0,0.5)" stroke="none" />
        <circle cx="12" cy="2.5" r="1" fill="rgba(0,200,80,0.5)" stroke="none" />
        {[8, 14, 20].map((y, i) => (
          <g key={i}>
            <rect
              x="3"
              y={y}
              width="4"
              height="1.5"
              rx="0.3"
              fill="rgba(0,255,100,0.5)"
              stroke="none"
            />
            <rect
              x="8"
              y={y}
              width={[22, 18, 26][i]}
              height="1.5"
              rx="0.3"
              fill="rgba(0,255,100,0.25)"
              stroke="none"
            />
            <rect
              x="3"
              y={y + 3}
              width={[26, 20, 30][i]}
              height="1.5"
              rx="0.3"
              fill="rgba(0,255,100,0.15)"
              stroke="none"
            />
          </g>
        ))}
      </svg>
    ),
    /* Contact */
    luxury: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <rect
          x="2"
          y="4"
          width="20"
          height="24"
          rx="1.5"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.1)"
          strokeWidth="0.5"
        />
        <rect x="3" y="8" width="12" height="3" rx="0.5" fill="rgba(0,255,218,0.2)" stroke="none" />
        <rect x="3" y="13" width="8" height="2" rx="0.5" fill="rgba(0,255,218,0.1)" stroke="none" />
        <rect
          x="3"
          y="17"
          width="10"
          height="2"
          rx="0.5"
          fill="rgba(0,255,218,0.1)"
          stroke="none"
        />
        <rect
          x="24"
          y="4"
          width="22"
          height="24"
          rx="1.5"
          fill="rgba(0,255,218,0.07)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <rect
          x="26"
          y="7"
          width="18"
          height="3"
          rx="0.5"
          fill="rgba(0,255,218,0.12)"
          stroke="none"
        />
        <rect
          x="26"
          y="12"
          width="18"
          height="3"
          rx="0.5"
          fill="rgba(0,255,218,0.08)"
          stroke="none"
        />
        <rect
          x="26"
          y="17"
          width="18"
          height="3"
          rx="0.5"
          fill="rgba(0,255,218,0.08)"
          stroke="none"
        />
        <rect
          x="26"
          y="22"
          width="8"
          height="3.5"
          rx="1"
          fill="rgba(0,255,218,0.2)"
          stroke="none"
        />
      </svg>
    ),
    centered: (
      <svg viewBox="0 0 48 32" {...s} className="h-full w-full">
        <rect
          x="0"
          y="0"
          width="48"
          height="32"
          rx="2"
          fill="rgba(0,255,218,0.04)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <rect
          x="8"
          y="3"
          width="32"
          height="26"
          rx="2"
          fill="rgba(0,255,218,0.07)"
          stroke="rgba(0,255,218,0.15)"
          strokeWidth="0.5"
        />
        <rect
          x="14"
          y="6"
          width="20"
          height="2.5"
          rx="0.5"
          fill="rgba(0,255,218,0.2)"
          stroke="none"
        />
        <rect
          x="12"
          y="11"
          width="24"
          height="2"
          rx="0.5"
          fill="rgba(0,255,218,0.1)"
          stroke="none"
        />
        <rect
          x="12"
          y="15"
          width="24"
          height="2"
          rx="0.5"
          fill="rgba(0,255,218,0.08)"
          stroke="none"
        />
        <rect
          x="12"
          y="19"
          width="24"
          height="2"
          rx="0.5"
          fill="rgba(0,255,218,0.08)"
          stroke="none"
        />
        <rect
          x="16"
          y="23"
          width="16"
          height="3.5"
          rx="1"
          fill="rgba(0,255,218,0.2)"
          stroke="none"
        />
      </svg>
    ),
  }

  return (
    <div className="h-full w-full" style={{ color: 'hsl(var(--primary))' }}>
      {previews[type] ?? previews.cinematic}
    </div>
  )
}

/* ── Main VariantSwitcher component ── */
export function VariantSwitcher() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<keyof SectionVariants>('hero')
  const { sectionVariants, setSectionVariant } = useUIStore()
  const cardsRef = React.useRef<HTMLDivElement>(null)

  const activeConfig = SECTION_VARIANT_CONFIG.find((c) => c.section === activeTab)!

  function switchTab(section: keyof SectionVariants) {
    setActiveTab(section)
    // Reset scroll position so all variants are visible
    if (cardsRef.current) cardsRef.current.scrollTop = 0
  }

  return (
    <>
      {/* Trigger button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex cursor-pointer items-center gap-2 rounded-2xl px-4 py-2.5 font-mono text-xs font-semibold shadow-xl"
        style={{
          background: 'hsl(var(--surface))',
          border: '1px solid rgba(0,255,218,0.2)',
          color: 'hsl(var(--primary))',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 0 24px rgba(0,255,218,0.1), 0 8px 32px rgba(0,0,0,0.4)',
        }}
        aria-label="Switch section layout"
      >
        <span className="text-base leading-none">⊞</span>
        Layout
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: 0 }}
              animate={{ rotate: 45 }}
              exit={{ rotate: 0 }}
              className="text-base font-bold leading-none"
              style={{ color: 'hsl(var(--primary))' }}
            >
              ×
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]"
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="fixed bottom-20 right-6 z-50 flex w-80 flex-col overflow-hidden rounded-2xl"
            style={{
              background: 'hsl(var(--surface))',
              border: '1px solid rgba(0,255,218,0.15)',
              boxShadow: '0 0 40px rgba(0,255,218,0.08), 0 24px 64px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(24px)',
              maxHeight: 'calc(100vh - 120px)',
            }}
          >
            {/* Header */}
            <div
              className="px-4 pb-3 pt-4"
              style={{ borderBottom: '1px solid rgba(0,255,218,0.08)' }}
            >
              <p
                className="mb-0.5 font-mono text-[10px] uppercase tracking-widest"
                style={{ color: 'hsl(var(--text-muted))' }}
              >
                Section Layouts
              </p>
              <p className="text-xs" style={{ color: 'hsl(var(--text-dim))' }}>
                Swap the layout variant for any section
              </p>
            </div>

            {/* Section tabs */}
            <div
              className="no-scrollbar flex gap-1 overflow-x-auto px-3 py-2.5"
              style={{ borderBottom: '1px solid rgba(0,255,218,0.06)' }}
            >
              {SECTION_VARIANT_CONFIG.map((cfg) => {
                const isActive = activeTab === cfg.section
                const currentVariant = sectionVariants[cfg.section]
                const isCustom = currentVariant !== cfg.variants[0].id
                return (
                  <button
                    key={cfg.section}
                    onClick={() => switchTab(cfg.section)}
                    className="relative flex flex-shrink-0 cursor-pointer flex-col items-center gap-0.5 rounded-xl px-2.5 py-1.5 font-mono text-[10px] transition-all duration-200"
                    style={{
                      background: isActive ? 'rgba(0,255,218,0.1)' : 'transparent',
                      border: isActive ? '1px solid rgba(0,255,218,0.2)' : '1px solid transparent',
                      color: isActive ? 'hsl(var(--primary))' : 'hsl(var(--text-muted))',
                    }}
                  >
                    <span>{cfg.icon}</span>
                    <span>{cfg.label}</span>
                    {isCustom && (
                      <span
                        className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full"
                        style={{ background: 'hsl(var(--primary))' }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Variant cards */}
            <div ref={cardsRef} className="min-h-0 flex-1 space-y-2 overflow-y-auto p-3">
              <AnimatePresence mode="sync">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-2"
                >
                  {activeConfig.variants.map((variant) => {
                    const selected = sectionVariants[activeTab] === variant.id
                    return (
                      <motion.button
                        key={variant.id}
                        onClick={() => {
                          setSectionVariant(activeTab, variant.id as never)
                        }}
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        className="flex w-full cursor-pointer items-center gap-3 rounded-xl p-2.5 text-left transition-all duration-200"
                        style={{
                          background: selected ? 'rgba(0,255,218,0.08)' : 'rgba(0,255,218,0.02)',
                          border: `1px solid ${selected ? 'rgba(0,255,218,0.28)' : 'rgba(0,255,218,0.07)'}`,
                          boxShadow: selected ? '0 0 16px rgba(0,255,218,0.08)' : undefined,
                        }}
                      >
                        {/* Schematic preview */}
                        <div
                          className="h-10 w-16 flex-shrink-0 overflow-hidden rounded-lg"
                          style={{
                            background: 'hsl(var(--surface-2))',
                            border: '1px solid rgba(0,255,218,0.1)',
                          }}
                        >
                          <VariantPreview type={variant.preview} />
                        </div>

                        {/* Label + description */}
                        <div className="min-w-0 flex-1">
                          <div className="mb-0.5 flex items-center gap-2">
                            <span
                              className="font-mono text-xs font-semibold"
                              style={{
                                color: selected
                                  ? 'hsl(var(--primary))'
                                  : 'hsl(var(--text-heading))',
                              }}
                            >
                              {variant.label}
                            </span>
                            {selected && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="rounded-full px-1.5 py-0.5 font-mono text-[9px]"
                                style={{
                                  background: 'rgba(0,255,218,0.15)',
                                  color: 'hsl(var(--primary))',
                                }}
                              >
                                active
                              </motion.span>
                            )}
                          </div>
                          <p
                            className="truncate text-[10px] leading-tight"
                            style={{ color: 'hsl(var(--text-dim))' }}
                          >
                            {variant.description}
                          </p>
                        </div>
                      </motion.button>
                    )
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer: reset */}
            <div className="px-3 pb-3 pt-1" style={{ borderTop: '1px solid rgba(0,255,218,0.06)' }}>
              <button
                onClick={() => {
                  SECTION_VARIANT_CONFIG.forEach((cfg) => {
                    setSectionVariant(cfg.section, cfg.variants[0].id as never)
                  })
                }}
                className="w-full cursor-pointer rounded-lg py-1.5 font-mono text-[10px] transition-colors duration-200"
                style={{
                  color: 'hsl(var(--text-dim))',
                  background: 'transparent',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'hsl(var(--text-muted))')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'hsl(var(--text-dim))')}
              >
                Reset all to default
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
