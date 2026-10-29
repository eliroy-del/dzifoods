/** 1 Ghana cedi = 100 pesewas. All persisted money is integer pesewas. */

export const PESEWAS_PER_CEDI = 100;

export function cedisToPesewas(cedis: number): number {
  return Math.round(cedis * PESEWAS_PER_CEDI);
}

export function pesewasToCedis(pesewas: number): number {
  return pesewas / PESEWAS_PER_CEDI;
}

export function formatPesewas(pesewas: number, symbol = "₵"): string {
  const cedis = pesewasToCedis(pesewas);
  const fractionDigits = Number.isInteger(cedis) ? 0 : 2;
  return `${symbol}${cedis.toLocaleString("en-GH", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: 2,
  })}`;
}
