'use client'

import { useTranslations } from 'next-intl'
import { projects } from '@/lib/data'
import { LayerReveal } from '@/components/composite/layer-reveal'

export function ProjectsMasonry() {
  const t = useTranslations('projects')

  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <LayerReveal>
          <span className="section-label">{t('title')}</span>
        </LayerReveal>

        <div className="mt-12">
          <style>{`
            .masonry-grid { columns: 1; column-gap: 1rem; }
            @media (min-width: 768px) { .masonry-grid { columns: 2; } }
            @media (min-width: 1024px) { .masonry-grid { columns: 3; } }
          `}</style>

          <div className="masonry-grid">
            {projects.map((project, i) => {
              const isFeatured = i === 0
              return (
                <LayerReveal key={project.title} delay={i * 70}>
                  <div
                    className="mb-4 break-inside-avoid rounded-2xl p-6 transition-shadow duration-300 hover:shadow-md"
                    style={{
                      background: 'hsl(var(--surface))',
                      border: isFeatured
                        ? '1.5px solid hsl(var(--primary))'
                        : '1px solid hsl(var(--border))',
                    }}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span
                        className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                        style={{
                          background: 'hsl(var(--surface-2))',
                          color: 'hsl(var(--text-muted))',
                        }}
                      >
                        {project.company}
                      </span>
                      {isFeatured && (
                        <span
                          className="text-xs font-semibold"
                          style={{ color: 'hsl(var(--primary))' }}
                        >
                          Featured
                        </span>
                      )}
                    </div>

                    <h3
                      className="mb-2 text-base font-semibold leading-snug"
                      style={{ color: 'hsl(var(--text-heading))' }}
                    >
                      {project.title}
                    </h3>

                    <p
                      className="mb-4 text-sm leading-relaxed"
                      style={{ color: 'hsl(var(--text-body))' }}
                    >
                      {project.description}
                    </p>

                    {project.impact && (
                      <p
                        className="mb-3 text-xs font-medium"
                        style={{ color: 'hsl(var(--accent))' }}
                      >
                        ↑ {project.impact}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md px-2 py-0.5 text-xs"
                          style={{
                            background: 'hsl(var(--surface-2))',
                            color: 'hsl(var(--text-dim))',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </LayerReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
