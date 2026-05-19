'use client'

import { useUIStore } from '@/stores/ui-store'

import { Nav } from './_components/nav'
import { VariantSwitcher } from './_components/variant-switcher'

/* ── Hero variants ─────────────────────────────────────────────────── */
import { HeroSection } from './_components/hero-section'
import { HeroSplit } from './_components/hero-split'
import { HeroTerminal } from './_components/hero-terminal'
import { HeroMinimal } from './_components/hero-minimal'
import { HeroGrid } from './_components/hero-grid'
import { HeroGlass } from './_components/hero-glass'

/* ── About variants ────────────────────────────────────────────────── */
import { AboutSection } from './_components/about-section'
import { AboutBento } from './_components/about-bento'
import { AboutCompact } from './_components/about-compact'
import { AboutStory } from './_components/about-story'
import { AboutFlipCards } from './_components/about-flipcards'
import { AboutResume } from './_components/about-resume'

/* ── Skills variants ───────────────────────────────────────────────── */
import { SkillsSection } from './_components/skills-section'
import { SkillsGrid } from './_components/skills-grid'
import { SkillsShowcase } from './_components/skills-showcase'
import { SkillsBars } from './_components/skills-bars'
import { SkillsRadar } from './_components/skills-radar'
import { SkillsMastery } from './_components/skills-mastery'

/* ── Experience variants ───────────────────────────────────────────── */
import { ExperienceSection } from './_components/experience-section'
import { ExperienceTimeline } from './_components/experience-timeline'
import { ExperienceCompact } from './_components/experience-compact'
import { ExperienceMagazine } from './_components/experience-magazine'
import { ExperienceKanban } from './_components/experience-kanban'
import { ExperienceTable } from './_components/experience-table'

/* ── Projects variants ─────────────────────────────────────────────── */
import { ProjectsSection } from './_components/projects-section'
import { ProjectsCarousel } from './_components/projects-carousel'
import { ProjectsSpotlight } from './_components/projects-spotlight'
import { ProjectsPGrid } from './_components/projects-pgrid'
import { ProjectsList } from './_components/projects-list'
import { ProjectsMasonry } from './_components/projects-masonry'

/* ── Next.js Skill ─────────────────────────────────────────────────── */
import { NextjsSkillSection } from './_components/nextjs-skill-section'

/* ── Contact variants ──────────────────────────────────────────────── */
import { ContactSection } from './_components/contact-section'
import { ContactCentered } from './_components/contact-centered'
import { ContactSplit } from './_components/contact-split'
import { ContactMinimal } from './_components/contact-minimal'
import { ContactCard } from './_components/contact-card'
import { ContactCli } from './_components/contact-cli'

export default function HomePage() {
  const { sectionVariants } = useUIStore()

  return (
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

      {/* ── Next.js Skill ────────────────────────────────────────────── */}
      <NextjsSkillSection />

      {/* ── Contact ──────────────────────────────────────────────────── */}
      {sectionVariants.contact === 'luxury' && <ContactSection />}
      {sectionVariants.contact === 'centered' && <ContactCentered />}
      {sectionVariants.contact === 'split' && <ContactSplit />}
      {sectionVariants.contact === 'minimal' && <ContactMinimal />}
      {sectionVariants.contact === 'card' && <ContactCard />}
      {sectionVariants.contact === 'cli' && <ContactCli />}

      <VariantSwitcher />
    </main>
  )
}
