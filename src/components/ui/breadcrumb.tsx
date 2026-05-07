import * as React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
}

export function Breadcrumb({
  items,
  separator = <ChevronRight size={14} />,
}: BreadcrumbProps) {
  return (
    <nav className="ui-breadcrumb" aria-label="Breadcrumb">
      <ol className="ui-breadcrumb-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <React.Fragment key={index}>
              <li
                className={`ui-breadcrumb-item${isLast ? " current" : ""}`}
                aria-current={isLast ? "page" : undefined}
              >
                {item.icon && (
                  <span className="ui-breadcrumb-icon">{item.icon}</span>
                )}
                {!isLast && item.href ? (
                  <Link href={item.href} className="ui-breadcrumb-link">
                    {item.label}
                  </Link>
                ) : (
                  <span className="ui-breadcrumb-label">{item.label}</span>
                )}
              </li>
              {!isLast && (
                <li className="ui-breadcrumb-sep" aria-hidden="true">
                  {separator}
                </li>
              )}
            </React.Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
