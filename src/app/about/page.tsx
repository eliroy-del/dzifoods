import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { PageHero } from "@/components/layout/page-hero";
import { CountUp } from "@/components/motion/count-up";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { AboutPreview } from "@/components/sections/about-preview";
import { ChefSection } from "@/components/sections/chef";
import { CallToAction } from "@/components/sections/cta";
import { Process } from "@/components/sections/process";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageFrame } from "@/components/ui/media";
import { Ornament } from "@/components/ui/primitives";
import { SectionHeading } from "@/components/ui/section";
import { ABOUT_STORY, STATS, TIMELINE, VALUES } from "@/constants/content";
import { SITE } from "@/constants/site";
import { resolveIcon } from "@/lib/icons";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Story",
  description:
    "Twelve years of Afro-fusion fine dining in Accra. Chef Kwame Dzidzor, live-fire cooking, West African terroir and a room built for celebration.",
  path: "/about",
  image: "/images/kitchen-pass.webp",
  keywords: ["DZIFOODS story", "Afro-fusion restaurant Accra", "Chef Kwame Dzidzor"],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        id="schema-about"
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Our story", href: "/about" },
        ])}
      />

      <PageHero
        eyebrow="Since 2013"
        title={ABOUT_STORY.heading}
        description={ABOUT_STORY.lead}
        image="/images/kitchen-pass.webp"
        imageAlt="The DZIFOODS kitchen pass during service, tickets on the rail"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Our story", href: "/about" },
        ]}
        size="lg"
        meta={[
          { label: "Founded", value: SITE.founded },
          { label: "Brigade", value: "19 cooks" },
          { label: "Rating", value: `${SITE.rating.value} / 5` },
        ]}
      />

      <section className="section">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="The story" title="One room. One obsession." ornament />
            <div className="text-muted-foreground mt-8 space-y-5 text-base leading-relaxed md:text-lg">
              {ABOUT_STORY.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid gap-4">
              {[ABOUT_STORY.mission, ABOUT_STORY.vision, ABOUT_STORY.philosophy].map((block) => (
                <Card key={block.title} variant="outline" radius="xl" className="p-6">
                  <h3 className="font-display text-xl">{block.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {block.description}
                  </p>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------- Stats ------------------------------- */}
      <section className="bg-forest grain text-cream py-20 md:py-28">
        <div className="container-luxe">
          <Stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4" gap={0.1}>
            {STATS.map((stat) => (
              <StaggerItem key={stat.id} className="text-center">
                <p className="font-display text-5xl leading-none md:text-6xl">
                  <CountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </p>
                <p className="font-ui mt-3 text-sm font-medium tracking-[0.08em] uppercase">
                  {stat.label}
                </p>
                <p className="text-cream/60 mt-2 text-xs">{stat.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ------------------------------ Timeline ----------------------------- */}
      <section className="section">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="Timeline"
              title="Twelve years in twelve moments."
              align="center"
              ornament
            />
          </Reveal>
          <ol className="relative mt-16 space-y-12 before:absolute before:top-0 before:bottom-0 before:left-4 before:w-px before:bg-border md:before:left-1/2">
            {TIMELINE.map((entry, index) => (
              <Reveal key={entry.year} delay={index * 0.05}>
                <li
                  className={
                    index % 2 === 0
                      ? "relative grid gap-8 md:grid-cols-2 md:gap-16"
                      : "relative grid gap-8 md:grid-cols-2 md:gap-16 md:[&>*:first-child]:order-2"
                  }
                >
                  <span
                    aria-hidden
                    className="bg-accent border-background absolute top-6 left-4 z-10 size-3 -translate-x-1/2 rounded-full border-4 md:left-1/2"
                  />
                  <div className={index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}>
                    <p className="font-ui text-gold text-sm font-semibold tracking-[0.14em]">
                      {entry.year}
                    </p>
                    <h3 className="font-display mt-2 text-2xl leading-tight md:text-3xl">
                      {entry.title}
                    </h3>
                    <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                      {entry.description}
                    </p>
                  </div>
                  {entry.image ? (
                    <ImageFrame
                      src={entry.image}
                      alt={entry.title}
                      ratio="4/3"
                      zoom
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  ) : (
                    <span aria-hidden />
                  )}
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------- Values ------------------------------ */}
      <section className="bg-surface/50 border-border/60 border-y py-16 md:py-24">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading eyebrow="What we believe" title="Four rules we never break." align="center" ornament />
          </Reveal>
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
            {VALUES.map((value) => {
              const Icon = resolveIcon(value.icon);
              return (
                <StaggerItem key={value.id}>
                  <Card variant="solid" radius="xl" hover="lift" className="h-full p-6 text-center">
                    <Icon className="text-accent mx-auto size-7" aria-hidden />
                    <h3 className="font-display mt-5 text-xl">{value.title}</h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <AboutPreview className="!pt-0" />
      <ChefSection />
      <Process />

      <section className="pb-8">
        <div className="container-luxe text-center">
          <Ornament className="mb-8" />
          <p className="font-display mx-auto max-w-2xl text-2xl leading-snug md:text-3xl">
            {SITE.awards[0]}
          </p>
          <Button asChild variant="ember" size="lg" uppercase className="mt-8">
            <Link href="/reservations">
              Come see it for yourself
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
