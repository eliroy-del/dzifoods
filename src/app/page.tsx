import { JsonLd } from "@/components/seo/json-ld";
import { CallToAction } from "@/components/sections/cta";
import { Hero } from "@/components/sections/hero";
import { InstagramFeed } from "@/components/sections/instagram";
import { Loyalty } from "@/components/sections/loyalty";
import { MenuPreview } from "@/components/sections/menu-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { menuSchema, reviewsSchema } from "@/lib/schema";

/**
 * Home page.
 *
 * Composed entirely of server components except where interactivity demands
 * otherwise (hero widget, menu tabs, testimonial carousel), so the first paint
 * ships almost no JavaScript for the content above the fold.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd id="schema-home" data={[menuSchema(), reviewsSchema()]} />
      <Hero />
      <MenuPreview />
      <Testimonials />
      <Loyalty />
      <InstagramFeed />
      <CallToAction />
    </>
  );
}
