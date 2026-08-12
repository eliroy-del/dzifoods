"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CalendarDays, Clock, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { submitReservation } from "@/app/actions";
import { FormSuccess } from "@/components/forms/form-success";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckboxField, RadioCard, RadioGroup } from "@/components/ui/controls";
import { Field, Honeypot, Input, Label, Textarea } from "@/components/ui/field";
import { OCCASIONS, RESERVATION_SETTINGS, SEATING_OPTIONS } from "@/constants/site";
import { getTimeSlots } from "@/lib/hours";
import { addDays, cn, formatDate, toDateKey } from "@/lib/utils";
import { reservationSchema, type ReservationValues } from "@/lib/validators";
import type { OccasionId, SeatingId } from "@/types";

const DIETARY_NOTES = [
  "Vegetarian",
  "Vegan",
  "Gluten free",
  "Dairy free",
  "Nut allergy",
  "Shellfish allergy",
  "Halal",
  "Pescatarian",
] as const;

interface ReservationFormProps {
  /** Prefill from the hero widget's query string. */
  defaults?: {
    date?: string;
    time?: string;
    guests?: string;
    seating?: string;
    occasion?: string;
  };
}

function isSeating(value: string | undefined): value is SeatingId {
  return SEATING_OPTIONS.some((option) => option.id === value);
}

function isOccasion(value: string | undefined): value is OccasionId {
  return OCCASIONS.some((option) => option.id === value);
}

/**
 * The full booking flow.
 *
 * The date rail shows fourteen days as chips rather than a native date input —
 * it makes availability feel tangible and removes a keyboard step on mobile.
 */
