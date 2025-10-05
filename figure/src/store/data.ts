import { create } from "zustand";
import type { Transaction, TransactionStatus, Beneficiary, Card } from "@/types/models";

interface DataState {
  localTransactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  updateTransactionStatus: (id: string, status: TransactionStatus) => void;

  card: Pick<Card, "status" | "last4" | "brand"> | null;
  setCard: (card: Pick<Card, "status" | "last4" | "brand">) => void;
  setCardStatus: (status: "ACTIVE" | "FROZEN") => void;
  regenerateCard: () => void;

  beneficiaries: Beneficiary[];
  addBeneficiary: (b: Beneficiary) => void;
  removeBeneficiary: (id: string) => void;

  twoFactorEnabled: boolean;
  setTwoFactorEnabled: (v: boolean) => void;

  rateLimitUntil: number; // epoch ms until which confirm is disabled
  setRateLimitMs: (ms: number) => void;
}

export const useDataStore = create<DataState>((set, get) => ({
  localTransactions: [],
  addTransaction: (tx) => set((s) => ({ localTransactions: [tx, ...s.localTransactions] })),
  updateTransactionStatus: (id, status) =>
    set((s) => ({
      localTransactions: s.localTransactions.map((t) => (t.id === id ? { ...t, status } : t)),
    })),

  card: null,
  setCard: (card) => set({ card }),
  setCardStatus: (status) => set((s) => (s.card ? { card: { ...s.card, status } } : s)),
  regenerateCard: () =>
    set((s) =>
      s.card
        ? {
            card: { ...s.card, last4: Math.floor(1000 + Math.random() * 9000).toString() },
          }
        : s
    ),

  beneficiaries: [],
  addBeneficiary: (b) => set((s) => ({ beneficiaries: [b, ...s.beneficiaries] })),
  removeBeneficiary: (id) => set((s) => ({ beneficiaries: s.beneficiaries.filter((b) => b.id !== id) })),

  twoFactorEnabled: false,
  setTwoFactorEnabled: (v) => set({ twoFactorEnabled: v }),

  rateLimitUntil: 0,
  setRateLimitMs: (ms) => set({ rateLimitUntil: Date.now() + ms }),
}));
