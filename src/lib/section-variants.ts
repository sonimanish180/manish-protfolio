import type { SectionVariants } from '@/stores/ui-store'

export type VariantMeta = {
  id: string
  label: string
  description: string
  /** SVG path string used to draw a tiny schematic preview */
  preview: string
}

export type SectionVariantConfig = {
  section: keyof SectionVariants
  label: string
  icon: string
  variants: VariantMeta[]
}

export const SECTION_VARIANT_CONFIG: SectionVariantConfig[] = [
  {
    section: 'hero',
    label: 'Hero',
    icon: '⚡',
    variants: [
      {
        id: 'cinematic',
        label: 'Cinematic',
        description: 'Full-screen 3D backdrop, massive centered name',
        preview: 'cinematic',
      },
      {
        id: 'split',
        label: 'Split',
        description: '50/50 — text left, 3D visualization right',
        preview: 'split',
      },
      {
        id: 'terminal',
        label: 'Terminal',
        description: 'Retro CLI — typed commands, monospace green',
        preview: 'terminal',
      },
      {
        id: 'minimal',
        label: 'Minimal',
        description: 'Pure typography — no backgrounds, just words',
        preview: 'minimal',
      },
      {
        id: 'grid',
        label: 'Grid',
        description: 'Bento-style — info + stats in a two-column grid',
        preview: 'hero-grid',
      },
      {
        id: 'glass',
        label: 'Glass',
        description: 'Frosted glass card on dreamy color blobs',
        preview: 'hero-glass',
      },
    ],
  },
  {
    section: 'about',
    label: 'About',
    icon: '👤',
    variants: [
      {
        id: 'editorial',
        label: 'Editorial',
        description: 'Magazine layout — bio column + orbit panel',
        preview: 'editorial',
      },
      {
        id: 'bento',
        label: 'Bento',
        description: 'Bento-grid tiles — each fact as its own card',
        preview: 'bento',
      },
      {
        id: 'compact',
        label: 'Compact',
        description: 'Two-column — bio left, stacked info cards right',
        preview: 'compact',
      },
      {
        id: 'story',
        label: 'Story',
        description: 'Chapter timeline — click to reveal each era',
        preview: 'story',
      },
      {
        id: 'flipcards',
        label: 'Flip Cards',
        description: 'Hover cards with front/back 3D flip effect',
        preview: 'flipcards',
      },
      {
        id: 'resume',
        label: 'Résumé',
        description: 'Clean CV layout — two-column structured view',
        preview: 'resume',
      },
    ],
  },
  {
    section: 'skills',
    label: 'Skills',
    icon: '🛠',
    variants: [
      {
        id: 'cloud',
        label: 'Tag Cloud',
        description: 'Category rows with endorsable pills',
        preview: 'cloud',
      },
      {
        id: 'grid',
        label: 'Grid',
        description: 'Compact grid with proficiency indicators',
        preview: 'grid',
      },
      {
        id: 'showcase',
        label: 'Showcase',
        description: 'Large category cards with skill lists inside',
        preview: 'showcase',
      },
      {
        id: 'bars',
        label: 'Bars',
        description: 'Animated progress bars per skill',
        preview: 'bars',
      },
      {
        id: 'radar',
        label: 'Radar',
        description: 'SVG hexagonal radar chart by category',
        preview: 'radar',
      },
      {
        id: 'mastery',
        label: 'Mastery',
        description: 'Expert / Proficient / Familiar tier system',
        preview: 'mastery',
      },
    ],
  },
  {
    section: 'experience',
    label: 'Experience',
    icon: '💼',
    variants: [
      {
        id: 'cards',
        label: 'Cards',
        description: 'Company-colored accordion cards',
        preview: 'cards',
      },
      {
        id: 'timeline',
        label: 'Timeline',
        description: 'Vertical line with company nodes and dates',
        preview: 'timeline',
      },
      {
        id: 'compact',
        label: 'Compact',
        description: 'Dense list — role, company, period in one row',
        preview: 'compact',
      },
      {
        id: 'magazine',
        label: 'Magazine',
        description: 'Feature card for current role + smaller grid',
        preview: 'magazine',
      },
      {
        id: 'kanban',
        label: 'Kanban',
        description: 'Three-column board — career eras as lanes',
        preview: 'kanban',
      },
      {
        id: 'table',
        label: 'Table',
        description: 'Data table — click row to expand bullets',
        preview: 'exp-table',
      },
    ],
  },
  {
    section: 'projects',
    label: 'Projects',
    icon: '🚀',
    variants: [
      {
        id: 'featured',
        label: 'Featured',
        description: 'Hero card + 3-column tilt grid',
        preview: 'featured',
      },
      {
        id: 'carousel',
        label: 'Carousel',
        description: 'Horizontal scroll — large immersive cards',
        preview: 'carousel',
      },
      {
        id: 'spotlight',
        label: 'Spotlight',
        description: 'One at a time — prev/next navigation',
        preview: 'spotlight',
      },
      {
        id: 'pgrid',
        label: 'Photo Grid',
        description: 'CSS grid with varied row spans',
        preview: 'pgrid',
      },
      {
        id: 'list',
        label: 'Numbered List',
        description: 'Editorial numbered rows with tech stack',
        preview: 'proj-list',
      },
      {
        id: 'masonry',
        label: 'Masonry',
        description: 'CSS columns — cards at natural heights',
        preview: 'masonry',
      },
    ],
  },
  {
    section: 'contact',
    label: 'Contact',
    icon: '✉️',
    variants: [
      {
        id: 'luxury',
        label: 'Luxury',
        description: 'Two-panel — editorial headline + WarpTunnel',
        preview: 'luxury',
      },
      {
        id: 'centered',
        label: 'Centered',
        description: 'Single centered card, clean & minimal',
        preview: 'centered',
      },
      {
        id: 'split',
        label: 'Split',
        description: 'Contact info left, form right — no 3D',
        preview: 'split',
      },
      {
        id: 'minimal',
        label: 'Minimal',
        description: 'Just the essentials — email + LinkedIn',
        preview: 'con-minimal',
      },
      {
        id: 'card',
        label: 'Business Card',
        description: 'Physical card aesthetic — name, email, links',
        preview: 'con-card',
      },
      {
        id: 'cli',
        label: 'CLI',
        description: 'Fake terminal — contact info as typed output',
        preview: 'cli',
      },
    ],
  },
]
