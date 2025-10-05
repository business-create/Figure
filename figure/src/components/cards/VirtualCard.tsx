"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useEntity } from "@/hooks/useApi";
import type { Card } from "@/types/models";
import { useDataStore } from "@/store/data";
import { Badge } from "@/components/ui/badge";
import { ScaModal } from "@/components/modals/ScaModal";
import { toast } from "sonner";

export function VirtualCard() {
  const { data } = useEntity<Card>("card");
  const [reveal, setReveal] = useState(false);
  const { card, setCard, setCardStatus, regenerateCard } = useDataStore();

  useEffect(() => {
    if (data) setCard({ status: data.status, last4: data.last4, brand: data.brand });
  }, [data, setCard]);

  if (!card) return null;

  return (
    <div className="rounded-2xl p-6 bg-white dark:bg-zinc-900 shadow-md space-y-4">
      <div className="flex items-center justify-between">
        <div className="font-medium">Carte virtuelle · {card.brand}
          <span className="ml-2 align-middle">{card.status === "ACTIVE" ? <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">Active</Badge> : <Badge variant="destructive">Gelée</Badge>}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => {
            setCardStatus(card.status === "ACTIVE" ? "FROZEN" : "ACTIVE");
            toast.success(card.status === "ACTIVE" ? "Carte gelée" : "Carte activée");
          }}>{card.status === "ACTIVE" ? "Geler" : "Dégeler"}</Button>
          <Button variant="ghost" size="sm" onClick={() => { regenerateCard(); toast.success("Carte régénérée"); }}>Régénérer</Button>
        </div>
      </div>
      <div className="rounded-xl p-5 bg-gradient-to-br from-[#335CFF] to-[#7B5CFF] text-white">
        <div className="text-sm opacity-90">**** **** **** {reveal ? card.last4 : "••••"}</div>
        <div className="mt-6 flex items-center gap-2">
          <ScaModal
            trigger={<Button size="sm" variant="secondary">{reveal ? "Masquer" : "Reveal"}</Button>}
            onSuccess={() => setReveal((r) => !r)}
          />
        </div>
      </div>
    </div>
  );
}
