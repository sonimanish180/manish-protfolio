'use client'

import { useUIStore } from '@/stores/ui-store'
import { ScrollProgress } from '@/components/composite/scroll-progress'
import { CursorGlow } from '@/components/composite/cursor-glow'
import { StyleSwitcher } from '@/components/composite/style-switcher'
import { StyleApplier } from '@/components/composite/style-applier'

import { Nav } from './[locale]/_components/nav'
import { VariantSwitcher } from './[locale]/_components/variant-switcher'

/* Hero variants */
import { HeroSection } from './[locale]/_components/hero-section'
import { HeroSplit } from './[locale]/_components/hero-split'
import { HeroTerminal } from './[locale]/_components/hero-terminal'
import { HeroMinimal } from './[locale]/_components/hero-minimal'
import { HeroGrid } from './[locale]/_components/hero-grid'
import { HeroGlass } from './[locale]/_components/hero-glass'

/* About variants */
import { AboutSection } from './[locale]/_components/about-section'
import { AboutBento } from './[locale]/_components/about-bento'
import { AboutCompact } from './[locale]/_components/about-compact'
import { AboutStory } from './[locale]/_components/about-story'
import { AboutFlipCards } from './[locale]/_components/about-flipcards'
import { AboutResume } from './[locale]/_components/about-resume'

/* Skills variants */
import { SkillsSection } from './[locale]/_components/skills-section'
import { SkillsGrid } from './[locale]/_components/skills-grid'
import { SkillsShowcase } from './[locale]/_components/skills-showcase'
import { SkillsBars } from './[locale]/_components/skills-bars'
import { SkillsRadar } from './[locale]/_components/skills-radar'
import { SkillsMastery } from './[locale]/_components/skills-mastery'

/* Experience variants */
import { ExperienceSection } from './[locale]/_components/experience-section'
import { ExperienceTimeline } from './[locale]/_components/experience-timeline'
import { ExperienceCompact } from './[locale]/_components/experience-compact'
import { ExperienceMagazine } from './[locale]/_components/experience-magazine'
import { ExperienceKanban } from './[locale]/_components/experience-kanban'
import { ExperienceTable } from './[locale]/_components/experience-table'

/* Projects variants */
import { ProjectsSection } from './[locale]/_components/projects-section'
import { ProjectsCarousel } from './[locale]/_components/projects-carousel'
import { ProjectsSpotlight } from './[locale]/_components/projects-spotlight'
import { ProjectsPGrid } from './[locale]/_components/projects-pgrid'
import { ProjectsList } from './[locale]/_components/projects-list'
import { ProjectsMasonry } from './[locale]/_components/projects-masonry'

/* Contact variants */
import { ContactSection } from './[locale]/_components/contact-section'
import { ContactCentered } from './[locale]/_components/contact-centered'
import { ContactSplit } from './[locale]/_components/contact-split'
import { ContactMinimal } from './[locale]/_components/contact-minimal'
import { ContactCard } from './[locale]/_components/contact-card'
import { ContactCli } from './[locale]/_components/contact-cli'

export default function HomePage() {
  const { sectionVariants } = useUIStore()

  return (
    <>
      {/* Background — re-skinned by themes.css via data-style */}
      <div className="veil-bg-fixed" aria-hidden="true" />

      {/* Scroll Theater: gradient progress bar */}
      <ScrollProgress />

      {/* Cursor-tracking glow orb */}
      <CursorGlow />

      {/* Applies data-style="X" to <html> when style changes */}
      <StyleApplier />

      <main>
        <Nav />

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        {sectionVariants.hero === 'cinematic' && <HeroSection />}
        {sectionVariants.hero === 'split' && <HeroSplit />}
        {sectionVariants.hero === 'terminal' && <HeroTerminal />}
        {sectionVariants.hero === 'minimal' && <HeroMinimal />}
        {sectionVariants.hero === 'grid' && <HeroGrid />}
        {sectionVariants.hero === 'glass' && <HeroGlass />}

        {/* ── About ────────────────────────────────────────────────────── */}
        {sectionVariants.about === 'editorial' && <AboutSection />}
        {sectionVariants.about === 'bento' && <AboutBento />}
        {sectionVariants.about === 'compact' && <AboutCompact />}
        {sectionVariants.about === 'story' && <AboutStory />}
        {sectionVariants.about === 'flipcards' && <AboutFlipCards />}
        {sectionVariants.about === 'resume' && <AboutResume />}

        {/* ── Skills ───────────────────────────────────────────────────── */}
        {sectionVariants.skills === 'cloud' && <SkillsSection />}
        {sectionVariants.skills === 'grid' && <SkillsGrid />}
        {sectionVariants.skills === 'showcase' && <SkillsShowcase />}
        {sectionVariants.skills === 'bars' && <SkillsBars />}
        {sectionVariants.skills === 'radar' && <SkillsRadar />}
        {sectionVariants.skills === 'mastery' && <SkillsMastery />}

        {/* ── Experience ───────────────────────────────────────────────── */}
        {sectionVariants.experience === 'cards' && <ExperienceSection />}
        {sectionVariants.experience === 'timeline' && <ExperienceTimeline />}
        {sectionVariants.experience === 'compact' && <ExperienceCompact />}
        {sectionVariants.experience === 'magazine' && <ExperienceMagazine />}
        {sectionVariants.experience === 'kanban' && <ExperienceKanban />}
        {sectionVariants.experience === 'table' && <ExperienceTable />}

        {/* ── Projects ─────────────────────────────────────────────────── */}
        {sectionVariants.projects === 'featured' && <ProjectsSection />}
        {sectionVariants.projects === 'carousel' && <ProjectsCarousel />}
        {sectionVariants.projects === 'spotlight' && <ProjectsSpotlight />}
        {sectionVariants.projects === 'pgrid' && <ProjectsPGrid />}
        {sectionVariants.projects === 'list' && <ProjectsList />}
        {sectionVariants.projects === 'masonry' && <ProjectsMasonry />}

        {/* ── Contact ──────────────────────────────────────────────────── */}
        {sectionVariants.contact === 'luxury' && <ContactSection />}
        {sectionVariants.contact === 'centered' && <ContactCentered />}
        {sectionVariants.contact === 'split' && <ContactSplit />}
        {sectionVariants.contact === 'minimal' && <ContactMinimal />}
        {sectionVariants.contact === 'card' && <ContactCard />}
        {sectionVariants.contact === 'cli' && <ContactCli />}
      </main>

      {/* Fixed bottom: design system switcher (center) + layout variant switcher (right) */}
      <StyleSwitcher />
      <VariantSwitcher />
    </>
  )
}
