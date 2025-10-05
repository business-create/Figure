"use client";

import { useEntity } from "@/hooks/useApi";
import { convert } from "@/lib/fx";
import { formatMoney } from "@/lib/money";
import type { Account, Currency } from "@/types/models";
import { useUiStore } from "@/store/ui";

export default function BalanceCard() {
  const { data: accounts } = useEntity<Account[]>("accounts");
  const currency = useUiStore((s) => s.currency);
  if (!accounts) return <div className="h-12" />;
  const total = accounts.reduce((sum, a) => sum + convert(a.balance, a.currency, currency), 0);
  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br from-[#335CFF] to-[#7B5CFF] text-white shadow-xl">
      <div className="text-sm/5 opacity-90">Solde total</div>
      <div className="mt-1 text-3xl font-semibold">{formatMoney(total, currency as Currency)}</div>
    </div>
  );
}
