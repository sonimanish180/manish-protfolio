"use client"

/**
 * StyleApplier — applies the current design style as a data-style attribute
 * on the <html> element so CSS selectors in themes.css can override variables.
 * Rendered once in page.tsx, invisible, no DOM output.
 */

import { useEffect } from "react"
import { useUIStore } from "@/stores"

export function StyleApplier() {
  const currentStyle = useUIStore((s) => s.currentStyle)

  useEffect(() => {
    const html = document.documentElement
    if (currentStyle === "veil") {
      html.removeAttribute("data-style")
    } else {
      html.setAttribute("data-style", currentStyle)
    }
  }, [currentStyle])

  return null
}
