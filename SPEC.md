# Manish Soni Portfolio — Project Spec

> Last updated: 2026-05-07  
> Design system: Carbon Dark  
> Skill version: nextjs-skill v1

## Product

**Name:** Manish Soni Portfolio  
**Tagline:** Personal portfolio for Manish Soni, Lead Software Engineer  
**Status:** Scaffold → Ready for dev

## Sections

| Section | Component | Notes |
|---|---|---|
| Nav | `_components/nav.tsx` | Sticky, scroll-spy, mobile menu |
| Hero | `_components/hero-section.tsx` | Typewriter roles, animated reveal |
| About | `_components/about-section.tsx` | Bio, stats, education |
| Experience | `_components/experience-section.tsx` | Interactive expanding timeline |
| Skills | `_components/skills-section.tsx` | Categorised coloured badges |
| Projects | `_components/projects-section.tsx` | Card grid, hover glow |
| Contact | `_components/contact-section.tsx` | Copy email, LinkedIn link |

## Design System: Carbon Dark

- Background: `hsl(240 10% 4%)` — near-black
- Primary: `hsl(262 83% 68%)` — violet
- Fonts: JetBrains Mono (headings/mono) + Inter (body)

## Routing

Root layout provides `NextIntlClientProvider` with English messages.  
`app/page.tsx` serves content at `/`.  
`app/[locale]/` kept for future multi-language expansion.

## Open Questions

- [ ] Add downloadable PDF resume?
- [ ] Add GitHub link?
- [ ] Light mode toggle?
