'use client'

import { useTranslations } from 'next-intl'
import { personalInfo } from '@/lib/data'
import { LayerReveal } from '@/components/composite/layer-reveal'

export function ContactMinimal() {
  const t = useTranslations('contact')

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <LayerReveal>
          <span className="section-label">{t('title')}</span>
        </LayerReveal>

        <div className="mt-20 flex flex-col items-center text-center">
          <LayerReveal delay={100}>
            <h2
              className="mb-10 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl"
              style={{ color: 'hsl(var(--text-heading))' }}
            >
              {t('subtitle')}
            </h2>
          </LayerReveal>

          <LayerReveal delay={200}>
            <a
              href={`mailto:${personalInfo.email}`}
              className="mb-6 text-lg font-medium transition-opacity duration-200 hover:opacity-60 md:text-xl"
              style={{ color: 'hsl(var(--primary))' }}
            >
              {personalInfo.email}
            </a>
          </LayerReveal>

          <LayerReveal delay={280}>
            <div className="mb-10 h-px w-12" style={{ background: 'hsl(var(--border))' }} />
          </LayerReveal>

          <LayerReveal delay={340}>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium uppercase tracking-widest transition-opacity duration-200 hover:opacity-60"
              style={{ color: 'hsl(var(--text-muted))' }}
            >
              LinkedIn
            </a>
          </LayerReveal>
        </div>
      </div>
    </section>
  )
}
