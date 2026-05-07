"use client"

import * as React from "react"
import { motion } from "framer-motion"

export interface ProgressProps {
  value: number
  label?: string
  showValue?: boolean
  variant?: "default" | "success" | "warning" | "error"
  size?: "sm" | "md" | "lg"
  animated?: boolean
}

export function Progress({
  value,
  label,
  showValue,
  variant = "default",
  size = "md",
  animated,
}: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={`ui-progress-wrapper ui-progress-${size}`}>
      {(label || showValue) && (
        <div className="ui-progress-header">
          {label && <span className="ui-progress-label">{label}</span>}
          {showValue && (
            <span className="ui-progress-value">{clamped}%</span>
          )}
        </div>
      )}
      <div
        className={`ui-progress-track ui-progress-${size}`}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className={`ui-progress-fill ui-progress-fill-${variant}${animated ? " animated" : ""}`}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
