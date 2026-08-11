import type { GiftCardTier, JobOpening } from "@/types";

export const CAREERS_INTRO = {
  eyebrow: "Careers",
  heading: "Come cook where the fire never goes out",
  lead:
    "Nineteen in the kitchen, twenty-six on the floor, one standard. We hire for character and teach the rest — and we pay properly for both.",
} as const;

export const CAREERS_BENEFITS = [
  {
    title: "Above-market pay, service shared",
    description: "Transparent bands published internally, and service charge split across the whole team.",
    icon: "Banknote",
  },
  {
    title: "Four-day kitchen weeks",
    description: "Ten-hour days, four days, two consecutive off. Rotas published three weeks ahead.",
    icon: "CalendarDays",
  },
  {
    title: "Real training budget",
    description: "₵8,000 per person a year for stages, WSET, courses — anything that makes you better.",
    icon: "GraduationCap",
  },
  {
    title: "Family meal, twice a shift",
    description: "Cooked by whoever is best at it that day, eaten sitting down, together.",
    icon: "UtensilsCrossed",
  },
  {
    title: "Health cover for you and yours",
    description: "Full private cover extended to a partner and children from day one.",
    icon: "HeartPulse",
  },
  {
    title: "No shouting",
    description: "A hard kitchen, not a cruel one. We fired that culture out in 2016 and never missed it.",
    icon: "ShieldCheck",
  },
] as const;

export const JOB_OPENINGS: readonly JobOpening[] = [
  {
    id: "chef-de-partie-fire",
    title: "Chef de Partie — Fire Section",
    department: "Kitchen",
    type: "Full-time",
    location: "Airport Residential, Accra",
    summary:
      "Own the hardwood grill across dinner service. You will run the busiest section in the building, and the one guests can see.",
    responsibilities: [
      "Run the live-fire section through 90+ covers",
      "Manage charcoal and hardwood burn cycles from prep to close",
      "Hold consistency on our six signature grilled dishes",
      "Train and mentor two commis chefs",
    ],
  },
  {
    id: "pastry-commis",
    title: "Commis Pastry Chef",
    department: "Kitchen",
    type: "Full-time",
    location: "Airport Residential, Accra",
    summary:
      "Work directly under Abena on viennoiserie, sorbet and our single-origin chocolate programme. Formal training welcome but not required.",
    responsibilities: [
      "Morning viennoiserie and bread production",
      "Tempering and moulding Tafo chocolate",
      "Plating desserts through service",
      "Maintaining allergen segregation on the pastry bench",
    ],
  },
  {
    id: "sommelier",
    title: "Sommelier",
    department: "Bar",
    type: "Full-time",
    location: "Airport Residential, Accra",
    summary:
      "Support Yaw across a 420-label cellar, run Wednesday flights, and help us build the best zero-proof pairing list in the region.",
    responsibilities: [
      "Floor service and pairing recommendations",
      "Cellar management, stocktaking and receiving",
      "Hosting tasting events for up to 24 guests",
      "Developing the zero-proof pairing programme",
    ],
  },
  {
    id: "host",
    title: "Host / Reservations",
    department: "Front of House",
    type: "Full-time",
    location: "Airport Residential, Accra",
    summary:
      "The first voice and first face of the house. You will manage the book, the door and the first thirty seconds of every guest's evening.",
    responsibilities: [
      "Managing the reservation book and waitlist",
      "Greeting, seating and coat service",
      "Handling special occasions and guest notes",
      "Coordinating with the pass on table timing",
    ],
  },
  {
    id: "bartender",
    title: "Bartender",
    department: "Bar",
    type: "Part-time",
    location: "Airport Residential, Accra",
    summary:
      "Four nights a week behind the marble. Classic technique, local botanicals, and a licence to argue about ice.",
    responsibilities: [
      "Executing the signature and zero-proof lists",
      "Batching, infusing and fat-washing prep",
      "Terrace service on music nights",
      "Contributing to the seasonal menu change",
    ],
  },
  {
    id: "kitchen-apprentice",
    title: "Kitchen Apprenticeship",
    department: "Kitchen",
    type: "Apprenticeship",
    location: "Airport Residential, Accra",
    summary:
      "An eighteen-month paid apprenticeship for four people a year. No experience required — only appetite. Two of our current section chefs started here.",
    responsibilities: [
      "Rotating through every kitchen section",
      "Structured weekly teaching with the sous chefs",
      "Market runs and supplier visits",
      "A graduation dish served on the menu for one week",
    ],
  },
];

export const GIFT_CARD_TIERS: readonly GiftCardTier[] = [
  {
    id: "gc-250",
    amount: 250,
    label: "Cocktails & small plates",
    description: "Two at the bar, with something from the fire to share.",
  },
  {
    id: "gc-500",
    amount: 500,
    label: "Dinner for one",
    description: "Three courses and a glass chosen by the sommelier.",
  },
  {
    id: "gc-900",
    amount: 900,
    label: "Dinner for two",
    description: "The most-gifted amount, and the reason for a lot of second dates.",
    popular: true,
  },
  {
    id: "gc-1800",
    amount: 1800,
    label: "Seven Fires for two",
    description: "Our tasting menu for two, with room for a bottle.",
  },
  {
    id: "gc-3500",
    amount: 3500,
    label: "The whole table",
    description: "Dinner for a party of six, wine included. Unforgettably generous.",
  },
];

export const GIFT_CARD_BENEFITS = [
  { title: "Delivered in minutes", description: "By email, with a message in your own words.", icon: "MailCheck" },
  { title: "Valid 24 months", description: "Redeemable on anything, including private dining.", icon: "CalendarClock" },
  { title: "Spend across visits", description: "The balance stays until it is spent.", icon: "Wallet" },
  { title: "Hand-finished option", description: "Black and gold, in a wax-sealed envelope.", icon: "Gift" },
] as const;
