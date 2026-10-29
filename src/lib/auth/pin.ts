import "server-only";

import bcrypt from "bcryptjs";

import { getPosPinPepper } from "@/lib/env";

const PIN_ROUNDS = 12;

export async function hashPin(pin: string): Promise<string> {
  return bcrypt.hash(`${getPosPinPepper()}:${pin}`, PIN_ROUNDS);
}

export async function verifyPin(pin: string, hash: string): Promise<boolean> {
  return bcrypt.compare(`${getPosPinPepper()}:${pin}`, hash);
}
