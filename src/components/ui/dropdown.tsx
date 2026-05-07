"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export interface DropdownItem {
  key: string
  label: string
  icon?: React.ReactNode
  description?: string
  variant?: "default" | "danger"
  disabled?: boolean
  onClick?: () => void
}

export interface DropdownProps {
  trigger: React.ReactNode
  items: (DropdownItem | "divider")[]
  align?: "left" | "right"
  className?: string
}

export function Dropdown({ trigger, items, align = "left", className }: DropdownProps) {
  const [open, setOpen] = React.useState(false)
  const [menuStyle, setMenuStyle] = React.useState<Record<string, unknown>>({})
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => { setMounted(true) }, [])

  // Recalculate position whenever open toggles on
  const openMenu = React.useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const top = rect.bottom + 6
      setMenuStyle(
        align === "right"
          ? { position: "fixed", top, right: window.innerWidth - rect.right, zIndex: 9999 }
          : { position: "fixed", top, left: rect.left, zIndex: 9999 }
      )
    }
    setOpen(true)
  }, [align])

  // Close on outside click
  React.useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  // Close on Escape
  React.useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open])

  const menu = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -4 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="ui-dropdown-menu"
          style={menuStyle}
          role="menu"
        >
          {items.map((item, i) => {
            if (item === "divider") {
              return <div key={`divider-${i}`} className="ui-dropdown-divider" />
            }
            return (
              <button
                key={item.key}
                role="menuitem"
                disabled={item.disabled}
                onClick={() => {
                  if (!item.disabled) {
                    item.onClick?.()
                    setOpen(false)
                  }
                }}
                className={cn(
                  "ui-dropdown-item",
                  item.variant === "danger" && "danger",
                  item.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
                )}
              >
                {item.icon && <span className="shrink-0">{item.icon}</span>}
                <div className="flex flex-col min-w-0">
                  <span className="leading-tight">{item.label}</span>
                  {item.description && (
                    <span className="text-xs leading-tight mt-0.5" style={{ color: "hsl(var(--text-dim))" }}>
                      {item.description}
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <div ref={triggerRef} className={cn("relative inline-block", className)}>
      <div onClick={() => (open ? setOpen(false) : openMenu())} className="cursor-pointer">
        {trigger}
      </div>
      {mounted ? createPortal(menu, document.body) : null}
    </div>
  )
}
