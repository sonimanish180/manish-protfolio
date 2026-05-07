"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  size?: "sm" | "md" | "lg"
  label?: string
  description?: string
  disabled?: boolean
  className?: string
}

// Track width, track height, thumb diameter, left offset when unchecked
const SIZE_MAP = {
  sm: { w: 32, h: 18,  thumb: 12, pad: 3 },
  md: { w: 40, h: 22,  thumb: 15, pad: 3 },
  lg: { w: 50, h: 27,  thumb: 19, pad: 4 },
} as const

export function Toggle({
  checked,
  onChange,
  size = "md",
  label,
  description,
  disabled,
  className,
}: ToggleProps) {
  const id = React.useId()
  const { w, h, thumb, pad } = SIZE_MAP[size]

  // Thumb travel distance: track_width - thumb_diameter - 2*pad
  const travel = w - thumb - pad * 2

  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex items-center gap-3 cursor-pointer select-none",
        disabled && "opacity-40 cursor-not-allowed pointer-events-none",
        className
      )}
    >
      {/* Hidden real checkbox for a11y */}
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />

      {/* Track */}
      <span
        aria-hidden="true"
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          width: w,
          height: h,
          borderRadius: 9999,
          flexShrink: 0,
          border: "1.5px solid",
          borderColor: checked ? "hsl(var(--primary))" : "hsl(var(--text-dim))",
          background: checked ? "hsl(var(--primary))" : "hsl(var(--surface-2))",
          transition: "background 0.18s, border-color 0.18s",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        {/* Animated thumb */}
        <motion.span
          aria-hidden="true"
          animate={{ x: checked ? travel : 0 }}
          transition={{ type: "spring", stiffness: 520, damping: 32 }}
          style={{
            position: "absolute",
            left: pad,
            top: "50%",
            translateY: "-50%",
            width: thumb,
            height: thumb,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 1px 5px rgba(0,0,0,0.32)",
            display: "block",
          }}
        />
      </span>

      {/* Text content */}
      {(label || description) && (
        <span className="flex flex-col gap-0.5">
          {label && (
            <span
              className="text-sm font-medium leading-tight"
              style={{ color: "hsl(var(--text-heading))" }}
            >
              {label}
            </span>
          )}
          {description && (
            <span
              className="text-xs leading-snug"
              style={{ color: "hsl(var(--text-muted))" }}
            >
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  )
}
