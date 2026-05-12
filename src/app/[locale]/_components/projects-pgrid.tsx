'use client'

import { useTranslations } from 'next-intl'
import { projects } from '@/lib/data'
import { LayerReveal } from '@/components/composite/layer-reveal'

export function ProjectsPGrid() {
  const t = useTranslations('projects')

  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <LayerReveal>
          <span className="section-label">{t('title')}</span>
        </LayerReveal>

        <div
          className="mt-12 grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gridAutoRows: '160px',
          }}
        >
          {projects.map((project, i) => {
            const isTall = i < 2
            return (
              <LayerReveal key={project.title} delay={i * 80}>
                <div
                  className="group flex h-full flex-col justify-between rounded-2xl border p-6 transition-shadow duration-300 hover:shadow-lg"
                  style={{
                    gridRow: isTall ? 'span 2' : 'span 1',
                    borderColor: 'hsl(var(--border))',
                    background: 'hsl(var(--surface))',
                    height: isTall ? '332px' : '160px',
                  }}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className="text-base font-semibold leading-snug"
                        style={{ color: 'hsl(var(--text-heading))' }}
                      >
                        {project.title}
                      </h3>
                      <span
                        className="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{
                          background: 'hsl(var(--surface-2))',
                          color: 'hsl(var(--text-muted))',
                        }}
                      >
                        {project.company}
                      </span>
                    </div>

                    {isTall && (
                      <p
                        className="line-clamp-2 text-sm leading-relaxed"
                        style={{ color: 'hsl(var(--text-body))' }}
                      >
                        {project.description}
                      </p>
                    )}

                    {isTall && project.impact && (
                      <p className="text-xs font-medium" style={{ color: 'hsl(var(--accent))' }}>
                        ↑ {project.impact}
                      </p>
                    )}
                  </div>

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
    </section>
  )
}
