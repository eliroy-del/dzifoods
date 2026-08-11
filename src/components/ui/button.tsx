"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-ui font-medium",
    "transition-[transform,background-color,color,box-shadow,border-color] duration-300 ease-[var(--ease-luxe)]",
    "focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        /** The conversion button: reserve, order, checkout. */
        ember:
          "btn-shine bg-accent text-accent-foreground shadow-[0_10px_35px_-12px_rgb(186_46_27/0.65)] hover:bg-ember-soft hover:shadow-[0_18px_50px_-14px_rgb(186_46_27/0.75)]",
        forest:
          "btn-shine bg-forest text-cream hover:bg-forest-soft shadow-[0_10px_35px_-14px_rgb(24_83_35/0.8)]",
        gold: "btn-shine border border-gold/40 bg-gold/12 text-gold hover:bg-gold/20",
        solid: "bg-foreground text-background hover:bg-foreground/90",
        outline:
          "border border-current/25 bg-transparent hover:border-current/60 hover:bg-foreground/5",
        glass:
          "glass-dark text-white hover:border-white/25 hover:bg-white/10",
        ghost: "hover:bg-foreground/6 text-foreground",
        link: "link-underline h-auto p-0 text-foreground",
      },
      size: {
        sm: "h-9 rounded-full px-4 text-[0.78rem] tracking-[0.02em]",
        md: "h-11 rounded-full px-6 text-sm tracking-[0.01em]",
        lg: "h-13 rounded-full px-8 text-[0.95rem]",
        xl: "h-14 rounded-full px-10 text-base",
        icon: "size-11 rounded-full",
        "icon-sm": "size-9 rounded-full",
        none: "",
      },
      uppercase: {
        true: "text-[0.72rem] font-semibold tracking-[0.18em] uppercase",
        false: "",
      },
    },
    defaultVariants: { variant: "ember", size: "md", uppercase: false },
  },
);

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  /** Announced to screen readers while `loading` is true. */
  loadingText?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant,
    size,
    uppercase,
    asChild = false,
    loading = false,
    loadingText = "Working…",
    children,
    disabled,
    ...props
  },
  ref,
) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      ref={ref}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      disabled={Component === "button" ? disabled || loading : undefined}
      className={cn(buttonVariants({ variant, size, uppercase }), className)}
      {...props}
    >
      {loading && !asChild ? (
        <>
          <Loader2 className="size-4 animate-spin" aria-hidden />
          <span className="sr-only">{loadingText}</span>
          <span aria-hidden>{children}</span>
        </>
      ) : (
        children
      )}
    </Component>
  );
});

export { buttonVariants };
