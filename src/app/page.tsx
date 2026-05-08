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

/* About variants */
import { AboutSection } from './[locale]/_components/about-section'
import { AboutBento } from './[locale]/_components/about-bento'
import { AboutCompact } from './[locale]/_components/about-compact'

/* Skills variants */
import { SkillsSection } from './[locale]/_components/skills-section'
import { SkillsGrid } from './[locale]/_components/skills-grid'
import { SkillsShowcase } from './[locale]/_components/skills-showcase'

/* Experience variants */
import { ExperienceSection } from './[locale]/_components/experience-section'
import { ExperienceTimeline } from './[locale]/_components/experience-timeline'
import { ExperienceCompact } from './[locale]/_components/experience-compact'

/* Projects variants */
import { ProjectsSection } from './[locale]/_components/projects-section'
import { ProjectsCarousel } from './[locale]/_components/projects-carousel'
import { ProjectsSpotlight } from './[locale]/_components/projects-spotlight'

/* Contact variants */
import { ContactSection } from './[locale]/_components/contact-section'
import { ContactCentered } from './[locale]/_components/contact-centered'
import { ContactSplit } from './[locale]/_components/contact-split'

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

        {/* Hero */}
        {sectionVariants.hero === 'cinematic' && <HeroSection />}
        {sectionVariants.hero === 'split' && <HeroSplit />}
        {sectionVariants.hero === 'terminal' && <HeroTerminal />}

        {/* About */}
        {sectionVariants.about === 'editorial' && <AboutSection />}
        {sectionVariants.about === 'bento' && <AboutBento />}
        {sectionVariants.about === 'compact' && <AboutCompact />}

        {/* Experience */}
        {sectionVariants.experience === 'cards' && <ExperienceSection />}
        {sectionVariants.experience === 'timeline' && <ExperienceTimeline />}
        {sectionVariants.experience === 'compact' && <ExperienceCompact />}

        {/* Skills */}
        {sectionVariants.skills === 'cloud' && <SkillsSection />}
        {sectionVariants.skills === 'grid' && <SkillsGrid />}
        {sectionVariants.skills === 'showcase' && <SkillsShowcase />}

        {/* Projects */}
        {sectionVariants.projects === 'featured' && <ProjectsSection />}
        {sectionVariants.projects === 'carousel' && <ProjectsCarousel />}
        {sectionVariants.projects === 'spotlight' && <ProjectsSpotlight />}

        {/* Contact */}
        {sectionVariants.contact === 'luxury' && <ContactSection />}
        {sectionVariants.contact === 'centered' && <ContactCentered />}
        {sectionVariants.contact === 'split' && <ContactSplit />}
      </main>

      {/* Fixed bottom: design system switcher (center) + layout variant switcher (right) */}
      <StyleSwitcher />
      <VariantSwitcher />
    </>
  )
}
