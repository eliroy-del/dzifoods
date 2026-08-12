"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { BadgeCheck, ChevronLeft, ChevronRight, Pause, Play, Quote } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Stars } from "@/components/ui/rating";
import { SectionHeading } from "@/components/ui/section";
import { TESTIMONIALS } from "@/constants/people";
import { SITE } from "@/constants/site";
import { cn, formatDate } from "@/lib/utils";

/**
 * Guest stories carousel.
 *
 * Autoplays, pauses on hover and on focus, and can be stopped outright — which
 * WCAG 2.2.2 requires of any moving content that runs longer than five seconds.
 */
export function Testimonials({ className }: { className?: string }) {
  const autoplay = useRef(Autoplay({ delay: 5200, stopOnInteraction: false, stopOnMouseEnter: true }));
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1, containScroll: "trimSnaps" },
    [autoplay.current],
  );
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(true);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const toggle = () => {
    const plugin = autoplay.current;
    if (playing) plugin.stop();
    else plugin.play();
    setPlaying((previous) => !previous);
  };

  return (
    <section
      id="testimonials"
      className={cn("section bg-forest-deep text-cream grain relative overflow-hidden", className)}
    >
      <div
        aria-hidden
        className="bg-accent/10 pointer-events-none absolute top-10 right-0 size-[30rem] rounded-full blur-3xl"
      />

      <div className="container-luxe relative">
        <Reveal>
          <SectionHeading
            eyebrow={`${SITE.rating.value} average · ${SITE.rating.count.toLocaleString("en-US")} verified reviews`}
            title="What guests say when we are not in the room."
            description="Unedited, verified, and occasionally more generous than we deserve."
            className="[&_p]:text-cream/65"
            action={
              <div className="flex items-center gap-2">
                <CarouselButton
                  label="Previous story"
                  onClick={() => emblaApi?.scrollPrev()}
                  icon={<ChevronLeft className="size-4" />}
                />
                <CarouselButton
                  label={playing ? "Pause stories" : "Play stories"}
                  onClick={toggle}
                  icon={playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                />
                <CarouselButton
                  label="Next story"
                  onClick={() => emblaApi?.scrollNext()}
                  icon={<ChevronRight className="size-4" />}
                />
              </div>
            }
          />
        </Reveal>

        <div
          className="mt-14 overflow-hidden"
          ref={emblaRef}
          onFocus={() => autoplay.current.stop()}
          role="region"
          aria-label="Guest testimonials"
          aria-live="off"
        >
          <ul className="flex touch-pan-y">
            {TESTIMONIALS.map((testimonial) => (
              <li
                key={testimonial.id}
                className="min-w-0 shrink-0 grow-0 basis-full pr-6 sm:basis-1/2 lg:basis-1/3"
              >
                <Card
                  variant="dark"
                  radius="xl"
                  hover="lift"
                  className="flex h-full flex-col p-7 backdrop-blur-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <Quote className="text-gold size-7" aria-hidden />
                    <Stars value={testimonial.rating} size="sm" />
                  </div>

                  <blockquote className="font-display mt-5 flex-1 text-lg leading-snug">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  <footer className="mt-7 flex items-center gap-3.5 border-t border-white/10 pt-5">
                    <span
                      aria-hidden
                      className="bg-accent/15 text-accent font-ui grid size-11 shrink-0 place-items-center rounded-full text-sm font-semibold"
                    >
                      {testimonial.initials}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="font-ui flex items-center gap-1.5 text-sm font-medium text-white">
                        {testimonial.name}
                        {testimonial.verified ? (
                          <BadgeCheck className="text-success size-3.5" aria-label="Verified guest" />
                        ) : null}
                      </span>
                      <span className="text-cream/50 block truncate text-xs">
                        {testimonial.role} · {formatDate(testimonial.date, { month: "short", year: "numeric" })}
                      </span>
                    </span>
                    <Badge variant="glass" size="sm">
                      {testimonial.source}
                    </Badge>
                  </footer>
                </Card>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIALS.map((testimonial, index) => (
            <button
              key={testimonial.id}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Go to story ${index + 1}`}
              aria-current={selected === index}
              className={cn(
                "h-1 rounded-full transition-all duration-400",
                selected === index ? "bg-accent w-8" : "w-3 bg-white/20 hover:bg-white/40",
              )}
            />
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-10">
          <Marquee speed={34}>
            {PRESS_QUOTES.map((entry) => (
              <span key={entry.source} className="flex items-center gap-5 px-8">
                <span className="font-display text-cream/70 text-lg whitespace-nowrap italic">
                  &ldquo;{entry.quote}&rdquo;
                </span>
                <span className="font-ui text-gold text-[0.62rem] tracking-[0.22em] whitespace-nowrap uppercase">
                  {entry.source}
                </span>
                <span aria-hidden className="bg-accent/60 size-1 rotate-45" />
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

function CarouselButton({
  label,
  onClick,
  icon,
}: {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="hover:border-accent/60 hover:text-accent grid size-11 place-items-center rounded-full border border-white/15 text-white/70 transition-colors"
    >
      {icon}
    </button>
  );
}
