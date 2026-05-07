"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

export interface TabItem {
  key: string
  label: string
  icon?: React.ReactNode
  badge?: string
  disabled?: boolean
}

export interface TabsProps {
  tabs: TabItem[]
  activeKey: string
  onChange: (key: string) => void
  children?: React.ReactNode
  variant?: "underline" | "pill" | "card"
}

export function Tabs({
  tabs,
  activeKey,
  onChange,
  children,
  variant = "underline",
}: TabsProps) {
  return (
    <div className={`ui-tabs ui-tabs--${variant}`}>
      <div className="ui-tabs-list" role="tablist">
        {tabs.map((tab) => {
          const isActive = tab.key === activeKey
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={isActive}
              aria-disabled={tab.disabled}
              disabled={tab.disabled}
              className={`ui-tab${isActive ? " active" : ""}${tab.disabled ? " disabled" : ""}`}
              onClick={() => !tab.disabled && onChange(tab.key)}
            >
              {variant === "underline" && isActive && (
                <motion.span
                  className="ui-tab-indicator"
                  layoutId="tab-indicator"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              {variant === "pill" && isActive && (
                <motion.span
                  className="ui-tab-pill"
                  layoutId="tab-pill"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              {tab.icon && <span className="ui-tab-icon">{tab.icon}</span>}
              <span className="ui-tab-label">{tab.label}</span>
              {tab.badge && (
                <span className="ui-tab-badge">{tab.badge}</span>
              )}
            </button>
          )
        })}
      </div>
      {children && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeKey}
            className="ui-tab-panel"
            role="tabpanel"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
