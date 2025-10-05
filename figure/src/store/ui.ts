import { create } from "zustand";

export type Currency = "EUR" | "USD" | "GBP";

interface UiState {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  scaRequired: boolean;
  setScaRequired: (v: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  currency: "EUR",
  setCurrency: (currency) => set({ currency }),
  scaRequired: false,
  setScaRequired: (scaRequired) => set({ scaRequired }),
}));
