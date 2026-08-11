import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ImageFrame } from "@/components/ui/media";
import { SectionHeading } from "@/components/ui/section";
import { GALLERY_ITEMS } from "@/constants/gallery";
import { cn } from "@/lib/utils";

/** Asymmetric photo mosaic that links through to the full gallery. */
export function GalleryPreview({ className }: { className?: string }) {
  const items = [
    GALLERY_ITEMS[2]!,
    GALLERY_ITEMS[13]!,
    GALLERY_ITEMS[6]!,
    GALLERY_ITEMS[8]!,
    GALLERY_ITEMS[5]!,
    GALLERY_ITEMS[11]!,
  ];

  const spans = [
    "sm:col-span-2 sm:row-span-2",
    "sm:col-span-1",
    "sm:col-span-1 sm:row-span-2",
    "sm:col-span-1",
    "sm:col-span-1",
    "sm:col-span-2",
  ];

  return (
    <section className={cn("section", className)}>
      <div className="container-luxe">
        <Reveal>
          <SectionHeading
            eyebrow="The room"
            title="Come and see it in the right light."
            description="Photographed over one week in August — the fire, the room, the people who fill it."
            action={
              <Button asChild variant="outline" size="lg" uppercase>
                <Link href="/gallery">
                  Full gallery
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            }
          />
        </Reveal>

        <Stagger
          className="mt-14 grid auto-rows-[13rem] grid-cols-2 gap-3 sm:grid-cols-4 md:auto-rows-[15rem]"
          gap={0.07}
        >
          {items.map((item, index) => (
            <StaggerItem key={item.id} className={cn("group relative", spans[index])}>
              <Link
                href="/gallery"
                aria-label={`${item.caption} — open gallery`}
                className="focus-visible:outline-ring block h-full focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                <ImageFrame
                  src={item.photo.src}
                  alt={item.photo.alt}
                  ratio="auto"
                  zoom
                  className="h-full"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 flex items-end rounded-2xl bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                >
                  <span className="font-ui text-xs text-white">{item.caption}</span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
