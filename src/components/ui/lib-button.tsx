"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export type LibButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger"
export type LibButtonSize = "sm" | "md" | "lg" | "xl" | "icon"

export interface LibButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: LibButtonVariant
  size?: LibButtonSize
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  /** Wrap in framer motion for micro-interactions */
  animated?: boolean
  href?: string
}

const sizeClass: Record<LibButtonSize, string> = {
  sm:   "ui-btn-sm",
  md:   "ui-btn-md",
  lg:   "ui-btn-lg",
  xl:   "ui-btn-xl",
  icon: "ui-btn-icon",
}

export const LibButton = React.forwardRef<HTMLButtonElement, LibButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      animated = true,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      "ui-btn",
      `ui-btn-${variant}`,
      sizeClass[size],
      loading && "opacity-70 pointer-events-none",
      className
    )

    const inner = (
      <>
        {loading ? (
          <motion.span
            className="block w-4 h-4 rounded-full border-2 border-current border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          />
        ) : leftIcon}
        {size !== "icon" && children && <span>{children}</span>}
        {!loading && rightIcon}
      </>
    )

    if (animated) {
      return (
        <motion.button
          ref={ref}
          className={classes}
          whileHover={!disabled && !loading ? { scale: 1.025, y: -1 } : {}}
          whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
          disabled={disabled || loading}
          {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
        >
          {inner}
        </motion.button>
      )
    }

    return (
      <button ref={ref} className={classes} disabled={disabled || loading} {...props}>
        {inner}
      </button>
    )
  }
)
LibButton.displayName = "LibButton"
