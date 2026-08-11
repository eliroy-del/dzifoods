import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import Link from "next/link";

import { GoogleMap } from "@/components/contact/google-map";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SOCIALS, CONTACT } from "@/constants/site";
import { getGroupedHours } from "@/lib/hours";
import { resolveBrandIcon } from "@/components/ui/brand-icons";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Find DZIFOODS at 12 Senchi Link, Airport Residential, Accra. Call, WhatsApp, email, directions and valet parking — open seven days.",
  path: "/contact",
  image: "/images/interior-dining.webp",
  keywords: ["DZIFOODS address", "restaurant Airport Residential", "directions DZIFOODS Accra"],
});

interface ContactPageProps {
  searchParams: Promise<{ topic?: string }>;
}

const TOPIC_MAP: Record<string, "general" | "reservations" | "events" | "feedback" | "press" | "careers"> = {
  general: "general",
  reservations: "reservations",
  events: "events",
  feedback: "feedback",
  press: "press",
  careers: "careers",
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const defaultTopic = params.topic && TOPIC_MAP[params.topic] ? TOPIC_MAP[params.topic] : "general";
  const hours = getGroupedHours();

  return (
    <>
      <JsonLd
        id="schema-contact"
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ])}
      />

      <PageHero
        eyebrow="Contact"
        title="Find us. Call us. Write to us."
        description="Two minutes from Kotoka International Airport. Look for the brass door beneath the palms on Senchi Link."
        image="/images/interior-dining.webp"
        imageAlt="The entrance to DZIFOODS on Senchi Link"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
        meta={[
          { label: "Phone", value: CONTACT.phone },
          { label: "Valet", value: "From 18:00" },
          { label: "Parking", value: "40 bays" },
        ]}
        actions={
          <>
            <Button asChild variant="ember" size="lg" uppercase>
              <a href={CONTACT.phoneHref}>
                <Phone className="size-4" aria-hidden />
                Call now
              </a>
            </Button>
            <Button asChild variant="glass" size="lg" uppercase>
              <a
                href={`${CONTACT.whatsappHref}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4" aria-hidden />
                WhatsApp
              </a>
            </Button>
          </>
        }
      />

      <section className="section">
        <div className="container-luxe grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <GoogleMap />
            <Card variant="outline" radius="xl" className="mt-6 p-6">
              <h2 className="font-display text-xl">Getting here</h2>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{CONTACT.directions}</p>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{CONTACT.parking}</p>
              <Button asChild variant="outline" size="md" className="mt-5">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CONTACT.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Navigation className="size-4" aria-hidden />
                  Open directions
                </a>
              </Button>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl leading-tight">Send a message</h2>
            <p className="text-muted-foreground mt-3 text-sm">
              We reply within one working day. For reservations tonight, call is faster.
            </p>
            <div className="mt-8">
              <ContactForm defaultTopic={defaultTopic} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface/50 border-border/60 border-t py-16 md:py-24">
        <div className="container-luxe grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ContactCard icon={<MapPin className="size-5" aria-hidden />} title="Address">
            <address className="text-muted-foreground not-italic">
              {CONTACT.address.street}
              <br />
              {CONTACT.address.district}
              <br />
              {CONTACT.address.city}, {CONTACT.address.country}
            </address>
          </ContactCard>

          <ContactCard icon={<Phone className="size-5" aria-hidden />} title="Phone">
            <a href={CONTACT.phoneHref} className="text-accent link-underline">
              {CONTACT.phone}
            </a>
            <p className="text-muted-foreground mt-2 text-xs">Reservations & general · 09:00 – 22:00</p>
          </ContactCard>

          <ContactCard icon={<Mail className="size-5" aria-hidden />} title="Email">
            <ul className="text-muted-foreground space-y-1 text-sm">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="link-underline hover:text-accent">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.reservationsEmail}`} className="link-underline hover:text-accent">
                  {CONTACT.reservationsEmail}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.eventsEmail}`} className="link-underline hover:text-accent">
                  {CONTACT.eventsEmail}
                </a>
              </li>
            </ul>
          </ContactCard>

          <ContactCard icon={<Clock className="size-5" aria-hidden />} title="Hours">
            <ul className="text-muted-foreground space-y-2 text-sm">
              {hours.map((group) => (
                <li key={group.label}>
                  <span className="text-foreground font-medium">{group.label}</span>
                  <br />
                  {group.hours}
                </li>
              ))}
            </ul>
          </ContactCard>
        </div>

        <div className="container-luxe mt-10 flex flex-wrap items-center gap-3">
          {SOCIALS.map((social) => {
            const Icon = resolveBrandIcon(social.icon);
            return (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} — ${social.handle}`}
                className="border-border hover:border-accent/50 hover:text-accent grid size-11 place-items-center rounded-full border transition-colors"
              >
                <Icon className="size-4" aria-hidden />
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}

function ContactCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <Card variant="solid" radius="xl" className="h-full p-6">
        <span className="text-accent">{icon}</span>
        <h3 className="font-display mt-4 text-lg">{title}</h3>
        <div className="mt-3 text-sm">{children}</div>
      </Card>
    </Reveal>
  );
}
