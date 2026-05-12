import { create } from 'zustand'

export type DesignStyle =
  // Original 9
  | 'veil'
  | 'aurora'
  | 'carbon'
  | 'clay'
  | 'pulse'
  | 'obsidian'
  | 'neobrutalism'
  | 'neon-noir'
  | 'synthwave'
  // Pastel direction
  | 'pastel'
  | 'cotton'
  | 'blush'
  // Retro / Pixel direction
  | 'pixel'
  | 'dos'
  | 'arcade'
  // Cyberpunk / Acid direction
  | 'cyberpunk'
  | 'acid'
  | 'glitch'

export type SectionVariants = {
  hero: 'cinematic' | 'split' | 'terminal' | 'minimal' | 'grid' | 'glass'
  about: 'editorial' | 'bento' | 'compact' | 'story' | 'flipcards' | 'resume'
  skills: 'cloud' | 'grid' | 'showcase' | 'bars' | 'radar' | 'mastery'
  experience: 'cards' | 'timeline' | 'compact' | 'magazine' | 'kanban' | 'table'
  projects: 'featured' | 'carousel' | 'spotlight' | 'pgrid' | 'list' | 'masonry'
  contact: 'luxury' | 'centered' | 'split' | 'minimal' | 'card' | 'cli'
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
