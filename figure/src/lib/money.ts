import { Currency } from "@/types/models";

export function formatMoney(amountCents: number, currency: Currency) {
  const sign = amountCents < 0 ? -1 : 1;
  const abs = Math.abs(amountCents);
  const value = abs / 100;
  return `${sign < 0 ? "-" : ""}${new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value)}`;
}
