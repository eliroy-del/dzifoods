"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { reserveEventSeats } from "@/app/actions";
import { FormSuccess } from "@/components/forms/form-success";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/controls";
import { Field, Honeypot, Input } from "@/components/ui/field";
import { eventBookingSchema, type EventBookingValues } from "@/lib/validators";
import type { RestaurantEvent } from "@/types";

interface EventBookingFormProps {
  event: RestaurantEvent;
  onSuccess?: () => void;
}

/** Compact booking form used inside the events calendar dialog. */
export function EventBookingForm({ event, onSuccess }: EventBookingFormProps) {
  const [confirmation, setConfirmation] = useState<{ reference: string; seats: number } | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EventBookingValues>({
    resolver: zodResolver(eventBookingSchema),
    defaultValues: {
      eventId: event.id,
      name: "",
      email: "",
      phone: "",
      seats: 2,
      botField: "",
    },
  });

  const seats = watch("seats");

  const onSubmit = handleSubmit(async (values) => {
    if (event.seatsLeft <= 0) {
      toast.error("This event is sold out");
      return;
    }

    const result = await reserveEventSeats(values);

    if (result.status === "success" && result.reference) {
      setConfirmation({ reference: result.reference, seats: values.seats });
      onSuccess?.();
    } else {
      toast.error("We couldn't hold those seats", { description: result.message });
    }
  });

  if (confirmation) {
    return (
      <FormSuccess
        eyebrow="Seats held"
        title={`${confirmation.seats} ${confirmation.seats === 1 ? "seat" : "seats"} for ${event.title}`}
        description="Check your inbox to confirm within the hour — unconfirmed holds are released automatically."
        reference={confirmation.reference}
        actions={
          <Button asChild variant="outline" size="md">
            <Link href="/events">Back to events</Link>
          </Button>
        }
        className="border-0 bg-transparent p-0 shadow-none"
      />
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <Honeypot />
      <input type="hidden" {...register("eventId")} />

      <Field label="Your name" htmlFor={`event-name-${event.id}`} error={errors.name?.message}>
        <Input
          id={`event-name-${event.id}`}
          autoComplete="name"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
      </Field>
      <Field label="Email" htmlFor={`event-email-${event.id}`} error={errors.email?.message}>
        <Input
          id={`event-email-${event.id}`}
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
      </Field>
      <Field label="Phone" htmlFor={`event-phone-${event.id}`} error={errors.phone?.message}>
        <Input
          id={`event-phone-${event.id}`}
          type="tel"
          autoComplete="tel"
          placeholder="+233 …"
          aria-invalid={!!errors.phone}
          {...register("phone")}
        />
      </Field>

      <div>
        <p className="font-ui text-muted-foreground mb-3 text-[0.65rem] font-semibold tracking-[0.18em] uppercase">
          Seats
        </p>
        <QuantityStepper
          value={seats}
          onChange={(next) => setValue("seats", next, { shouldValidate: true })}
          min={1}
          max={Math.min(12, event.seatsLeft)}
          label={`seats for ${event.title}`}
        />
        {errors.seats ? (
          <p role="alert" className="text-destructive mt-2 text-xs">
            {errors.seats.message}
          </p>
        ) : null}
        <p className="text-muted-foreground mt-2 text-xs">
          {event.seatsLeft} {event.seatsLeft === 1 ? "seat" : "seats"} remaining
        </p>
      </div>

      <Button
        type="submit"
        variant="ember"
        size="lg"
        uppercase
        loading={isSubmitting}
        disabled={event.seatsLeft <= 0}
        className="w-full"
      >
        {event.seatsLeft <= 0 ? "Sold out" : "Hold my seats"}
        <ArrowRight className="size-4" aria-hidden />
      </Button>
    </form>
  );
}
