import Link from "next/link";

import { LegalPage, LegalSection } from "@/components/layout/legal-page";
import { JsonLd } from "@/components/seo/json-ld";
import { CONTACT, SITE } from "@/constants/site";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Accessibility",
  description: `${SITE.name} accessibility statement — our commitment to an inclusive dining and digital experience.`,
  path: "/accessibility",
  noIndex: true,
});

export default function AccessibilityPage() {
  return (
    <>
      <JsonLd
        id="schema-accessibility"
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Accessibility", href: "/accessibility" },
        ])}
      />
      <LegalPage
        title="Accessibility"
        eyebrow="Inclusive dining"
        description="Everyone should be able to book a table, read our menu and enjoy the room. Here is what we have done and what we are still working on."
        updated="August 2026"
        path="/accessibility"
      >
        <LegalSection title="Our commitment">
          <p>
            {SITE.name} is committed to WCAG 2.1 Level AA for this website and to physical access
            standards in our dining room. If anything prevents you from using our site or visiting
            us, please tell us — we will fix it or find another way.
          </p>
        </LegalSection>

        <LegalSection title="Website">
          <ul className="list-disc space-y-2 pl-5">
            <li>Semantic HTML, ARIA labels and keyboard navigation throughout</li>
            <li>Skip-to-content link and visible focus indicators on all interactive elements</li>
            <li>Reduced-motion support — animations are disabled when you prefer reduced motion</li>
            <li>Colour contrast meeting WCAG AA on all text and interactive elements</li>
            <li>Alt text on all meaningful images; decorative images marked accordingly</li>
            <li>Form labels, error messages and success states announced to screen readers</li>
          </ul>
        </LegalSection>

        <LegalSection title="The restaurant">
          <ul className="list-disc space-y-2 pl-5">
            <li>Step-free access from the Senchi Link entrance to the main dining room</li>
            <li>Accessible restroom on the ground floor</li>
            <li>Staff trained to assist guests with mobility, vision and hearing needs</li>
            <li>Large-print menus available on request</li>
            <li>High chairs and a children&apos;s tasting menu for young guests</li>
          </ul>
        </LegalSection>

        <LegalSection title="Known limitations">
          <p>
            Some gallery lightbox images rely on mouse hover for captions — keyboard users see full
            captions in the lightbox dialog. Third-party Google Maps embeds may not meet all
            accessibility standards; contact details and directions are also provided in plain text
            on the <Link href="/contact" className="text-accent link-underline">contact page</Link>.
          </p>
        </LegalSection>

        <LegalSection title="Feedback">
          <p>
            Tell us what we can improve:{" "}
            <a href={`mailto:${CONTACT.email}?subject=Accessibility`} className="text-accent link-underline">
              {CONTACT.email}
            </a>{" "}
            or {CONTACT.phone}. We aim to respond within five working days.
          </p>
        </LegalSection>
      </LegalPage>
    </>
  );
}
