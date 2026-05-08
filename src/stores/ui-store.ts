import { create } from 'zustand'

export type DesignStyle =
  | 'veil'
  | 'aurora'
  | 'carbon'
  | 'clay'
  | 'pulse'
  | 'obsidian'
  | 'neobrutalism'
  | 'neon-noir'
  | 'synthwave'

export type SectionVariants = {
  hero: 'cinematic' | 'split' | 'terminal'
  about: 'editorial' | 'bento' | 'compact'
  skills: 'cloud' | 'grid' | 'showcase'
  experience: 'cards' | 'timeline' | 'compact'
  projects: 'featured' | 'carousel' | 'spotlight'
  contact: 'luxury' | 'centered' | 'split'
}

const DEFAULT_VARIANTS: SectionVariants = {
  hero: 'cinematic',
  about: 'editorial',
  skills: 'cloud',
  experience: 'cards',
  projects: 'featured',
  contact: 'luxury',
}

type UIState = {
  mobileMenuOpen: boolean
  activeSection: string
  currentStyle: DesignStyle
  sectionVariants: SectionVariants
  setMobileMenuOpen: (open: boolean) => void
  setActiveSection: (section: string) => void
  setCurrentStyle: (style: DesignStyle) => void
  setSectionVariant: <K extends keyof SectionVariants>(
    section: K,
    variant: SectionVariants[K],
  ) => void
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  activeSection: 'hero',
  currentStyle: 'veil',
  sectionVariants: DEFAULT_VARIANTS,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setActiveSection: (section) => set({ activeSection: section }),
  setCurrentStyle: (style) => set({ currentStyle: style }),
  setSectionVariant: (section, variant) =>
    set((state) => ({
      sectionVariants: { ...state.sectionVariants, [section]: variant },
    })),
}))
