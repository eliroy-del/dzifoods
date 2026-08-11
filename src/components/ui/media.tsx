import Image, { type ImageProps } from "next/image";

import { IMAGE_META } from "@/lib/generated/blur-data";
import { cn } from "@/lib/utils";
import type { ImageSrc } from "@/types";

/** Looks up the generated LQIP for local photography. */
export function getImageMeta(src: ImageSrc) {
  return IMAGE_META[src as keyof typeof IMAGE_META];
}

export interface ImageFrameProps extends Omit<ImageProps, "src" | "alt" | "placeholder"> {
  src: ImageSrc;
  alt: string;
  /** Applied to the clipping wrapper, not the image itself. */
  className?: string;
  imageClassName?: string;
  ratio?: "square" | "4/3" | "3/4" | "16/9" | "21/9" | "3/2" | "2/3" | "auto";
  /** Slow zoom on hover — pair with `group` on an ancestor. */
  zoom?: boolean;
  /** Darkening scrim so overlaid text always clears WCAG AA. */
  overlay?: "none" | "soft" | "strong" | "bottom" | "editorial";
  rounded?: boolean;
}

const ratioClasses = {
  square: "aspect-square",
  "4/3": "aspect-4/3",
  "3/4": "aspect-3/4",
  "16/9": "aspect-video",
  "21/9": "aspect-21/9",
  "3/2": "aspect-3/2",
  "2/3": "aspect-2/3",
  auto: "",
} as const;

const overlayClasses = {
  none: "",
  soft: "bg-black/25",
  strong: "bg-black/55",
  bottom: "bg-gradient-to-t from-black/85 via-black/25 to-transparent",
  editorial: "bg-gradient-to-tr from-forest-deep/80 via-black/35 to-transparent",
} as const;

/**
 * The single image component used across the site.
 *
 * Wraps next/image with the project's blur placeholder, aspect ratio handling
 * and hover-zoom, so no page has to remember to pass `sizes` or `blurDataURL`.
 */
export function ImageFrame({
  src,
  alt,
  className,
  imageClassName,
  ratio = "4/3",
  zoom = false,
  overlay = "none",
  rounded = true,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
  priority,
  fill = true,
  ...props
}: ImageFrameProps) {
  const meta = getImageMeta(src);

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden",
        rounded && "rounded-2xl",
        ratioClasses[ratio],
        className,
      )}
    >
      <Image
        src={src as string}
        alt={alt}
        fill={fill}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        placeholder={meta ? "blur" : "empty"}
        blurDataURL={meta?.blurDataURL}
        className={cn(
          "object-cover",
          zoom && "transition-transform duration-1000 ease-[var(--ease-luxe)] group-hover:scale-108",
          imageClassName,
        )}
        {...props}
      />
      {overlay !== "none" ? (
        <span aria-hidden className={cn("absolute inset-0", overlayClasses[overlay])} />
      ) : null}
    </div>
  );
}

/** Decorative steam wisps layered over hot dishes. */
export function Steam({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("pointer-events-none absolute inset-x-0 top-0 h-1/2", className)}>
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className="animate-steam absolute bottom-0 h-16 w-8 rounded-full bg-white/25 blur-xl"
          style={{
            left: `${28 + index * 22}%`,
            animationDelay: `${index * 1.6}s`,
            animationDuration: `${6 + index}s`,
          }}
        />
      ))}
    </span>
  );
}
