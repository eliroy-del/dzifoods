import { PageHero } from "@/components/layout/page-hero";
import { EventsCalendar } from "@/components/events/events-calendar";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { CallToAction } from "@/components/sections/cta";
import { SectionHeading } from "@/components/ui/section";
import { CONTACT } from "@/constants/site";
import { breadcrumbSchema, eventsSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Events",
  description:
    "Wine tastings, live highlife, chef's tables and bottomless brunch at DZIFOODS. Book seats online — Ember Club members get first refusal.",
  path: "/events",
  image: "/images/event-wine.webp",
  keywords: ["wine tasting Accra", "brunch Accra", "live music restaurant Accra"],
});

export default function EventsPage() {
  return (
    <>
      <JsonLd
        id="schema-events"
        data={[
          ...eventsSchema(),
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Events", href: "/events" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Events"
        title="Reasons to come back before you've left."
        description="Wine flights poured blind, highlife on the terrace, chef's tables that sell out in minutes and a brunch that runs until four. Every event is cooked in the same kitchen as dinner service."
        image="/images/event-wine.webp"
        imageAlt="A Burgundy wine flight on the bar with candlelight"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Events", href: "/events" },
        ]}
        meta={[
          { label: "This month", value: "8 events" },
          { label: "Brunch", value: "Sat & Sun" },
          { label: "Highlife", value: "Every Thursday" },
        ]}
      />

      <section className="section">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="Calendar"
              title="What's on."
              description="Filter by type, pick your evening, and we'll hold the seats for an hour while you confirm by email."
            />
          </Reveal>
          <div className="mt-10">
            <EventsCalendar />
          </div>
          <p className="text-muted-foreground mt-12 text-center text-sm">
            Ember Club members receive first refusal on every seat. Questions?{" "}
            <a href={`mailto:${CONTACT.eventsEmail}`} className="text-accent link-underline">
              {CONTACT.eventsEmail}
            </a>
          </p>
        </div>
      </section>

      <CallToAction
        eyebrow="Can't make an event?"
        title="The dining room is open every night."
        description="Same kitchen, same cellar, no ticket required. Thursday through Saturday books about ten days ahead."
      />
    </>
  );
}
