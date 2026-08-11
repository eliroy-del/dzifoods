"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Banknote,
  Bike,
  Building2,
  Clock,
  CreditCard,
  Lock,
  ShoppingBag,
  Smartphone,
  Store,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { placeOrder } from "@/app/actions";
import { FormSuccess } from "@/components/forms/form-success";
import { useCart } from "@/components/providers/cart-provider";
import { usePreferences } from "@/components/providers/preferences-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CheckboxField,
  QuantityStepper,
  RadioCard,
  RadioGroup,
} from "@/components/ui/controls";
import { Field, Honeypot, Input, Select, Textarea } from "@/components/ui/field";
import { ImageFrame } from "@/components/ui/media";
import { Separator } from "@/components/ui/primitives";
import { DELIVERY_AREAS } from "@/constants/content";
import { ORDER_SETTINGS } from "@/constants/site";
import { getTimeSlots } from "@/lib/hours";
import { cn } from "@/lib/utils";
import { checkoutSchema, type CheckoutValues } from "@/lib/validators";

const PAYMENTS = [
  {
    id: "momo",
    label: "Mobile money",
    description: "MTN, Telecel or AirtelTigo — you'll get a prompt on your phone.",
    icon: <Smartphone className="size-4" aria-hidden />,
  },
  {
    id: "card",
    label: "Card",
    description: "Visa or Mastercard, processed on arrival of the confirmation link.",
    icon: <CreditCard className="size-4" aria-hidden />,
  },
  {
    id: "transfer",
    label: "Bank transfer",
    description: "Details are sent with your confirmation email.",
    icon: <Building2 className="size-4" aria-hidden />,
  },
  {
    id: "cash",
    label: "Cash on arrival",
    description: "Pay the rider or at the collection desk.",
    icon: <Banknote className="size-4" aria-hidden />,
  },
] as const;

/**
 * Checkout.
 *
 * Prices are recalculated from the cart provider on every render, never read
 * from the form, so a tampered field cannot change what is charged.
 */
