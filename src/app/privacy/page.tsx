import { LegalPage, LegalSection } from "@/components/layout/legal-page";
import { JsonLd } from "@/components/seo/json-ld";
import { CONTACT, SITE } from "@/constants/site";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses and protects your personal data.`,
  path: "/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        id="schema-privacy"
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Privacy", href: "/privacy" },
        ])}
      />
      <LegalPage
        title="Privacy Policy"
        eyebrow="Legal"
        description="We collect only what we need to take your booking, fulfil your order, or reply to your message — and nothing more."
        updated="August 2026"
        path="/privacy"
      >
        <LegalSection title="Who we are">
          <p>
            {SITE.legalName} operates {SITE.name} at {CONTACT.address.street},{" "}
            {CONTACT.address.city}, {CONTACT.address.country}. For privacy enquiries contact{" "}
            <a href={`mailto:${CONTACT.email}`} className="text-accent link-underline">
              {CONTACT.email}
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="What we collect">
          <p>
            When you book a table, place an order, purchase a gift card, or contact us, we may
            collect your name, email address, phone number, dietary requirements, delivery address
            and payment reference. We do not store full card numbers on our servers.
          </p>
          <p>
            When you browse the site we collect anonymised analytics (pages visited, device type,
            approximate location) to improve performance. You can opt out of non-essential cookies
            through your browser settings.
          </p>
        </LegalSection>

        <LegalSection title="How we use your data">
          <ul className="list-disc space-y-2 pl-5">
            <li>To confirm and manage reservations, orders and gift cards</li>
            <li>To communicate about your visit, including confirmation and follow-up emails</li>
            <li>To improve our website, menu and service</li>
            <li>To send the Sunday Send newsletter, only if you opted in — unsubscribe any time</li>
          </ul>
        </LegalSection>

        <LegalSection title="Sharing">
          <p>
            We do not sell your data. We share it only with service providers who help us operate
            (email delivery, payment processing, reservation management), and only under contract
            that requires them to protect it.
          </p>
        </LegalSection>

        <LegalSection title="Retention">
          <p>
            Reservation and order records are kept for seven years for accounting purposes. Marketing
            consent is kept until you unsubscribe. You may request deletion of non-essential data at
            any time by emailing {CONTACT.email}.
          </p>
        </LegalSection>

        <LegalSection title="Your rights">
          <p>
            Under applicable Ghana data protection law you may request access, correction or deletion
            of your personal data. Contact us and we will respond within thirty days.
          </p>
        </LegalSection>
      </LegalPage>
    </>
  );
}
