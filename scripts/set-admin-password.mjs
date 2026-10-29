#!/usr/bin/env node
/**
 * Set (or reset) the password for a staff login without it ever leaving
 * this machine. Prompts with hidden input, then calls the Supabase Auth admin
 * API with the service-role key from .env.local.
 *
 *   npm run admin:password                       # admin@dzifoods.com
 *   npm run admin:password -- someone@dzifoods.com
 */
import { readFileSync } from "node:fs";
import { stdin, stdout } from "node:process";

function loadEnv(path) {
  const env = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match) continue;
    env[match[1]] = match[2].replace(/^"(.*)"$/, "$1");
  }
  return env;
}

function promptHidden(question) {
  return new Promise((resolve) => {
    stdout.write(question);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    let value = "";
    const onData = (char) => {
      if (char === "\r" || char === "\n") {
        stdin.setRawMode(false);
        stdin.pause();
        stdin.off("data", onData);
        stdout.write("\n");
        resolve(value);
      } else if (char === "\u0003") {
        stdout.write("\n");
        process.exit(130);
      } else if (char === "\u007f" || char === "\b") {
        value = value.slice(0, -1);
      } else {
        value += char;
      }
    };
    stdin.on("data", onData);
  });
}

function weaknesses(password) {
  const problems = [];
  if (password.length < 12) problems.push("at least 12 characters");
  if (!/[a-z]/.test(password)) problems.push("a lowercase letter");
  if (!/[A-Z]/.test(password)) problems.push("an uppercase letter");
  if (!/[0-9]/.test(password)) problems.push("a number");
  if (!/[^A-Za-z0-9]/.test(password)) problems.push("a symbol");
  return problems;
}

const env = loadEnv(new URL("../.env.local", import.meta.url));
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY;
const email = (process.argv[2] ?? "admin@dzifoods.com").toLowerCase();

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or the Supabase secret/service-role key in .env.local.");
  process.exit(1);
}

const headers = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };

const list = await fetch(`${url}/auth/v1/admin/users?per_page=1000`, { headers }).then((r) => r.json());
const user = list.users?.find((u) => u.email?.toLowerCase() === email);
if (!user) {
  console.error(`No Supabase Auth user found for ${email}.`);
  process.exit(1);
}

console.log(`Setting the password for ${email}`);
const password = await promptHidden("New password: ");
const problems = weaknesses(password);
if (problems.length > 0) {
  console.error(`Password needs ${problems.join(", ")}.`);
  process.exit(1);
}
if ((await promptHidden("Type it again: ")) !== password) {
  console.error("The two passwords didn't match. Nothing was changed.");
  process.exit(1);
}

const response = await fetch(`${url}/auth/v1/admin/users/${user.id}`, {
  method: "PUT",
  headers,
  body: JSON.stringify({ password }),
});

if (!response.ok) {
  const body = await response.json().catch(() => ({}));
  console.error(`Supabase rejected the password: ${body.msg ?? body.message ?? response.status}`);
  process.exit(1);
}

console.log("Password set. You can sign in once the /admin login page ships in Phase 1.");
