import { Nav } from "./_components/nav"
import { HeroSection } from "./_components/hero-section"
import { AboutSection } from "./_components/about-section"
import { ExperienceSection } from "./_components/experience-section"
import { SkillsSection } from "./_components/skills-section"
import { ProjectsSection } from "./_components/projects-section"
import { ContactSection } from "./_components/contact-section"

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
