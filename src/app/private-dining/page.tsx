import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { PrivateDiningForm } from "@/components/forms/private-dining-form";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { CallToAction } from "@/components/sections/cta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageFrame } from "@/components/ui/media";
import { SectionHeading } from "@/components/ui/section";
import {
  PRIVATE_DINING_OCCASIONS,
  PRIVATE_DINING_PROCESS,
  PRIVATE_SPACES,
} from "@/constants/events";
import { CONTACT } from "@/constants/site";
import { resolveIcon } from "@/lib/icons";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Private Dining",
  description:
    "Four private rooms at DZIFOODS — from an eight-seat chef's counter to a hundred-guest terrace. Bespoke menus, dedicated service, one coordinator.",
  path: "/private-dining",
  image: "/images/private-dining.webp",
  keywords: ["private dining Accra", "corporate dinner Accra", "wedding venue Accra"],
});

interface PrivateDiningPageProps {
  searchParams: Promise<{ space?: string }>;
}

export default async function PrivateDiningPage({ searchParams }: PrivateDiningPageProps) {
  const params = await searchParams;

  return (
    <>
      <JsonLd
        id="schema-private-dining"
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Private dining", href: "/private-dining" },
        ])}
      />

      <PageHero
        eyebrow="Private dining"
        title="Doors closed. The evening is yours."
        description="Four rooms, from eight stools at the fire to a hundred and twenty on the terrace. Every event gets a named coordinator, a menu written for your table, and service that never breaks stride."
        image="/images/private-dining.webp"
        imageAlt="The Cellar private dining room with a long walnut table and wine wall"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Private dining", href: "/private-dining" },
        ]}
        meta={[
          { label: "Largest space", value: "120 guests" },
          { label: "Smallest", value: "4 at the counter" },
          { label: "Response time", value: "1 working day" },
        ]}
        actions={
          <Button asChild variant="ember" size="lg" uppercase>
            <a href="#enquire">
              Start an enquiry
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </Button>
        }
      />

      {/* ------------------------------ Spaces ------------------------------- */}
      <section className="section">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="The rooms"
              title="Four spaces. One standard of care."
              description="Each room has its own character, capacity and minimum spend. All of them share the same kitchen, the same cellar and the same refusal to rush you."
              ornament
              align="center"
            />
          </Reveal>

          <Stagger className="mt-14 grid gap-8 lg:grid-cols-2" gap={0.08}>
            {PRIVATE_SPACES.map((space) => (
              <StaggerItem key={space.id}>
                <Card variant="solid" radius="xl" hover="both" className="overflow-hidden">
                  <ImageFrame
                    src={space.image}
                    alt={space.name}
                    ratio="21/9"
                    rounded={false}
                    zoom
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="p-7 md:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h2 className="font-display text-3xl leading-tight">{space.name}</h2>
                      <Badge variant="gold" size="sm">
                        {space.minimumSpend}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                      {space.description}
                    </p>
                    <p className="font-ui text-muted-foreground mt-4 text-xs tracking-[0.1em] uppercase">
                      {space.capacity}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {space.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm">
                          <Check className="text-accent mt-0.5 size-4 shrink-0" aria-hidden />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {space.bestFor.map((tag) => (
                        <Badge key={tag} variant="neutral" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild variant="outline" size="md" className="mt-7">
                      <Link href={`/private-dining?space=${space.id}#enquire`}>Enquire about this room</Link>
                    </Button>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ----------------------------- Occasions ----------------------------- */}
      <section className="bg-surface/50 border-border/60 border-y py-16 md:py-24">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="What we host"
              title="Every kind of gathering, handled the same way."
              align="center"
              ornament
            />
          </Reveal>
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" gap={0.07}>
            {PRIVATE_DINING_OCCASIONS.map((occasion) => {
              const Icon = resolveIcon(occasion.icon);
              return (
                <StaggerItem key={occasion.id}>
                  <Card variant="outline" radius="xl" hover="lift" className="h-full p-6">
                    <Icon className="text-accent size-6" aria-hidden />
                    <h3 className="font-display mt-5 text-xl leading-tight">{occasion.title}</h3>
                    <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed">
                      {occasion.description}
                    </p>
                    <p className="font-ui text-muted-foreground mt-4 text-xs tracking-[0.08em] uppercase">
                      {occasion.capacity}
                    </p>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ------------------------------ Process ------------------------------ */}
      <section className="section">
        <div className="container-luxe grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="Four steps from enquiry to evening."
              description="Parties over thirty receive a complimentary menu tasting. Everyone gets a single point of contact and a number that actually rings."
            />
          </Reveal>
          <ol className="space-y-6">
            {PRIVATE_DINING_PROCESS.map((step, index) => (
              <Reveal key={step.step} delay={index * 0.08}>
                <li className="border-border flex gap-5 border-b pb-6 last:border-0">
                  <span className="font-ui text-gold text-sm font-semibold tabular-nums">
                    0{step.step}
                  </span>
                  <div>
                    <h3 className="font-display text-xl leading-tight">{step.title}</h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------- Enquiry ------------------------------- */}
      <section id="enquire" className="scroll-mt-28 pb-24 md:pb-32">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Enquire"
              title="Tell us what you're planning."
              description={`Our events coordinator replies within one working day. For anything this week, call ${CONTACT.phone} and ask for events.`}
            />
            <p className="text-muted-foreground mt-6 text-sm">
              Events email:{" "}
              <a href={`mailto:${CONTACT.eventsEmail}`} className="text-accent link-underline">
                {CONTACT.eventsEmail}
              </a>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <PrivateDiningForm defaultSpace={params.space} />
          </Reveal>
        </div>
      </section>

      <CallToAction
        eyebrow="Prefer the main room?"
        title="A table for two is just as considered."
        description="Private dining isn't the only way to eat well here. The main room has ninety-four covers and the same kitchen."
      />
    </>
  );
}
