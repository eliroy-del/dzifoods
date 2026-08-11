import { MessageCircle, Phone } from "lucide-react";

import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { ReservationForm } from "@/components/reservation/reservation-form";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FAQS } from "@/constants/gallery";
import { CONTACT, SITE } from "@/constants/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Reservations",
  description:
    "Book a table at DZIFOODS in Airport Residential, Accra. Choose your room, hour and occasion — confirmation in seconds, free cancellation up to 24 hours before.",
  path: "/reservations",
  image: "/images/interior-dining.webp",
  keywords: ["book a table Accra", "restaurant reservation Accra", "fine dining booking Ghana"],
});

const RESERVATION_FAQS = FAQS.filter((faq) => faq.topic === "Reservations");

interface ReservationsPageProps {
  searchParams: Promise<{
    date?: string;
    time?: string;
    guests?: string;
    seating?: string;
    occasion?: string;
  }>;
}

export default async function ReservationsPage({ searchParams }: ReservationsPageProps) {
  const params = await searchParams;

  return (
    <>
      <JsonLd
        id="schema-reservations"
        data={[
          faqSchema(RESERVATION_FAQS),
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Reservations", href: "/reservations" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Reservations"
        title="Choose your evening. We'll take it from there."
        description="Ninety-four covers, four rooms and one kitchen. Tell us when you'd like to arrive and how you'd like to sit — the rest is our job."
        image="/images/interior-dining.webp"
        imageAlt="The DZIFOODS dining room at dusk, velvet banquettes under brass pendants"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Reservations", href: "/reservations" },
        ]}
        meta={[
          { label: "Guest rating", value: `${SITE.rating.value} / 5` },
          { label: "Booked ahead", value: "Up to 90 days" },
          { label: "Confirmation", value: "Immediate" },
        ]}
      />

      <section className="section">
        <div className="container-luxe">
          <ReservationForm defaults={params} />
        </div>
      </section>

      {/* --------------------------- Reassurance --------------------------- */}
      <section className="bg-surface/50 border-border/60 border-t py-16 md:py-24">
        <div className="container-luxe grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <h2 className="text-3xl leading-tight font-medium md:text-4xl">
              Anything you'd rather ask a human.
            </h2>
            <p className="text-muted-foreground mt-5 text-base leading-relaxed">
              Our reservations team answers the phone between 09:00 and 22:00, every day. For large
              parties, dietary complexity or anything time-sensitive, calling is genuinely faster.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="forest" size="lg" uppercase>
                <a href={CONTACT.phoneHref}>
                  <Phone className="size-4" aria-hidden />
                  {CONTACT.phone}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" uppercase>
                <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4" aria-hidden />
                  WhatsApp
                </a>
              </Button>
            </div>
          </Reveal>

          <div className="space-y-4">
            {RESERVATION_FAQS.map((faq, index) => (
              <Reveal key={faq.id} delay={index * 0.06}>
                <Card variant="outline" radius="xl" className="p-6">
                  <h3 className="font-display text-lg leading-tight">{faq.question}</h3>
                  <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed">{faq.answer}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
