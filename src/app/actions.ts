"use server";

import { getClientKey, rateLimit } from "@/lib/rate-limit";
import { createReference } from "@/lib/utils";
import {
  careersSchema,
  checkoutSchema,
  contactSchema,
  eventBookingSchema,
  giftCardSchema,
  newsletterSchema,
  privateDiningSchema,
  reservationSchema,
  toFieldErrors,
} from "@/lib/validators";
import type { ActionState } from "@/types";

/**
 * Server actions for every form on the site.
 *
 * Each one follows the same contract:
 *   1. rate limit by client IP
 *   2. re-validate the payload with the shared Zod schema (never trust the client)
 *   3. reject honeypot hits silently-but-successfully so bots learn nothing
 *   4. hand off to the integration layer
 *
 * `deliver()` is the single seam to replace with a real integration — Resend for
 * email, a POS/booking provider such as OpenTable or SevenRooms, a CRM webhook,
 * or a CMS mutation. Nothing above it needs to change.
 */
async function deliver(channel: string, payload: Record<string, unknown>): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    console.info(`[dzifoods:${channel}]`, payload);
  }
  // Integration point, e.g.:
  //   await resend.emails.send({ to: CONTACT.reservationsEmail, ... })
  //   await fetch(process.env.BOOKINGS_WEBHOOK_URL!, { method: "POST", body: ... })
}

const TOO_FAST: ActionState = {
  status: "error",
  message: "That was quick — please wait a moment before trying again.",
};

const GENERIC_ERROR: ActionState = {
  status: "error",
  message: "Something went wrong on our side. Please call us on +233 30 274 8000.",
};

/** Bots get a plausible success response so they stop probing. */
const SILENT_SUCCESS: ActionState = { status: "success", message: "Thank you." };

type Guarded = (input: unknown) => Promise<ActionState>;

function guard(
  scope: string,
  limit: number,
  handler: (input: unknown) => Promise<ActionState>,
): Guarded {
  return async (input: unknown) => {
    try {
      const key = await getClientKey(scope);
      const { success } = rateLimit(key, limit, 60);
      if (!success) return TOO_FAST;
      return await handler(input);
    } catch (error) {
      console.error(`[dzifoods:${scope}] failed`, error);
      return GENERIC_ERROR;
    }
  };
}

function isHoneypotHit(input: unknown): boolean {
  return (
    typeof input === "object" &&
    input !== null &&
    "botField" in input &&
    typeof (input as { botField?: unknown }).botField === "string" &&
    (input as { botField: string }).botField.length > 0
  );
}

/* -------------------------------------------------------------------------- */

export const submitReservation = guard("reservation", 6, async (input) => {
  if (isHoneypotHit(input)) return SILENT_SUCCESS;

  const parsed = reservationSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  const reference = createReference("DZI");
  await deliver("reservation", { ...parsed.data, reference });

  return {
    status: "success",
    reference,
    message: `Table confirmed. Your reference is ${reference}.`,
    data: { reference },
  };
});

export const submitContact = guard("contact", 5, async (input) => {
  if (isHoneypotHit(input)) return SILENT_SUCCESS;

  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  await deliver("contact", parsed.data);
  return { status: "success", message: "Message received — we reply within one working day." };
});

export const submitPrivateDining = guard("private-dining", 5, async (input) => {
  if (isHoneypotHit(input)) return SILENT_SUCCESS;

  const parsed = privateDiningSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  const reference = createReference("DZI-PD");
  await deliver("private-dining", { ...parsed.data, reference });

  return {
    status: "success",
    reference,
    message: "Enquiry received. Our events coordinator replies within one working day.",
    data: { reference },
  };
});

export const subscribeToNewsletter = guard("newsletter", 4, async (input) => {
  if (isHoneypotHit(input)) return SILENT_SUCCESS;

  const parsed = newsletterSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please enter a valid email address.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  await deliver("newsletter", parsed.data);
  return { status: "success", message: "You're on the list. The next letter goes out on Sunday." };
});

export const submitApplication = guard("careers", 4, async (input) => {
  if (isHoneypotHit(input)) return SILENT_SUCCESS;

  const parsed = careersSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  await deliver("careers", parsed.data);
  return { status: "success", message: "Application received. Our head of people will be in touch." };
});

export const purchaseGiftCard = guard("gift-card", 5, async (input) => {
  if (isHoneypotHit(input)) return SILENT_SUCCESS;

  const parsed = giftCardSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  const reference = createReference("DZI-GC");
  await deliver("gift-card", { ...parsed.data, reference });

  return {
    status: "success",
    reference,
    message: `Gift card ${reference} is on its way.`,
    data: { reference },
  };
});

export const placeOrder = guard("checkout", 6, async (input) => {
  if (isHoneypotHit(input)) return SILENT_SUCCESS;

  const parsed = checkoutSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  const reference = createReference("DZI-OR");
  const eta = parsed.data.method === "delivery" ? "35 – 50 min" : "18 – 25 min";
  await deliver("order", { ...parsed.data, reference });

  return {
    status: "success",
    reference,
    message: `Order ${reference} confirmed.`,
    data: { reference, eta },
  };
});

export const reserveEventSeats = guard("event", 6, async (input) => {
  if (isHoneypotHit(input)) return SILENT_SUCCESS;

  const parsed = eventBookingSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  const reference = createReference("DZI-EV");
  await deliver("event", { ...parsed.data, reference });

  return {
    status: "success",
    reference,
    message: `Seats held under ${reference}. Check your inbox to confirm.`,
    data: { reference },
  };
});
