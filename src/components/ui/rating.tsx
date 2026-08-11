import { Flame, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import type { SpiceLevel } from "@/types";

interface StarsProps {
  value: number;
  /** Total stars — five unless you have a very unusual scale. */
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

const starSizes = { sm: "size-3.5", md: "size-4", lg: "size-5" } as const;

/**
 * Accessible star rating. The visual stars are decorative; the rating is
 * announced once, in words, via the wrapper's aria-label.
 */
export function Stars({
  value,
  max = 5,
  size = "md",
  showValue = false,
  reviewCount,
  className,
}: StarsProps) {
  const rounded = Math.round(value * 2) / 2;

  return (
    <span
      className={cn("inline-flex items-center gap-1.5", className)}
      role="img"
      aria-label={`Rated ${value} out of ${max}${reviewCount ? ` from ${reviewCount} reviews` : ""}`}
    >
      <span className="flex items-center gap-0.5" aria-hidden>
        {Array.from({ length: max }, (_, index) => {
          const filled = index + 1 <= rounded;
          const half = !filled && index + 0.5 === rounded;
          return (
            <span key={index} className="relative">
              <Star className={cn(starSizes[size], "text-gold/25")} fill="currentColor" />
              {filled || half ? (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: half ? "50%" : "100%" }}
                >
                  <Star className={cn(starSizes[size], "text-gold")} fill="currentColor" />
                </span>
              ) : null}
            </span>
          );
        })}
      </span>
      {showValue ? (
        <span className="font-ui text-xs font-semibold tabular-nums" aria-hidden>
          {value.toFixed(1)}
          {reviewCount ? (
            <span className="text-muted-foreground ml-1 font-normal">({reviewCount})</span>
          ) : null}
        </span>
      ) : null}
    </span>
  );
}

const SPICE_LABELS = ["Not spicy", "Mild warmth", "Properly spicy", "Fiery"] as const;

export function SpiceMeter({
  level,
  className,
  showLabel = false,
}: {
  level: SpiceLevel;
  className?: string;
  showLabel?: boolean;
}) {
  if (level === 0 && !showLabel) return null;

  return (
    <span
      className={cn("inline-flex items-center gap-1", className)}
      role="img"
      aria-label={`Spice level: ${SPICE_LABELS[level]}`}
    >
      <span className="flex items-center gap-0.5" aria-hidden>
        {[1, 2, 3].map((pip) => (
          <Flame
            key={pip}
            className={cn("size-3.5", pip <= level ? "text-accent" : "text-muted-foreground/25")}
            fill={pip <= level ? "currentColor" : "none"}
          />
        ))}
      </span>
      {showLabel ? (
        <span className="text-muted-foreground text-xs" aria-hidden>
          {SPICE_LABELS[level]}
        </span>
      ) : null}
    </span>
  );
}
