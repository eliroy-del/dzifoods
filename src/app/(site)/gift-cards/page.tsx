import Link from "next/link";

import { GiftCardForm } from "@/components/forms/gift-card-form";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ImageFrame } from "@/components/ui/media";
import { SectionHeading } from "@/components/ui/section";
import { GIFT_CARD_BENEFITS, GIFT_CARD_TIERS } from "@/constants/careers";
import { resolveIcon } from "@/lib/icons";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gift Cards",
  description:
    "Give DZIFOODS — dinner for two, Seven Fires for two, or the whole table. Email in minutes or a hand-finished card by post. Valid 24 months.",
  path: "/gift-cards",
  image: "/images/gift-card.webp",
  keywords: ["restaurant gift card Accra", "DZIFOODS gift voucher", "fine dining gift Ghana"],
});

export default function GiftCardsPage() {
  return (
    <>
      <JsonLd
        id="schema-gift-cards"
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Gift cards", href: "/gift-cards" },
        ])}
      />

      <PageHero
        eyebrow="Gift cards"
        title="The easiest yes there is."
        description="Valid on anything in the house — dining, private rooms, events, wine. Delivered by email in minutes, or as a hand-finished card in a wax-sealed envelope."
        image="/images/gift-card.webp"
        imageAlt="A black and gold DZIFOODS gift card on green velvet beside a candle"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Gift cards", href: "/gift-cards" },
        ]}
        meta={[
          { label: "Validity", value: "24 months" },
          { label: "From", value: "₵250" },
          { label: "Delivery", value: "Instant email" },
        ]}
      />

      <section className="section">
        <div className="container-luxe grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <div className="relative">
              <ImageFrame
                src="/images/gift-card.webp"
                alt="DZIFOODS gift card on velvet"
                ratio="4/3"
                zoom
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <Card variant="glass" radius="xl" className="absolute -bottom-6 -left-4 max-w-xs p-5 md:-left-8">
                <p className="font-display text-lg leading-snug">
                  &ldquo;The most-gifted amount is ₵900 — dinner for two, with room for a bottle.&rdquo;
                </p>
              </Card>
            </div>

            <Stagger className="mt-16 grid gap-4 sm:grid-cols-2" gap={0.08}>
              {GIFT_CARD_BENEFITS.map((benefit) => {
                const Icon = resolveIcon(benefit.icon);
                return (
                  <StaggerItem key={benefit.title}>
                    <Card variant="outline" radius="xl" className="h-full p-5">
                      <Icon className="text-accent size-5" aria-hidden />
                      <h3 className="font-ui mt-3 text-sm font-semibold">{benefit.title}</h3>
                      <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                        {benefit.description}
                      </p>
                    </Card>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading
              eyebrow="Purchase"
              title="Choose, personalise, send."
              description="Balance stays on the card until spent. Redeemable across multiple visits."
            />
            <div className="mt-10">
              <GiftCardForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface/50 border-border/60 border-t py-16 md:py-24">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="Amounts"
              title="Five tiers. One standard of generosity."
              align="center"
              ornament
            />
          </Reveal>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {GIFT_CARD_TIERS.map((tier, index) => (
              <Reveal key={tier.id} delay={index * 0.05}>
                <li className="border-border bg-card rounded-2xl border p-5 text-center">
                  {tier.popular ? (
                    <Badge variant="ember" size="sm" className="mb-3">
                      Most gifted
                    </Badge>
                  ) : (
                    <span className="mb-3 block h-6" aria-hidden />
                  )}
                  <p className="font-display text-2xl">₵{tier.amount.toLocaleString("en-US")}</p>
                  <p className="font-ui mt-2 text-sm font-medium">{tier.label}</p>
                  <p className="text-muted-foreground mt-2 text-xs leading-relaxed">{tier.description}</p>
                </li>
              </Reveal>
            ))}
          </ul>
          <p className="text-muted-foreground mt-10 text-center text-sm">
            Corporate bulk orders?{" "}
            <Link href="/contact?topic=general" className="text-accent link-underline">
              Contact us
            </Link>{" "}
            for invoicing and branded cards.
          </p>
        </div>
      </section>
    </>
  );
}
