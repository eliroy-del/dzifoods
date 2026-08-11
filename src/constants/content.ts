import type { Feature, ProcessStep, Stat, TimelineEntry } from "@/types";

/** Amenity and value badges used across the home page and About story. */
export const FEATURES: readonly Feature[] = [
  {
    id: "fresh-ingredients",
    title: "Market-fresh daily",
    description: "Two market runs a day. Nothing sleeps in our walk-in overnight.",
    icon: "Leaf",
  },
  {
    id: "award-chefs",
    title: "Award-winning kitchen",
    description: "A brigade of nineteen, led by West Africa's Chef of the Year.",
    icon: "Award",
  },
  {
    id: "fast-ordering",
    title: "Order in 90 seconds",
    description: "Saved favourites, one-tap reorder, live kitchen tracking.",
    icon: "Zap",
  },
  {
    id: "private-dining",
    title: "Private dining",
    description: "Four rooms, from an eight-seat table to a hundred-guest terrace.",
    icon: "DoorClosed",
  },
  {
    id: "locally-sourced",
    title: "Locally sourced",
    description: "Eighty-four percent of our produce travels less than 200km.",
    icon: "Sprout",
  },
  {
    id: "live-music",
    title: "Live music",
    description: "A highlife trio Thursdays, terrace DJ Fridays and Saturdays.",
    icon: "Music",
  },
  {
    id: "outdoor-seating",
    title: "Garden terrace",
    description: "Forty seats under the palms, heated and covered year round.",
    icon: "TreePalm",
  },
  {
    id: "delivery",
    title: "Delivery across Accra",
    description: "Insulated, tracked, and never more than twelve kilometres.",
    icon: "Bike",
  },
  {
    id: "family",
    title: "Family friendly",
    description: "A children's tasting menu that treats young guests seriously.",
    icon: "Baby",
  },
  {
    id: "wifi",
    title: "Fibre Wi-Fi",
    description: "Fast, free and genuinely usable — the lunch crowd insisted.",
    icon: "Wifi",
  },
  {
    id: "sommelier",
    title: "Cellar of 420",
    description: "A sommelier on the floor every service, and no bad advice.",
    icon: "Wine",
  },
  {
    id: "valet",
    title: "Complimentary valet",
    description: "From 6pm nightly, plus forty secured self-park bays.",
    icon: "CarFront",
  },
];

export const STATS: readonly Stat[] = [
  {
    id: "years",
    value: 12,
    suffix: "",
    label: "Years of service",
    description: "One room on Senchi Link since 2013, never relocated.",
  },
  {
    id: "guests",
    value: 480,
    suffix: "K+",
    label: "Guests welcomed",
    description: "From first dates to fiftieth anniversaries.",
  },
  {
    id: "dishes",
    value: 1240,
    suffix: "+",
    label: "Dishes created",
    description: "Every one tasted by the whole brigade before it reaches you.",
  },
  {
    id: "awards",
    value: 27,
    suffix: "",
    label: "Awards & honours",
    description: "Including Ghana Restaurant of the Year, 2024.",
  },
];

/** Interactive timeline on the About page. */
export const TIMELINE: readonly TimelineEntry[] = [
  {
    year: "2013",
    title: "A twenty-two seat room",
    description:
      "Chef Kwame Dzidzor returns from Lyon with a knife roll, a grandmother's recipe book and a lease on Senchi Link. The first menu ran to nine dishes.",
    image: "/images/kitchen-pass.webp",
  },
  {
    year: "2016",
    title: "The fire is built",
    description:
      "We tear out the gas range and lay a hardwood grill in its place. Service is chaos for a month. Nothing has tasted the same since.",
    image: "/images/dish-suya.webp",
  },
  {
    year: "2018",
    title: "The Cellar opens",
    description:
      "A wine wall of 420 labels and a private room behind it. Our sommelier programme begins with eleven bottles and a great deal of optimism.",
    image: "/images/private-dining.webp",
  },
  {
    year: "2021",
    title: "Farm partnerships",
    description:
      "Direct agreements with nine growers across the Eastern and Volta regions. We now plan menus around what they plant, not the other way round.",
    image: "/images/ingredients.webp",
  },
  {
    year: "2023",
    title: "Chef of the Year",
    description:
      "West Africa Chef of the Year, and a full renovation of the dining room in forest green and brass. Ninety-four covers, and still one kitchen.",
    image: "/images/interior-dining.webp",
  },
  {
    year: "2025",
    title: "Seven Fires",
    description:
      "Our tasting menu goes entirely live-fire — seven courses, no gas, no shortcuts. Booked out fourteen weeks ahead.",
    image: "/images/hero-signature.webp",
  },
];

