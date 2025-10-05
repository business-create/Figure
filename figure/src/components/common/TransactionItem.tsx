"use client";

import { formatMoney } from "@/lib/money";
import { StatusBadge } from "./StatusBadge";
import type { Transaction, Currency } from "@/types/models";

export function TransactionItem({ tx }: { tx: Transaction }) {
  const date = new Date(tx.createdAt);
  const amount = formatMoney(tx.amount, tx.currency as Currency);
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex flex-col">
        <div className="font-medium">{tx.counterpartyName}</div>
        <div className="text-xs text-muted-foreground">{date.toLocaleString()}</div>
      </div>
      <div className="flex items-center gap-3">
        <StatusBadge status={tx.status} />
        <div className={tx.amount < 0 ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}>{amount}</div>
      </div>
    </div>
  );
}
