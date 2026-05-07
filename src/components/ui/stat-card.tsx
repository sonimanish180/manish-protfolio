import * as React from "react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

export interface StatCardProps {
  label: string
  value: string | number
  delta?: string
  deltaType?: "increase" | "decrease" | "neutral"
  icon?: React.ReactNode
  description?: string
  className?: string
}

const deltaIcons: Record<NonNullable<StatCardProps["deltaType"]>, React.ReactNode> = {
  increase: <TrendingUp size={14} />,
  decrease: <TrendingDown size={14} />,
  neutral: <Minus size={14} />,
}

export function StatCard({
  label,
  value,
  delta,
  deltaType = "neutral",
  icon,
  description,
  className,
}: StatCardProps) {
  return (
    <div className={`ui-stat-card${className ? ` ${className}` : ""}`}>
      {icon && <div className="ui-stat-icon">{icon}</div>}
      <div className="ui-stat-body">
        <p className="ui-stat-label">{label}</p>
        <p className="ui-stat-value">{value}</p>
        {delta && (
          <span className={`ui-stat-delta ui-stat-delta-${deltaType}`}>
            {deltaIcons[deltaType]}
            {delta}
          </span>
        )}
        {description && <p className="ui-stat-desc">{description}</p>}
      </div>
    </div>
  )
}
