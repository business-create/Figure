import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import TransactionsList from "@/components/dashboard/TransactionsList";
import BalanceCard from "@/components/dashboard/BalanceCard";

export default async function Page() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Tableau de bord</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <BalanceCard />
        <div className="rounded-2xl p-6 bg-white shadow-md dark:bg-zinc-900">Carte virtuelle</div>
      </div>
      <div className="rounded-2xl p-6 bg-white shadow-md dark:bg-zinc-900">
        <Suspense fallback={<Skeleton className="h-40 w-full" />}> 
          <TransactionsList />
        </Suspense>
      </div>
    </div>
  );
}
