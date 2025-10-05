import { Currency } from "@/types/models";

const rates: Record<Currency, number> = {
  EUR: 1,
  USD: 1.07,
  GBP: 0.86,
};

export function convert(amountCents: number, from: Currency, to: Currency) {
  if (from === to) return amountCents;
  const eur = amountCents / rates[from];
  return Math.round(eur * rates[to]);
}
