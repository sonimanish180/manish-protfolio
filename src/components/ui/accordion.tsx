'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export interface AccordionItem {
  key: string
  title: string
  subtitle?: string
  icon?: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}

export interface AccordionProps {
  items: AccordionItem[]
  multiple?: boolean
}

export function Accordion({ items, multiple = false }: AccordionProps) {
  const [openKeys, setOpenKeys] = React.useState<Set<string>>(() => {
    const initial = new Set<string>()
    items.forEach((item) => {
      if (item.defaultOpen) initial.add(item.key)
    })
    return initial
  })

  function toggle(key: string) {
    setOpenKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        if (!multiple) next.clear()
        next.add(key)
      }
      return next
    })
  }

  return (
    <div className="ui-accordion">
      {items.map((item) => {
        const isOpen = openKeys.has(item.key)
        return (
          <div key={item.key} className={`ui-accordion-item${isOpen ? 'open' : ''}`}>
            <button
              className="ui-accordion-trigger"
              aria-expanded={isOpen}
              onClick={() => toggle(item.key)}
            >
              <span className="ui-accordion-trigger-left">
                {item.icon && <span className="ui-accordion-icon">{item.icon}</span>}
                <span className="ui-accordion-trigger-text">
                  <span className="ui-accordion-title">{item.title}</span>
                  {item.subtitle && <span className="ui-accordion-subtitle">{item.subtitle}</span>}
                </span>
              </span>
              <motion.span
                className="ui-accordion-chevron"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="ui-accordion-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="ui-accordion-content-inner">{item.children}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
