import * as React from "react"

export interface SkeletonProps {
  width?: string | number
  height?: string | number
  rounded?: boolean
  circle?: boolean
  className?: string
}

export function Skeleton({
  width,
  height,
  rounded,
  circle,
  className,
}: SkeletonProps) {
  const style: React.CSSProperties = {}

  if (width !== undefined) {
    style.width = typeof width === "number" ? `${width}px` : width
  }
  if (height !== undefined) {
    style.height = typeof height === "number" ? `${height}px` : height
  }
  if (circle) {
    style.borderRadius = "50%"
    if (!width && !height) {
      style.width = "40px"
      style.height = "40px"
    } else {
      style.height = style.width
    }
  } else if (rounded) {
    style.borderRadius = "9999px"
  }

  return (
    <div
      className={`ui-skeleton${className ? ` ${className}` : ""}`}
      style={style}
      aria-hidden="true"
    />
  )
}

export function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number
  className?: string
}) {
  return (
    <div
      className={`ui-skeleton-text${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? "60%" : "100%"}
          height={16}
        />
      ))}
    </div>
  )
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={`ui-skeleton-card${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      <Skeleton circle width={40} height={40} />
      <div className="ui-skeleton-card-content">
        <SkeletonText lines={2} />
      </div>
    </div>
  )
}
