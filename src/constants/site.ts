import type { Coupon, Currency, Locale, NavItem, Occasion, SeatingOption } from "@/types";

/**
 * Single source of truth for brand, contact and commercial settings.
 * Swap this file for a CMS "settings" document and the whole site follows.
 */
export const SITE = {
  name: "DZIFOODS",
  legalName: "Dzifoods Hospitality Group Ltd.",
  /** `dzi` — "to eat" in Ewe. The whole brand story hangs off this word. */
  meaning: "Ewe for “to eat”",
  tagline: "Where Every Bite Tells a Story",
  shortDescription:
    "Afro-fusion fine dining in Accra. Fire, terroir and craft — plated by an award-winning kitchen.",
  description:
    "DZIFOODS is an award-winning Afro-fusion restaurant in Airport Residential, Accra. Live-fire cooking, West African terroir and a cellar worth lingering over — served in a candlelit room built for celebration.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dzifoods.com",
  locale: "en_GH",
  founded: "2013",
  cuisine: ["Afro-fusion", "West African", "Contemporary European", "Seafood", "Grill"],
  priceRange: "₵₵₵",
  rating: { value: 4.9, count: 2874 },
  awards: [
    "Ghana Restaurant of the Year — 2024",
    "West Africa Chef of the Year — 2023",
    "Wine Spectator Award of Excellence — 2022, 2023, 2024",
  ],
} as const;

export const CONTACT = {
  phone: "+233 30 274 8000",
  phoneHref: "tel:+233302748000",
  whatsapp: "+233 55 019 8844",
  whatsappHref: "https://wa.me/233550198844",
  whatsappMessage: "Hello DZIFOODS — I'd like to ask about a reservation.",
  email: "hello@dzifoods.com",
  reservationsEmail: "reservations@dzifoods.com",
  eventsEmail: "events@dzifoods.com",
  careersEmail: "careers@dzifoods.com",
  address: {
    street: "12 Senchi Link",
    district: "Airport Residential Area",
    city: "Accra",
    region: "Greater Accra",
    postalCode: "GA-107-4210",
    country: "Ghana",
    countryCode: "GH",
  },
  geo: { lat: 5.6045, lng: -0.1748 },
  mapQuery: "12 Senchi Link, Airport Residential Area, Accra, Ghana",
  directions:
    "Two minutes from Kotoka International Airport, opposite the Senchi Link roundabout. Look for the brass door beneath the palms.",
  parking:
    "Complimentary valet from 6pm, plus 40 secured self-park bays on Senchi Link. Ride-hail pickup is signposted at the north gate.",
} as const;

export const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/dzifoods", icon: "Instagram", handle: "@dzifoods" },
  { label: "Facebook", href: "https://facebook.com/dzifoods", icon: "Facebook", handle: "/dzifoods" },
  { label: "X", href: "https://x.com/dzifoods", icon: "Twitter", handle: "@dzifoods" },
  { label: "YouTube", href: "https://youtube.com/@dzifoods", icon: "Youtube", handle: "@dzifoods" },
  { label: "TikTok", href: "https://tiktok.com/@dzifoods", icon: "Music2", handle: "@dzifoods" },
] as const;

/**
 * Opening hours, indexed the same way as `Date.prototype.getDay()`
 * (0 = Sunday) so the "open now" widget needs no lookup table.
 */
export const OPENING_HOURS = [
  { day: "Sunday", short: "Sun", open: "10:00", close: "22:00", note: "Bottomless brunch until 16:00" },
  { day: "Monday", short: "Mon", open: "11:30", close: "23:00", note: "Kitchen closes 22:15" },
  { day: "Tuesday", short: "Tue", open: "11:30", close: "23:00", note: "Kitchen closes 22:15" },
  { day: "Wednesday", short: "Wed", open: "11:30", close: "23:00", note: "Sommelier flights all evening" },
  { day: "Thursday", short: "Thu", open: "11:30", close: "00:00", note: "Live highlife trio from 20:00" },
  { day: "Friday", short: "Fri", open: "11:30", close: "01:00", note: "Terrace DJ from 21:00" },
  { day: "Saturday", short: "Sat", open: "10:00", close: "01:00", note: "Brunch 10:00 – 16:00" },
] as const;

export const CURRENCIES: readonly Currency[] = [
  { code: "GHS", symbol: "₵", label: "Ghana Cedi", rate: 1 },
  { code: "USD", symbol: "$", label: "US Dollar", rate: 0.065 },
  { code: "GBP", symbol: "£", label: "Pound Sterling", rate: 0.051 },
  { code: "EUR", symbol: "€", label: "Euro", rate: 0.06 },
];

export const DEFAULT_CURRENCY = "GHS" as const;

export const LOCALES: readonly Locale[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "fr", label: "French", nativeLabel: "Français" },
  { code: "tw", label: "Twi", nativeLabel: "Twi" },
];

