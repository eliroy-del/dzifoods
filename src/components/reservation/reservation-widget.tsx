"use client";

import { ArrowRight, CalendarDays, Clock, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label, Select } from "@/components/ui/field";
import { RESERVATION_SETTINGS } from "@/constants/site";
import { getTimeSlots } from "@/lib/hours";
import { addDays, cn, formatDate, toDateKey } from "@/lib/utils";

/**
 * Quick-booking widget for the hero.
 *
 * It deliberately does not submit anything — it collects the three decisions
 * guests always make first and hands them to the full reservation flow as
 * query parameters, so the funnel starts with a sense of progress.
 */
export function ReservationWidget({
  className,
  tone = "glass",
}: {
  className?: string;
  tone?: "glass" | "solid";
}) {
  const router = useRouter();
  const today = useMemo(() => new Date(), []);

  const dayOptions = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => {
        const date = addDays(today, index);
        return {
          value: toDateKey(date),
          label:
            index === 0
              ? `Today · ${formatDate(date, { day: "numeric", month: "short" })}`
              : index === 1
                ? `Tomorrow · ${formatDate(date, { day: "numeric", month: "short" })}`
                : formatDate(date, { weekday: "short", day: "numeric", month: "short" }),
        };
      }),
    [today],
  );

  const [date, setDate] = useState(dayOptions[0]!.value);
  const [guests, setGuests] = useState("2");

  const slots = useMemo(() => getTimeSlots(new Date(`${date}T12:00:00`)), [date]);
  const [time, setTime] = useState(slots[Math.min(slots.length - 1, 14)] ?? "19:00");

  const submit = () => {
    const params = new URLSearchParams({ date, guests, time });
    router.push(`/reservations?${params.toString()}`);
  };

  const dark = tone === "glass";

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      className={cn(
        "rounded-3xl p-5 md:p-6",
        dark ? "glass-dark text-white shadow-lift" : "border-border bg-card border shadow-card",
        className,
      )}
      aria-label="Quick table booking"
    >
      <p
        className={cn(
          "font-ui mb-4 flex items-center gap-2 text-[0.65rem] font-semibold tracking-[0.22em] uppercase",
          dark ? "text-gold" : "text-gold",
        )}
      >
        <span aria-hidden className="bg-gold/60 h-px w-6" />
        Book a table
      </p>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="widget-date" className={dark ? "text-white/60" : undefined}>
            <CalendarDays className="size-3" aria-hidden /> Date
          </Label>
          <Select
            id="widget-date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className={dark ? "border-white/15 bg-white/8 text-white" : undefined}
          >
            {dayOptions.map((option) => (
              <option key={option.value} value={option.value} className="text-foreground">
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="widget-time" className={dark ? "text-white/60" : undefined}>
            <Clock className="size-3" aria-hidden /> Time
          </Label>
          <Select
            id="widget-time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            className={dark ? "border-white/15 bg-white/8 text-white" : undefined}
          >
            {slots.map((slot) => (
              <option key={slot} value={slot} className="text-foreground">
                {slot}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="widget-guests" className={dark ? "text-white/60" : undefined}>
            <Users className="size-3" aria-hidden /> Guests
          </Label>
          <Select
            id="widget-guests"
            value={guests}
            onChange={(event) => setGuests(event.target.value)}
            className={dark ? "border-white/15 bg-white/8 text-white" : undefined}
          >
            {Array.from({ length: RESERVATION_SETTINGS.maxPartySize }, (_, index) => index + 1).map(
              (count) => (
                <option key={count} value={count} className="text-foreground">
                  {count} {count === 1 ? "guest" : "guests"}
                </option>
              ),
            )}
            <option value="13" className="text-foreground">
              13+ (private dining)
            </option>
          </Select>
        </div>
      </div>

      <Button type="submit" variant="ember" size="lg" uppercase className="mt-4 w-full">
        Check availability
        <ArrowRight className="size-4" aria-hidden />
      </Button>

      <p className={cn("mt-3 text-center text-[0.7rem]", dark ? "text-white/50" : "text-muted-foreground")}>
        Free cancellation up to 24 hours before · {RESERVATION_SETTINGS.holdMinutes}-minute table hold
      </p>
    </form>
  );
}
