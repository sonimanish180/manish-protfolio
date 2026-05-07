import * as React from "react"

export interface TimelineEvent {
  id: string
  title: string
  description?: string
  date: string
  icon?: React.ReactNode
  variant?: "default" | "success" | "warning" | "error" | "info"
}

export interface TimelineProps {
  events: TimelineEvent[]
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="ui-timeline">
      {events.map((event, index) => {
        const variant = event.variant ?? "default"
        const isLast = index === events.length - 1
        return (
          <div
            key={event.id}
            className={`ui-timeline-item ui-timeline-item-${variant}`}
          >
            <div className="ui-timeline-track">
              <div
                className={`ui-timeline-dot ui-timeline-dot-${variant}`}
              >
                {event.icon && (
                  <span className="ui-timeline-dot-icon">{event.icon}</span>
                )}
              </div>
              {!isLast && <div className="ui-timeline-line" />}
            </div>
            <div className="ui-timeline-content">
              <div className="ui-timeline-header">
                <span className="ui-timeline-title">{event.title}</span>
                <span className="ui-timeline-date">{event.date}</span>
              </div>
              {event.description && (
                <p className="ui-timeline-description">
                  {event.description}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
