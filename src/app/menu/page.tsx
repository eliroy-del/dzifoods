import { ShoppingBag, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

import { PageHero } from "@/components/layout/page-hero";
import { MenuExplorer } from "@/components/menu/menu-explorer";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { CallToAction } from "@/components/sections/cta";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DISHES, MENU_GROUPS, isMenuCategoryId } from "@/constants/menu";
import { SITE } from "@/constants/site";
import { breadcrumbSchema, menuSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Menus",
  description:
    "Weekday plates, weekend soups and pre-order specials at DZIFOODS — banku, fufu, kenkey, akple and more. Filter by diet, heat and price.",
  path: "/menu",
  image: "/images/dish-jollof.webp",
  keywords: [
    "DZIFOODS menu Accra",
    "Ghanaian restaurant menu",
    "banku and tilapia Accra",
    "fufu Accra",
    "weekend soup Accra",
  ],
});

const CREDENTIALS = [
  { label: "Dishes on the menu", value: `${DISHES.length}` },
  { label: "Menus", value: "3" },
  { label: "Guest rating", value: `${SITE.rating.value} / 5` },
];

interface MenuPageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const params = await searchParams;
  const category = isMenuCategoryId(params.category) ? params.category : "all";

  return (
    <>
      <JsonLd
        id="schema-menu"
        data={[
          menuSchema(),
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Menus", href: "/menu" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="The menus"
        title="Weekdays, weekends, and dishes cooked to order."
        description="Banku, fufu, kenkey, akple and more — plates the kitchen cooks every day, plus weekend soups and pre-order specials."
        image="/images/dish-jollof.webp"
        imageAlt="A plated Ghanaian rice dish at DZIFOODS"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Menus", href: "/menu" },
        ]}
        meta={CREDENTIALS}
        actions={
          <>
            <Button asChild variant="ember" size="lg" uppercase>
              <Link href="/reservations">
                <UtensilsCrossed className="size-4" aria-hidden />
                Reserve a table
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg" uppercase>
              <Link href="/order">
                <ShoppingBag className="size-4" aria-hidden />
                Order online
              </Link>
            </Button>
          </>
        }
      />

      {/* -------------------------- Menu philosophy -------------------------- */}
      <section className="border-border/60 border-b py-14 md:py-20">
        <div className="container-luxe grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          {MENU_GROUPS.map((group, index) => (
            <Reveal key={group.id} delay={index * 0.06}>
              <Card variant="plain" className="h-full">
                <p className="font-ui text-gold text-[0.62rem] font-semibold tracking-[0.22em] uppercase">
                  0{index + 1}
                </p>
                <h2 className="font-display mt-3 text-2xl leading-tight">{group.name}</h2>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {group.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="py-14 md:py-20">
        <MenuExplorer initialCategory={category} initialQuery={params.q ?? ""} />
      </div>

      <section className="border-border/60 border-t py-14 md:py-20">
        <div className="container-luxe grid gap-8 md:grid-cols-3">
          <Reveal>
            <h2 className="font-display text-2xl leading-tight">Allergies and preferences</h2>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              Tell us at booking and the kitchen will write around it. We handle gluten, dairy, nut
              and shellfish exclusions daily, and we cook a full vegan tasting menu on request.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-2xl leading-tight">Prices and charges</h2>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              All prices are in Ghana cedis and include VAT. A 5% service charge is added to dining
              bills and shared in full across the team. Currency display is for guidance only.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <h2 className="font-display text-2xl leading-tight">Where it comes from</h2>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              Seafood lands at Tema each morning. Produce comes from eleven farms within 90km.
              Cocoa, coffee and chilli are Ghanaian, always — we name the growers on the wine list.
            </p>
          </Reveal>
        </div>
      </section>

      <CallToAction
        eyebrow="Ready when you are"
        title="Read it here. Taste it tonight."
        description="Tables open sixty days ahead and the counter seats eight. Both go quickly on weekends."
      />
    </>
  );
}