export function ReservationForm({ defaults }: ReservationFormProps) {
  const today = useMemo(() => new Date(), []);
  const [confirmation, setConfirmation] = useState<{
    reference: string;
    date: string;
    time: string;
    guests: number;
  } | null>(null);

  const dayOptions = useMemo(
    () =>
      Array.from({ length: 21 }, (_, index) => {
        const date = addDays(today, index);
        return {
          value: toDateKey(date),
          weekday: index === 0 ? "Today" : formatDate(date, { weekday: "short" }),
          day: formatDate(date, { day: "numeric" }),
          month: formatDate(date, { month: "short" }),
        };
      }),
    [today],
  );

  const parsedGuests = Number(defaults?.guests);
  const initialGuests =
    Number.isFinite(parsedGuests) && parsedGuests >= 1 && parsedGuests <= RESERVATION_SETTINGS.maxPartySize
      ? parsedGuests
      : 2;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ReservationValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      guests: initialGuests,
      date: defaults?.date ?? dayOptions[0]!.value,
      time: defaults?.time ?? "19:30",
      occasion: isOccasion(defaults?.occasion) ? defaults!.occasion! : "none",
      seating: isSeating(defaults?.seating) ? defaults!.seating! : "indoor",
      requests: "",
      dietary: [],
      marketingOptIn: false,
      agreeToPolicy: true,
      botField: "",
    },
  });

  const date = watch("date");
  const time = watch("time");
  const guests = watch("guests");
  const seating = watch("seating");
  const occasion = watch("occasion");
  const dietary = watch("dietary") ?? [];

  const slots = useMemo(() => getTimeSlots(new Date(`${date}T12:00:00`)), [date]);

  const onSubmit = handleSubmit(async (values) => {
    const result = await submitReservation(values);

    if (result.status === "success" && result.reference) {
      setConfirmation({
        reference: result.reference,
        date: formatDate(new Date(`${values.date}T12:00:00`), {
          weekday: "long",
          day: "numeric",
          month: "long",
        }),
        time: values.time,
        guests: values.guests,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.error("We couldn't confirm that table", { description: result.message });
    }
  });

  const toggleDietary = (item: string) => {
    const next = dietary.includes(item)
      ? dietary.filter((entry) => entry !== item)
      : [...dietary, item];
    setValue("dietary", next);
  };

  if (confirmation) {
    return (
      <FormSuccess
        eyebrow="Table confirmed"
        title="Your table is held. We'll be watching the door."
        description="A confirmation is in your inbox with directions, parking and a link to amend the booking. Cancel free up to 24 hours before — after that, just call and we'll sort it."
        reference={confirmation.reference}
        details={[
          { label: "Date", value: confirmation.date },
          { label: "Time", value: confirmation.time },
          {
            label: "Party",
            value: `${confirmation.guests} ${confirmation.guests === 1 ? "guest" : "guests"}`,
          },
        ]}
        actions={
          <>
            <Button asChild variant="ember" size="lg" uppercase>
              <Link href="/menu">Read the menu</Link>
            </Button>
            <Button asChild variant="outline" size="lg" uppercase>
              <Link href="/contact">Find us</Link>
            </Button>
          </>
        }
      />
    );
  }

  const tooLarge = guests >= RESERVATION_SETTINGS.largePartyThreshold;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
      <Honeypot />

      <div className="space-y-11">
        {/* --------------------------------- Party -------------------------------- */}
        <fieldset>
          <Legend step="01" title="How many of you?" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: RESERVATION_SETTINGS.maxPartySize }, (_, index) => index + 1).map(
              (count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setValue("guests", count, { shouldValidate: true })}
                  aria-pressed={guests === count}
                  className={cn(
                    "font-ui grid size-12 place-items-center rounded-full border text-sm transition-all duration-300",
                    guests === count
                      ? "border-accent bg-accent text-accent-foreground shadow-glow"
                      : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground",
                  )}
                >
                  {count}
                </button>
              ),
            )}
          </div>
          {errors.guests ? (
            <p role="alert" className="text-destructive mt-3 text-xs">
              {errors.guests.message}
            </p>
          ) : null}
          <p className="text-muted-foreground mt-4 text-xs">
            Thirteen or more?{" "}
            <Link href="/contact?topic=events" className="text-accent link-underline">
              Contact our events team
            </Link>{" "}
            for larger parties.
          </p>
        </fieldset>

        {/* --------------------------------- Date --------------------------------- */}
        <fieldset>
          <Legend step="02" title="Which evening?" />
          <div className="hide-scrollbar mask-fade-x -mx-1 overflow-x-auto px-1 pb-1">
            <div className="flex w-max gap-2">
              {dayOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setValue("date", option.value, { shouldValidate: true })}
                  aria-pressed={date === option.value}
                  className={cn(
                    "flex w-[4.6rem] shrink-0 flex-col items-center gap-0.5 rounded-2xl border py-3 transition-all duration-300",
                    date === option.value
                      ? "border-forest bg-forest text-cream"
                      : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground",
                  )}
                >
                  <span className="font-ui text-[0.62rem] tracking-[0.14em] uppercase opacity-70">
                    {option.weekday}
                  </span>
                  <span className="font-display text-xl leading-none">{option.day}</span>
                  <span className="font-ui text-[0.6rem] tracking-[0.1em] uppercase opacity-60">
                    {option.month}
                  </span>
                </button>
              ))}
            </div>
          </div>
          {errors.date ? (
            <p role="alert" className="text-destructive mt-3 text-xs">
              {errors.date.message}
            </p>
          ) : null}
        </fieldset>

        {/* --------------------------------- Time --------------------------------- */}
        <fieldset>
          <Legend step="03" title="What time suits?" />
          <div className="flex flex-wrap gap-2">
            {slots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setValue("time", slot, { shouldValidate: true })}
                aria-pressed={time === slot}
                className={cn(
                  "font-ui rounded-full border px-4 py-2 text-xs tabular-nums transition-all duration-300",
                  time === slot
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground",
                )}
              >
                {slot}
              </button>
            ))}
          </div>
          {errors.time ? (
            <p role="alert" className="text-destructive mt-3 text-xs">
              {errors.time.message}
            </p>
          ) : null}
          <p className="text-muted-foreground mt-4 text-xs">
            Last seating is seventy-five minutes before close. Your table is yours for the evening —
            we never turn it twice.
          </p>
        </fieldset>

        {/* -------------------------------- Seating ------------------------------- */}
        <fieldset>
          <Legend step="04" title="Where would you like to sit?" />
          <RadioGroup
            value={seating}
            onValueChange={(next) => setValue("seating", next as SeatingId)}
            className="sm:grid-cols-2"
            aria-label="Seating preference"
          >
            {SEATING_OPTIONS.map((option) => (
              <RadioCard
                key={option.id}
                value={option.id}
                label={option.label}
                description={option.description}
                meta={option.capacity}
              />
            ))}
          </RadioGroup>
        </fieldset>

        {/* ------------------------------- Occasion ------------------------------ */}
        <fieldset>
          <Legend step="05" title="Are we celebrating?" />
          <div className="flex flex-wrap gap-2">
            {OCCASIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setValue("occasion", option.id)}
                aria-pressed={occasion === option.id}
                title={option.description}
                className={cn(
                  "font-ui rounded-full border px-4 py-2 text-xs transition-all duration-300",
                  occasion === option.id
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          <p className="text-muted-foreground mt-3 text-xs">
            {OCCASIONS.find((option) => option.id === occasion)?.description}
          </p>
        </fieldset>

        {/* --------------------------------- You --------------------------------- */}
        <fieldset>
          <Legend step="06" title="And who should we expect?" />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="First name" htmlFor="res-first" error={errors.firstName?.message}>
              <Input
                id="res-first"
                autoComplete="given-name"
                aria-invalid={!!errors.firstName}
                {...register("firstName")}
              />
            </Field>
            <Field label="Last name" htmlFor="res-last" error={errors.lastName?.message}>
              <Input
                id="res-last"
                autoComplete="family-name"
                aria-invalid={!!errors.lastName}
                {...register("lastName")}
              />
            </Field>
            <Field label="Email" htmlFor="res-email" error={errors.email?.message}>
              <Input
                id="res-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
            </Field>
            <Field
              label="Phone"
              htmlFor="res-phone"
              error={errors.phone?.message}
              hint="Only used if we need to reach you on the night."
            >
              <Input
                id="res-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+233 …"
                aria-invalid={!!errors.phone}
                {...register("phone")}
              />
            </Field>
          </div>

          <div className="mt-7">
            <Label>Dietary notes</Label>
            <div className="mt-3 flex flex-wrap gap-2">
              {DIETARY_NOTES.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleDietary(item)}
                  aria-pressed={dietary.includes(item)}
                  className={cn(
                    "font-ui rounded-full border px-3.5 py-1.5 text-xs transition-colors",
                    dietary.includes(item)
                      ? "border-success bg-success/12 text-success"
                      : "border-border text-muted-foreground hover:border-success/50",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <Field
            label="Anything else?"
            htmlFor="res-requests"
            optional
            error={errors.requests?.message}
            hint="A quiet corner, a high chair, a cake we should keep in the fridge — tell us."
            className="mt-7"
          >
            <Textarea id="res-requests" rows={3} {...register("requests")} />
          </Field>

          <div className="mt-7 space-y-4">
            <CheckboxField
              id="res-policy"
              label="I accept the cancellation policy"
              description="Free until 24 hours before. Parties of six or more hold a card against the booking."
              checked={watch("agreeToPolicy")}
              onCheckedChange={(checked) =>
                setValue("agreeToPolicy", (checked === true) as true, { shouldValidate: true })
              }
              aria-invalid={!!errors.agreeToPolicy}
            />
            {errors.agreeToPolicy ? (
              <p role="alert" className="text-destructive text-xs">
                {errors.agreeToPolicy.message}
              </p>
            ) : null}
            <CheckboxField
              id="res-marketing"
              label="Send me the Sunday Send"
              description="One letter a month — menu previews and first refusal on chef's tables."
              checked={watch("marketingOptIn")}
              onCheckedChange={(checked) => setValue("marketingOptIn", checked === true)}
            />
          </div>
        </fieldset>
      </div>

      {/* -------------------------------- Summary ------------------------------- */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <Card variant="solid" radius="xl" className="p-6 md:p-7">
          <p className="font-ui text-gold text-[0.62rem] font-semibold tracking-[0.22em] uppercase">
            Your booking
          </p>
          <h2 className="font-display mt-3 text-2xl leading-tight">
            {formatDate(new Date(`${date}T12:00:00`), {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </h2>

          <dl className="border-border mt-6 divide-y border-y">
            <SummaryRow icon={<Clock className="size-4" aria-hidden />} label="Time" value={time} />
            <SummaryRow
              icon={<Users className="size-4" aria-hidden />}
              label="Party"
              value={`${guests} ${guests === 1 ? "guest" : "guests"}`}
            />
            <SummaryRow
              icon={<CalendarDays className="size-4" aria-hidden />}
              label="Seating"
              value={SEATING_OPTIONS.find((option) => option.id === seating)?.label ?? "—"}
            />
            <SummaryRow
              icon={<Sparkles className="size-4" aria-hidden />}
              label="Occasion"
              value={OCCASIONS.find((option) => option.id === occasion)?.label ?? "—"}
            />
          </dl>

          {dietary.length > 0 ? (
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {dietary.map((item) => (
                <li key={item}>
                  <Badge variant="success" size="sm">
                    {item}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : null}

          {tooLarge ? (
            <p className="border-gold/30 bg-gold/8 text-muted-foreground mt-6 rounded-2xl border px-4 py-3 text-xs leading-relaxed">
              For a party this size our events team will look after you properly.{" "}
              <Link href="/contact?topic=events" className="text-gold link-underline">
                Enquire here
              </Link>
              .
            </p>
          ) : null}

          <Button
            type="submit"
            variant="ember"
            size="xl"
            uppercase
            loading={isSubmitting}
            className="mt-7 w-full"
          >
            Confirm table
            <ArrowRight className="size-4" aria-hidden />
          </Button>

          <p className="text-muted-foreground mt-4 text-center text-[0.7rem] leading-relaxed">
            No card needed for parties under six · {RESERVATION_SETTINGS.holdMinutes}-minute grace on
            arrival · Confirmation in seconds
          </p>
        </Card>
      </aside>
    </form>
  );
}

function Legend({ step, title }: { step: string; title: string }) {
  return (
    <legend className="mb-5 flex items-baseline gap-3">
      <span className="font-ui text-gold text-[0.62rem] font-semibold tracking-[0.22em]">{step}</span>
      <span className="font-display text-2xl leading-none">{title}</span>
    </legend>
  );
}

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <dt className="text-muted-foreground flex items-center gap-2.5 text-sm">
        <span className="text-accent">{icon}</span>
        {label}
      </dt>
      <dd className="font-ui text-sm font-medium">{value}</dd>
    </div>
  );
}
