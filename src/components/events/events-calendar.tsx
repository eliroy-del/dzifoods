"use client";

import { CalendarDays, Clock, Ticket } from "lucide-react";
import { useMemo, useState } from "react";

import { EventBookingForm } from "@/components/forms/event-booking-form";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImageFrame } from "@/components/ui/media";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/controls";
import { EVENTS } from "@/constants/events";
import { cn, formatDate } from "@/lib/utils";
import type { RestaurantEvent } from "@/types";

type EventKind = RestaurantEvent["kind"] | "All";

const KINDS: readonly EventKind[] = [
  "All",
  "Wine Tasting",
  "Live Music",
  "Chef's Table",
  "Holiday Menu",
  "Brunch",
];

const KIND_VARIANT: Record<RestaurantEvent["kind"], "gold" | "ember" | "forest" | "neutral"> = {
  "Wine Tasting": "gold",
  "Live Music": "ember",
  "Chef's Table": "forest",
  "Holiday Menu": "neutral",
  Brunch: "neutral",
};

/** Filterable events grid with in-dialog seat booking. */
export function EventsCalendar() {
  const [filter, setFilter] = useState<EventKind>("All");
  const [selected, setSelected] = useState<RestaurantEvent | null>(null);

  const events = useMemo(
    () =>
      [...EVENTS]
        .filter((event) => filter === "All" || event.kind === filter)
        .sort((a, b) => a.date.localeCompare(b.date)),
    [filter],
  );

  return (
    <>
      <ToggleGroup
        type="single"
        value={filter}
        onValueChange={(next) => next && setFilter(next as EventKind)}
        className="hide-scrollbar mask-fade-x w-full flex-wrap justify-start overflow-x-auto"
        aria-label="Filter events by type"
      >
        {KINDS.map((kind) => (
          <ToggleGroupItem key={kind} value={kind} className="shrink-0">
            {kind}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {events.length === 0 ? (
        <p className="text-muted-foreground mt-12 text-center text-sm">
          Nothing in that category just now — check back, or join the Sunday Send for first refusal.
        </p>
      ) : (
        <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
          {events.map((event) => {
            const soldOut = event.seatsLeft <= 0;
            const low = event.seatsLeft > 0 && event.seatsLeft <= 8;
            const dateLabel = formatDate(new Date(`${event.date}T12:00:00`), {
              weekday: "short",
              day: "numeric",
              month: "short",
            });

            return (
              <StaggerItem key={event.id}>
                <Card
                  variant="solid"
                  radius="xl"
                  hover={soldOut ? "none" : "both"}
                  className={cn("flex h-full flex-col overflow-hidden", soldOut && "opacity-70")}
                >
                  <div className="relative">
                    <ImageFrame
                      src={event.image}
                      alt={event.title}
                      ratio="16/9"
                      rounded={false}
                      zoom={!soldOut}
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
                      <Badge variant={KIND_VARIANT[event.kind]} size="sm" className="backdrop-blur-md">
                        {event.kind}
                      </Badge>
                      {soldOut ? (
                        <Badge variant="outline" size="sm" className="bg-black/50 text-white backdrop-blur-md">
                          Sold out
                        </Badge>
                      ) : low ? (
                        <Badge variant="ember" size="sm" className="backdrop-blur-md">
                          {event.seatsLeft} left
                        </Badge>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-ui text-muted-foreground flex items-center gap-2 text-xs">
                      <CalendarDays className="size-3.5" aria-hidden />
                      {dateLabel}
                      <span aria-hidden>·</span>
                      <Clock className="size-3.5" aria-hidden />
                      {event.time}
                    </p>
                    <h3 className="font-display mt-3 text-2xl leading-tight">{event.title}</h3>
                    <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                      {event.description}
                    </p>
                    {event.host ? (
                      <p className="text-muted-foreground mt-3 text-xs">Hosted by {event.host}</p>
                    ) : null}
                    <div className="mt-5 flex items-center justify-between gap-3 pt-1">
                      <span className="font-ui text-sm font-semibold">{event.price}</span>
                      <Button
                        variant={soldOut ? "outline" : "ember"}
                        size="md"
                        disabled={soldOut}
                        onClick={() => setSelected(event)}
                      >
                        <Ticket className="size-4" aria-hidden />
                        {soldOut ? "Waitlist" : "Book seats"}
                      </Button>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
      )}

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        {selected ? (
          <DialogContent side="right" className="gap-0 p-0">
            <div className="relative h-48 shrink-0">
              <ImageFrame
                src={selected.image}
                alt={selected.title}
                ratio="auto"
                rounded={false}
                className="absolute inset-0 h-full"
                sizes="480px"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
              />
              <div className="absolute inset-x-6 bottom-5">
                <Badge variant={KIND_VARIANT[selected.kind]} size="sm">
                  {selected.kind}
                </Badge>
                <DialogTitle className="mt-2 text-2xl text-white">{selected.title}</DialogTitle>
                <DialogDescription className="text-white/70">
                  {formatDate(new Date(`${selected.date}T12:00:00`), {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}{" "}
                  · {selected.time} · {selected.price}
                </DialogDescription>
              </div>
            </div>
            <div className="p-6" data-lenis-prevent>
              <EventBookingForm event={selected} />
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </>
  );
}
