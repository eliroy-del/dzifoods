"use client";

import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { ImageFrame } from "@/components/ui/media";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/controls";
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from "@/constants/gallery";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types";

const SPANS: Record<GalleryItem["orientation"], string> = {
  portrait: "sm:col-span-1 sm:row-span-2",
  landscape: "sm:col-span-2 sm:row-span-1",
  square: "sm:col-span-1 sm:row-span-1",
};

/** Pinterest-style masonry grid with category filters and a keyboard-navigable lightbox. */
export function GalleryGrid() {
  const [category, setCategory] = useState<(typeof GALLERY_CATEGORIES)[number]>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items = useMemo(
    () =>
      category === "All"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.category === category),
    [category],
  );

  const open = useCallback(
    (id: string) => {
      const index = items.findIndex((item) => item.id === id);
      if (index >= 0) setLightboxIndex(index);
    },
    [items],
  );

  const close = useCallback(() => setLightboxIndex(null), []);

  const go = useCallback(
    (direction: -1 | 1) => {
      setLightboxIndex((current) => {
        if (current === null) return null;
        return (current + direction + items.length) % items.length;
      });
    },
    [items.length],
  );

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxIndex, close, go]);

  const active = lightboxIndex !== null ? items[lightboxIndex] : null;

  return (
    <>
      <ToggleGroup
        type="single"
        value={category}
        onValueChange={(next) => next && setCategory(next as (typeof GALLERY_CATEGORIES)[number])}
        className="hide-scrollbar mask-fade-x w-full flex-wrap justify-start overflow-x-auto"
        aria-label="Filter gallery"
      >
        {GALLERY_CATEGORIES.map((entry) => (
          <ToggleGroupItem key={entry} value={entry} className="shrink-0">
            {entry}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <Stagger
        key={category}
        className="mt-10 grid auto-rows-[12rem] grid-cols-2 gap-3 sm:auto-rows-[14rem] sm:grid-cols-4 lg:auto-rows-[16rem]"
        gap={0.06}
      >
        {items.map((item) => (
          <StaggerItem key={item.id} className={cn("group relative", SPANS[item.orientation])}>
            <button
              type="button"
              onClick={() => open(item.id)}
              aria-label={`${item.caption} — open in lightbox`}
              className="focus-visible:outline-ring block h-full w-full focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <ImageFrame
                src={item.photo.src}
                alt={item.photo.alt}
                ratio="auto"
                zoom
                className="h-full"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 flex flex-col justify-end rounded-2xl bg-gradient-to-t from-black/85 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              >
                <Badge variant="glass" size="sm" className="self-start">
                  {item.category}
                </Badge>
                <span className="font-ui mt-2 text-left text-xs text-white">{item.caption}</span>
              </span>
              <span
                aria-hidden
                className="glass-dark pointer-events-none absolute top-3 right-3 grid size-9 place-items-center rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                <ZoomIn className="size-4 text-white" />
              </span>
            </button>
          </StaggerItem>
        ))}
      </Stagger>

      {active && lightboxIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Gallery lightbox"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm md:p-8"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close lightbox"
            className="glass-dark absolute top-4 right-4 z-10 grid size-11 place-items-center rounded-full text-white transition-colors hover:text-accent md:top-6 md:right-6"
          >
            <X className="size-5" aria-hidden />
          </button>

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous image"
            className="glass-dark absolute top-1/2 left-3 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full text-white transition-colors hover:text-accent md:grid md:left-6"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next image"
            className="glass-dark absolute top-1/2 right-3 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full text-white transition-colors hover:text-accent md:grid md:right-6"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>

          <figure className="relative flex max-h-[85vh] w-full max-w-6xl flex-col items-center">
            <div className="relative max-h-[75vh] w-full overflow-hidden rounded-2xl">
              <ImageFrame
                src={active.photo.src}
                alt={active.photo.alt}
                ratio="auto"
                className="max-h-[75vh] w-full"
                imageClassName="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <figcaption className="mt-5 max-w-2xl text-center">
              <Badge variant="gold" size="sm">
                {active.category}
              </Badge>
              <p className="font-display mt-3 text-xl text-white md:text-2xl">{active.caption}</p>
              <p className="text-white/50 mt-2 text-xs tabular-nums">
                {lightboxIndex + 1} / {items.length}
              </p>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}
