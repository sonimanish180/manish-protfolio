import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TableColumn<T = Record<string, unknown>> {
  key: string
  header: string
  width?: string
  align?: 'left' | 'center' | 'right'
  render?: (value: unknown, row: T) => React.ReactNode
}

export interface TableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[]
  rows: T[]
  keyField?: string
  emptyMessage?: string
  className?: string
  /** Show row index */
  showIndex?: boolean
}

export function Table<T extends Record<string, unknown>>({
  columns,
  rows,
  keyField = 'id',
  emptyMessage = 'No data available',
  className,
  showIndex = false,
}: TableProps<T>) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <div className={cn('ui-table-wrapper', className)}>
      <table className="ui-table">
        <thead className="ui-table-head">
          <tr>
            {showIndex && <th className="w-10 pl-4">#</th>}
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width }}
                className={alignClass[col.align ?? 'left']}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="ui-table-body">
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (showIndex ? 1 : 0)}
                className="py-10 text-center"
                style={{ color: 'hsl(var(--text-dim))' }}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, idx) => (
              <tr key={String(row[keyField] ?? idx)}>
                {showIndex && (
                  <td className="pl-4 font-mono text-xs" style={{ color: 'hsl(var(--text-dim))' }}>
                    {idx + 1}
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className={alignClass[col.align ?? 'left']}>
                    {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

/** Thin typed wrapper for the lib-badge inside table cells */
export function TableStatusCell({
  status,
}: {
  status: 'active' | 'pending' | 'inactive' | string
}) {
  const map: Record<string, { cls: string; label: string }> = {
    active: { cls: 'ui-badge ui-badge-success', label: 'Active' },
    pending: { cls: 'ui-badge ui-badge-warning', label: 'Pending' },
    inactive: { cls: 'ui-badge ui-badge-default', label: 'Inactive' },
    error: { cls: 'ui-badge ui-badge-error', label: 'Error' },
  }
  const config = map[status] ?? { cls: 'ui-badge ui-badge-default', label: status }
  return <span className={config.cls}>{config.label}</span>
}
