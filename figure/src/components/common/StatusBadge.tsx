import { Badge } from "@/components/ui/badge";

export function StatusBadge({ status }: { status: "SUCCESS" | "PENDING" | "FAILED" }) {
  if (status === "SUCCESS") return <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">Succès</Badge>;
  if (status === "FAILED") return <Badge variant="destructive">Échec</Badge>;
  return <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400">En attente</Badge>;
}
