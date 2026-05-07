import { create } from "zustand"

export type DesignStyle = "veil" | "aurora" | "carbon" | "clay" | "pulse" | "obsidian" | "neobrutalism" | "neon-noir" | "synthwave"

type UIState = {
  mobileMenuOpen: boolean
  activeSection: string
  currentStyle: DesignStyle
  setMobileMenuOpen: (open: boolean) => void
  setActiveSection: (section: string) => void
  setCurrentStyle: (style: DesignStyle) => void
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  activeSection: "hero",
  currentStyle: "veil",
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setActiveSection: (section) => set({ activeSection: section }),
  setCurrentStyle: (style) => set({ currentStyle: style }),
}))
