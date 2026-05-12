import * as React from 'react'

export interface CardProps {
  title?: string
  description?: string
  headerAction?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({
  title,
  description,
  headerAction,
  footer,
  children,
  className,
  hover,
  padding = 'md',
}: CardProps) {
  const hasHeader = title || description || headerAction

  return (
    <div
      className={`ui-card ui-card--padding-${padding}${hover ? 'ui-card--hover' : ''}${className ? ` ${className}` : ''}`}
    >
      {hasHeader && (
        <CardHeader>
          <div className="ui-card-header-text">
            {title && <h3 className="ui-card-title">{title}</h3>}
            {description && <p className="ui-card-description">{description}</p>}
          </div>
          {headerAction && <div className="ui-card-header-action">{headerAction}</div>}
        </CardHeader>
      )}
      {children && <CardBody>{children}</CardBody>}
      {footer && <CardFooter>{footer}</CardFooter>}
    </div>
  )
}

export function CardHeader({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return <div className={`ui-card-header${className ? ` ${className}` : ''}`}>{children}</div>
}

export function CardBody({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return <div className={`ui-card-body${className ? ` ${className}` : ''}`}>{children}</div>
}

export function CardFooter({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return <div className={`ui-card-footer${className ? ` ${className}` : ''}`}>{children}</div>
}
