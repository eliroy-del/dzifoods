"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { purchaseGiftCard } from "@/app/actions";
import { FormSuccess } from "@/components/forms/form-success";
import { usePreferences } from "@/components/providers/preferences-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioCard, RadioGroup } from "@/components/ui/controls";
import { Field, Honeypot, Input, Textarea } from "@/components/ui/field";
import { GIFT_CARD_TIERS } from "@/constants/careers";
import { giftCardSchema, type GiftCardValues } from "@/lib/validators";
import { cn } from "@/lib/utils";

export function GiftCardForm() {
  const { price } = usePreferences();
  const [confirmation, setConfirmation] = useState<{ reference: string; amount: number } | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<GiftCardValues>({
    resolver: zodResolver(giftCardSchema),
    defaultValues: {
      amount: 900,
      format: "email",
      recipientName: "",
      recipientEmail: "",
      senderName: "",
      senderEmail: "",
      deliveryDate: "",
      note: "",
      botField: "",
    },
  });

  const amount = watch("amount");
  const format = watch("format");

  const onSubmit = handleSubmit(async (values) => {
    const result = await purchaseGiftCard(values);

    if (result.status === "success" && result.reference) {
      setConfirmation({ reference: result.reference, amount: values.amount });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.error("We couldn't process that gift card", { description: result.message });
    }
  });

  if (confirmation) {
    return (
      <FormSuccess
        eyebrow="Gift card sent"
        title="The easiest yes there is — on its way."
        description="The recipient will receive an email with their code and your message. Printed cards are posted within two working days."
        reference={confirmation.reference}
        details={[{ label: "Value", value: price(confirmation.amount) }]}
        actions={
          <>
            <Button asChild variant="ember" size="lg" uppercase>
              <Link href="/gift-cards">Send another</Link>
            </Button>
            <Button asChild variant="outline" size="lg" uppercase>
              <Link href="/menu">Browse the menu</Link>
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
        <legend className="font-display mb-5 text-2xl">Choose an amount</legend>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {GIFT_CARD_TIERS.map((tier) => (
            <button
              key={tier.id}
              type="button"
              onClick={() => setValue("amount", tier.amount, { shouldValidate: true })}
              aria-pressed={amount === tier.amount}
              className={cn(
                "relative rounded-2xl border p-5 text-left transition-all duration-300",
                amount === tier.amount
                  ? "border-accent bg-accent/8 shadow-glow"
                  : "border-border hover:border-accent/40",
              )}
            >
              {tier.popular ? (
                <Badge variant="ember" size="sm" className="absolute top-3 right-3">
                  Most gifted
                </Badge>
              ) : null}
              <p className="font-display text-3xl">{price(tier.amount)}</p>
              <p className="font-ui mt-1 text-sm font-medium">{tier.label}</p>
              <p className="text-muted-foreground mt-2 text-xs leading-relaxed">{tier.description}</p>
            </button>
          ))}
        </div>
        {errors.amount ? (
          <p role="alert" className="text-destructive mt-3 text-xs">
            {errors.amount.message}
          </p>
        ) : null}
      </fieldset>

      <fieldset>
        <legend className="font-display mb-5 text-2xl">Delivery format</legend>
        <RadioGroup
          value={format}
          onValueChange={(next) => setValue("format", next as GiftCardValues["format"])}
          className="sm:grid-cols-2"
          aria-label="Gift card format"
        >
          <RadioCard
            value="email"
            label="Email"
            description="Arrives in minutes with your personal message."
            meta="Instant"
          />
          <RadioCard
            value="printed"
            label="Hand-finished card"
            description="Black and gold, wax-sealed, posted within two days."
            meta="+ ₵40"
          />
        </RadioGroup>
      </fieldset>

      <Card variant="outline" radius="xl" className="space-y-5 p-6 md:p-7">
        <h3 className="font-display text-xl">Recipient</h3>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Their name" htmlFor="gc-recipient" error={errors.recipientName?.message}>
            <Input id="gc-recipient" aria-invalid={!!errors.recipientName} {...register("recipientName")} />
          </Field>
          <Field label="Their email" htmlFor="gc-recipient-email" error={errors.recipientEmail?.message}>
            <Input
              id="gc-recipient-email"
              type="email"
              aria-invalid={!!errors.recipientEmail}
              {...register("recipientEmail")}
            />
          </Field>
        </div>

        <h3 className="font-display pt-2 text-xl">From you</h3>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your name" htmlFor="gc-sender" error={errors.senderName?.message}>
            <Input id="gc-sender" autoComplete="name" aria-invalid={!!errors.senderName} {...register("senderName")} />
          </Field>
          <Field label="Your email" htmlFor="gc-sender-email" error={errors.senderEmail?.message}>
            <Input
              id="gc-sender-email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.senderEmail}
              {...register("senderEmail")}
            />
          </Field>
        </div>

        <Field
          label="Scheduled delivery"
          htmlFor="gc-date"
          optional
          hint="Leave blank to send immediately."
          error={errors.deliveryDate?.message}
        >
          <Input id="gc-date" type="date" {...register("deliveryDate")} />
        </Field>

        <Field label="Personal message" htmlFor="gc-note" optional error={errors.note?.message}>
          <Textarea
            id="gc-note"
            rows={3}
            placeholder="Something short and warm — we'll print it exactly as written."
            {...register("note")}
          />
        </Field>
      </Card>

      <Button type="submit" variant="ember" size="xl" uppercase loading={isSubmitting} className="w-full sm:w-auto">
        Purchase {price(amount)} gift card
        <ArrowRight className="size-4" aria-hidden />
      </Button>
    </form>
  );
}
