import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeader({
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        {align === "left" && (
          <div className="h-px w-8 bg-primary/60 shrink-0" />
        )}
        <span className="text-xs font-mono text-primary/80 uppercase tracking-[0.2em]">
          {title}
        </span>
        {align === "center" && (
          <div className="h-px flex-1 bg-border max-w-20 mx-auto" />
        )}
      </div>
      {subtitle && (
        <p className="text-muted-foreground text-sm mt-1 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
