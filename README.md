# DZIFOODS

Premium Afro-fusion restaurant website built with Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion, and a typed content layer designed for future CMS migration.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run db:seed` | Import `src/constants/*` into Supabase (idempotent) |
| `npm run admin:password` | Set the owner/staff password locally |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — cinematic hero, menu preview, testimonials, CTA |
| `/menu` | Full menu with search, filters, favourites, cart |
| `/order` | Online ordering overview |
| `/order/checkout` | Checkout flow with server action |
| `/events` | Events calendar + seat booking |
| `/about` | Story, timeline, chef, values |
| `/gallery` | Masonry grid + keyboard lightbox |
| `/testimonials` | Verified guest reviews |
| `/gift-cards` | Gift card purchase flow |
| `/careers` | Open roles + application form |
| `/faq` | Filterable FAQ with schema.org markup |
| `/contact` | Map, hours, contact form |
| `/privacy`, `/terms`, `/accessibility` | Legal pages |
| `/admin` | Staff CMS (invite-only). Public site still reads `src/constants/*` until Phase 2 |
| `/pos`, `/kds` | Protected shells — POS and kitchen display land in Phase 4 |

## Architecture

```
src/
├── app/              # App Router pages, layouts, server actions
├── components/
│   ├── ui/           # Design system primitives
│   ├── layout/       # Header, footer, page hero
│   ├── sections/     # Home page sections
│   ├── forms/        # Validated form components
│   └── motion/       # Framer Motion + Lenis
├── constants/        # Typed content (swap for CMS later)
├── hooks/            # Client hooks
├── lib/              # SEO, schema, validators, hours, utils
└── types/            # Domain model
```

**Content layer** — All menu items, events, testimonials, FAQs and site config live in `src/constants/`. Replace these modules with CMS queries and every consumer keeps working.

**Forms** — React Hook Form + Zod on the client, re-validated in server actions (`src/app/actions.ts`) with rate limiting and honeypot protection.

**Cart** — Client-side state persisted in `localStorage`. Only dish IDs and quantities are stored — prices are always read fresh from the menu.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical site URL for SEO and Open Graph |
| `NEXT_PUBLIC_SUPABASE_URL` | Required for admin | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Required for admin | Legacy anon key (or use the publishable key) |
| `SUPABASE_SERVICE_ROLE_KEY` | Required for admin | Server-only. Never prefix with `NEXT_PUBLIC_` |
| `DATABASE_URL` / `DATABASE_URL_DIRECT` | Required for Drizzle | Pooler connection strings (ports 6543 / 5432) |
| `SEED_OWNER_EMAIL` | Seed only | Owner login, currently `dzifoods@gmail.com` |
| `POS_PIN_PEPPER` | Required for POS PINs | Random secret mixed into PIN hashes |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Optional | Enables Google Maps Embed API on the contact page |

Ghana tax rows are seeded as editable data. Confirm current GRA rates before charging tax in Phase 3.

**Auth:** add `http://localhost:3000/**` and your production origin under Supabase Authentication → URL configuration → Redirect URLs so password reset and MFA work.

## Deployment

Optimized for [Vercel](https://vercel.com):

```bash
npm run build
```

Security headers (CSP, HSTS, Permissions-Policy) are configured in `next.config.ts`.

## Image optimisation

Place source images in `public/images/` and run:

```bash
node scripts/optimize-images.mjs
```

This converts to WebP, generates blur placeholders, and writes `src/lib/generated/blur-data.ts`.

## Integrations (placeholder)

Server actions log to console in development. Wire up production integrations in `src/app/actions.ts` → `deliver()`:

- **Email** — Resend, SendGrid
- **Reservations** — OpenTable, SevenRooms
- **Payments** — Paystack, Stripe
- **CMS** — Sanity, Payload, Contentful

## License

Private — © Dzifoods Hospitality Group Ltd.
