import { OPENING_HOURS } from "@/constants/site";

export interface OpeningStatus {
  readonly isOpen: boolean;
  readonly today: (typeof OPENING_HOURS)[number];
  /** e.g. "Open until 23:00" or "Opens Sunday at 10:00" */
  readonly label: string;
  readonly nextChange: string;
}

function toMinutes(time: string): number {
  const [hours = "0", minutes = "0"] = time.split(":");
  return Number(hours) * 60 + Number(minutes);
}

/**
 * Works out whether the dining room is currently open, correctly handling
 * services that run past midnight (Friday closes at 01:00).
 *
 * `now` is injectable so the value can be computed on the client after mount,
 * avoiding a hydration mismatch between server and browser clocks.
 */
export function getOpeningStatus(now: Date = new Date()): OpeningStatus {
  const dayIndex = now.getDay();
  const today = OPENING_HOURS[dayIndex]!;
  const yesterday = OPENING_HOURS[(dayIndex + 6) % 7]!;
  const minutesNow = now.getHours() * 60 + now.getMinutes();

  const opensAt = toMinutes(today.open);
  const rawClose = toMinutes(today.close);
  const closesAt = rawClose <= opensAt ? rawClose + 24 * 60 : rawClose;

  // A service from the previous day may still be running (e.g. Friday 00:30).
  const yesterdayOpens = toMinutes(yesterday.open);
  const yesterdayRawClose = toMinutes(yesterday.close);
  const spillsOver = yesterdayRawClose <= yesterdayOpens;
  const stillOpenFromYesterday = spillsOver && minutesNow < yesterdayRawClose;

  const openNow = stillOpenFromYesterday || (minutesNow >= opensAt && minutesNow < closesAt);

  if (openNow) {
    const closingTime = stillOpenFromYesterday ? yesterday.close : today.close;
    return {
      isOpen: true,
      today,
      label: `Open until ${closingTime}`,
      nextChange: closingTime,
    };
  }

  if (minutesNow < opensAt) {
    return {
      isOpen: false,
      today,
      label: `Opens today at ${today.open}`,
      nextChange: today.open,
    };
  }

  const tomorrow = OPENING_HOURS[(dayIndex + 1) % 7]!;
  return {
    isOpen: false,
    today,
    label: `Opens ${tomorrow.short} at ${tomorrow.open}`,
    nextChange: tomorrow.open,
  };
}

/** `Mon – Thu · 11:30 – 23:00` style summary rows for the footer and contact page. */
export function getGroupedHours() {
  const groups: { days: string[]; open: string; close: string; note: string }[] = [];

  for (const entry of OPENING_HOURS) {
    const last = groups.at(-1);
    if (last && last.open === entry.open && last.close === entry.close) {
      last.days.push(entry.short);
    } else {
      groups.push({ days: [entry.short], open: entry.open, close: entry.close, note: entry.note });
    }
  }

  return groups.map((group) => ({
    label: group.days.length > 1 ? `${group.days[0]} – ${group.days.at(-1)}` : group.days[0]!,
    hours: `${group.open} – ${group.close}`,
    note: group.note,
  }));
}

/** schema.org `openingHoursSpecification` payload. */
export function getSchemaOpeningHours() {
  return OPENING_HOURS.map((entry) => ({
    "@type": "OpeningHoursSpecification" as const,
    dayOfWeek: `https://schema.org/${entry.day}`,
    opens: entry.open,
    closes: entry.close,
  }));
}

/** Reservation slot generator, respecting each day's service window. */
export function getTimeSlots(date: Date, intervalMinutes = 30): string[] {
  const entry = OPENING_HOURS[date.getDay()]!;
  const start = toMinutes(entry.open);
  const rawClose = toMinutes(entry.close);
  const close = rawClose <= start ? rawClose + 24 * 60 : rawClose;
  // The kitchen stops seating 75 minutes before the doors close.
  const lastSeating = close - 75;

  const slots: string[] = [];
  for (let minute = start; minute <= lastSeating; minute += intervalMinutes) {
    const normalised = minute % (24 * 60);
    const hours = `${Math.floor(normalised / 60)}`.padStart(2, "0");
    const mins = `${normalised % 60}`.padStart(2, "0");
    slots.push(`${hours}:${mins}`);
  }
  return slots;
}