/** Order economics — surfaced in the cart so nothing is a surprise at checkout. */
export const ORDER_SETTINGS = {
  deliveryFee: 35,
  freeDeliveryThreshold: 450,
  serviceChargeRate: 0.05,
  vatRate: 0.15,
  minimumOrder: 120,
  deliveryEstimate: "35 – 50 min",
  pickupEstimate: "18 – 25 min",
  deliveryRadius: "12km across Accra",
} as const;

export const COUPONS: readonly Coupon[] = [
  { code: "DZIWELCOME", label: "10% off your first order", percentOff: 0.1 },
  { code: "FIRESIDE15", label: "15% off orders over ₵400", percentOff: 0.15, minimumSubtotal: 400 },
  { code: "HARVEST20", label: "20% off the harvest menu", percentOff: 0.2, minimumSubtotal: 650 },
];

export const OCCASIONS: readonly Occasion[] = [
  { id: "none", label: "Just dinner", description: "No occasion — simply a very good table." },
  { id: "birthday", label: "Birthday", description: "We'll finish with a candle and a chef's sweet." },
  { id: "anniversary", label: "Anniversary", description: "Rose petals, a quiet corner, and a toast on us." },
  { id: "business", label: "Business", description: "Discreet seating, timed courses, one clean bill." },
  { id: "wedding", label: "Wedding", description: "Rehearsal dinners and intimate ceremonies." },
  { id: "date-night", label: "Date night", description: "Candlelight, low music, no rush." },
  { id: "celebration", label: "Celebration", description: "Graduations, promotions, good news of any size." },
];

export const SEATING_OPTIONS: readonly SeatingOption[] = [
  {
    id: "indoor",
    label: "Main dining room",
    description: "Velvet banquettes under brass pendants, the heart of the house.",
    capacity: "1 – 8 guests",
  },
  {
    id: "terrace",
    label: "Garden terrace",
    description: "Open-air seating wrapped in palms and warm lanterns.",
    capacity: "1 – 10 guests",
  },
  {
    id: "chefs-counter",
    label: "Chef's counter",
    description: "Eight stools facing the fire, with courses handed to you directly.",
    capacity: "1 – 4 guests",
  },
  {
    id: "private-room",
    label: "The Cellar",
    description: "Our private room behind the wine wall, doors closed.",
    capacity: "10 – 24 guests",
  },
];

export const RESERVATION_SETTINGS = {
  maxPartySize: 12,
  /** Larger tables are routed to the private dining team instead. */
  largePartyThreshold: 12,
  slotIntervalMinutes: 30,
  holdMinutes: 15,
  advanceDays: 90,
} as const;

/* -------------------------------------------------------------------------- */
/*                                 Navigation                                 */
/* -------------------------------------------------------------------------- */

export const NAV_ITEMS: readonly NavItem[] = [
  {
    label: "Menus",
    href: "/menu",
    mega: {
      columns: [
        {
          title: "All day",
          links: [
            { label: "Breakfast", href: "/menu?category=breakfast", description: "From 07:30, daily" },
            { label: "Lunch", href: "/menu?category=lunch", description: "Two courses in under an hour" },
            { label: "Dinner", href: "/menu?category=dinner", description: "The full tasting experience" },
            { label: "Weekend brunch", href: "/events", description: "Bottomless, with a live trio" },
          ],
        },
        {
          title: "From the fire",
          links: [
            { label: "Grill & smoke", href: "/menu?category=grill", description: "Charcoal, wood, patience" },
            { label: "Dry-aged steak", href: "/menu?category=steak", description: "45-day aged, cut to order" },
            { label: "Seafood", href: "/menu?category=seafood", description: "Landed at Tema each morning" },
            { label: "Local classics", href: "/menu?category=local", description: "Our grandmothers' recipes" },
          ],
        },
        {
          title: "The bar",
          links: [
            { label: "Signature cocktails", href: "/menu?category=cocktails", description: "Smoke, bitters, botanicals" },
            { label: "Wine cellar", href: "/menu?category=wine", description: "420 labels, 18 by the glass" },
            { label: "Zero proof", href: "/menu?category=mocktails", description: "Every bit as considered" },
            { label: "Coffee & pastry", href: "/menu?category=coffee", description: "Single-origin, roasted weekly" },
          ],
        },
      ],
      feature: {
        eyebrow: "Chef's table",
        title: "The Seven Fires Tasting",
        description:
          "Seven courses cooked entirely over live flame, paired glass by glass with our sommelier.",
        image: "/images/kitchen-pass.webp",
        href: "/reservations?seating=chefs-counter",
        cta: "Reserve the counter",
      },
    },
  },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_NAV = [
  {
    title: "Dine",
    links: [
      { label: "Menus", href: "/menu" },
      { label: "Reservations", href: "/reservations" },
      { label: "Order online", href: "/order" },
      { label: "Weekend brunch", href: "/events" },
      { label: "Gift cards", href: "/gift-cards" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Our story", href: "/about" },
      { label: "Events", href: "/events" },
      { label: "Gallery", href: "/gallery" },
      { label: "Guest stories", href: "/testimonials" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
] as const;
