import { NextResponse } from "next/server";

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

const randomFail = () => Math.random() < 0.05;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const entity = searchParams.get("entity");

  // Simulate latency
  const delay = 200 + Math.floor(Math.random() * 400);
  await sleep(delay);

  if (randomFail()) {
    return NextResponse.json({ error: "Random error" }, { status: 500 });
  }

  switch (entity) {
    case "accounts":
      return NextResponse.json(accountsFixture);
    case "transactions":
      return NextResponse.json(transactionsFixture);
    case "card":
      return NextResponse.json(cardFixture);
    case "beneficiaries":
      return NextResponse.json(beneficiariesFixture);
    default:
      return NextResponse.json({ error: "Unknown entity" }, { status: 400 });
  }
}

// Fixtures (ISO dates, amounts in cents)
const accountsFixture = [
  { id: "acc_eur", currency: "EUR", iban: "FR76 3000 6000 0112 3456 7890 189", balance: 125045 },
  { id: "acc_usd", currency: "USD", iban: "FR76 3000 6000 0112 3456 7890 190", balance: 540231 },
  { id: "acc_gbp", currency: "GBP", iban: "FR76 3000 6000 0112 3456 7890 191", balance: 90212 },
] satisfies Array<{ id: string; currency: "EUR"|"USD"|"GBP"; iban: string; balance: number }>;

const transactionsFixture = [
  { id: "tx_1", type: "INTERNAL", amount: -4500, currency: "EUR", counterpartyName: "Alice", status: "SUCCESS", createdAt: "2025-10-01T10:12:00.000Z" },
  { id: "tx_2", type: "SEPA", amount: -23000, currency: "EUR", counterpartyName: "EDF", counterpartyIban: "FR761234...", status: "PENDING", createdAt: "2025-10-05T09:05:00.000Z" },
  { id: "tx_3", type: "CARD_AUTH", amount: -1299, currency: "EUR", counterpartyName: "Uber", status: "SUCCESS", createdAt: "2025-10-04T20:22:00.000Z" },
  { id: "tx_4", type: "INTERNAL", amount: 150000, currency: "USD", counterpartyName: "Payroll Inc.", status: "SUCCESS", createdAt: "2025-09-30T08:00:00.000Z" },
] as const;

const cardFixture = {
  id: "card_1",
  brand: "Visa",
  last4: "4242",
  status: "ACTIVE",
  limits: { daily: 200000, monthly: 5000000 },
} as const;

const beneficiariesFixture = [
  { id: "b_1", kind: "SEPA", handleOrIban: "FR76 1234 5678 9012 3456 7890 123", name: "EDF" },
  { id: "b_2", kind: "INTERNAL", handleOrIban: "bob@figure.app", name: "Bob" },
] as const;
