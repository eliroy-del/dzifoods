/**
 * Typed environment access. Public keys may be either the new publishable
 * key or the legacy anon JWT. Secret keys similarly accept the new secret
 * or the legacy service_role JWT.
 */
function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable ${name}`);
  }
  return value;
}

export function getSupabaseUrl(): string {
  return required("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL);
}

export function getSupabaseAnonKey(): string {
  return required(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}

export function getSupabaseServiceKey(): string {
  return required(
    "SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SECRET_KEY",
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY,
  );
}

export function getDatabaseUrl(): string | undefined {
  const url = process.env.DATABASE_URL_DIRECT || process.env.DATABASE_URL;
  if (!url || url.includes("PASTE_")) return undefined;
  return url;
}

export function getDefaultRestaurantSlug(): string {
  return process.env.DEFAULT_RESTAURANT_SLUG ?? "dzifoods";
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export function getPosPinPepper(): string {
  return required("POS_PIN_PEPPER", process.env.POS_PIN_PEPPER);
}
