import Link from "next/link";

import { CareersForm } from "@/components/forms/careers-form";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section";
import { CAREERS_BENEFITS, CAREERS_INTRO, JOB_OPENINGS } from "@/constants/careers";
import { CONTACT } from "@/constants/site";
import { resolveIcon } from "@/lib/icons";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Careers",
  description:
    "Join the DZIFOODS brigade — kitchen, bar and floor. Above-market pay, four-day kitchen weeks, real training budget, and a kitchen that does not shout.",
  path: "/careers",
  image: "/images/kitchen-pass.webp",
  keywords: ["restaurant jobs Accra", "chef jobs Ghana", "hospitality careers Accra"],
});

interface CareersPageProps {
  searchParams: Promise<{ role?: string }>;
}

export default async function CareersPage({ searchParams }: CareersPageProps) {
  const params = await searchParams;
  const defaultRole = JOB_OPENINGS.find((job) => job.id === params.role)?.title;

  return (
    <>
      <JsonLd
        id="schema-careers"
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
        ])}
      />

      <PageHero
        eyebrow={CAREERS_INTRO.eyebrow}
        title={CAREERS_INTRO.heading}
        description={CAREERS_INTRO.lead}
        image="/images/kitchen-pass.webp"
        imageAlt="The DZIFOODS kitchen pass during service"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
        ]}
        meta={[
          { label: "Brigade", value: "45 people" },
          { label: "Open roles", value: `${JOB_OPENINGS.length}` },
          { label: "Kitchen weeks", value: "4 days" },
        ]}
      />

      {/* ------------------------------ Benefits ------------------------------ */}
      <section className="section">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="Why work here"
              title="We hire for character and teach the rest."
              align="center"
              ornament
            />
          </Reveal>
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
            {CAREERS_BENEFITS.map((benefit) => {
              const Icon = resolveIcon(benefit.icon);
              return (
                <StaggerItem key={benefit.title}>
                  <Card variant="solid" radius="xl" hover="lift" className="h-full p-6">
                    <Icon className="text-accent size-6" aria-hidden />
                    <h3 className="font-display mt-5 text-xl leading-tight">{benefit.title}</h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ------------------------------ Openings ------------------------------ */}
      <section className="bg-surface/50 border-border/60 border-y py-16 md:py-24">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="Open roles"
              title="Current openings."
              description={`Questions? Email ${CONTACT.careersEmail} — we read every application ourselves.`}
            />
          </Reveal>

          <ul className="mt-14 space-y-4">
            {JOB_OPENINGS.map((job, index) => (
              <Reveal key={job.id} delay={index * 0.05}>
                <li>
                  <Card variant="outline" radius="xl" className="p-6 md:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="forest" size="sm">
                            {job.department}
                          </Badge>
                          <Badge variant="neutral" size="sm">
                            {job.type}
                          </Badge>
                        </div>
                        <h3 className="font-display mt-4 text-2xl leading-tight">{job.title}</h3>
                        <p className="text-muted-foreground mt-2 text-sm">{job.location}</p>
                      </div>
                      <Link
                        href={`/careers?role=${job.id}#apply`}
                        className="font-ui text-accent link-underline text-sm font-medium"
                      >
                        Apply
                      </Link>
                    </div>
                    <p className="text-muted-foreground mt-5 max-w-3xl text-sm leading-relaxed">
                      {job.summary}
                    </p>
                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {job.responsibilities.map((item) => (
                        <li key={item} className="text-muted-foreground flex items-start gap-2 text-xs">
                          <span aria-hidden className="bg-accent mt-1.5 size-1 shrink-0 rotate-45" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------ Application ------------------------------ */}
      <section id="apply" className="scroll-mt-28 pb-24 md:pb-32">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Apply"
              title="Tell us who you are."
              description="No cover letter template required. Tell us what you cook, where you've worked, and why this kitchen."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <CareersForm defaultRole={defaultRole} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
