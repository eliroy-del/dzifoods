import { Bike, Clock, Percent, ShieldCheck, ShoppingBag, Store, Thermometer } from "lucide-react";
import Link from "next/link";

import { PageHero } from "@/components/layout/page-hero";
import { DishCard } from "@/components/menu/dish-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section";
import { DELIVERY_AREAS } from "@/constants/content";
import { FEATURED_DISHES, POPULAR_DISHES } from "@/constants/menu";
import { COUPONS, ORDER_SETTINGS } from "@/constants/site";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Order Online",
  description:
    "Order DZIFOODS across Accra — insulated, tracked delivery in 35–50 minutes, or collect in under 25. Free delivery over ₵450.",
  path: "/order",
  image: "/images/dish-jollof.webp",
  keywords: ["food delivery Accra", "order jollof Accra", "restaurant delivery Airport Residential"],
});

const PROMISES = [
  {
    icon: Thermometer,
    title: "It arrives as it left",
    description:
      "Vacuum-sealed sauces, vented boxes for anything crisp, and insulated bags that hold 65°C for an hour.",
  },
  {
    icon: Clock,
    title: "Cooked to your slot",
    description:
      "Schedule an order and the ticket drops onto the rail at exactly the right minute — not before.",
  },
  {
    icon: Bike,
    title: "Our riders, not an app",
    description:
      "Every rider is on our payroll and trained on the menu. You can call the one carrying your order.",
  },
  {
    icon: ShieldCheck,
    title: "Something wrong? It's on us",
    description:
      "Tell us within an hour and we remake it or refund it. No forms, no photographs, no argument.",
  },
];

export default function OrderPage() {
  const bestSellers = POPULAR_DISHES.filter((dish) => dish.badges.includes("best-seller")).slice(0, 6);

  return (
    <>
      <JsonLd
        id="schema-order"
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Order online", href: "/order" },
        ])}
      />

      <PageHero
        eyebrow="Order online"
        title="The same kitchen. Your table."
        description="Everything you order is cooked on the same line, by the same brigade, at the same standard as the dining room. We simply put it in a better box."
        image="/images/dish-jollof.webp"
        imageAlt="Smoked party jollof crowned with caramelised plantain and shito"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Order online", href: "/order" },
        ]}
        meta={[
          { label: "Delivery", value: ORDER_SETTINGS.deliveryEstimate },
          { label: "Collection", value: ORDER_SETTINGS.pickupEstimate },
          { label: "Free delivery over", value: `₵${ORDER_SETTINGS.freeDeliveryThreshold}` },
        ]}
        actions={
          <>
            <Button asChild variant="ember" size="lg" uppercase>
              <Link href="/menu">
                <ShoppingBag className="size-4" aria-hidden />
                Start an order
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg" uppercase>
              <Link href="/order/checkout">Go to checkout</Link>
            </Button>
          </>
        }
      />

      {/* -------------------------- Delivery / pickup ------------------------- */}
      <section className="section">
        <div className="container-luxe grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card variant="solid" radius="xl" hover="lift" className="h-full p-8 md:p-10">
              <span className="bg-accent/12 text-accent grid size-12 place-items-center rounded-full">
                <Bike className="size-5" aria-hidden />
              </span>
              <h2 className="font-display mt-6 text-3xl">Delivery</h2>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                {ORDER_SETTINGS.deliveryRadius}, ridden by our own team. Free above{" "}
                ₵{ORDER_SETTINGS.freeDeliveryThreshold}, otherwise a flat ₵{ORDER_SETTINGS.deliveryFee}.
              </p>
              <dl className="border-border mt-7 divide-y border-t">
                {DELIVERY_AREAS.slice(0, 6).map((area) => (
                  <div key={area.name} className="flex items-center justify-between py-2.5 text-sm">
                    <dt className="text-muted-foreground">{area.name}</dt>
                    <dd className="font-ui text-xs tracking-[0.06em]">{area.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-muted-foreground mt-4 text-xs">
                Plus {DELIVERY_AREAS.length - 6} further zones, selectable at checkout.
              </p>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Card variant="solid" radius="xl" hover="lift" className="h-full p-8 md:p-10">
              <span className="bg-forest/12 text-forest-soft grid size-12 place-items-center rounded-full">
                <Store className="size-5" aria-hidden />
              </span>
              <h2 className="font-display mt-6 text-3xl">Collection</h2>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                Ready in {ORDER_SETTINGS.pickupEstimate}. Pull into the valet bay at 12 Senchi Link,
                give your reference, and it comes to the car.
              </p>
              <ul className="mt-7 space-y-3 text-sm">
                {[
                  "No collection fee, ever",
                  "Two dedicated collection bays from 6pm",
                  "Bar orders available to take away, sealed",
                  "Cutlery omitted by default to cut waste",
                ].map((item) => (
                  <li key={item} className="text-muted-foreground flex items-start gap-3">
                    <span aria-hidden className="bg-gold mt-2 size-1.5 shrink-0 rotate-45" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" size="md" className="mt-8">
                <Link href="/contact">Find us</Link>
              </Button>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ Promises ----------------------------- */}
      <section className="bg-surface/50 border-border/60 border-y py-16 md:py-24">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="What we promise"
              title="Takeaway, without the compromises takeaway usually asks for."
              align="center"
              ornament
            />
          </Reveal>
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
            {PROMISES.map((promise) => (
              <StaggerItem key={promise.title}>
                <Card variant="outline" radius="xl" hover="glow" className="h-full p-6">
                  <promise.icon className="text-accent size-6" aria-hidden />
                  <h3 className="font-display mt-5 text-xl leading-tight">{promise.title}</h3>
                  <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed">
                    {promise.description}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------------------------- Best sellers --------------------------- */}
      <section className="section">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="Travels well"
              title="What Accra orders most."
              description="These six hold their texture and heat better than anything else we cook — chosen by the kitchen, confirmed by the order book."
              action={
                <Button asChild variant="outline" size="lg" uppercase>
                  <Link href="/menu">Full menu</Link>
                </Button>
              }
            />
          </Reveal>

          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
            {(bestSellers.length > 0 ? bestSellers : FEATURED_DISHES).map((dish) => (
              <StaggerItem key={dish.id}>
                <DishCard dish={dish} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ------------------------------- Coupons ----------------------------- */}
      <section className="pb-20 md:pb-28">
        <div className="container-luxe">
          <Card variant="glass" radius="xl" className="p-8 md:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <Badge variant="ember" size="md">
                  <Percent className="size-3" aria-hidden />
                  Codes that actually work
                </Badge>
                <h2 className="font-display mt-5 text-3xl leading-tight md:text-4xl">
                  Three codes, no small print worth hiding.
                </h2>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  Apply any of these in the basket. They stack with free delivery but not with each
                  other — we'll always keep whichever saves you more.
                </p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-3 lg:w-[26rem]">
                {COUPONS.map((coupon) => (
                  <li
                    key={coupon.code}
                    className="border-border bg-card rounded-2xl border border-dashed p-4 text-center"
                  >
                    <p className="font-ui text-accent text-sm font-semibold tracking-[0.1em]">
                      {coupon.code}
                    </p>
                    <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
                      {coupon.label}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
