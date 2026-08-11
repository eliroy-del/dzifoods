import { LegalPage, LegalSection } from "@/components/layout/legal-page";
import { JsonLd } from "@/components/seo/json-ld";
import { CONTACT, ORDER_SETTINGS, RESERVATION_SETTINGS, SITE } from "@/constants/site";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: `Terms and conditions for using the ${SITE.name} website, placing orders and making reservations.`,
  path: "/terms",
  noIndex: true,
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        id="schema-terms"
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Terms", href: "/terms" },
        ])}
      />
      <LegalPage
        title="Terms of Use"
        eyebrow="Legal"
        description="The rules for using this website, placing orders and making reservations at DZIFOODS."
        updated="August 2026"
        path="/terms"
      >
        <LegalSection title="Using this website">
          <p>
            By using {SITE.url} you agree to these terms. Content on this site — including menus,
            prices and photographs — is for information only. We reserve the right to change menus,
            prices and availability without notice.
          </p>
        </LegalSection>

        <LegalSection title="Reservations">
          <p>
            Tables are held for {RESERVATION_SETTINGS.holdMinutes} minutes from your booking time.
            Cancel or amend free of charge up to 24 hours before your reservation. Late cancellations
            for parties of eight or more may incur a fee of ₵150 per guest.
          </p>
          <p>
            Your table is yours for the evening — we do not turn tables twice. Please respect other
            guests by keeping voice levels considerate after 21:00.
          </p>
        </LegalSection>

        <LegalSection title="Online orders">
          <p>
            Minimum order value is ₵{ORDER_SETTINGS.minimumOrder}. Delivery is available within{" "}
            {ORDER_SETTINGS.deliveryRadius}. Estimated times ({ORDER_SETTINGS.deliveryEstimate} for
            delivery, {ORDER_SETTINGS.pickupEstimate} for collection) are indicative, not guaranteed.
          </p>
          <p>
            Orders may be amended within five minutes of placement by calling {CONTACT.phone}. After
            that, the kitchen may already be cooking.
          </p>
        </LegalSection>

        <LegalSection title="Gift cards">
          <p>
            Gift cards are valid for twenty-four months from purchase. They are non-refundable except
            where required by law. Lost cards can be reissued if you have the original reference
            number.
          </p>
        </LegalSection>

        <LegalSection title="Liability">
          <p>
            We take every care with allergens and dietary requirements when you tell us in advance.
            However, our kitchen handles all major allergens and we cannot guarantee a completely
            allergen-free environment. Always inform your server on arrival.
          </p>
        </LegalSection>

        <LegalSection title="Contact">
          <p>
            Questions about these terms:{" "}
            <a href={`mailto:${CONTACT.email}`} className="text-accent link-underline">
              {CONTACT.email}
            </a>{" "}
            or {CONTACT.phone}.
          </p>
        </LegalSection>
      </LegalPage>
    </>
  );
}
