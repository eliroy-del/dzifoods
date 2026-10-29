-- Phase 1 foundations: tenant, staff, audit, catalogue, CMS.
-- Money columns are integer pesewas. Every tenant table has restaurant_id.

create extension if not exists "uuid-ossp" with schema extensions;
create extension if not exists pgcrypto with schema extensions;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$ begin
  create type public.staff_role as enum ('owner','manager','content_editor','cashier','waiter','kitchen');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.content_status as enum ('draft','published','scheduled');
exception when duplicate_object then null;
end $$;

create table if not exists public.restaurants (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  legal_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.restaurant_settings (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null unique references public.restaurants(id) on delete cascade,
  tagline text,
  short_description text,
  description text,
  phone text,
  whatsapp text,
  email text,
  address jsonb not null default '{}'::jsonb,
  geo jsonb,
  hours jsonb not null default '[]'::jsonb,
  socials jsonb not null default '[]'::jsonb,
  currency_code text not null default 'GHS',
  timezone text not null default 'Africa/Accra',
  service_charge_bps integer not null default 0,
  delivery jsonb not null default '{}'::jsonb,
  receipt jsonb not null default '{}'::jsonb,
  seo jsonb not null default '{}'::jsonb,
  announcement jsonb,
  extras jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tax_rates (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  name text not null,
  rate_bps integer not null,
  applies_to text not null default 'all',
  inclusive boolean not null default true,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (restaurant_id, name)
);

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.staff_members (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  user_id uuid references public.users(id) on delete set null,
  display_name text not null,
  role public.staff_role not null,
  pin_hash text,
  pin_failed_attempts integer not null default 0,
  pin_locked_until timestamptz,
  active boolean not null default true,
  hourly_rate_pesewas integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create unique index if not exists staff_members_restaurant_user_idx
  on public.staff_members (restaurant_id, user_id)
  where user_id is not null;

create table if not exists public.staff_invites (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  email text not null,
  display_name text not null,
  role public.staff_role not null,
  invited_by_staff_id uuid references public.staff_members(id) on delete set null,
  accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  actor_staff_id uuid references public.staff_members(id) on delete set null,
  actor_user_id uuid,
  action text not null,
  entity text not null,
  entity_id uuid,
  before jsonb,
  after jsonb,
  ip text,
  created_at timestamptz not null default now()
);

create table if not exists public.menu_categories (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  name text not null,
  slug text not null,
  tagline text,
  image text,
  sort integer not null default 0,
  visible_online boolean not null default true,
  visible_pos boolean not null default true,
  available_days smallint[],
  available_start text,
  available_end text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  unique (restaurant_id, slug)
);

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  category_id uuid not null references public.menu_categories(id) on delete restrict,
  name text not null,
  slug text not null,
  description text,
  ingredients text[] not null default '{}',
  base_price integer not null,
  price_max integer,
  price_from boolean not null default false,
  calories integer,
  prep_time integer,
  image text,
  spice smallint not null default 0,
  badges text[] not null default '{}',
  dietary text[] not null default '{}',
  pairing text,
  serves text,
  sku text,
  kitchen_station text,
  visible_online boolean not null default true,
  visible_pos boolean not null default true,
  is_available boolean not null default true,
  sort integer not null default 0,
  rating integer,
  review_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  unique (restaurant_id, slug)
);

create table if not exists public.modifier_groups (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  name text not null,
  min_select integer not null default 0,
  max_select integer not null default 1,
  required boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.modifiers (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.modifier_groups(id) on delete cascade,
  name text not null,
  price_delta integer not null default 0,
  sort integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.menu_item_modifier_groups (
  id uuid primary key default gen_random_uuid(),
  menu_item_id uuid not null references public.menu_items(id) on delete cascade,
  group_id uuid not null references public.modifier_groups(id) on delete cascade,
  sort integer not null default 0,
  unique (menu_item_id, group_id)
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  path text not null,
  alt text not null,
  width integer,
  height integer,
  blur_data text,
  folder text,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  slug text not null,
  title text not null,
  kind text not null,
  date text not null,
  time text not null,
  price text not null,
  seats_left integer not null default 0,
  description text not null,
  image text,
  host text,
  status public.content_status not null default 'published',
  publish_at timestamptz,
  sort integer not null default 0,
  last_edited_by uuid references public.staff_members(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  src text not null,
  alt text not null,
  category text not null,
  caption text not null,
  orientation text not null default 'landscape',
  status public.content_status not null default 'published',
  publish_at timestamptz,
  sort integer not null default 0,
  last_edited_by uuid references public.staff_members(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  name text not null,
  role text,
  quote text not null,
  rating integer not null default 5,
  initials text,
  verified boolean not null default true,
  source text,
  date text,
  status public.content_status not null default 'published',
  publish_at timestamptz,
  sort integer not null default 0,
  last_edited_by uuid references public.staff_members(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  question text not null,
  answer text not null,
  topic text not null,
  status public.content_status not null default 'published',
  publish_at timestamptz,
  sort integer not null default 0,
  last_edited_by uuid references public.staff_members(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.job_openings (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  slug text not null,
  title text not null,
  department text not null,
  type text not null,
  location text not null,
  summary text not null,
  responsibilities text[] not null default '{}',
  status public.content_status not null default 'published',
  publish_at timestamptz,
  sort integer not null default 0,
  last_edited_by uuid references public.staff_members(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.people (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  slug text not null,
  name text not null,
  role text not null,
  photo_src text,
  photo_alt text,
  biography text[] not null default '{}',
  philosophy text,
  specialties text[] not null default '{}',
  awards text[] not null default '{}',
  signature_dish_slug text,
  instagram text,
  status public.content_status not null default 'published',
  publish_at timestamptz,
  sort integer not null default 0,
  last_edited_by uuid references public.staff_members(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.timeline_entries (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  year text not null,
  title text not null,
  description text not null,
  image text,
  status public.content_status not null default 'published',
  publish_at timestamptz,
  sort integer not null default 0,
  last_edited_by uuid references public.staff_members(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.features (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  slug text not null,
  title text not null,
  description text not null,
  icon text,
  status public.content_status not null default 'published',
  publish_at timestamptz,
  sort integer not null default 0,
  last_edited_by uuid references public.staff_members(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.stats (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  slug text not null,
  value integer not null,
  suffix text,
  prefix text,
  label text not null,
  description text,
  status public.content_status not null default 'published',
  publish_at timestamptz,
  sort integer not null default 0,
  last_edited_by uuid references public.staff_members(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.process_steps (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  step integer not null,
  title text not null,
  description text not null,
  icon text,
  duration text,
  status public.content_status not null default 'published',
  publish_at timestamptz,
  sort integer not null default 0,
  last_edited_by uuid references public.staff_members(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.private_spaces (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  slug text not null,
  name text not null,
  capacity text,
  minimum_spend text,
  description text not null,
  image text,
  includes text[] not null default '{}',
  best_for text[] not null default '{}',
  status public.content_status not null default 'published',
  publish_at timestamptz,
  sort integer not null default 0,
  last_edited_by uuid references public.staff_members(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.gift_card_tiers (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  slug text not null,
  amount integer not null,
  label text not null,
  description text,
  popular boolean not null default false,
  status public.content_status not null default 'published',
  publish_at timestamptz,
  sort integer not null default 0,
  last_edited_by uuid references public.staff_members(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  slug text not null,
  title text not null,
  body text not null,
  status public.content_status not null default 'published',
  publish_at timestamptz,
  sort integer not null default 0,
  last_edited_by uuid references public.staff_members(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.coupons (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  code text not null,
  label text not null,
  percent_off_bps integer not null,
  min_subtotal_pesewas integer,
  valid_from timestamptz,
  valid_to timestamptz,
  usage_limit integer,
  channels text[] not null default array['web'],
  active boolean not null default true,
  extras jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

-- updated_at triggers
do $$
declare
  t text;
begin
  foreach t in array array[
    'restaurants','restaurant_settings','tax_rates','users','staff_members','staff_invites',
    'menu_categories','menu_items','modifier_groups','modifiers','media_assets','events',
    'gallery_items','testimonials','faqs','job_openings','people','timeline_entries',
    'features','stats','process_steps','private_spaces','gift_card_tiers','pages','coupons'
  ]
  loop
    execute format(
      'drop trigger if exists set_updated_at on public.%I; create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at();',
      t, t
    );
  end loop;
end $$;

create or replace function public.current_staff_restaurant_ids()
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select restaurant_id
  from public.staff_members
  where user_id = auth.uid()
    and active = true
    and deleted_at is null;
$$;

-- RLS: tenant isolation. Service role bypasses these policies.
alter table public.restaurants enable row level security;
alter table public.restaurant_settings enable row level security;
alter table public.tax_rates enable row level security;
alter table public.users enable row level security;
alter table public.staff_members enable row level security;
alter table public.staff_invites enable row level security;
alter table public.audit_logs enable row level security;
alter table public.menu_categories enable row level security;
alter table public.menu_items enable row level security;
alter table public.modifier_groups enable row level security;
alter table public.modifiers enable row level security;
alter table public.menu_item_modifier_groups enable row level security;
alter table public.media_assets enable row level security;
alter table public.events enable row level security;
alter table public.gallery_items enable row level security;
alter table public.testimonials enable row level security;
alter table public.faqs enable row level security;
alter table public.job_openings enable row level security;
alter table public.people enable row level security;
alter table public.timeline_entries enable row level security;
alter table public.features enable row level security;
alter table public.stats enable row level security;
alter table public.process_steps enable row level security;
alter table public.private_spaces enable row level security;
alter table public.gift_card_tiers enable row level security;
alter table public.pages enable row level security;
alter table public.coupons enable row level security;

create policy restaurants_tenant on public.restaurants
  for all using (id in (select public.current_staff_restaurant_ids()))
  with check (id in (select public.current_staff_restaurant_ids()));

create policy users_self on public.users
  for all using (id = auth.uid())
  with check (id = auth.uid());

create policy staff_members_tenant on public.staff_members
  for all using (restaurant_id in (select public.current_staff_restaurant_ids()))
  with check (restaurant_id in (select public.current_staff_restaurant_ids()));

-- Generic tenant policies for remaining tables
do $$
declare
  t text;
begin
  foreach t in array array[
    'restaurant_settings','tax_rates','staff_invites','audit_logs','menu_categories','menu_items',
    'modifier_groups','media_assets','events','gallery_items','testimonials','faqs','job_openings',
    'people','timeline_entries','features','stats','process_steps','private_spaces','gift_card_tiers',
    'pages','coupons'
  ]
  loop
    execute format(
      'drop policy if exists %I_tenant on public.%I; create policy %I_tenant on public.%I for all using (restaurant_id in (select public.current_staff_restaurant_ids())) with check (restaurant_id in (select public.current_staff_restaurant_ids()));',
      t, t, t, t
    );
  end loop;
end $$;

create policy modifiers_via_group on public.modifiers
  for all using (
    group_id in (
      select id from public.modifier_groups
      where restaurant_id in (select public.current_staff_restaurant_ids())
    )
  )
  with check (
    group_id in (
      select id from public.modifier_groups
      where restaurant_id in (select public.current_staff_restaurant_ids())
    )
  );

create policy menu_item_modifier_groups_via_item on public.menu_item_modifier_groups
  for all using (
    menu_item_id in (
      select id from public.menu_items
      where restaurant_id in (select public.current_staff_restaurant_ids())
    )
  )
  with check (
    menu_item_id in (
      select id from public.menu_items
      where restaurant_id in (select public.current_staff_restaurant_ids())
    )
  );

-- PHASE 3 (not created): orders, order_items, payments, refunds,
-- customers, loyalty_*, gift_cards, enquiries, job_applications,
-- newsletter_subscribers, areas, tables, terminals, shifts, cash_*.
-- PHASE 5: ingredients, recipes, stock_movements, suppliers, purchase_orders.
