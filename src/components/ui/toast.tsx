"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import { CheckCircleIcon, XCircleIcon, AlertTriangleIcon, InfoIcon, XIcon } from "lucide-react"
import { useToastStore, type ToastType } from "@/stores/toast-store"
import { cn } from "@/lib/utils"

const iconMap: Record<ToastType, React.ReactNode> = {
  success: <CheckCircleIcon className="w-4 h-4 shrink-0" style={{ color: "hsl(142, 71%, 55%)" }} />,
  error:   <XCircleIcon className="w-4 h-4 shrink-0" style={{ color: "hsl(0, 72%, 60%)" }} />,
  warning: <AlertTriangleIcon className="w-4 h-4 shrink-0" style={{ color: "hsl(38, 92%, 60%)" }} />,
  info:    <InfoIcon className="w-4 h-4 shrink-0" style={{ color: "hsl(var(--primary))" }} />,
}

/** Drop this once in your root layout — it renders a portal with all toasts */
export function Toaster() {
  const { toasts, remove } = useToastStore()

  return createPortal(
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed bottom-6 right-5 z-[600] flex flex-col gap-2.5 pointer-events-none"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, x: 48, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 48, scale: 0.88 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          >
            <div className={cn("ui-toast", `ui-toast-${t.type}`)}>
              {/* Icon */}
              <div className="mt-0.5 shrink-0">{iconMap[t.type]}</div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-tight" style={{ color: "hsl(var(--text-heading))" }}>
                  {t.title}
                </p>
                {t.description && (
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                    {t.description}
                  </p>
                )}
              </div>

              {/* Close */}
              <button
                onClick={() => remove(t.id)}
                className="shrink-0 p-1 rounded-md transition-colors cursor-pointer pointer-events-all"
                style={{ color: "hsl(var(--text-muted))" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(var(--text-heading))")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(var(--text-muted))")}
                aria-label="Dismiss"
              >
                <XIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body
  )
}

/** Inline single toast preview — used in the design showcase */
export function ToastPreview({ type }: { type: ToastType }) {
  const labels: Record<ToastType, { title: string; desc: string }> = {
    success: { title: "Changes saved!", desc: "Your project was updated." },
    error:   { title: "Something went wrong", desc: "Please try again." },
    warning: { title: "Heads up", desc: "This action cannot be undone." },
    info:    { title: "New update available", desc: "Refresh to see changes." },
  }
  const { title, desc } = labels[type]
  return (
    <div className={cn("ui-toast", `ui-toast-${type}`)}>
      <div className="mt-0.5 shrink-0">{iconMap[type]}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-tight" style={{ color: "hsl(var(--text-heading))" }}>{title}</p>
        <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>{desc}</p>
      </div>
    </div>
  )
}

/** Client-side mount guard for Toaster — defers until after hydration */
export function ToasterMount() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return <Toaster />
}

// Auto-unmount hook for demos
export function useAutoToastDemo() {
  const { add } = useToastStore()
  useEffect(() => {
    const t = setTimeout(() => {
      add({ type: "success", title: "Welcome to the Design System!", description: "Explore all components below.", duration: 4000 })
    }, 800)
    return () => clearTimeout(t)
  }, [add])
}
