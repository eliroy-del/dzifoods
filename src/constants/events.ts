import type { PrivateSpace, RestaurantEvent } from "@/types";

export const EVENTS: readonly RestaurantEvent[] = [
  {
    id: "burgundy-flight",
    title: "Burgundy, Blind",
    kind: "Wine Tasting",
    date: "2026-08-19",
    time: "19:00 – 21:30",
    price: "₵520 per guest",
    seatsLeft: 6,
    description:
      "Six Côte de Beaune whites poured blind, with Yaw arguing his corner and a cheese board from the Volta hills. Nobody is allowed to look at a label until the fifth glass.",
    image: "/images/event-wine.webp",
    host: "Yaw Ofori, Head Sommelier",
  },
  {
    id: "highlife-thursdays",
    title: "Highlife Thursdays",
    kind: "Live Music",
    date: "2026-08-20",
    time: "20:00 – 23:00",
    price: "No cover charge",
    seatsLeft: 22,
    description:
      "A three-piece highlife band on the terrace, a short bar menu and cocktails until the last song. Walk-ins welcome, but the good seats go early.",
    image: "/images/bar-counter.webp",
    host: "The Senchi Trio",
  },
  {
    id: "seven-fires-table",
    title: "Seven Fires Chef's Table",
    kind: "Chef's Table",
    date: "2026-08-27",
    time: "19:30 – 22:30",
    price: "₵890 per guest",
    seatsLeft: 2,
    description:
      "Eight stools, seven courses, one hardwood grill. Chef Kwame cooks and explains each course himself. This is the hardest seat in the house to get.",
    image: "/images/kitchen-pass.webp",
    host: "Chef Kwame Dzidzor",
  },
  {
    id: "bottomless-brunch",
    title: "Bottomless Brunch",
    kind: "Brunch",
    date: "2026-08-29",
    time: "10:00 – 16:00",
    price: "₵390 per guest",
    seatsLeft: 34,
    description:
      "Two courses from the brunch card, ninety minutes of sobolo spritz or champagne, and a saxophonist who takes requests. Every Saturday and Sunday.",
    image: "/images/dish-brunch.webp",
  },
  {
    id: "harvest-menu",
    title: "The Harvest Menu",
    kind: "Holiday Menu",
    date: "2026-09-12",
    time: "From 18:00",
    price: "₵640 per guest",
    seatsLeft: 48,
    description:
      "Five courses built entirely from the September harvest at our nine partner farms. Runs for three weeks only, then it is gone until next year.",
    image: "/images/ingredients.webp",
  },
  {
    id: "cocoa-masterclass",
    title: "Cocoa to Chocolate",
    kind: "Chef's Table",
    date: "2026-09-24",
    time: "16:00 – 18:00",
    price: "₵440 per guest",
    seatsLeft: 10,
    description:
      "Abena walks you from Tafo bean to tempered bar, then you make your own dome and crack it at the table. You leave with a box of your own.",
    image: "/images/dish-dessert.webp",
    host: "Abena Mensah, Head Pastry Chef",
  },
  {
    id: "syrah-night",
    title: "Northern Rhône Night",
    kind: "Wine Tasting",
    date: "2026-10-07",
    time: "19:00 – 21:30",
    price: "₵580 per guest",
    seatsLeft: 14,
    description:
      "Five Syrahs from Côte-Rôtie to Cornas, paired with ember lamb and smoked marrow. Bring an appetite and an open mind about black pepper.",
    image: "/images/event-wine.webp",
    host: "Yaw Ofori, Head Sommelier",
  },
  {
    id: "festive-preview",
    title: "Festive Menu Preview",
    kind: "Holiday Menu",
    date: "2026-10-22",
    time: "19:00 – 22:00",
    price: "₵520 per guest",
    seatsLeft: 26,
    description:
      "First taste of the December menu, three weeks before anybody else. Ember Club members get first refusal on every seat.",
    image: "/images/guests-celebration.webp",
  },
];

