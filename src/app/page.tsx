import { Nav } from "./[locale]/_components/nav"
import { HeroSection } from "./[locale]/_components/hero-section"
import { AboutSection } from "./[locale]/_components/about-section"
import { ExperienceSection } from "./[locale]/_components/experience-section"
import { SkillsSection } from "./[locale]/_components/skills-section"
import { ProjectsSection } from "./[locale]/_components/projects-section"
import { ContactSection } from "./[locale]/_components/contact-section"

export default function HomePage() {
  return (
    <main>
      <Nav />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  )
}
