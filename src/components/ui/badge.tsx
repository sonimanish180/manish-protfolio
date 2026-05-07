import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary border border-primary/20",
        violet: "bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:border-violet-400/40",
        sky: "bg-sky-500/10 text-sky-400 border border-sky-500/20 hover:border-sky-400/40",
        emerald: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:border-emerald-400/40",
        amber: "bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:border-amber-400/40",
        rose: "bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:border-rose-400/40",
        indigo: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:border-indigo-400/40",
        muted: "bg-muted text-muted-foreground border border-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
