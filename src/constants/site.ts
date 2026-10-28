import type { Coupon, Currency, Locale, NavItem } from "@/types";

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
  phone: "+233 55 019 8844",
  phoneHref: "tel:+233550198844",
  whatsapp: "+233 55 019 8844",
  whatsappHref: "https://wa.me/233550198844",
  whatsappMessage: "Hello DZIFOODS — I'd like to place an order.",
  email: "hello@dzifoods.com",
  reservationsEmail: "hello@dzifoods.com",
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
  { label: "Instagram", href: "https://instagram.com/dzifoodsgh", icon: "Instagram", handle: "@dzifoodsgh" },
  { label: "Facebook", href: "https://facebook.com/dzifoodsgh", icon: "Facebook", handle: "@dzifoodsgh" },
  { label: "TikTok", href: "https://tiktok.com/@dzifoodsgh", icon: "Music2", handle: "@dzifoodsgh" },
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
          title: "Menus",
          links: [
            { label: "Weekdays", href: "/menu?category=weekdays", description: "Monday to Friday favourites" },
            { label: "Weekend", href: "/menu?category=weekend", description: "Saturday and Sunday soups" },
            { label: "Pre-Order", href: "/menu?category=pre-order", description: "Call ahead for specials" },
            { label: "Full menu", href: "/menu", description: "Everything we cook" },
          ],
        },
      ],
      feature: {
        eyebrow: "Weekend favourite",
        title: "Fufu with Goat Light Soup",
        description: "Pound fufu with fragrant goat light soup — ginger, garlic and garden eggs.",
        image: "/images/dish-suya.webp",
        href: "/menu?category=weekend",
        cta: "See weekend menu",
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
      { label: "Order online", href: "/order" },
      { label: "Events", href: "/events" },
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