export function CheckoutForm() {
  const cart = useCart();
  const { price } = usePreferences();
  const [confirmation, setConfirmation] = useState<{
    reference: string;
    eta: string;
    total: string;
    method: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      method: cart.fulfilment,
      address: "",
      area: "",
      directions: "",
      slot: "asap",
      scheduledTime: "",
      payment: "momo",
      coupon: "",
      notes: "",
      cutlery: true,
      agreeToTerms: true,
      botField: "",
    },
  });

  const method = watch("method");
  const slot = watch("slot");
  const payment = watch("payment");
  const timeSlots = getTimeSlots(new Date());

  const onSubmit = handleSubmit(async (values) => {
    if (cart.lines.length === 0) {
      toast.error("Your basket is empty");
      return;
    }

    const result = await placeOrder({
      ...values,
      coupon: cart.coupon?.code ?? "",
    });

    if (result.status === "success" && result.reference) {
      setConfirmation({
        reference: result.reference,
        eta: result.data?.eta ?? ORDER_SETTINGS.deliveryEstimate,
        total: price(cart.totals.total),
        method: values.method === "delivery" ? "Delivery" : "Collection",
      });
      cart.clear();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.error("We couldn't place that order", { description: result.message });
    }
  });

  if (confirmation) {
    return (
      <FormSuccess
        eyebrow="Order confirmed"
        title="The kitchen has it. Fire is already lit."
        description="A confirmation is on its way to your inbox with payment details and live tracking. If anything looks wrong, call us and we'll fix it before it leaves the pass."
        reference={confirmation.reference}
        details={[
          { label: confirmation.method, value: confirmation.eta },
          { label: "Total", value: confirmation.total },
          { label: "Kitchen status", value: "Preparing" },
        ]}
        actions={
          <>
            <Button asChild variant="ember" size="lg" uppercase>
              <Link href="/menu">Order something else</Link>
            </Button>
            <Button asChild variant="outline" size="lg" uppercase>
              <Link href="/reservations">Book a table instead</Link>
            </Button>
          </>
        }
      />
    );
  }

  if (cart.lines.length === 0) {
    return (
      <div className="border-border rounded-3xl border border-dashed px-6 py-20 text-center">
        <span className="border-border text-muted-foreground mx-auto grid size-16 place-items-center rounded-full border">
          <ShoppingBag className="size-6" aria-hidden />
        </span>
        <h2 className="font-display mt-6 text-2xl">There's nothing to check out yet</h2>
        <p className="text-muted-foreground mx-auto mt-3 max-w-md text-sm">
          Add a few dishes and we'll hold your place in the queue. Delivery covers{" "}
          {ORDER_SETTINGS.deliveryRadius}.
        </p>
        <Button asChild variant="ember" size="lg" uppercase className="mt-8">
          <Link href="/menu">Browse the menu</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
      <Honeypot />

      <div className="space-y-10">
        {/* ------------------------------ Fulfilment ----------------------------- */}
        <fieldset>
          <Legend step="01" title="How would you like it?" />
          <RadioGroup
            value={method}
            onValueChange={(next) => {
              setValue("method", next as CheckoutValues["method"], { shouldValidate: false });
              cart.setFulfilment(next as CheckoutValues["method"]);
            }}
            className="sm:grid-cols-2"
            aria-label="Delivery or collection"
          >
            <RadioCard
              value="delivery"
              label="Delivery"
              description={`${ORDER_SETTINGS.deliveryRadius}. Free over ${price(ORDER_SETTINGS.freeDeliveryThreshold)}.`}
              meta={ORDER_SETTINGS.deliveryEstimate}
              icon={<Bike className="size-4" aria-hidden />}
            />
            <RadioCard
              value="pickup"
              label="Collection"
              description="Skip the queue at our Senchi Link door — valet will bring it out."
              meta={ORDER_SETTINGS.pickupEstimate}
              icon={<Store className="size-4" aria-hidden />}
            />
          </RadioGroup>
        </fieldset>

        {/* -------------------------------- Details ------------------------------ */}
        <fieldset>
          <Legend step="02" title="Where should it go?" />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" htmlFor="checkout-name" error={errors.name?.message}>
              <Input
                id="checkout-name"
                autoComplete="name"
                aria-invalid={!!errors.name}
                {...register("name")}
              />
            </Field>
            <Field label="Phone" htmlFor="checkout-phone" error={errors.phone?.message}>
              <Input
                id="checkout-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+233 …"
                aria-invalid={!!errors.phone}
                {...register("phone")}
              />
            </Field>
            <Field
              label="Email"
              htmlFor="checkout-email"
              error={errors.email?.message}
              hint="Your receipt and tracking link land here."
              className="sm:col-span-2"
            >
              <Input
                id="checkout-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
            </Field>

            {method === "delivery" ? (
              <>
                <Field
                  label="Street address"
                  htmlFor="checkout-address"
                  error={errors.address?.message}
                  className="sm:col-span-2"
                >
                  <Input
                    id="checkout-address"
                    autoComplete="street-address"
                    placeholder="House number, street, landmark"
                    aria-invalid={!!errors.address}
                    {...register("address")}
                  />
                </Field>
                <Field label="Neighbourhood" htmlFor="checkout-area" error={errors.area?.message}>
                  <Select id="checkout-area" aria-invalid={!!errors.area} {...register("area")}>
                    <option value="">Select an area</option>
                    {DELIVERY_AREAS.map((area) => (
                      <option key={area.name} value={area.name}>
                        {area.name} — {area.time}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field
                  label="Rider notes"
                  htmlFor="checkout-directions"
                  optional
                  error={errors.directions?.message}
                >
                  <Input
                    id="checkout-directions"
                    placeholder="Gate code, floor, who to call"
                    {...register("directions")}
                  />
                </Field>
              </>
            ) : (
              <p className="text-muted-foreground bg-surface/60 border-border sm:col-span-2 rounded-2xl border px-5 py-4 text-sm leading-relaxed">
                Collect from <span className="text-foreground">12 Senchi Link</span>, Airport
                Residential. Pull into the valet bay and tell them your reference — we'll bring it
                out.
              </p>
            )}
          </div>
        </fieldset>

        {/* --------------------------------- Timing ------------------------------ */}
        <fieldset>
          <Legend step="03" title="When?" />
          <RadioGroup
            value={slot}
            onValueChange={(next) => setValue("slot", next as CheckoutValues["slot"])}
            className="sm:grid-cols-2"
            aria-label="Order timing"
          >
            <RadioCard
              value="asap"
              label="As soon as possible"
              description="Straight into the queue at the pass."
              meta={
                method === "delivery" ? ORDER_SETTINGS.deliveryEstimate : ORDER_SETTINGS.pickupEstimate
              }
              icon={<Clock className="size-4" aria-hidden />}
            />
            <RadioCard
              value="schedule"
              label="Schedule it"
              description="Pick a time today and we'll cook to land on it."
              icon={<Clock className="size-4" aria-hidden />}
            />
          </RadioGroup>

          {slot === "schedule" ? (
            <Field
              label="Time"
              htmlFor="checkout-time"
              error={errors.scheduledTime?.message}
              className="mt-5 max-w-xs"
            >
              <Select
                id="checkout-time"
                aria-invalid={!!errors.scheduledTime}
                {...register("scheduledTime")}
              >
                <option value="">Choose a time</option>
                {timeSlots.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </Field>
          ) : null}
        </fieldset>

        {/* -------------------------------- Payment ------------------------------ */}
        <fieldset>
          <Legend step="04" title="How would you like to pay?" />
          <RadioGroup
            value={payment}
            onValueChange={(next) => setValue("payment", next as CheckoutValues["payment"])}
            className="sm:grid-cols-2"
            aria-label="Payment method"
          >
            {PAYMENTS.map((option) => (
              <RadioCard
                key={option.id}
                value={option.id}
                label={option.label}
                description={option.description}
                icon={option.icon}
              />
            ))}
          </RadioGroup>

          <div className="mt-6 space-y-4">
            <Field label="Kitchen notes" htmlFor="checkout-notes" optional error={errors.notes?.message}>
              <Textarea
                id="checkout-notes"
                rows={3}
                placeholder="Allergies, spice level, anything we should know"
                {...register("notes")}
              />
            </Field>

            <CheckboxField
              id="checkout-cutlery"
              label="Include cutlery and napkins"
              description="We skip it by default on collection to cut waste."
              checked={watch("cutlery")}
              onCheckedChange={(checked) => setValue("cutlery", checked === true)}
            />

            <CheckboxField
              id="checkout-terms"
              label="I accept the order terms"
              description="Orders can be amended within five minutes of placing them."
              checked={watch("agreeToTerms")}
              onCheckedChange={(checked) =>
                setValue("agreeToTerms", (checked === true) as true, { shouldValidate: true })
              }
              aria-invalid={!!errors.agreeToTerms}
            />
            {errors.agreeToTerms ? (
              <p role="alert" className="text-destructive text-xs">
                {errors.agreeToTerms.message}
              </p>
            ) : null}
          </div>
        </fieldset>
      </div>

      {/* ------------------------------- Summary ------------------------------- */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <Card variant="solid" radius="xl" className="p-6 md:p-7">
          <h2 className="font-display text-2xl">Order summary</h2>
          <p className="text-muted-foreground mt-1 text-xs">
            {cart.itemCount} {cart.itemCount === 1 ? "item" : "items"} ·{" "}
            {method === "delivery" ? ORDER_SETTINGS.deliveryEstimate : ORDER_SETTINGS.pickupEstimate}
          </p>

          <ul className="divide-border mt-6 divide-y">
            {cart.lines.map((line) => (
              <li key={line.dishId} className="flex gap-3.5 py-4">
                <ImageFrame
                  src={line.dish.image}
                  alt={line.dish.name}
                  ratio="square"
                  sizes="64px"
                  className="size-16 shrink-0 rounded-xl"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-ui truncate text-sm font-medium">{line.dish.name}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">{price(line.dish.price)} each</p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <QuantityStepper
                      size="sm"
                      value={line.quantity}
                      onChange={(next) => cart.setQuantity(line.dishId, next)}
                      label={`quantity of ${line.dish.name}`}
                    />
                    <span className="font-ui text-sm font-semibold tabular-nums">
                      {price(line.lineTotal)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {cart.coupon ? (
            <Badge variant="success" size="md" className="mt-4">
              {cart.coupon.code} · {cart.coupon.label}
            </Badge>
          ) : null}

          <Separator className="my-5" />

          <dl className="space-y-2.5 text-sm">
            <SummaryRow label="Subtotal" value={price(cart.totals.subtotal)} />
            {cart.totals.discount > 0 ? (
              <SummaryRow
                label="Discount"
                value={`− ${price(cart.totals.discount)}`}
                tone="success"
              />
            ) : null}
            {method === "delivery" ? (
              <SummaryRow
                label="Delivery"
                value={cart.totals.deliveryFee === 0 ? "Free" : price(cart.totals.deliveryFee)}
              />
            ) : null}
            <SummaryRow label="Service (5%)" value={price(cart.totals.serviceCharge)} />
            <SummaryRow label="VAT & levies" value={price(cart.totals.vat)} />
          </dl>

          <Separator className="my-5" />

          <div className="flex items-baseline justify-between">
            <span className="font-display text-lg">Total</span>
            <span className="font-display text-3xl font-medium tabular-nums">
              {price(cart.totals.total)}
            </span>
          </div>

          <Button
            type="submit"
            variant="ember"
            size="xl"
            uppercase
            loading={isSubmitting}
            disabled={!cart.meetsMinimum}
            className="mt-6 w-full"
          >
            Place order
            <ArrowRight className="size-4" aria-hidden />
          </Button>

          {!cart.meetsMinimum ? (
            <p className="text-muted-foreground mt-3 text-center text-xs">
              Minimum order is {price(ORDER_SETTINGS.minimumOrder)}.
            </p>
          ) : (
            <p className="text-muted-foreground mt-3 flex items-center justify-center gap-1.5 text-xs">
              <Lock className="size-3" aria-hidden />
              No card details are stored on this site.
            </p>
          )}
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
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "success";
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={cn("tabular-nums", tone === "success" && "text-success")}>{value}</dd>
    </div>
  );
}
