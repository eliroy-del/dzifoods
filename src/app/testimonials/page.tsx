import Link from "next/link";

import { PageHero } from "@/components/layout/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { CallToAction } from "@/components/sections/cta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Stars } from "@/components/ui/rating";
import { SectionHeading } from "@/components/ui/section";
import { Marquee } from "@/components/ui/section";
import { PRESS_QUOTES, TESTIMONIALS } from "@/constants/people";
import { SITE } from "@/constants/site";
import { breadcrumbSchema, reviewsSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Guest Stories",
  description:
    `${SITE.rating.value} average from ${SITE.rating.count.toLocaleString("en-US")} verified reviews. Read what guests say about DZIFOODS — unedited, verified, and occasionally more generous than we deserve.`,
  path: "/testimonials",
  image: "/images/guests-celebration.webp",
  keywords: ["DZIFOODS reviews", "restaurant reviews Accra", "fine dining testimonials Ghana"],
});

const SOURCE_COUNTS = [
  { source: "Google", count: 1420 },
  { source: "TripAdvisor", count: 687 },
  { source: "OpenTable", count: 412 },
  { source: "In House", count: 355 },
] as const;

export default function TestimonialsPage() {
  return (
    <>
      <JsonLd
        id="schema-testimonials"
        data={[
          reviewsSchema(),
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Guest stories", href: "/testimonials" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Guest stories"
        title="What people say when we are not in the room."
        description="Unedited, verified, and occasionally more generous than we deserve. Every review below is real — we do not curate the bad ones away, we just cook better."
        image="/images/guests-celebration.webp"
        imageAlt="Friends raising glasses in a toast at a candlelit table"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Guest stories", href: "/testimonials" },
        ]}
        meta={[
          { label: "Average rating", value: `${SITE.rating.value} / 5` },
          { label: "Verified reviews", value: SITE.rating.count.toLocaleString("en-US") },
          { label: "Would recommend", value: "97%" },
        ]}
        actions={
          <Button asChild variant="ember" size="lg" uppercase>
            <Link href="/reservations">Book your table</Link>
          </Button>
        }
      />

      {/* --------------------------- Source breakdown --------------------------- */}
      <section className="border-border/60 border-b py-14 md:py-20">
        <div className="container-luxe">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
            {SOURCE_COUNTS.map((entry) => (
              <StaggerItem key={entry.source}>
                <Card variant="outline" radius="xl" className="p-6 text-center">
                  <p className="font-display text-4xl">{entry.count.toLocaleString("en-US")}</p>
                  <p className="font-ui text-muted-foreground mt-2 text-xs tracking-[0.12em] uppercase">
                    {entry.source}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* --------------------------- Full review grid --------------------------- */}
      <section className="section">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="Every story"
              title="Read them all."
              description="Sorted by date. Click through to leave your own on Google or OpenTable after your visit."
            />
          </Reveal>

          <ul className="mt-14 grid gap-6 md:grid-cols-2">
            {TESTIMONIALS.map((testimonial, index) => (
              <Reveal key={testimonial.id} delay={index * 0.04}>
                <li>
                  <Card variant="solid" radius="xl" hover="lift" className="flex h-full flex-col p-7">
                    <div className="flex items-start justify-between gap-4">
                      <Stars value={testimonial.rating} showValue />
                      <Badge variant="neutral" size="sm">
                        {testimonial.source}
                      </Badge>
                    </div>
                    <blockquote className="font-display mt-5 flex-1 text-lg leading-snug">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <footer className="border-border mt-6 flex items-center gap-3 border-t pt-5">
                      <span
                        aria-hidden
                        className="bg-accent/12 text-accent font-ui grid size-10 place-items-center rounded-full text-sm font-semibold"
                      >
                        {testimonial.initials}
                      </span>
                      <span>
                        <p className="font-ui text-sm font-medium">{testimonial.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {testimonial.role} ·{" "}
                          {formatDate(testimonial.date, { month: "long", year: "numeric" })}
                        </p>
                      </span>
                    </footer>
                  </Card>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------- Press quotes --------------------------- */}
      <section className="bg-forest-deep text-cream grain py-16 md:py-24">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="The press"
              title="What they wrote."
              align="center"
              className="[&_p]:text-cream/65"
            />
          </Reveal>
          <div className="mt-12">
            <Marquee speed={32}>
              {PRESS_QUOTES.map((entry) => (
                <span key={entry.source} className="flex items-center gap-5 px-8">
                  <span className="font-display text-cream/75 text-lg whitespace-nowrap italic">
                    &ldquo;{entry.quote}&rdquo;
                  </span>
                  <span className="font-ui text-gold text-[0.62rem] tracking-[0.22em] whitespace-nowrap uppercase">
                    {entry.source}
                  </span>
                  <span aria-hidden className="bg-accent/60 size-1 rotate-45" />
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

    </>
  );
}
