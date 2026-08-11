import { PageHero } from "@/components/layout/page-hero";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { CallToAction } from "@/components/sections/cta";
import { SectionHeading } from "@/components/ui/section";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gallery",
  description:
    "Photographs of the DZIFOODS dining room, kitchen, fire section and plates — the room, the fire, the people who fill it.",
  path: "/gallery",
  image: "/images/interior-dining.webp",
  keywords: ["DZIFOODS photos", "restaurant interior Accra", "fine dining photography Ghana"],
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        id="schema-gallery"
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Gallery", href: "/gallery" },
        ])}
      />

      <PageHero
        eyebrow="Gallery"
        title="Come and see it in the right light."
        description="Twenty frames from one week in August — the fire, the room, the people who fill it. Every photograph was taken in-house, never staged with stock."
        image="/images/interior-dining.webp"
        imageAlt="The DZIFOODS dining room at night with brass pendants and velvet banquettes"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Gallery", href: "/gallery" },
        ]}
        meta={[
          { label: "Categories", value: "5" },
          { label: "Photographs", value: "20" },
          { label: "Updated", value: "Aug 2026" },
        ]}
      />

      <section className="section">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="Filter"
              title="Food, fire, room and people."
              description="Use arrow keys in the lightbox to move between images. Press Escape to close."
            />
          </Reveal>
          <div className="mt-10">
            <GalleryGrid />
          </div>
        </div>
      </section>

      <CallToAction
        eyebrow="See it live"
        title="Photographs are one thing. The room is another."
        description="Book a table and see why every frame here was taken after service, not before."
      />
    </>
  );
}
