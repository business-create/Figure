"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";

function formatIBAN(value: string) {
  return value
    .replace(/\s+/g, "")
    .replace(/[^A-Za-z0-9]/g, "")
    .toUpperCase()
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

export function IbanInput({ label = "IBAN", value, onChange }: { label?: string; value: string; onChange: (v: string) => void }) {
  const id = useId();
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} value={value} onChange={(e) => onChange(formatIBAN(e.target.value))} placeholder="FR76 XXXX XXXX XXXX XXXX XXXX XXX" />
    </div>
  );
}
