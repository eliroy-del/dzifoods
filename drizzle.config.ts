import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

const url = process.env.DATABASE_URL_DIRECT || process.env.DATABASE_URL;

if (!url || url.includes("PASTE_")) {
  throw new Error(
    "DATABASE_URL_DIRECT (or DATABASE_URL) is missing. Paste the Supabase session pooler string into .env.local.",
  );
}

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: { url },
  strict: true,
  verbose: true,
});