export const PRIVATE_SPACES: readonly PrivateSpace[] = [
  {
    id: "the-cellar",
    name: "The Cellar",
    capacity: "10 – 24 seated",
    minimumSpend: "From ₵12,000",
    description:
      "Our private room behind the wine wall, panelled in forest green with a single long walnut table. Doors close, and the evening becomes yours alone.",
    image: "/images/private-dining.webp",
    includes: [
      "Dedicated service team of three",
      "Bespoke menu written with the chef",
      "Sommelier pairing on request",
      "Screen, sound and dimmable lighting",
      "Personalised printed menus",
    ],
    bestFor: ["Business dinners", "Milestone birthdays", "Wine dinners", "Board meetings"],
  },
  {
    id: "chefs-counter",
    name: "The Chef's Counter",
    capacity: "4 – 8 seated",
    minimumSpend: "From ₵7,200",
    description:
      "Eight stools facing the hardwood grill. Courses are handed to you by the person who cooked them, and the conversation runs both ways.",
    image: "/images/kitchen-pass.webp",
    includes: [
      "Seven Fires tasting menu",
      "Chef commentary through every course",
      "Optional sommelier flight",
      "Kitchen tour before service",
    ],
    bestFor: ["Food-led celebrations", "Small corporate groups", "Anniversaries", "Client entertaining"],
  },
  {
    id: "garden-terrace",
    name: "The Garden Terrace",
    capacity: "30 – 120 standing",
    minimumSpend: "From ₵28,000",
    description:
      "Forty covered seats under the palms, opening out to a lantern-lit garden. Our largest space, and the one that photographs best after dark.",
    image: "/images/interior-dining.webp",
    includes: [
      "Exclusive use after 18:00",
      "Live-fire grill station",
      "Dedicated bar and bartender",
      "Sound system and DJ booth",
      "Florals and lighting design",
    ],
    bestFor: ["Weddings", "Launches", "Company parties", "Cocktail receptions"],
  },
  {
    id: "the-library",
    name: "The Library",
    capacity: "6 – 12 seated",
    minimumSpend: "From ₵5,600",
    description:
      "A quiet room of books, brass and one round table. Built for conversations that need no audience and no interruptions.",
    image: "/images/guests-celebration.webp",
    includes: [
      "Round table seating for twelve",
      "Set menu or à la carte",
      "Discreet single-server service",
      "Video conferencing on request",
    ],
    bestFor: ["Board dinners", "Family gatherings", "Intimate proposals", "Private tastings"],
  },
];

export const PRIVATE_DINING_OCCASIONS = [
  {
    id: "corporate",
    title: "Corporate & business",
    description:
      "Timed courses, discreet seating, one clean invoice. We have hosted board dinners that ran to the minute and client evenings that ran until one.",
    icon: "Briefcase",
    capacity: "6 – 60 guests",
  },
  {
    id: "weddings",
    title: "Weddings",
    description:
      "Rehearsal dinners, intimate ceremonies and full receptions for up to a hundred and twenty on the terrace, with florals and lighting handled in-house.",
    icon: "Heart",
    capacity: "20 – 120 guests",
  },
  {
    id: "birthdays",
    title: "Birthdays & milestones",
    description:
      "Candles, a chef's sweet and a room that already knows the guest of honour's name. Cake corkage is always free.",
    icon: "Cake",
    capacity: "8 – 80 guests",
  },
  {
    id: "family",
    title: "Family gatherings",
    description:
      "Long tables, shared platters and a children's tasting menu that is taken as seriously as anybody else's.",
    icon: "Users",
    capacity: "10 – 40 guests",
  },
] as const;

export const PRIVATE_DINING_PROCESS = [
  { step: 1, title: "Tell us the shape of it", description: "Date, headcount, and what the evening is for." },
  { step: 2, title: "We propose a room", description: "Within one working day, with menus and a full cost." },
  { step: 3, title: "Taste and refine", description: "A complimentary menu tasting for parties over thirty." },
  { step: 4, title: "We take it from there", description: "One coordinator, one number, nothing left to you." },
] as const;
