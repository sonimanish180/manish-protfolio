"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  error?: string
  showCount?: boolean
  maxLength?: number
  wrapperClassName?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, showCount, maxLength, className, wrapperClassName, id, value, ...props }, ref) => {
    const generatedId = React.useId()
    const textareaId = id ?? generatedId
    const charCount = typeof value === "string" ? value.length : 0

    return (
      <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
        {(label || (showCount && maxLength)) && (
          <div className="flex items-center justify-between">
            {label && (
              <label
                htmlFor={textareaId}
                className="text-xs font-mono uppercase tracking-wider select-none"
                style={{ color: "hsl(var(--text-muted))" }}
              >
                {label}
              </label>
            )}
            {showCount && maxLength && (
              <span
                className="text-xs font-mono tabular-nums"
                style={{ color: charCount > maxLength * 0.9 ? "hsl(var(--accent))" : "hsl(var(--text-dim))" }}
              >
                {charCount}/{maxLength}
              </span>
            )}
          </div>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          value={value}
          maxLength={maxLength}
          className={cn("ui-textarea", error && "error", className)}
          aria-invalid={!!error}
          {...props}
        />
        {error && (
          <p className="text-xs" style={{ color: "hsl(var(--destructive))" }}>
            {error}
          </p>
        )}
        {!error && hint && (
          <p className="text-xs" style={{ color: "hsl(var(--text-dim))" }}>
            {hint}
          </p>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"
