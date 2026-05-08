'use client'

import { useUIStore } from '@/stores/ui-store'

import { Nav } from './_components/nav'
import { VariantSwitcher } from './_components/variant-switcher'

/* Hero variants */
import { HeroSection } from './_components/hero-section'
import { HeroSplit } from './_components/hero-split'
import { HeroTerminal } from './_components/hero-terminal'

/* About variants */
import { AboutSection } from './_components/about-section'
import { AboutBento } from './_components/about-bento'
import { AboutCompact } from './_components/about-compact'

/* Skills variants */
import { SkillsSection } from './_components/skills-section'
import { SkillsGrid } from './_components/skills-grid'
import { SkillsShowcase } from './_components/skills-showcase'

/* Experience variants */
import { ExperienceSection } from './_components/experience-section'
import { ExperienceTimeline } from './_components/experience-timeline'
import { ExperienceCompact } from './_components/experience-compact'

/* Projects variants */
import { ProjectsSection } from './_components/projects-section'
import { ProjectsCarousel } from './_components/projects-carousel'
import { ProjectsSpotlight } from './_components/projects-spotlight'

/* Contact variants */
import { ContactSection } from './_components/contact-section'
import { ContactCentered } from './_components/contact-centered'
import { ContactSplit } from './_components/contact-split'

export default function HomePage() {
  const { sectionVariants } = useUIStore()

  return (
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

      <VariantSwitcher />
    </main>
  )
}
