export type Currency = "EUR" | "USD" | "GBP";

export interface User {
  id: string;
  name: string;
  email: string;
  country: string;
}

export interface Account {
  id: string;
  currency: Currency;
  iban: string;
  balance: number; // cents
}

export type TransactionType = "INTERNAL" | "SEPA" | "CARD_AUTH" | "CARD_CAPTURE";
export type TransactionStatus = "SUCCESS" | "PENDING" | "FAILED";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number; // cents, negative for debit
  currency: Currency;
  counterpartyName: string;
  counterpartyIban?: string;
  status: TransactionStatus;
  createdAt: string; // ISO
}

export interface Card {
  id: string;
  brand: "Visa" | "Mastercard";
  last4: string;
  status: "ACTIVE" | "FROZEN";
  limits: { daily: number; monthly: number };
}

export interface Beneficiary {
  id: string;
  kind: "INTERNAL" | "SEPA";
  handleOrIban: string;
  name: string;
}
