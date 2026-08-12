import { z } from "zod";

import { RESERVATION_SETTINGS } from "@/constants/site";

/**
 * One schema per form, shared by the client (React Hook Form) and the server
 * action. Validation therefore cannot drift between the two.
 */

/**
 * Bots fill hidden fields; humans never see them. Kept transform-free so the
 * schema's input and output types match, which lets React Hook Form share it.
 */
const honeypot = z.string().max(0, "Unexpected value").optional();

const name = z
  .string()
  .trim()
  .min(2, "Please tell us your name")
  .max(80, "That name is a little too long")
  // Blocks angle brackets and braces outright rather than trying to sanitise.
  .regex(/^[^<>{}]+$/, "Please use letters only");

const email = z.string().trim().toLowerCase().pipe(z.email("Enter a valid email address"));

const phone = z
  .string()
  .trim()
  .min(7, "Enter a contact number")
  .max(24, "That number looks too long")
  .regex(/^[+0-9\s()-]+$/, "Digits, spaces and + only");

const message = (min: number, max: number, label = "message") =>
  z
    .string()
    .trim()
    .min(min, `Please add a few more details to your ${label}`)
    .max(max, `Please keep your ${label} under ${max} characters`);

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date")
  .refine((value) => {
    const picked = new Date(`${value}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return picked >= today;
  }, "Please choose a date from today onwards")
  .refine((value) => {
    const picked = new Date(`${value}T00:00:00`);
    const limit = new Date();
    limit.setDate(limit.getDate() + RESERVATION_SETTINGS.advanceDays);
    return picked <= limit;
  }, `We take bookings up to ${RESERVATION_SETTINGS.advanceDays} days ahead`);

const time = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Choose a time");

/* -------------------------------------------------------------------------- */
/*                                 Reservation                                */
/* -------------------------------------------------------------------------- */

export const reservationSchema = z.object({
  firstName: name,
  lastName: name,
  email,
  phone,
  guests: z
    .number()
    .int()
    .min(1, "At least one guest")
    .max(
      RESERVATION_SETTINGS.maxPartySize,
      `For ${RESERVATION_SETTINGS.maxPartySize}+ guests, please contact our events team`,
    ),
  date: isoDate,
  time,
  occasion: z.enum([
    "none",
    "birthday",
    "anniversary",
    "business",
    "wedding",
    "date-night",
    "celebration",
  ]),
  seating: z.enum(["indoor", "terrace", "chefs-counter", "private-room"]),
  requests: message(0, 600, "note").or(z.literal("")).optional(),
  dietary: z.array(z.string().max(40)).max(8).optional(),
  marketingOptIn: z.boolean().optional(),
  agreeToPolicy: z.literal(true, { error: "Please accept the cancellation policy" }),
  botField: honeypot,
});

export type ReservationInput = z.input<typeof reservationSchema>;
export type ReservationValues = z.output<typeof reservationSchema>;

/* -------------------------------------------------------------------------- */
/*                                   Contact                                  */
/* -------------------------------------------------------------------------- */

export const contactSchema = z.object({
  name,
  email,
  phone: phone.or(z.literal("")).optional(),
  topic: z.enum(["general", "reservations", "events", "feedback", "press", "careers"]),
  message: message(10, 1500),
  botField: honeypot,
});

export type ContactValues = z.output<typeof contactSchema>;

/* -------------------------------------------------------------------------- */
/*                               Private dining                               */
/* -------------------------------------------------------------------------- */

export const privateDiningSchema = z.object({
  name,
  company: z.string().trim().max(80).optional().or(z.literal("")),
  email,
  phone,
  eventType: z.enum(["corporate", "wedding", "birthday", "family", "launch", "other"]),
  space: z.enum(["the-cellar", "chefs-counter", "garden-terrace", "the-library", "undecided"]),
  date: isoDate,
  guests: z.number().int().min(4, "Private dining starts at four guests").max(200),
  budget: z.enum(["under-10k", "10k-25k", "25k-50k", "50k-plus", "unsure"]),
  message: message(10, 1500, "brief"),
  botField: honeypot,
});

export type PrivateDiningValues = z.output<typeof privateDiningSchema>;

/* -------------------------------------------------------------------------- */
/*                                  Newsletter                                */
/* -------------------------------------------------------------------------- */

export const newsletterSchema = z.object({
  email,
  consent: z.boolean().optional(),
  botField: honeypot,
});

export type NewsletterValues = z.output<typeof newsletterSchema>;

/* -------------------------------------------------------------------------- */
/*                                   Careers                                  */
/* -------------------------------------------------------------------------- */

export const careersSchema = z.object({
  name,
  email,
  phone,
  role: z.string().trim().min(2, "Which role are you after?").max(80),
  experience: z.enum(["0-1", "2-4", "5-9", "10-plus"]),
  portfolio: z.string().trim().url("Enter a valid link").or(z.literal("")).optional(),
  message: message(20, 2000, "introduction"),
  botField: honeypot,
});

export type CareersValues = z.output<typeof careersSchema>;

/* -------------------------------------------------------------------------- */
/*                                 Gift cards                                 */
/* -------------------------------------------------------------------------- */

export const giftCardSchema = z.object({
  amount: z.number().int().min(100, "Minimum ₵100").max(20000, "Maximum ₵20,000"),
  format: z.enum(["email", "printed"]),
  recipientName: name,
  recipientEmail: email,
  senderName: name,
  senderEmail: email,
  deliveryDate: isoDate.or(z.literal("")).optional(),
  note: message(0, 400, "note").or(z.literal("")).optional(),
  botField: honeypot,
});

export type GiftCardValues = z.output<typeof giftCardSchema>;

/* -------------------------------------------------------------------------- */
/*                                  Checkout                                  */
/* -------------------------------------------------------------------------- */

export const checkoutSchema = z
  .object({
    name,
    email,
    phone,
    method: z.enum(["delivery", "pickup"]),
    address: z.string().trim().max(200).optional().or(z.literal("")),
    area: z.string().trim().max(80).optional().or(z.literal("")),
    directions: z.string().trim().max(300).optional().or(z.literal("")),
    slot: z.enum(["asap", "schedule"]),
    scheduledTime: time.or(z.literal("")).optional(),
    payment: z.enum(["momo", "card", "cash", "transfer"]),
    coupon: z.string().trim().max(24).optional().or(z.literal("")),
    notes: message(0, 400, "note").or(z.literal("")).optional(),
    cutlery: z.boolean().optional(),
    agreeToTerms: z.literal(true, { error: "Please accept the order terms" }),
    botField: honeypot,
  })
  .refine((data) => data.method !== "delivery" || (data.address?.trim().length ?? 0) >= 6, {
    message: "We need a delivery address",
    path: ["address"],
  })
  .refine((data) => data.method !== "delivery" || (data.area?.trim().length ?? 0) >= 2, {
    message: "Choose your neighbourhood",
    path: ["area"],
  })
  .refine((data) => data.slot !== "schedule" || !!data.scheduledTime, {
    message: "Pick a time",
    path: ["scheduledTime"],
  });

export type CheckoutValues = z.output<typeof checkoutSchema>;

/* -------------------------------------------------------------------------- */
/*                              Event reservation                             */
/* -------------------------------------------------------------------------- */

export const eventBookingSchema = z.object({
  eventId: z.string().min(1),
  name,
  email,
  phone,
  seats: z.number().int().min(1).max(12),
  botField: honeypot,
});

export type EventBookingValues = z.output<typeof eventBookingSchema>;

/** Flattens a ZodError into the shape our `ActionState` expects. */
export function toFieldErrors(error: z.ZodError): Record<string, string[]> {
  const flattened: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    flattened[key] = [...(flattened[key] ?? []), issue.message];
  }
  return flattened;
}
