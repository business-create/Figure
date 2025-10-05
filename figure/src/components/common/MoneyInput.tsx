"use client";

import { useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import type { Currency } from "@/types/models";

export function MoneyInput({ value, onChange, currency, onCurrencyChange, label = "Montant" }: {
  value: number;
  onChange: (v: number) => void;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  label?: string;
}) {
  const id = useId();
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex gap-2">
        <Input id={id} type="number" min={0} step={0.01} value={(value / 100).toString()} onChange={(e) => onChange(Math.round(parseFloat(e.target.value || "0") * 100))} />
        <Select value={currency} onValueChange={(v) => onCurrencyChange(v as Currency)}>
          <SelectTrigger className="w-[110px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="EUR">EUR</SelectItem>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="GBP">GBP</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
