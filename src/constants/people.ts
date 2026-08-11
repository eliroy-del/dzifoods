import type { Chef, Testimonial } from "@/types";

export const CHEFS: readonly Chef[] = [
  {
    id: "kwame-dzidzor",
    name: "Kwame Dzidzor",
    role: "Founder & Executive Chef",
    photo: {
      src: "/images/chef-portrait.webp",
      alt: "Chef Kwame Dzidzor in a charcoal chef jacket, photographed in the DZIFOODS kitchen",
    },
    biography: [
      "Kwame learned to cook at a coalpot in Ho, standing on a crate beside his grandmother Adzo. He learned technique twenty years later in Lyon, under a chef who threw out his first four hundred sauces.",
      "He came home in 2013 with one conviction: that West African cooking did not need translating for anybody. It needed a better kitchen, a longer clock and someone willing to defend it.",
      "He still works the pass six nights a week, still tastes every sauce before it leaves, and still calls his grandmother when a recipe refuses to behave.",
    ],
    philosophy:
      "Fire is not a technique, it is a temperament. Give an ingredient heat, salt and time — then get out of its way.",
    specialties: ["Live-fire cookery", "West African braises", "Dry-ageing", "Fermented pepper"],
    awards: [
      "West Africa Chef of the Year — 2023",
      "Ghana Restaurant of the Year — 2024",
      "Top 50 African Restaurants — 2022, 2023, 2024",
      "Michelin Guide Accra, recommended — 2025",
    ],
    signatureDishId: "miso-black-cod",
    instagram: "https://instagram.com/chefkwamedzidzor",
  },
  {
    id: "abena-mensah",
    name: "Abena Mensah",
    role: "Head Pastry Chef",
    photo: {
      src: "/images/dish-dessert.webp",
      alt: "A cracked-open Tafo chocolate dome with salted caramel flowing out",
    },
    biography: [
      "Abena trained in Paris and spent four years working exclusively with Ghanaian cocoa before joining the brigade in 2019.",
      "Her Tafo chocolate dome has been on the menu ever since, and she has refused every request to change it.",
    ],
    philosophy: "Dessert should not apologise for itself. Make it the reason someone stays another half hour.",
    specialties: ["Single-origin chocolate", "Palm caramel", "Sorbet", "Viennoiserie"],
    awards: ["Pastry Chef of the Year, Ghana — 2024"],
    signatureDishId: "chocolate-dome",
  },
  {
    id: "yaw-ofori",
    name: "Yaw Ofori",
    role: "Head Sommelier",
    photo: {
      src: "/images/event-wine.webp",
      alt: "A sommelier pouring red wine from a decanter into a row of glasses",
    },
    biography: [
      "Yaw built our cellar from eleven bottles to four hundred and twenty, and can tell you which farm each of them came from.",
      "He runs the Wednesday flights personally, and has never once recommended the second-cheapest bottle.",
    ],
    philosophy: "A pairing should make you notice the food, not the wine. If you compliment me, I have missed.",
    specialties: ["Burgundy", "Old-world Syrah", "South African Chenin", "Zero-proof pairing"],
    awards: ["Wine Spectator Award of Excellence — 2022, 2023, 2024"],
    signatureDishId: "chablis-fourchaume",
  },
];

export const EXECUTIVE_CHEF = CHEFS[0];

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: "t-1",
    name: "Naa Adjeley Tetteh",
    role: "Regular since 2016",
    quote:
      "I have taken every person who matters to me to this room. My mother, my husband, my business partners, my daughter on her sixteenth birthday. It has never once let me down.",
    rating: 5,
    initials: "NT",
    verified: true,
    source: "Google",
    date: "2026-06-14",
  },
  {
    id: "t-2",
    name: "Daniel Osei-Bonsu",
    role: "Managing Director, Accra",
    quote:
      "I host clients here because nothing needs managing. The timing is exact, the room is discreet, and the food does the persuading for me. We have closed three deals at table nine.",
    rating: 5,
    initials: "DO",
    verified: true,
    source: "OpenTable",
    date: "2026-05-29",
  },
  {
    id: "t-3",
    name: "Sophie Laurent",
    role: "Travel writer, Paris",
    quote:
      "I ate the Seven Fires menu and then rebooked for the following night. The jollof alone would justify the flight. I have not stopped thinking about the smoke.",
    rating: 5,
    initials: "SL",
    verified: true,
    source: "TripAdvisor",
    date: "2026-04-02",
  },
  {
    id: "t-4",
    name: "Kojo Amankwah",
    role: "Anniversary dinner",
    quote:
      "They remembered we had come for our tenth anniversary, and they remembered what my wife drank the last time. Small things. They are the whole thing.",
    rating: 5,
    initials: "KA",
    verified: true,
    source: "Google",
    date: "2026-07-19",
  },
  {
    id: "t-5",
    name: "Ama Sarpong",
    role: "Wedding, 96 guests",
    quote:
      "We hosted ninety-six people on the terrace and I did not lift a finger all evening. Every plate landed hot, at the same moment, and the team treated my aunties like heads of state.",
    rating: 5,
    initials: "AS",
    verified: true,
    source: "In House",
    date: "2026-03-08",
  },
  {
    id: "t-6",
    name: "Michael Adeyemi",
    role: "Lagos, visits monthly",
    quote:
      "I have eaten in a lot of expensive rooms. Very few of them cook with this much conviction. The suya is better than anything in Lagos and I will say it publicly.",
    rating: 5,
    initials: "MA",
    verified: true,
    source: "Google",
    date: "2026-06-30",
  },
  {
    id: "t-7",
    name: "Elizabeth Quartey",
    role: "Sunday brunch regular",
    quote:
      "The waakye benedict should be illegal. I bring a different friend every month purely to watch their face when it arrives.",
    rating: 5,
    initials: "EQ",
    verified: true,
    source: "TripAdvisor",
    date: "2026-02-16",
  },
  {
    id: "t-8",
    name: "Thomas Reinhardt",
    role: "Berlin",
    quote:
      "The sommelier talked me out of the bottle I wanted and into one half the price that was twice as good. That is confidence you cannot fake.",
    rating: 5,
    initials: "TR",
    verified: true,
    source: "OpenTable",
    date: "2026-05-11",
  },
];

export const PRESS_QUOTES = [
  { source: "Condé Nast Traveller", quote: "The most exciting table in West Africa." },
  { source: "Financial Times", quote: "Fire-cooked, fiercely local, quietly world-class." },
  { source: "Michelin Guide", quote: "A kitchen with an unmistakable point of view." },
  { source: "Wine Spectator", quote: "A cellar that punches far above its city." },
  { source: "Time Out", quote: "Book the counter. Thank us later." },
] as const;
