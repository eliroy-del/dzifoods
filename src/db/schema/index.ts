/**
 * Drizzle schema for Phase 1.
 *
 * Phase 3+ (commented so FKs have a home when they land):
 *   orders, order_items, payments, refunds, discounts
 *   customers, loyalty_accounts, gift_cards (+ transactions)
 *   enquiries, job_applications, newsletter_subscribers
 *   areas, tables, terminals, shifts, cash_sessions, cash_movements
 *   ingredients, recipes, stock_movements, suppliers, purchase_orders
 *
 * Reservations / event_bookings are omitted until those public features return.
 */
export * from "./catalogue";
export * from "./cms";
export * from "./staff";
export * from "./tenant";
