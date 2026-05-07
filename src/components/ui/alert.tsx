"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react"

export interface AlertProps {
  variant: "success" | "error" | "warning" | "info"
  title?: string
  children: React.ReactNode
  onDismiss?: () => void
  className?: string
}

const variantIcons: Record<AlertProps["variant"], React.ReactNode> = {
  success: <CheckCircle2 size={18} />,
  error: <XCircle size={18} />,
  warning: <AlertTriangle size={18} />,
  info: <Info size={18} />,
}

export function Alert({
  variant,
  title,
  children,
  onDismiss,
  className,
}: AlertProps) {
  const [visible, setVisible] = React.useState(true)

  function handleDismiss() {
    setVisible(false)
    onDismiss?.()
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`ui-alert ui-alert-${variant}${className ? ` ${className}` : ""}`}
          role="alert"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
        >
          <span className="ui-alert-icon">{variantIcons[variant]}</span>
          <div className="ui-alert-body">
            {title && <p className="ui-alert-title">{title}</p>}
            <div className="ui-alert-content">{children}</div>
          </div>
          {onDismiss && (
            <button
              className="ui-alert-dismiss"
              onClick={handleDismiss}
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
