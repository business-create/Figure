import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Nouveau virement</h1>
      <div className="rounded-2xl p-6 bg-white shadow-md dark:bg-zinc-900">Flux en étapes</div>
    </div>
  );
}
