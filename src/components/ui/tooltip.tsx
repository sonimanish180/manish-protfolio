"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"

export interface TooltipProps {
  content: React.ReactNode
  children: React.ReactElement
  placement?: "top" | "bottom" | "left" | "right"
  delay?: number
}

interface TooltipPosition {
  top: number
  left: number
}

function getPosition(
  rect: DOMRect,
  placement: TooltipProps["placement"]
): TooltipPosition {
  const gap = 8
  switch (placement) {
    case "bottom":
      return {
        top: rect.bottom + gap + window.scrollY,
        left: rect.left + rect.width / 2 + window.scrollX,
      }
    case "left":
      return {
        top: rect.top + rect.height / 2 + window.scrollY,
        left: rect.left - gap + window.scrollX,
      }
    case "right":
      return {
        top: rect.top + rect.height / 2 + window.scrollY,
        left: rect.right + gap + window.scrollX,
      }
    case "top":
    default:
      return {
        top: rect.top - gap + window.scrollY,
        left: rect.left + rect.width / 2 + window.scrollX,
      }
  }
}

export function Tooltip({
  content,
  children,
  placement = "top",
  delay = 300,
}: TooltipProps) {
  const [visible, setVisible] = React.useState(false)
  const [position, setPosition] = React.useState<TooltipPosition>({
    top: 0,
    left: 0,
  })
  const [mounted, setMounted] = React.useState(false)
  const triggerRef = React.useRef<HTMLElement | null>(null)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    setMounted(true)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  function handleMouseEnter(e: React.MouseEvent) {
    const el = e.currentTarget as HTMLElement
    triggerRef.current = el
    timerRef.current = setTimeout(() => {
      const rect = el.getBoundingClientRect()
      setPosition(getPosition(rect, placement))
      setVisible(true)
    }, delay)
  }

  function handleMouseLeave() {
    if (timerRef.current) clearTimeout(timerRef.current)
    setVisible(false)
  }

  const child = React.cloneElement(
    children as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
    {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    }
  )

  const tooltipNode =
    mounted && typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {visible && (
              <motion.div
                className={`ui-tooltip-content ui-tooltip-${placement}`}
                style={{
                  position: "absolute",
                  top: position.top,
                  left: position.left,
                  transform:
                    placement === "top" || placement === "bottom"
                      ? "translateX(-50%)"
                      : placement === "left"
                        ? "translateX(-100%) translateY(-50%)"
                        : "translateY(-50%)",
                  pointerEvents: "none",
                  zIndex: 9999,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                {content}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )
      : null

  return (
    <>
      {child}
      {tooltipNode}
    </>
  )
}
