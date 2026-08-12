import { CONTACT, SITE, SOCIALS } from "@/constants/site";
import { DISHES, MENU_CATEGORIES } from "@/constants/menu";
import { EVENTS } from "@/constants/events";
import { FAQS } from "@/constants/gallery";
import { TESTIMONIALS } from "@/constants/people";
import { getSchemaOpeningHours } from "@/lib/hours";
import { absoluteUrl } from "@/lib/seo";
import type { FaqItem } from "@/types";

/**
 * Structured data builders. Rendered via the `<JsonLd />` component so Google
 * can read the restaurant, its menu, events, reviews and FAQs.
 */

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: `${CONTACT.address.street}, ${CONTACT.address.district}`,
  addressLocality: CONTACT.address.city,
  addressRegion: CONTACT.address.region,
  postalCode: CONTACT.address.postalCode,
  addressCountry: CONTACT.address.countryCode,
} as const;

export function restaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": absoluteUrl("/#restaurant"),
    name: SITE.name,
    legalName: SITE.legalName,
    description: SITE.description,
    url: SITE.url,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    image: [absoluteUrl("/images/hero-signature.webp"), absoluteUrl("/images/interior-dining.webp")],
    logo: absoluteUrl("/images/logo.png"),
    priceRange: SITE.priceRange,
    servesCuisine: [...SITE.cuisine],
    currenciesAccepted: "GHS",
    paymentAccepted: "Cash, Credit Card, Mobile Money, Bank Transfer",
    foundingDate: SITE.founded,
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: CONTACT.geo.lat,
      longitude: CONTACT.geo.lng,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.mapQuery)}`,
    openingHoursSpecification: getSchemaOpeningHours(),
    sameAs: SOCIALS.map((social) => social.href),
    acceptsReservations: absoluteUrl("/reservations"),
    hasMenu: absoluteUrl("/menu"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.rating.value,
      reviewCount: SITE.rating.count,
      bestRating: 5,
      worstRating: 1,
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Outdoor seating", value: true },
      { "@type": "LocationFeatureSpecification", name: "Wheelchair accessible", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Valet parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "Live music", value: true },
    ],
    makesOffer: [
      { "@type": "Offer", name: "Table reservations", url: absoluteUrl("/reservations") },
      { "@type": "Offer", name: "Delivery & collection", url: absoluteUrl("/order") },
      { "@type": "Offer", name: "Gift cards", url: absoluteUrl("/gift-cards") },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: SITE.name,
    url: SITE.url,
    inLanguage: "en-GH",
    publisher: { "@id": absoluteUrl("/#restaurant") },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl("/menu")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function menuSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": absoluteUrl("/menu#menu"),
    name: `${SITE.name} Menu`,
    url: absoluteUrl("/menu"),
    inLanguage: "en-GH",
    hasMenuSection: MENU_CATEGORIES.map((category) => ({
      "@type": "MenuSection",
      name: category.name,
      description: category.tagline,
      hasMenuItem: DISHES.filter((dish) => dish.category === category.id).map((dish) => ({
        "@type": "MenuItem",
        name: dish.name,
        description: dish.description,
        image: absoluteUrl(String(dish.image)),
        offers: {
          "@type": "Offer",
          price: dish.price,
          priceCurrency: "GHS",
          availability: "https://schema.org/InStock",
        },
        nutrition: {
          "@type": "NutritionInformation",
          calories: `${dish.calories} calories`,
        },
        suitableForDiet: dish.dietary
          .map((tag) =>
            tag === "vegan"
              ? "https://schema.org/VeganDiet"
              : tag === "vegetarian"
                ? "https://schema.org/VegetarianDiet"
                : tag === "gluten-free"
                  ? "https://schema.org/GlutenFreeDiet"
                  : null,
          )
          .filter(Boolean),
      })),
    })),
  };
}

export function faqSchema(items: readonly FaqItem[] = FAQS) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function reviewsSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": absoluteUrl("/#restaurant"),
    name: SITE.name,
    review: TESTIMONIALS.map((testimonial) => ({
      "@type": "Review",
      author: { "@type": "Person", name: testimonial.name },
      datePublished: testimonial.date,
      reviewBody: testimonial.quote,
      publisher: { "@type": "Organization", name: testimonial.source },
      reviewRating: {
        "@type": "Rating",
        ratingValue: testimonial.rating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
  };
}

export function eventsSchema() {
  return EVENTS.map((event) => ({
    "@context": "https://schema.org",
    "@type": "FoodEvent",
    name: event.title,
    startDate: event.date,
    description: event.description,
    image: absoluteUrl(String(event.image)),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: absoluteUrl("/events"),
    location: {
      "@type": "Place",
      name: SITE.name,
      address: postalAddress,
    },
    organizer: { "@type": "Organization", name: SITE.name, url: SITE.url },
    offers: {
      "@type": "Offer",
      url: absoluteUrl("/events"),
      availability:
        event.seatsLeft > 0 ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
      priceCurrency: "GHS",
    },
  }));
}

export function breadcrumbSchema(trail: readonly { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.href),
    })),
  };
}
