"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface DialogProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  /** Hides the close × button */
  hideClose?: boolean
  /** Max width class, e.g. "max-w-md" */
  maxWidth?: string
  children?: React.ReactNode
  className?: string
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  hideClose = false,
  maxWidth = "max-w-lg",
  children,
  className,
}: DialogProps) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  // Close on Escape
  React.useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, onClose])

  // Lock scroll
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="ui-dialog-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={(e: React.MouseEvent) => { if (e.target === e.currentTarget) onClose() }}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className={cn("ui-dialog w-full", maxWidth, className)}
          >
            {/* Header */}
            {(title || !hideClose) && (
              <div className="flex items-start justify-between gap-4 p-6 pb-4">
                <div>
                  {title && (
                    <h2 className="text-base font-bold leading-tight" style={{ color: "hsl(var(--text-heading))" }}>
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="text-sm mt-1 leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                      {description}
                    </p>
                  )}
                </div>
                {!hideClose && (
                  <button
                    onClick={onClose}
                    className="shrink-0 p-1.5 rounded-lg cursor-pointer transition-colors"
                    style={{ color: "hsl(var(--text-muted))" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(var(--surface-2))")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    aria-label="Close dialog"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className={cn(!title && !hideClose ? "p-6" : "px-6 pb-6")}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

/** Convenience footer row for dialog action buttons */
export function DialogFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn("flex items-center justify-end gap-2.5 pt-4 mt-4", className)}
      style={{ borderTop: "1px solid var(--card-border)" }}
    >
      {children}
    </div>
  )
}
