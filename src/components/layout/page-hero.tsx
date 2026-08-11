import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type * as React from "react";

import { Reveal } from "@/components/motion/reveal";
import { ImageFrame } from "@/components/ui/media";
import { Ornament } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";
import type { ImageSrc } from "@/types";

export interface Crumb {
  readonly label: string;
  readonly href: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  image: ImageSrc;
  imageAlt: string;
  crumbs: readonly Crumb[];
  /** Rendered under the description — usually one or two CTAs. */
  actions?: React.ReactNode;
  /** Small facts row beneath the actions (opening hours, prices, counts). */
  meta?: readonly { readonly label: string; readonly value: string }[];
  align?: "left" | "center";
  size?: "md" | "lg";
  className?: string;
}

/**
 * The masthead every interior page opens with.
 *
 * A single component keeps the type scale, scrim strength and breadcrumb
 * placement identical across thirteen pages, and keeps the LCP image
 * consistently prioritised.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  crumbs,
  actions,
  meta,
  align = "left",
  size = "md",
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate flex items-end overflow-hidden",
        size === "lg" ? "min-h-[78vh] pt-36 pb-20" : "min-h-[58vh] pt-32 pb-16 md:min-h-[62vh]",
        className,
      )}
    >
      <ImageFrame
        src={image}
        alt={imageAlt}
        ratio="auto"
        rounded={false}
        priority
        overlay="editorial"
        sizes="100vw"
        className="absolute inset-0 -z-10"
      />
      <span
        aria-hidden
        className="from-background via-background/55 absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-gradient-to-t to-transparent"
      />

      <div className="container-luxe relative">
        <nav aria-label="Breadcrumb" className="mb-7">
          <ol
            className={cn(
              "font-ui flex flex-wrap items-center gap-1.5 text-[0.7rem] tracking-[0.14em] text-white/60 uppercase",
              align === "center" && "justify-center",
            )}
          >
            {crumbs.map((crumb, index) => {
              const last = index === crumbs.length - 1;
              return (
                <li key={crumb.href} className="flex items-center gap-1.5">
                  {index > 0 ? <ChevronRight className="size-3 opacity-50" aria-hidden /> : null}
                  {last ? (
                    <span aria-current="page" className="text-gold">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className={cn("max-w-4xl", align === "center" && "mx-auto text-center")}>
          <Reveal>
            <p
              className={cn(
                "font-ui text-gold flex items-center gap-3 text-[0.68rem] font-semibold tracking-[0.28em] uppercase",
                align === "center" && "justify-center",
              )}
            >
              <span aria-hidden className="bg-gold/60 h-px w-8" />
              {eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1
              className={cn(
                "mt-5 text-balance leading-[1.02] font-medium text-white",
                size === "lg" ? "text-5xl md:text-7xl lg:text-8xl" : "text-4xl md:text-6xl",
              )}
            >
              {title}
            </h1>
          </Reveal>

          {description ? (
            <Reveal delay={0.16}>
              <Ornament className={cn("mt-6 mb-6", align === "left" && "justify-start")} />
              <p className="max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
                {description}
              </p>
            </Reveal>
          ) : null}

          {actions ? (
            <Reveal delay={0.24}>
              <div
                className={cn(
                  "mt-9 flex flex-wrap items-center gap-3",
                  align === "center" && "justify-center",
                )}
              >
                {actions}
              </div>
            </Reveal>
          ) : null}

          {meta && meta.length > 0 ? (
            <Reveal delay={0.32}>
              <dl
                className={cn(
                  "mt-11 flex flex-wrap gap-x-10 gap-y-5",
                  align === "center" && "justify-center",
                )}
              >
                {meta.map((item) => (
                  <div key={item.label}>
                    <dt className="font-ui text-[0.62rem] tracking-[0.2em] text-white/50 uppercase">
                      {item.label}
                    </dt>
                    <dd className="font-display mt-1 text-xl text-white">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
