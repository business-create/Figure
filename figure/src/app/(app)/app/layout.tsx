import { PropsWithChildren } from "react";
import { AppShell } from "@/components/app/AppShell";

export default function AppLayout({ children }: PropsWithChildren) {
  return <AppShell>{children}</AppShell>;
}
