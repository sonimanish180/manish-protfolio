"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface StackedCards3DProps {
  /** Array of card contents. 2–5 cards work best. */
  cards: React.ReactNode[]
  /** Width in px (default 260) */
  width?: number
  /** Height in px (default 160) */
  height?: number
  /** Fan direction on hover (default "arc") */
  fanMode?: "arc" | "spread" | "cascade"
  className?: string
}

function getFanTransform(
  idx: number,
  total: number,
  fanMode: string,
  hovered: boolean
): { rotateZ: number; translateX: number; translateY: number; translateZ: number } {
  if (!hovered) {
    return {
      rotateZ: (idx - (total - 1) / 2) * 2.5,
      translateX: (idx - (total - 1) / 2) * 4,
      translateY: idx * -4,
      translateZ: idx * 8,
    }
  }

  if (fanMode === "spread") {
    const spread = total > 1 ? 220 / (total - 1) : 0
    return {
      rotateZ: 0,
      translateX: idx * spread - ((total - 1) * spread) / 2,
      translateY: 0,
      translateZ: idx * 12,
    }
  }

  if (fanMode === "cascade") {
    return {
      rotateZ: 0,
      translateX: idx * 24 - ((total - 1) * 24) / 2,
      translateY: idx * -36,
      translateZ: idx * 20,
    }
  }

  // arc
  const range = Math.min(40, total * 10)
  const angle = total > 1 ? (idx / (total - 1) - 0.5) * range : 0
  return {
    rotateZ: angle,
    translateX: angle * 2.8,
    translateY: Math.abs(angle) * 0.6,
    translateZ: idx * 10,
  }
}

export function StackedCards3D({
  cards,
  width = 260,
  height = 160,
  fanMode = "arc",
  className,
}: StackedCards3DProps) {
  const [hovered, setHovered] = React.useState(false)
  const total = cards.length

  return (
    <div
      className={cn("relative flex items-center justify-center cursor-pointer", className)}
      style={{ width: width + 120, height: height + 80, perspective: "1200px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {cards.map((card, idx) => {
        const t = getFanTransform(idx, total, fanMode, hovered)
        const zIndex = hovered ? idx + 1 : total - idx

        return (
          <motion.div
            key={idx}
            animate={{
              rotateZ: t.rotateZ,
              x: t.translateX,
              y: t.translateY,
              z: t.translateZ,
            }}
            transition={{ type: "spring", stiffness: 280, damping: 26, delay: idx * 0.04 }}
            style={{
              position: "absolute",
              width,
              height,
              zIndex,
              transformOrigin: "center bottom",
              willChange: "transform",
              transformStyle: "preserve-3d",
            }}
          >
            <div style={{ width: "100%", height: "100%", borderRadius: "inherit" }}>
              {card}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
