import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { getDatabaseUrl } from "@/lib/env";

import * as schema from "./schema";

const url = getDatabaseUrl();

const client = url
  ? postgres(url, {
      prepare: false,
      max: 1,
    })
  : null;

export const db = client ? drizzle(client, { schema }) : null;

export function requireDb() {
  if (!db) {
    throw new Error(
      "Database is not configured. Set DATABASE_URL_DIRECT in .env.local (Supabase session pooler, port 5432).",
    );
  }
  return db;
}

export type Database = NonNullable<typeof db>;