export const ABOUT_STORY = {
  eyebrow: "Since 2013",
  heading: "Dzi means to eat. Everything else we had to earn.",
  lead:
    "We opened with twenty-two seats, one grill and a conviction that West African cooking belonged in the same conversation as anywhere in the world.",
  body: [
    "Chef Kwame Dzidzor grew up between his grandmother's coalpot in Ho and the pastry sections of Lyon. DZIFOODS is the argument between those two kitchens — palm oil and beurre blanc, dawadawa and dry-aged beef, patience in both languages.",
    "Nothing here is cooked quickly for its own sake. Our jollof takes four hours over wood because that is how long it needs. The cod sits three days in miso. The oxtail, eight. What arrives at your table is time, made edible.",
    "Twelve years on, we still buy from the same nine farms, still taste every dish as a brigade before it reaches a guest, and still believe the best measure of a restaurant is whether you want to stay for one more glass.",
  ],
  mission: {
    title: "Our mission",
    description:
      "To cook West Africa with the precision and generosity it has always deserved — and to send every guest home already planning their return.",
  },
  vision: {
    title: "Our vision",
    description:
      "A dining room where the produce is local, the technique is world-class, and nobody has to choose between the two.",
  },
  philosophy: {
    title: "Our philosophy",
    description:
      "Fire first. Season honestly. Waste nothing. Treat the person carrying the plate as well as the person eating from it.",
  },
} as const;

export const VALUES = [
  {
    id: "fire",
    title: "Cook with fire",
    description: "Wood, charcoal and embers do things gas cannot. We build our menu around that.",
    icon: "Flame",
  },
  {
    id: "terroir",
    title: "Honour the source",
    description: "Nine farms, one fish market, named on the menu. Provenance is not a marketing line.",
    icon: "MapPin",
  },
  {
    id: "craft",
    title: "Earn the detail",
    description: "Stocks from scratch, pasta rolled at dawn, bread proved for three days.",
    icon: "ChefHat",
  },
  {
    id: "hospitality",
    title: "Hospitality is the dish",
    description: "The food is why you came. How you were treated is why you'll return.",
    icon: "HeartHandshake",
  },
] as const;

/** "Why choose DZIFOODS" comparison rows. */
export const COMPARISON = {
  columns: ["DZIFOODS", "Typical fine dining"],
  rows: [
    { label: "Produce", us: "Two market runs daily, nine named farms", them: "Weekly wholesale delivery" },
    { label: "Cooking", us: "Live hardwood fire, no gas on the line", them: "Gas range and convection" },
    { label: "Menu", us: "Rewritten every six weeks with the harvest", them: "Fixed seasonal card" },
    { label: "Wine", us: "420 labels, 18 by the glass, sommelier every service", them: "House red, house white" },
    { label: "Table time", us: "Yours for the evening — we never turn a table twice", them: "Two-hour slots" },
    { label: "Children", us: "A genuine tasting menu for young guests", them: "Chicken and chips" },
    { label: "Delivery", us: "Insulated, tracked, 35–50 minutes across Accra", them: "Third-party aggregator" },
    { label: "Pricing", us: "Service included, no cover charge, no surprises", them: "Cover, service and corkage" },
  ],
} as const;

