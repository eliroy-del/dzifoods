import type { FaqItem, GalleryCategory, GalleryItem } from "@/types";

export const GALLERY_CATEGORIES: readonly ("All" | GalleryCategory)[] = [
  "All",
  "Food",
  "Restaurant",
  "Kitchen",
  "Events",
  "People",
];

export const GALLERY_ITEMS: readonly GalleryItem[] = [
  {
    id: "g-01",
    photo: { src: "/images/hero-signature.webp", alt: "Miso-glazed black cod with micro herbs and edible flowers on a dark plate" },
    category: "Food",
    caption: "Miso-glazed black cod, three days in the making",
    orientation: "landscape",
  },
  {
    id: "g-02",
    photo: { src: "/images/dish-steak.webp", alt: "Sliced 45-day dry-aged tomahawk steak with herb butter on a slate board" },
    category: "Food",
    caption: "45-day tomahawk, carved at the table",
    orientation: "landscape",
  },
  {
    id: "g-03",
    photo: { src: "/images/interior-dining.webp", alt: "The DZIFOODS dining room at night with brass pendants and velvet banquettes" },
    category: "Restaurant",
    caption: "The main dining room, Thursday at 20:47",
    orientation: "landscape",
  },
  {
    id: "g-04",
    photo: { src: "/images/chef-portrait.webp", alt: "Chef Kwame Dzidzor photographed in the kitchen" },
    category: "People",
    caption: "Chef Kwame Dzidzor, founder",
    orientation: "portrait",
  },
  {
    id: "g-05",
    photo: { src: "/images/dish-jollof.webp", alt: "Smoked party jollof rice tower with plantain beside a charcoal-grilled tilapia" },
    category: "Food",
    caption: "Party jollof and charcoal tilapia",
    orientation: "landscape",
  },
  {
    id: "g-06",
    photo: { src: "/images/kitchen-pass.webp", alt: "A chef plating with tweezers under a brass heat lamp while flames rise behind" },
    category: "Kitchen",
    caption: "The pass, mid-service",
    orientation: "landscape",
  },
  {
    id: "g-07",
    photo: { src: "/images/dish-cocktail.webp", alt: "A smoked amber cocktail in a crystal coupe with a torched cinnamon stick" },
    category: "Food",
    caption: "Smoked akpeteshie old fashioned",
    orientation: "portrait",
  },
  {
    id: "g-08",
    photo: { src: "/images/private-dining.webp", alt: "The Cellar private dining room set for twelve with candles and a wine wall" },
    category: "Restaurant",
    caption: "The Cellar, set for twelve",
    orientation: "landscape",
  },
  {
    id: "g-09",
    photo: { src: "/images/guests-celebration.webp", alt: "Friends raising champagne glasses in a toast at a candlelit table" },
    category: "People",
    caption: "A Saturday worth staying for",
    orientation: "landscape",
  },
  {
    id: "g-10",
    photo: { src: "/images/dish-lobster.webp", alt: "Grilled lobster tails, scallops and prawns on a dark platter" },
    category: "Food",
    caption: "Fire shellfish platter",
    orientation: "landscape",
  },
  {
    id: "g-11",
    photo: { src: "/images/event-wine.webp", alt: "A sommelier pouring wine into a row of six glasses at a tasting" },
    category: "Events",
    caption: "Wednesday flights with Yaw",
    orientation: "landscape",
  },
  {
    id: "g-12",
    photo: { src: "/images/dish-dessert.webp", alt: "A cracked chocolate dome with salted caramel flowing out and gold leaf on top" },
    category: "Food",
    caption: "Tafo chocolate dome",
    orientation: "landscape",
  },
  {
    id: "g-13",
    photo: { src: "/images/ingredients.webp", alt: "Overhead flat lay of herbs, peppers, citrus, plantain and fresh fish on stone" },
    category: "Kitchen",
    caption: "This morning's market run",
    orientation: "landscape",
  },
  {
    id: "g-14",
    photo: { src: "/images/dish-suya.webp", alt: "Beef suya skewers on a cast-iron plate with flames rising behind" },
    category: "Food",
    caption: "Suya, straight off the coals",
    orientation: "landscape",
  },
  {
    id: "g-15",
    photo: { src: "/images/bar-counter.webp", alt: "The marble cocktail bar at night with backlit spirits and a bartender shaking" },
    category: "Restaurant",
    caption: "The bar, last orders",
    orientation: "landscape",
  },
  {
    id: "g-16",
    photo: { src: "/images/dish-pizza.webp", alt: "Wood-fired margherita pizza with charred crust in front of a glowing oven" },
    category: "Food",
    caption: "72-hour sourdough, 90 seconds in the oven",
    orientation: "landscape",
  },
  {
    id: "g-17",
    photo: { src: "/images/dish-brunch.webp", alt: "A brunch plate of eggs, bacon, avocado toast and coffee in morning light" },
    category: "Food",
    caption: "Weekend brunch on the terrace",
    orientation: "landscape",
  },
  {
    id: "g-18",
    photo: { src: "/images/dish-pasta.webp", alt: "Truffle tagliatelle twirled in a dark bowl with shaved black truffle" },
    category: "Food",
    caption: "Truffle tagliatelle, finished tableside",
    orientation: "landscape",
  },
  {
    id: "g-19",
    photo: { src: "/images/dish-starter.webp", alt: "Torn burrata with heirloom tomatoes, basil and edible flowers" },
    category: "Food",
    caption: "Burrata, scotch bonnet honey",
    orientation: "landscape",
  },
  {
    id: "g-20",
    photo: { src: "/images/gift-card.webp", alt: "A black and gold DZIFOODS gift card on green velvet beside a candle" },
    category: "Events",
    caption: "The easiest gift there is",
    orientation: "landscape",
  },
];

