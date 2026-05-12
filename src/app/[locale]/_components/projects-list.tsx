'use client'

import { useTranslations } from 'next-intl'
import { projects } from '@/lib/data'
import { LayerReveal } from '@/components/composite/layer-reveal'

export function ProjectsList() {
  const t = useTranslations('projects')

  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <LayerReveal>
          <span className="section-label">{t('title')}</span>
        </LayerReveal>

        <div className="mt-12 flex flex-col">
          {projects.map((project, i) => (
            <LayerReveal key={project.title} delay={i * 80}>
              <div
                className="group grid grid-cols-[80px_1fr] gap-8 py-10 md:grid-cols-[120px_1fr]"
                style={{
                  borderTop: i === 0 ? 'none' : '1px solid hsl(var(--border))',
                }}
              >
                <span
                  className="select-none font-mono text-5xl font-bold leading-none md:text-7xl"
                  style={{ color: 'hsl(var(--border))' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3
                      className="text-xl font-semibold"
                      style={{ color: 'hsl(var(--text-heading))' }}
                    >
                      {project.title}
                    </h3>
                    <span
                      className="rounded-full px-3 py-0.5 text-xs font-medium"
                      style={{
                        background: 'hsl(var(--surface-2))',
                        color: 'hsl(var(--text-muted))',
                      }}
                    >
                      {project.company}
                    </span>
                  </div>

                  <p
                    className="max-w-2xl text-sm leading-relaxed"
                    style={{ color: 'hsl(var(--text-body))' }}
                  >
                    {project.description}
                  </p>

                  {project.impact && (
                    <p
                      className="text-xs font-semibold tracking-wide"
                      style={{ color: 'hsl(var(--accent))' }}
                    >
                      ↑ {project.impact}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md px-2.5 py-1 text-xs font-medium"
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
              </div>
            </LayerReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
