import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border font-ui font-medium whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        ember: "border-accent/30 bg-accent/12 text-accent",
        gold: "border-gold/35 bg-gold/12 text-gold",
        forest: "border-forest-soft/40 bg-forest/15 text-forest-soft dark:text-cream/85",
        neutral: "border-border bg-muted/60 text-muted-foreground",
        success: "border-success/30 bg-success/12 text-success",
        outline: "border-current/25 bg-transparent text-current",
        glass: "border-white/15 bg-white/10 text-white backdrop-blur-md",
      },
      size: {
        sm: "px-2.5 py-0.5 text-[0.65rem] tracking-[0.12em] uppercase",
        md: "px-3 py-1 text-[0.7rem] tracking-[0.1em] uppercase",
        lg: "px-4 py-1.5 text-xs tracking-[0.08em] uppercase",
      },
    },
    defaultVariants: { variant: "neutral", size: "sm" },
  },
);

export interface BadgeProps
  extends React.ComponentPropsWithoutRef<"span">,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { badgeVariants };