/** The eight-beat arc of an evening, rendered as an animated timeline. */
export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    step: 1,
    title: "Reservation",
    description: "Choose your room, your hour and your occasion. Confirmation lands in seconds.",
    icon: "CalendarCheck",
    duration: "60 seconds",
  },
  {
    step: 2,
    title: "Arrival",
    description: "Valet takes the car, we take your coat, and your table is already candlelit.",
    icon: "DoorOpen",
    duration: "On arrival",
  },
  {
    step: 3,
    title: "Welcome pour",
    description: "A glass of chilled sobolo or champagne while you settle and read.",
    icon: "GlassWater",
    duration: "First 5 minutes",
  },
  {
    step: 4,
    title: "Your order",
    description: "Your server knows every dish by taste, not by script. Ask them anything.",
    icon: "ClipboardList",
    duration: "No rush",
  },
  {
    step: 5,
    title: "The fire",
    description: "Nineteen cooks, one hardwood grill, and your ticket on the rail.",
    icon: "Flame",
    duration: "18 – 30 min",
  },
  {
    step: 6,
    title: "Dining",
    description: "Courses paced to your conversation, never to our covers.",
    icon: "UtensilsCrossed",
    duration: "The evening",
  },
  {
    step: 7,
    title: "The finish",
    description: "Pastry, chocolate from Tafo, and something small on the house.",
    icon: "IceCream2",
    duration: "Save room",
  },
  {
    step: 8,
    title: "Until next time",
    description: "One bill, service included, and your favourite table remembered.",
    icon: "HeartHandshake",
    duration: "Always",
  },
];

/** Instagram module — swap for the Graph API when credentials are available. */
export const INSTAGRAM_POSTS = [
  { id: "ig-1", image: "/images/dish-steak.webp", caption: "45 days. One cut. Zero compromise.", likes: 4820, comments: 132 },
  { id: "ig-2", image: "/images/dish-jollof.webp", caption: "Four hours over wood. Worth every minute.", likes: 9140, comments: 411 },
  { id: "ig-3", image: "/images/dish-cocktail.webp", caption: "Torched cinnamon. Whole room turns.", likes: 3610, comments: 87 },
  { id: "ig-4", image: "/images/interior-dining.webp", caption: "Thursday, 20:47. Our favourite hour.", likes: 5290, comments: 156 },
  { id: "ig-5", image: "/images/dish-dessert.webp", caption: "Crack it open. Wait for the caramel.", likes: 7480, comments: 298 },
  { id: "ig-6", image: "/images/kitchen-pass.webp", caption: "Service. No music, no talking, all fire.", likes: 6015, comments: 174 },
] as const;

export const LOYALTY = {
  eyebrow: "The Ember Club",
  heading: "The more you dine, the better it gets",
  description:
    "Free to join, impossible to game. Earn an ember with every visit and unlock the parts of DZIFOODS that aren't on the menu.",
  tiers: [
    {
      id: "kindling",
      name: "Kindling",
      requirement: "From your first visit",
      perks: ["Priority waitlist", "Birthday dessert", "Early access to events"],
    },
    {
      id: "ember",
      name: "Ember",
      requirement: "6 visits a year",
      perks: ["Complimentary welcome pour", "Reserved terrace seating", "10% off gift cards"],
      featured: true,
    },
    {
      id: "hearth",
      name: "Hearth",
      requirement: "18 visits a year",
      perks: ["Chef's counter priority", "Two sommelier flights a year", "Your table held until 21:00"],
    },
  ],
} as const;

/**
 * Delivery zones offered at checkout. Times are indicative and shown beside the
 * area name so a guest can pick with their eyes open.
 */
export const DELIVERY_AREAS = [
  { name: "Airport Residential", time: "20 – 30 min" },
  { name: "Cantonments", time: "25 – 35 min" },
  { name: "Labone", time: "25 – 40 min" },
  { name: "East Legon", time: "30 – 45 min" },
  { name: "Osu", time: "30 – 45 min" },
  { name: "Ridge & Roman Ridge", time: "25 – 35 min" },
  { name: "Dzorwulu", time: "25 – 40 min" },
  { name: "Labadi & La", time: "35 – 50 min" },
  { name: "Tesano", time: "40 – 55 min" },
  { name: "Spintex", time: "45 – 60 min" },
] as const;

export const NEWSLETTER = {
  eyebrow: "The Sunday Send",
  heading: "One letter a month. Never a mailing list.",
  description:
    "What the farms are sending us, what the sommelier has been hiding, and first refusal on every chef's table before it goes public.",
  benefits: ["Menu previews", "Event pre-sale", "Cellar releases"],
} as const;
