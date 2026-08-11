"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { submitPrivateDining } from "@/app/actions";
import { FormSuccess } from "@/components/forms/form-success";
import { Button } from "@/components/ui/button";
import { RadioCard, RadioGroup } from "@/components/ui/controls";
import { Field, Honeypot, Input, Select, Textarea } from "@/components/ui/field";
import { PRIVATE_SPACES } from "@/constants/events";
import { addDays, toDateKey } from "@/lib/utils";
import { privateDiningSchema, type PrivateDiningValues } from "@/lib/validators";

const EVENT_TYPES = [
  { id: "corporate", label: "Corporate", description: "Board dinners, client entertaining, launches" },
  { id: "wedding", label: "Wedding", description: "Rehearsal dinners, ceremonies, receptions" },
  { id: "birthday", label: "Birthday", description: "Milestone celebrations, surprise parties" },
  { id: "family", label: "Family", description: "Reunions, christenings, long lunches" },
  { id: "launch", label: "Product launch", description: "Press, partners, investors" },
  { id: "other", label: "Something else", description: "Tell us in the brief" },
] as const;

const BUDGETS = [
  { id: "under-10k", label: "Under ₵10,000" },
  { id: "10k-25k", label: "₵10,000 – ₵25,000" },
  { id: "25k-50k", label: "₵25,000 – ₵50,000" },
  { id: "50k-plus", label: "₵50,000+" },
  { id: "unsure", label: "Not sure yet" },
] as const;

interface PrivateDiningFormProps {
  defaultSpace?: string;
}

export function PrivateDiningForm({ defaultSpace }: PrivateDiningFormProps) {
  const [confirmation, setConfirmation] = useState<{ reference: string } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PrivateDiningValues>({
    resolver: zodResolver(privateDiningSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      eventType: "corporate",
      space:
        PRIVATE_SPACES.some((space) => space.id === defaultSpace)
          ? (defaultSpace as PrivateDiningValues["space"])
          : "undecided",
      date: toDateKey(addDays(new Date(), 14)),
      guests: 12,
      budget: "unsure",
      message: "",
      botField: "",
    },
  });

  const eventType = watch("eventType");
  const space = watch("space");
  const budget = watch("budget");

  const onSubmit = handleSubmit(async (values) => {
    const result = await submitPrivateDining(values);

    if (result.status === "success" && result.reference) {
      setConfirmation({ reference: result.reference });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.error("We couldn't send that enquiry", { description: result.message });
    }
  });

  if (confirmation) {
    return (
      <FormSuccess
        eyebrow="Enquiry received"
        title="Our events team has it. Expect a reply by tomorrow."
        description="You'll hear from a named coordinator — not a shared inbox — with room options, a draft menu and a full cost. For anything urgent, call the events line directly."
        reference={confirmation.reference}
        actions={
          <>
            <Button asChild variant="ember" size="lg" uppercase>
              <Link href="/events">See upcoming events</Link>
            </Button>
            <Button asChild variant="outline" size="lg" uppercase>
              <Link href="/gallery">View the rooms</Link>
            </Button>
          </>
        }
      />
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-10">
      <Honeypot />

      <fieldset>
        <legend className="font-display mb-5 text-2xl">What are you planning?</legend>
        <RadioGroup
          value={eventType}
          onValueChange={(next) => setValue("eventType", next as PrivateDiningValues["eventType"])}
          className="sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Event type"
        >
          {EVENT_TYPES.map((option) => (
            <RadioCard
              key={option.id}
              value={option.id}
              label={option.label}
              description={option.description}
            />
          ))}
        </RadioGroup>
      </fieldset>

      <fieldset>
        <legend className="font-display mb-5 text-2xl">Which room feels right?</legend>
        <RadioGroup
          value={space}
          onValueChange={(next) => setValue("space", next as PrivateDiningValues["space"])}
          className="sm:grid-cols-2"
          aria-label="Private space"
        >
          {PRIVATE_SPACES.map((room) => (
            <RadioCard
              key={room.id}
              value={room.id}
              label={room.name}
              description={room.description}
              meta={room.capacity}
            />
          ))}
          <RadioCard
            value="undecided"
            label="Not sure yet"
            description="We'll recommend the right room once we know your headcount."
          />
        </RadioGroup>
      </fieldset>

      <fieldset>
        <legend className="font-display mb-5 text-2xl">The details</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your name" htmlFor="pd-name" error={errors.name?.message}>
            <Input id="pd-name" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
          </Field>
          <Field label="Company" htmlFor="pd-company" optional error={errors.company?.message}>
            <Input id="pd-company" autoComplete="organization" {...register("company")} />
          </Field>
          <Field label="Email" htmlFor="pd-email" error={errors.email?.message}>
            <Input
              id="pd-email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
          </Field>
          <Field label="Phone" htmlFor="pd-phone" error={errors.phone?.message}>
            <Input
              id="pd-phone"
              type="tel"
              autoComplete="tel"
              placeholder="+233 …"
              aria-invalid={!!errors.phone}
              {...register("phone")}
            />
          </Field>
          <Field label="Preferred date" htmlFor="pd-date" error={errors.date?.message}>
            <Input id="pd-date" type="date" aria-invalid={!!errors.date} {...register("date")} />
          </Field>
          <Field label="Guest count" htmlFor="pd-guests" error={errors.guests?.message}>
            <Input
              id="pd-guests"
              type="number"
              min={4}
              max={200}
              aria-invalid={!!errors.guests}
              {...register("guests", { valueAsNumber: true })}
            />
          </Field>
        </div>

        <div className="mt-7">
          <p className="font-ui text-muted-foreground mb-3 text-[0.65rem] font-semibold tracking-[0.18em] uppercase">
            Budget guidance
          </p>
          <div className="flex flex-wrap gap-2">
            {BUDGETS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setValue("budget", option.id)}
                aria-pressed={budget === option.id}
                className={
                  budget === option.id
                    ? "font-ui border-accent bg-accent text-accent-foreground rounded-full border px-4 py-2 text-xs"
                    : "font-ui border-border text-muted-foreground hover:border-accent/50 rounded-full border px-4 py-2 text-xs transition-colors"
                }
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <Field
          label="Tell us more"
          htmlFor="pd-message"
          error={errors.message?.message}
          hint="Timing, dietary needs, AV requirements, anything that helps us quote accurately."
          className="mt-7"
        >
          <Textarea id="pd-message" rows={5} aria-invalid={!!errors.message} {...register("message")} />
        </Field>
      </fieldset>

      <Button type="submit" variant="ember" size="xl" uppercase loading={isSubmitting} className="w-full sm:w-auto">
        Send enquiry
        <ArrowRight className="size-4" aria-hidden />
      </Button>
    </form>
  );
}
