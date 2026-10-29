/**
 * Idempotent seed: copies src/constants/* into Postgres.
 * Prices are converted from cedis to pesewas.
 *
 *   npm run db:seed
 */
import { config } from "dotenv";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { CAREERS_INTRO, GIFT_CARD_TIERS, JOB_OPENINGS } from "../constants/careers";
import {
  FEATURES,
  PROCESS_STEPS,
  STATS,
  TIMELINE,
} from "../constants/content";
import { EVENTS, PRIVATE_SPACES } from "../constants/events";
import { FAQS, GALLERY_ITEMS } from "../constants/gallery";
import { DISHES, MENU_CATEGORIES } from "../constants/menu";
import { CHEFS, TESTIMONIALS } from "../constants/people";
import { CONTACT, COUPONS, OPENING_HOURS, ORDER_SETTINGS, SITE, SOCIALS } from "../constants/site";
import { cedisToPesewas } from "../lib/money/pesewas";

config({ path: ".env.local" });

const OWNER_ID = "f3b1001a-166c-4996-857a-69114a033fa6";

function requireEnv(name: string, fallback?: string): string {
  const value = process.env[name] || fallback;
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

function service(): SupabaseClient {
  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const key = requireEnv("SUPABASE_SERVICE_ROLE_KEY", process.env.SUPABASE_SECRET_KEY);
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

async function must(
  label: string,
  result: { data: unknown; error: { message: string } | null },
): Promise<void> {
  if (result.error) throw new Error(`${label}: ${result.error.message}`);
}

async function main() {
  const supabase = service();
  const ownerEmail = (process.env.SEED_OWNER_EMAIL ?? "dzifoods@gmail.com").toLowerCase();
  const ownerName = process.env.SEED_OWNER_NAME ?? "DZIFOODS Admin";
  const slug = process.env.DEFAULT_RESTAURANT_SLUG ?? "dzifoods";

  const existing = await supabase.from("restaurants").select("id").eq("slug", slug).maybeSingle();
  let restaurantId = existing.data?.id as string | undefined;

  if (!restaurantId) {
    const created = await supabase
      .from("restaurants")
      .insert({ slug, name: SITE.name, legal_name: SITE.legalName })
      .select("id")
      .single();
    if (created.error || !created.data) throw new Error(`restaurants: ${created.error?.message}`);
    restaurantId = created.data.id as string;
    console.log("Created restaurant", slug);
  } else {
    console.log("Restaurant already exists", slug);
  }

  await must(
    "restaurant_settings",
    await supabase.from("restaurant_settings").upsert(
      {
        restaurant_id: restaurantId,
        tagline: SITE.tagline,
        short_description: SITE.shortDescription,
        description: SITE.description,
        phone: CONTACT.phone,
        whatsapp: CONTACT.whatsapp,
        email: CONTACT.email,
        address: CONTACT.address,
        geo: CONTACT.geo,
        hours: OPENING_HOURS,
        socials: SOCIALS,
        currency_code: "GHS",
        timezone: "Africa/Accra",
        service_charge_bps: Math.round(ORDER_SETTINGS.serviceChargeRate * 10_000),
        delivery: {
          feePesewas: cedisToPesewas(ORDER_SETTINGS.deliveryFee),
          freeThresholdPesewas: cedisToPesewas(ORDER_SETTINGS.freeDeliveryThreshold),
          minimumOrderPesewas: cedisToPesewas(ORDER_SETTINGS.minimumOrder),
          estimate: ORDER_SETTINGS.deliveryEstimate,
          pickupEstimate: ORDER_SETTINGS.pickupEstimate,
        },
        extras: {
          mapQuery: CONTACT.mapQuery,
          directions: CONTACT.directions,
          parking: CONTACT.parking,
          founded: SITE.founded,
          cuisine: SITE.cuisine,
          priceRange: SITE.priceRange,
          awards: SITE.awards,
          meaning: SITE.meaning,
        },
      },
      { onConflict: "restaurant_id" },
    ),
  );

  await must(
    "tax_rates",
    await supabase.from("tax_rates").upsert(
      {
        restaurant_id: restaurantId,
        name: "Ghana VAT (confirm current GRA rate)",
        rate_bps: 1500,
        applies_to: "all",
        inclusive: true,
        active: true,
      },
      { onConflict: "restaurant_id,name" },
    ),
  );

  await must(
    "users",
    await supabase.from("users").upsert({
      id: OWNER_ID,
      email: ownerEmail,
      display_name: ownerName,
    }),
  );

  const staff = await supabase
    .from("staff_members")
    .select("id")
    .eq("restaurant_id", restaurantId)
    .eq("user_id", OWNER_ID)
    .maybeSingle();

  if (!staff.data) {
    await must(
      "staff_members",
      await supabase.from("staff_members").insert({
        restaurant_id: restaurantId,
        user_id: OWNER_ID,
        display_name: ownerName,
        role: "owner",
        active: true,
      }),
    );
    console.log("Linked owner", ownerEmail);
  }

  const categoryIds = new Map<string, string>();
  for (const [index, category] of MENU_CATEGORIES.entries()) {
    const { data } = await supabase
      .from("menu_categories")
      .select("id")
      .eq("restaurant_id", restaurantId)
      .eq("slug", category.id)
      .maybeSingle();

    if (data?.id) {
      categoryIds.set(category.id, data.id as string);
      continue;
    }

    const created = await supabase
      .from("menu_categories")
      .insert({
        restaurant_id: restaurantId,
        name: category.name,
        slug: category.id,
        tagline: category.tagline,
        image: category.image,
        sort: index,
      })
      .select("id")
      .single();
    if (created.error || !created.data) throw new Error(`category ${category.id}: ${created.error?.message}`);
    categoryIds.set(category.id, created.data.id as string);
  }

  let dishesInserted = 0;
  for (const [index, dish] of DISHES.entries()) {
    const categoryId = categoryIds.get(dish.category);
    if (!categoryId) throw new Error(`Missing category ${dish.category}`);

    const { data: existingDish } = await supabase
      .from("menu_items")
      .select("id")
      .eq("restaurant_id", restaurantId)
      .eq("slug", dish.id)
      .maybeSingle();

    const payload = {
      restaurant_id: restaurantId,
      category_id: categoryId,
      name: dish.name,
      slug: dish.id,
      description: dish.description,
      ingredients: [...dish.ingredients],
      base_price: cedisToPesewas(dish.price),
      price_max: dish.priceMax ? cedisToPesewas(dish.priceMax) : null,
      price_from: dish.priceFrom ?? false,
      calories: dish.calories,
      prep_time: dish.prepTime,
      image: dish.image,
      spice: dish.spice,
      badges: [...dish.badges],
      dietary: [...dish.dietary],
      pairing: dish.pairing ?? null,
      serves: dish.serves ?? null,
      visible_online: true,
      visible_pos: true,
      is_available: true,
      sort: index,
      rating: Math.round(dish.rating * 10),
      review_count: dish.reviewCount,
    };

    if (existingDish?.id) {
      await must(`update dish ${dish.id}`, await supabase.from("menu_items").update(payload).eq("id", existingDish.id));
    } else {
      await must(`insert dish ${dish.id}`, await supabase.from("menu_items").insert(payload));
      dishesInserted += 1;
    }
  }

  const { count: eventCount } = await supabase
    .from("events")
    .select("id", { count: "exact", head: true })
    .eq("restaurant_id", restaurantId);

  if (!eventCount) {
    await must(
      "events",
      await supabase.from("events").insert(
        EVENTS.map((event, sort) => ({
          restaurant_id: restaurantId,
          slug: event.id,
          title: event.title,
          kind: event.kind,
          date: event.date,
          time: event.time,
          price: event.price,
          seats_left: event.seatsLeft,
          description: event.description,
          image: event.image,
          host: event.host ?? null,
          sort,
        })),
      ),
    );
  }

  const seedIfEmpty = async (table: string, rows: Record<string, unknown>[]) => {
    const { count } = await supabase
      .from(table)
      .select("id", { count: "exact", head: true })
      .eq("restaurant_id", restaurantId);
    if (count) return;
    if (rows.length === 0) return;
    await must(table, await supabase.from(table).insert(rows));
  };

  await seedIfEmpty(
    "gallery_items",
    GALLERY_ITEMS.map((item, sort) => ({
      restaurant_id: restaurantId,
      src: item.photo.src,
      alt: item.photo.alt,
      category: item.category,
      caption: item.caption,
      orientation: item.orientation,
      sort,
    })),
  );

  await seedIfEmpty(
    "testimonials",
    TESTIMONIALS.map((item, sort) => ({
      restaurant_id: restaurantId,
      name: item.name,
      role: item.role,
      quote: item.quote,
      rating: item.rating,
      initials: item.initials,
      verified: item.verified,
      source: item.source,
      date: item.date,
      sort,
    })),
  );

  await seedIfEmpty(
    "faqs",
    FAQS.map((item, sort) => ({
      restaurant_id: restaurantId,
      question: item.question,
      answer: item.answer,
      topic: item.topic,
      sort,
    })),
  );

  await seedIfEmpty(
    "job_openings",
    JOB_OPENINGS.map((job, sort) => ({
      restaurant_id: restaurantId,
      slug: job.id,
      title: job.title,
      department: job.department,
      type: job.type,
      location: job.location,
      summary: job.summary,
      responsibilities: [...job.responsibilities],
      sort,
    })),
  );

  await seedIfEmpty(
    "people",
    CHEFS.map((chef, sort) => ({
      restaurant_id: restaurantId,
      slug: chef.id,
      name: chef.name,
      role: chef.role,
      photo_src: chef.photo.src,
      photo_alt: chef.photo.alt,
      biography: [...chef.biography],
      philosophy: chef.philosophy,
      specialties: [...chef.specialties],
      awards: [...chef.awards],
      signature_dish_slug: chef.signatureDishId,
      instagram: chef.instagram ?? null,
      sort,
    })),
  );

  await seedIfEmpty(
    "timeline_entries",
    TIMELINE.map((entry, sort) => ({
      restaurant_id: restaurantId,
      year: entry.year,
      title: entry.title,
      description: entry.description,
      image: entry.image ?? null,
      sort,
    })),
  );

  await seedIfEmpty(
    "features",
    FEATURES.map((feature, sort) => ({
      restaurant_id: restaurantId,
      slug: feature.id,
      title: feature.title,
      description: feature.description,
      icon: feature.icon,
      sort,
    })),
  );

  await seedIfEmpty(
    "stats",
    STATS.map((stat, sort) => ({
      restaurant_id: restaurantId,
      slug: stat.id,
      value: stat.value,
      suffix: stat.suffix ?? null,
      prefix: stat.prefix ?? null,
      label: stat.label,
      description: stat.description,
      sort,
    })),
  );

  await seedIfEmpty(
    "process_steps",
    PROCESS_STEPS.map((step) => ({
      restaurant_id: restaurantId,
      step: step.step,
      title: step.title,
      description: step.description,
      icon: step.icon,
      duration: step.duration,
      sort: step.step,
    })),
  );

  await seedIfEmpty(
    "private_spaces",
    PRIVATE_SPACES.map((space, sort) => ({
      restaurant_id: restaurantId,
      slug: space.id,
      name: space.name,
      capacity: space.capacity,
      minimum_spend: space.minimumSpend,
      description: space.description,
      image: space.image,
      includes: [...space.includes],
      best_for: [...space.bestFor],
      sort,
    })),
  );

  await seedIfEmpty(
    "gift_card_tiers",
    GIFT_CARD_TIERS.map((tier, sort) => ({
      restaurant_id: restaurantId,
      slug: tier.id,
      amount: cedisToPesewas(tier.amount),
      label: tier.label,
      description: tier.description,
      popular: tier.popular ?? false,
      sort,
    })),
  );

  await seedIfEmpty(
    "coupons",
    COUPONS.map((coupon) => ({
      restaurant_id: restaurantId,
      code: coupon.code,
      label: coupon.label,
      percent_off_bps: Math.round(coupon.percentOff * 10_000),
      min_subtotal_pesewas: coupon.minimumSubtotal ? cedisToPesewas(coupon.minimumSubtotal) : null,
      channels: ["web", "pos"],
      active: true,
    })),
  );

  await seedIfEmpty("pages", [
    {
      restaurant_id: restaurantId,
      slug: "careers-intro",
      title: CAREERS_INTRO.heading,
      body: CAREERS_INTRO.lead,
    },
  ]);

  const { count: menuCount } = await supabase
    .from("menu_items")
    .select("id", { count: "exact", head: true })
    .eq("restaurant_id", restaurantId);

  console.log(`Seed complete. menu_items=${menuCount} (new this run: ${dishesInserted})`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
