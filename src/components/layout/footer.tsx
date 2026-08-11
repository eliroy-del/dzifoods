import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { resolveBrandIcon } from "@/components/ui/brand-icons";
import { Ornament, Separator } from "@/components/ui/primitives";
import { NEWSLETTER } from "@/constants/content";
import { CONTACT, FOOTER_NAV, SITE, SOCIALS } from "@/constants/site";
import { getGroupedHours } from "@/lib/hours";

export function Footer() {
  const hours = getGroupedHours();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-deep text-cream/75 grain relative overflow-hidden">
      <div
        aria-hidden
        className="bg-accent/12 pointer-events-none absolute -top-40 -right-32 size-96 rounded-full blur-3xl"
      />

      <div className="container-luxe relative z-2 pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <Logo tone="light" showTagline />
            <p className="font-display mt-7 max-w-md text-2xl leading-snug text-white md:text-3xl">
              {NEWSLETTER.heading}
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed">{NEWSLETTER.description}</p>

            <NewsletterForm className="mt-7 max-w-md" />

            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
              {NEWSLETTER.benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <span aria-hidden className="bg-gold/70 size-1 rotate-45" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {FOOTER_NAV.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="font-ui text-gold mb-5 text-[0.62rem] font-semibold tracking-[0.24em] uppercase">
                  {column.title}
                </p>
                <ul className="space-y-3 text-sm">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="link-underline hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <Ornament className="my-14" />

        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-ui text-gold mb-5 text-[0.62rem] font-semibold tracking-[0.24em] uppercase">
              Find us
            </p>
            <address className="space-y-3 text-sm not-italic">
              <p className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span>
                  {CONTACT.address.street}
                  <br />
                  {CONTACT.address.district}
                  <br />
                  {CONTACT.address.city}, {CONTACT.address.country}
                </span>
              </p>
              <p>
                <a
                  href={CONTACT.phoneHref}
                  className="link-underline flex items-center gap-3 hover:text-white"
                >
                  <Phone className="size-4 shrink-0" aria-hidden />
                  {CONTACT.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="link-underline flex items-center gap-3 hover:text-white"
                >
                  <Mail className="size-4 shrink-0" aria-hidden />
                  {CONTACT.email}
                </a>
              </p>
            </address>
          </div>

          <div>
            <p className="font-ui text-gold mb-5 text-[0.62rem] font-semibold tracking-[0.24em] uppercase">
              Kitchen hours
            </p>
            <dl className="space-y-2.5 text-sm">
              {hours.map((entry) => (
                <div key={entry.label} className="flex items-baseline justify-between gap-4">
                  <dt className="text-cream/60">{entry.label}</dt>
                  <dd className="tabular-nums">{entry.hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <p className="font-ui text-gold mb-5 text-[0.62rem] font-semibold tracking-[0.24em] uppercase">
              Follow the fire
            </p>
            <ul className="flex flex-wrap gap-2">
              {SOCIALS.map((social) => {
                const Icon = resolveBrandIcon(social.icon);
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${SITE.name} on ${social.label}`}
                      className="hover:border-gold/60 hover:text-white grid size-11 place-items-center rounded-full border border-white/12 transition-colors"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 text-xs leading-relaxed">
              {CONTACT.parking}
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-ui mt-4 inline-flex items-center gap-1.5 text-xs hover:text-white"
            >
              Get directions
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          </div>
        </div>

        <Separator className="mt-14 mb-6 bg-white/10" />

        <div className="flex flex-col-reverse items-center justify-between gap-5 text-xs md:flex-row">
          <p>
            © {year} {SITE.legalName}. {SITE.meaning}.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy" className="link-underline hover:text-white">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="link-underline hover:text-white">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="link-underline hover:text-white">
                Accessibility
              </Link>
            </li>
            <li>
              <Link href="/faq" className="link-underline hover:text-white">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
