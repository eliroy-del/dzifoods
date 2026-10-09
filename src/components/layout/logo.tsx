import Image from "next/image";
import Link from "next/link";

import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
  /** Render height in pixels; width scales with the wordmark aspect ratio. */
  height?: number;
  priority?: boolean;
}

/**
 * Official DZIFOODS wordmark — yellow script, orange oval, chef’s hat.
 */
export function LogoMark({ className, height = 48, priority = false }: LogoMarkProps) {
  const width = Math.round(height * (932 / 399));

  return (
    <Image
      src="/images/logo.png"
      alt=""
      width={width}
      height={height}
      priority={priority}
      className={cn("h-12 w-auto object-contain", className)}
      aria-hidden
    />
  );
}

interface LogoProps {
  className?: string;
  /** `light` inverts the wordmark for use over dark photography. */
  tone?: "auto" | "light";
  showTagline?: boolean;
  href?: string;
  /** Show the text wordmark beside the badge (logo already includes the name). */
  showWordmark?: boolean;
  priority?: boolean;
}

export function Logo({
  className,
  tone = "auto",
  showTagline = false,
  showWordmark = false,
  href = "/",
  priority = false,
}: LogoProps) {
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
        priority={priority}
        className={cn("drop-shadow-sm transition-transform duration-500 ease-[var(--ease-luxe)] group-hover/logo:scale-[1.03]")}
      />
      {showWordmark || showTagline ? (
        <span className="flex flex-col leading-none">
          {showWordmark ? (
            <span
              className={cn(
                "font-display text-[1.15rem] font-semibold tracking-[0.18em]",
                tone === "light" ? "text-white" : "text-foreground",
              )}
            >
              DZI<span className="text-accent">FOODS</span>
            </span>
          ) : null}
          {showTagline ? (
            <span
              className={cn(
                "font-ui text-[0.55rem] tracking-[0.32em] uppercase",
                showWordmark ? "mt-1" : "",
                tone === "light" ? "text-white/60" : "text-muted-foreground",
              )}
            >
              Accra · Est. 2013
            </span>
          ) : null}
        </span>
      ) : null}
    </Link>
  );
}