export const FAQS: readonly FaqItem[] = [
  {
    id: "faq-booking-window",
    topic: "Reservations",
    question: "How far in advance should I book?",
    answer:
      "For a weekday table, two to three days is usually enough. Friday and Saturday evenings are typically full ten days out, and the Chef's Counter runs six to fourteen weeks ahead. If your date is tight, call us — we hold a small number of tables back for exactly that reason.",
  },
  {
    id: "faq-cancellation",
    topic: "Reservations",
    question: "What is your cancellation policy?",
    answer:
      "Cancel or amend free of charge up to 24 hours before your reservation, straight from your confirmation email. Inside 24 hours we ask for a courtesy call. Tables of eight or more and all Chef's Counter bookings carry a ₵150 per guest late-cancellation fee, because those seats cannot be resold at short notice.",
  },
  {
    id: "faq-late",
    topic: "Reservations",
    question: "What if we're running late?",
    answer:
      "Let us know and we will hold your table for twenty minutes. Beyond that we may need to reseat you slightly later in the evening, but we will always find you a table — we do not turn tables twice, so there is usually room to move.",
  },
  {
    id: "faq-dress-code",
    topic: "Dining",
    question: "Is there a dress code?",
    answer:
      "Smart casual. No sportswear, beachwear or slides in the evening. Jackets are never required and rarely out of place. Come as the version of yourself you would like to be photographed as.",
  },
  {
    id: "faq-dietary",
    topic: "Dining",
    question: "Can you cater for allergies and dietary needs?",
    answer:
      "Yes, and properly. Tell us when you book and the kitchen will build around it — we run full vegan, vegetarian, gluten-free and dairy-free versions of the tasting menu. Severe allergies are flagged on the ticket and handled on a separate section of the line.",
  },
  {
    id: "faq-children",
    topic: "Dining",
    question: "Are children welcome?",
    answer:
      "Very. We have a genuine three-course children's tasting menu, high chairs, and a kitchen that will happily cook something plain and excellent. After 21:00 the room gets quite grown-up, so earlier sittings tend to suit families better.",
  },
  {
    id: "faq-tasting-menu",
    topic: "Dining",
    question: "Does the whole table have to take the tasting menu?",
    answer:
      "For the Seven Fires menu, yes — it is cooked and paced as one service for the table. Everywhere else in the room you are free to mix à la carte and tasting as you like.",
  },
  {
    id: "faq-delivery-area",
    topic: "Orders & Delivery",
    question: "Where do you deliver?",
    answer:
      "Within a twelve-kilometre radius of Airport Residential, which covers most of central Accra including Cantonments, Labone, Osu, East Legon, Airport City, Ridge and Dzorwulu. Delivery runs from 11:30 until an hour before close.",
  },
  {
    id: "faq-delivery-time",
    topic: "Orders & Delivery",
    question: "How long does delivery take?",
    answer:
      "Thirty-five to fifty minutes door to door, and eighteen to twenty-five if you collect. Steaks and live-fire dishes travel in insulated carriers with a rest built into the timing, so they arrive at the temperature they were meant to be eaten at.",
  },
  {
    id: "faq-payment",
    topic: "Orders & Delivery",
    question: "Which payment methods do you accept?",
    answer:
      "Mobile money (MTN, Telecel, AirtelTigo), all major cards, bank transfer, and cash on delivery. Service is included on every bill and there is no cover charge.",
  },
  {
    id: "faq-events-booking",
    topic: "Events",
    question: "How do I book a private room?",
    answer:
      "Send an enquiry through the contact page with your date and headcount. Our events coordinator replies within one working day with a recommendation, draft menus and a full cost — no obligation, no deposit until you are happy.",
  },
  {
    id: "faq-events-minimum",
    topic: "Events",
    question: "Is there a minimum spend for private hire?",
    answer:
      "It depends on the room and the night: from ₵5,600 for The Library up to ₵28,000 for exclusive use of the Garden Terrace. Minimums are lower Sunday through Wednesday, and we will always tell you the cheapest way to get what you want.",
  },
  {
    id: "faq-corkage",
    topic: "Events",
    question: "Can we bring our own wine or cake?",
    answer:
      "Cake corkage is always free — bring it, we will plate and serve it. Wine corkage is ₵250 a bottle, waived entirely for Ember Club members on any bottle we do not already list.",
  },
  {
    id: "faq-gift-card-validity",
    topic: "Gift Cards",
    question: "How long are gift cards valid?",
    answer:
      "Twenty-four months from purchase, redeemable against anything in the house including private dining and events. They arrive by email within minutes, or as a hand-finished card if you would rather give something physical.",
  },
  {
    id: "faq-gift-card-balance",
    topic: "Gift Cards",
    question: "Can a gift card be used across several visits?",
    answer:
      "Yes. The balance stays on the card until it is spent, and your server can tell you what is left at any time.",
  },
];
