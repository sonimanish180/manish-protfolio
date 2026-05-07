import { create } from "zustand"

type UIState = {
  mobileMenuOpen: boolean
  activeSection: string
  setMobileMenuOpen: (open: boolean) => void
  setActiveSection: (section: string) => void
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  activeSection: "hero",
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setActiveSection: (section) => set({ activeSection: section }),
}))
