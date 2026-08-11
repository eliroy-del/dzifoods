import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ImageFrame } from "@/components/ui/media";
import { SectionHeading } from "@/components/ui/section";
import { PRIVATE_SPACES } from "@/constants/events";
import { cn } from "@/lib/utils";

/** Four rooms, presented as tall photographic cards. */
export function PrivateDiningPreview({ className }: { className?: string }) {
  return (
    <section className={cn("section", className)}>
      <div className="container-luxe">
        <Reveal>
          <SectionHeading
            eyebrow="Private dining"
            title="Four rooms. Doors closed. Menus written for your table alone."
            description="From a round table for six to a hundred and twenty on the terrace, with one coordinator and one number to call."
            action={
              <Button asChild variant="forest" size="lg" uppercase>
                <Link href="/private-dining">
                  Plan an event
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            }
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" gap={0.09}>
          {PRIVATE_SPACES.map((space) => (
            <StaggerItem key={space.id}>
              <Link
                href={`/private-dining#${space.id}`}
                className="group focus-visible:outline-ring relative block overflow-hidden rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                <ImageFrame
                  src={space.image}
                  alt={space.name}
                  ratio="2/3"
                  rounded={false}
                  zoom
                  overlay="bottom"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-ui text-gold flex items-center gap-1.5 text-[0.62rem] tracking-[0.2em] uppercase">
                    <Users className="size-3" aria-hidden />
                    {space.capacity}
                  </p>
                  <h3 className="font-display mt-2 text-2xl leading-tight text-white">{space.name}</h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/70">
                    {space.description}
                  </p>
                  <p className="font-ui mt-3 flex items-center gap-1.5 text-xs text-white/90">
                    {space.minimumSpend}
                    <ArrowRight
                      aria-hidden
                      className="size-3.5 -translate-x-1 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
