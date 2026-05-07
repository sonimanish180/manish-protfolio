import { Nav } from "./[locale]/_components/nav"
import { HeroSection } from "./[locale]/_components/hero-section"
import { AboutSection } from "./[locale]/_components/about-section"
import { ExperienceSection } from "./[locale]/_components/experience-section"
import { SkillsSection } from "./[locale]/_components/skills-section"
import { ProjectsSection } from "./[locale]/_components/projects-section"
import { ContactSection } from "./[locale]/_components/contact-section"
import { ScrollProgress } from "@/components/composite/scroll-progress"
import { CursorGlow } from "@/components/composite/cursor-glow"
import { StyleSwitcher } from "@/components/composite/style-switcher"
import { StyleApplier } from "@/components/composite/style-applier"

export default function HomePage() {
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
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Fixed bottom style switcher */}
      <StyleSwitcher />
    </>
  )
}
