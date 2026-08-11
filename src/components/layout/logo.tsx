import Link from "next/link";

import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

/**
 * The DZIFOODS mark: a flame held inside a plate ring — fire and hospitality,
 * the two things the whole brand rests on.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("size-9", className)} aria-hidden focusable="false">
      <circle cx="20" cy="20" r="18.5" fill="none" stroke="currentColor" strokeOpacity="0.28" />
      <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeOpacity="0.14" />
      <path
        d="M20 8.5c2.4 3.6 6.4 5.9 6.4 11.1 0 3.9-2.9 7-6.4 7s-6.4-3.1-6.4-7c0-2.4 1-4 2.3-5.6.5 1.6 1.4 2.6 2.6 3.1-.6-3.2.3-6 1.5-8.6Z"
        fill="currentColor"
      />
      <path
        d="M20 31.5c-4.2 0-7.6-1.2-7.6-2.6h15.2c0 1.4-3.4 2.6-7.6 2.6Z"
        fill="currentColor"
        fillOpacity="0.45"
      />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  /** `light` inverts the wordmark for use over dark photography. */
  tone?: "auto" | "light";
  showTagline?: boolean;
  href?: string;
}

export function Logo({ className, tone = "auto", showTagline = false, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={`${SITE.name} — home`}
      className={cn(
        "group/logo flex items-center gap-3 transition-opacity hover:opacity-90",
        "focus-visible:outline-ring rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4",
        className,
      )}
    >
      <LogoMark
        className={cn(
          "text-accent transition-transform duration-700 ease-[var(--ease-luxe)] group-hover/logo:rotate-12",
        )}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.15rem] font-semibold tracking-[0.18em]",
            tone === "light" ? "text-white" : "text-foreground",
          )}
        >
          DZI<span className="text-accent">FOODS</span>
        </span>
        {showTagline ? (
          <span
            className={cn(
              "font-ui mt-1 text-[0.55rem] tracking-[0.32em] uppercase",
              tone === "light" ? "text-white/60" : "text-muted-foreground",
            )}
          >
            Accra · Est. 2013
          </span>
        ) : null}
      </span>
    </Link>
  );
}
