'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

export interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
  maxVisible?: number
  showEdges?: boolean
}

function getPageRange(current: number, total: number, maxVisible: number): (number | '...')[] {
  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const half = Math.floor(maxVisible / 2)
  let start = Math.max(1, current - half)
  let end = start + maxVisible - 1

  if (end > total) {
    end = total
    start = Math.max(1, end - maxVisible + 1)
  }

  const pages: (number | '...')[] = []

  if (start > 1) {
    pages.push(1)
    if (start > 2) pages.push('...')
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (end < total) {
    if (end < total - 1) pages.push('...')
    pages.push(total)
  }

  return pages
}

export function Pagination({
  page,
  totalPages,
  onChange,
  maxVisible = 5,
  showEdges,
}: PaginationProps) {
  const pages = getPageRange(page, totalPages, maxVisible)

  function go(target: number) {
    if (target < 1 || target > totalPages || target === page) return
    onChange(target)
  }

  return (
    <nav className="ui-pagination" aria-label="Pagination">
      {showEdges && (
        <button
          className={`ui-page-btn${page === 1 ? 'disabled' : ''}`}
          disabled={page === 1}
          onClick={() => go(1)}
          aria-label="First page"
        >
          <ChevronsLeft size={16} />
        </button>
      )}
      <button
        className={`ui-page-btn${page === 1 ? 'disabled' : ''}`}
        disabled={page === 1}
        onClick={() => go(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="ui-page-ellipsis">
            …
          </span>
        ) : (
          <button
            key={p}
            className={`ui-page-btn${p === page ? 'active' : ''}`}
            onClick={() => go(p as number)}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        ),
      )}

      <button
        className={`ui-page-btn${page === totalPages ? 'disabled' : ''}`}
        disabled={page === totalPages}
        onClick={() => go(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
      {showEdges && (
        <button
          className={`ui-page-btn${page === totalPages ? 'disabled' : ''}`}
          disabled={page === totalPages}
          onClick={() => go(totalPages)}
          aria-label="Last page"
        >
          <ChevronsRight size={16} />
        </button>
      )}
    </nav>
  )
}
