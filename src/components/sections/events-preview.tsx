import { ArrowRight, CalendarDays, Clock, Ticket } from "lucide-react";
import Link from "next/link";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageFrame } from "@/components/ui/media";
import { SectionHeading } from "@/components/ui/section";
import { EVENTS } from "@/constants/events";
import { cn, formatDate } from "@/lib/utils";

export function EventsPreview({ className }: { className?: string }) {
  const events = EVENTS.slice(0, 3);

  return (
    <section className={cn("section bg-surface/40", className)}>
      <div className="container-luxe">
        <Reveal>
          <SectionHeading
            eyebrow="What's on"
            title="There is almost always something happening."
            description="Wine flights, chef's tables, live highlife and menus that only exist for three weeks."
            action={
              <Button asChild variant="outline" size="lg" uppercase>
                <Link href="/events">
                  Full calendar
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            }
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3" gap={0.1}>
          {events.map((event) => (
            <StaggerItem key={event.id}>
              <Card variant="solid" radius="xl" hover="both" className="group flex h-full flex-col">
                <div className="relative">
                  <ImageFrame
                    src={event.image}
                    alt={event.title}
                    ratio="3/2"
                    rounded={false}
                    zoom
                    overlay="soft"
                    sizes="(max-width: 768px) 100vw, 420px"
                  />
                  <Badge variant="glass" size="sm" className="absolute top-4 left-4">
                    {event.kind}
                  </Badge>
                  {event.seatsLeft <= 6 ? (
                    <Badge variant="ember" size="sm" className="absolute top-4 right-4 backdrop-blur-md">
                      {event.seatsLeft} seats left
                    </Badge>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="font-ui text-gold flex items-center gap-2 text-[0.65rem] font-semibold tracking-[0.18em] uppercase">
                    <CalendarDays className="size-3.5" aria-hidden />
                    {formatDate(event.date, { weekday: "long", day: "numeric", month: "long" })}
                  </p>
                  <h3 className="font-display mt-3 text-2xl leading-tight">{event.title}</h3>
                  <p className="text-muted-foreground mt-3 line-clamp-3 text-sm leading-relaxed">
                    {event.description}
                  </p>

                  <dl className="text-muted-foreground mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs">
                    <div className="flex items-center gap-1.5">
                      <dt className="sr-only">Time</dt>
                      <Clock className="size-3.5" aria-hidden />
                      <dd>{event.time}</dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <dt className="sr-only">Price</dt>
                      <Ticket className="size-3.5" aria-hidden />
                      <dd>{event.price}</dd>
                    </div>
                  </dl>

                  <Button asChild variant="ember" size="md" className="mt-6 w-full">
                    <Link href={`/events#${event.id}`}>Reserve seats</Link>
                  </Button>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
