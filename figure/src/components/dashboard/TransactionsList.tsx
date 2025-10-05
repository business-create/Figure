"use client";

import { useEntity } from "@/hooks/useApi";
import { TransactionItem } from "@/components/common/TransactionItem";
import type { Transaction } from "@/types/models";

export default function TransactionsList() {
  const { data } = useEntity<Transaction[]>("transactions");
  if (!data) return null;
  return (
    <ul className="divide-y">
      {data.map((tx) => (
        <li key={tx.id}>
          <TransactionItem tx={tx} />
        </li>
      ))}
    </ul>
  );
}
