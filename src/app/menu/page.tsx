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
    "Explore every DZIFOODS menu — live-fire grill, dry-aged steak, Tema seafood, West African classics, pastry and a 420-label cellar. Filter by diet, heat and price.",
  path: "/menu",
  image: "/images/dish-steak.webp",
  keywords: [
    "Accra fine dining menu",
    "Afro-fusion restaurant menu",
    "dry-aged steak Accra",
    "jollof fine dining",
    "vegan menu Accra",
  ],
});

const CREDENTIALS = [
  { label: "Dishes on the menu", value: `${DISHES.length}` },
  { label: "Wine labels", value: "420" },
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
        title="Everything here has a reason to be here."
        description="Nothing arrives on this list without earning it. Menus shift with the market and the season, so what you read today is what the kitchen believes in today."
        image="/images/dish-steak.webp"
        imageAlt="A dry-aged tomahawk steak resting under herb butter beside charred rosemary"
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
