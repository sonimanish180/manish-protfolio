'use client'

import { useTranslations } from 'next-intl'
import { personalInfo } from '@/lib/data'
import { LayerReveal } from '@/components/composite/layer-reveal'

export function ContactCard() {
  const t = useTranslations('contact')

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <LayerReveal>
          <span className="section-label">{t('title')}</span>
        </LayerReveal>

        <div className="mt-16 flex flex-col items-center">
          <LayerReveal delay={100}>
            <div
              className="relative w-full max-w-sm rounded-2xl p-8 md:max-w-md"
              style={{
                background: 'hsl(var(--surface))',
                border: '1px solid hsl(var(--border))',
                boxShadow:
                  '0 4px 6px -1px rgba(0,0,0,0.08), 0 20px 40px -12px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.04)',
              }}
            >
              {/* Card top accent line */}
              <div
                className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl"
                style={{ background: 'hsl(var(--primary))' }}
              />

              <div className="flex flex-col gap-5">
                <div>
                  <h3
                    className="text-2xl font-bold tracking-tight"
                    style={{ color: 'hsl(var(--text-heading))' }}
                  >
                    {personalInfo.name}
                  </h3>
                  <p
                    className="mt-1 text-sm font-medium"
                    style={{ color: 'hsl(var(--text-muted))' }}
                  >
                    Lead Software Engineer · Platform Architecture
                  </p>
                </div>

                <div className="h-px w-full" style={{ background: 'hsl(var(--border))' }} />

                <div className="flex flex-col gap-3">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center gap-3 text-sm transition-opacity hover:opacity-70"
                    style={{ color: 'hsl(var(--text-body))' }}
                  >
                    <span style={{ color: 'hsl(var(--text-muted))' }}>✉</span>
                    {personalInfo.email}
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm transition-opacity hover:opacity-70"
                    style={{ color: 'hsl(var(--text-body))' }}
                  >
                    <span style={{ color: 'hsl(var(--text-muted))' }}>in</span>
                    linkedin.com/in/manish-soni
                  </a>
                  <div
                    className="flex items-center gap-3 text-sm"
                    style={{ color: 'hsl(var(--text-body))' }}
                  >
                    <span style={{ color: 'hsl(var(--text-muted))' }}>⌘</span>
                    Dubai (Remote) · India
                  </div>
                </div>
              </div>
            </div>
          </LayerReveal>

          <LayerReveal delay={220}>
            <div className="mt-10 flex flex-col items-center gap-4 text-center">
              <p
                className="max-w-xs text-sm leading-relaxed"
                style={{ color: 'hsl(var(--text-muted))' }}
              >
                {t('subtitle')}
              </p>
              <a href={`mailto:${personalInfo.email}`} className="gradient-btn px-6 py-2.5 text-sm">
                Send a Message
              </a>
            </div>
          </LayerReveal>
        </div>
      </div>
    </section>
  )
}
