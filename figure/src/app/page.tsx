import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();
  const target = userId ? "/app/dashboard" : "/sign-in";
  redirect(target);
}
