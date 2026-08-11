import Link from "next/link";

import { FaqList } from "@/components/faq/faq-list";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { CallToAction } from "@/components/sections/cta";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CONTACT } from "@/constants/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQ",
  description:
    "Answers about reservations, dress code, dietary needs, delivery, private dining and gift cards at DZIFOODS — quickly, honestly, without the small print.",
  path: "/faq",
  keywords: ["DZIFOODS FAQ", "restaurant cancellation policy Accra", "delivery area Accra"],
});

const QUICK_LINKS = [
  { label: "Book a table", href: "/reservations", description: "Tables open 90 days ahead" },
  { label: "Order online", href: "/order", description: "Delivery across central Accra" },
  { label: "Private dining", href: "/private-dining", description: "Four rooms, doors closed" },
  { label: "Contact us", href: "/contact", description: "We reply within one working day" },
] as const;

export default function FaqPage() {
  return (
    <>
      <JsonLd
        id="schema-faq"
        data={[
          faqSchema(),
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "FAQ", href: "/faq" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="FAQ"
        title="Answers, quickly."
        description="Everything we get asked before a first visit — reservations, dress code, dietary needs, delivery, private dining and gift cards. If it's not here, call us."
        image="/images/bar-counter.webp"
        imageAlt="The DZIFOODS bar at night"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "FAQ", href: "/faq" },
        ]}
        meta={[
          { label: "Questions", value: "15" },
          { label: "Topics", value: "5" },
          { label: "Still stuck?", value: "Call us" },
        ]}
      />

      <section className="section">
        <div className="container-luxe grid gap-14 lg:grid-cols-[16rem_1fr] lg:gap-20">
          <Reveal>
            <nav aria-label="Quick links">
              <p className="font-ui text-gold text-[0.62rem] font-semibold tracking-[0.22em] uppercase">
                Quick links
              </p>
              <ul className="mt-5 space-y-3">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group border-border hover:border-accent/40 block rounded-2xl border px-4 py-3 transition-colors"
                    >
                      <span className="font-ui group-hover:text-accent text-sm font-medium transition-colors">
                        {link.label}
                      </span>
                      <span className="text-muted-foreground mt-0.5 block text-xs">{link.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          <Reveal delay={0.08}>
            <FaqList />
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-luxe">
          <Card variant="glass" radius="xl" className="flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <h2 className="font-display text-2xl leading-tight md:text-3xl">
                Didn't find what you needed?
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                Call {CONTACT.phone} between 09:00 and 22:00, or send a message — we reply within one
                working day.
              </p>
            </div>
            <Button asChild variant="ember" size="lg" uppercase>
              <Link href="/contact">Contact us</Link>
            </Button>
          </Card>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
