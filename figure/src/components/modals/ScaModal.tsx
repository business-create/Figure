"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ScaModal({ trigger, onSuccess }: { trigger: React.ReactNode; onSuccess: () => void }) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const valid = code.replace(/\D/g, "").length === 6;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Validation SCA</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Entrez le code à 6 chiffres envoyé sur votre appareil.</p>
          <Input inputMode="numeric" pattern="[0-9]*" placeholder="••••••" value={code} onChange={(e) => setCode(e.target.value)} />
          <Button disabled={!valid} onClick={() => { onSuccess(); setOpen(false); }} className="w-full">Confirmer</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
