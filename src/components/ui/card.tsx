import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const cardVariants = cva("relative overflow-hidden transition-all duration-500 ease-[var(--ease-luxe)]", {
  variants: {
    variant: {
      solid: "border border-border bg-card shadow-card",
      glass: "glass shadow-card",
      dark: "border border-white/10 bg-black/40 text-white backdrop-blur-xl",
      outline: "border border-border bg-transparent",
      plain: "",
    },
    radius: {
      md: "rounded-xl",
      lg: "rounded-2xl",
      xl: "rounded-3xl",
      full: "rounded-[2.5rem]",
    },
    hover: {
      none: "",
      lift: "hover:-translate-y-1.5 hover:shadow-lift",
      glow: "hover:border-accent/40 hover:shadow-glow",
      both: "hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lift",
    },
  },
  defaultVariants: { variant: "solid", radius: "lg", hover: "none" },
});

export interface CardProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof cardVariants> {}

export function Card({ className, variant, radius, hover, ...props }: CardProps) {
  return <div className={cn(cardVariants({ variant, radius, hover }), className)} {...props} />;
}

export function CardHeader({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("flex flex-col gap-2 p-6 md:p-7", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.ComponentPropsWithoutRef<"h3">) {
  return <h3 className={cn("font-display text-xl leading-tight md:text-2xl", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.ComponentPropsWithoutRef<"p">) {
  return <p className={cn("text-muted-foreground text-sm leading-relaxed", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("p-6 pt-0 md:p-7 md:pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("flex items-center gap-3 p-6 pt-0 md:p-7 md:pt-0", className)} {...props} />;
}

export { cardVariants };
