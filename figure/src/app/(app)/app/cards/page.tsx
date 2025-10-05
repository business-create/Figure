import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { VirtualCard } from "@/components/cards/VirtualCard";

export default async function Page() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Cartes</h1>
      <VirtualCard />
    </div>
  );
}
