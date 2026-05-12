'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { LayerReveal } from '@/components/composite/layer-reveal'

const LINES = [
  { cmd: '$ whoami', output: 'Manish Soni — Lead Software Engineer' },
  { cmd: '$ contact --email', output: 'msoni@ar.iitr.ac.in' },
  { cmd: '$ contact --linkedin', output: 'linkedin.com/in/manish-soni' },
  { cmd: '$ contact --available', output: '✓ Open to new opportunities' },
]

const TYPING_SPEED = 40
const LINE_PAUSE = 400

type LineState = { cmd: string; output: string; cmdDone: boolean; outputDone: boolean }

export function ContactCli() {
  const t = useTranslations('contact')
  const [lines, setLines] = useState<LineState[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [phase, setPhase] = useState<'cmd' | 'output' | 'pause'>('cmd')

  useEffect(() => {
    if (currentLine >= LINES.length) return
    const target = LINES[currentLine]

    if (phase === 'cmd') {
      if (charIndex < target.cmd.length) {
        const timer = setTimeout(() => {
          setLines((prev) => {
            const next = [...prev]
            if (!next[currentLine])
              next[currentLine] = { cmd: '', output: '', cmdDone: false, outputDone: false }
            next[currentLine] = { ...next[currentLine], cmd: target.cmd.slice(0, charIndex + 1) }
            return next
          })
          setCharIndex((c) => c + 1)
        }, TYPING_SPEED)
        return () => clearTimeout(timer)
      } else {
        setLines((prev) => {
          const next = [...prev]
          next[currentLine] = { ...next[currentLine], cmdDone: true }
          return next
        })
        const timer = setTimeout(() => {
          setPhase('output')
          setCharIndex(0)
        }, LINE_PAUSE / 2)
        return () => clearTimeout(timer)
      }
    }

    if (phase === 'output') {
      if (charIndex < target.output.length) {
        const timer = setTimeout(() => {
          setLines((prev) => {
            const next = [...prev]
            next[currentLine] = {
              ...next[currentLine],
              output: target.output.slice(0, charIndex + 1),
            }
            return next
          })
          setCharIndex((c) => c + 1)
        }, TYPING_SPEED)
        return () => clearTimeout(timer)
      } else {
        setLines((prev) => {
          const next = [...prev]
          next[currentLine] = { ...next[currentLine], outputDone: true }
          return next
        })
        const timer = setTimeout(() => {
          setCurrentLine((l) => l + 1)
          setCharIndex(0)
          setPhase('cmd')
        }, LINE_PAUSE)
        return () => clearTimeout(timer)
      }
    }
  }, [currentLine, charIndex, phase])

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <LayerReveal>
          <span className="section-label">{t('title')}</span>
        </LayerReveal>

        <div className="mt-16 flex justify-center">
          <LayerReveal delay={120}>
            <div
              className="w-full max-w-xl overflow-hidden rounded-xl"
              style={{
                background: '#0d1117',
                border: '1px solid hsl(var(--border))',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              }}
            >
              {/* Title bar */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ background: '#161b22', borderBottom: '1px solid #30363d' }}
              >
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 font-mono text-xs" style={{ color: '#8b949e' }}>
                  contact.sh
                </span>
              </div>

              {/* Terminal body */}
              <div className="min-h-[200px] p-6 font-mono text-sm">
                {lines.map((line, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex items-center gap-2">
                      <span style={{ color: '#3fb950' }}>{line.cmd}</span>
                      {!line.cmdDone && i === currentLine && (
                        <span
                          className="inline-block h-4 w-0.5 animate-pulse"
                          style={{ background: '#3fb950' }}
                        />
                      )}
                    </div>
                    {line.cmdDone && (
                      <div className="mt-1 pl-0" style={{ color: '#e6edf3' }}>
                        {line.output}
                        {!line.outputDone && i === currentLine && (
                          <span
                            className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse align-middle"
                            style={{ background: '#e6edf3' }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
                {currentLine >= LINES.length && (
                  <div className="mt-2 flex items-center gap-1">
                    <span style={{ color: '#3fb950' }}>$</span>
                    <span
                      className="inline-block h-4 w-0.5 animate-pulse"
                      style={{ background: '#3fb950' }}
                    />
                  </div>
                )}
              </div>
            </div>
          </LayerReveal>
        </div>
      </div>
    </section>
  )
}
