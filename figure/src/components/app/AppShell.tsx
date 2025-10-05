"use client";

import { PropsWithChildren, useMemo } from "react";
import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, CreditCard, SendHorizontal, BarChart3, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CurrencySelect } from "./CurrencySelect";

const tabs = [
  { href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/transfers", label: "Transferts", icon: SendHorizontal },
  { href: "/app/cards", label: "Cartes", icon: CreditCard },
  { href: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/app/profile", label: "Profil", icon: User },
];

export function AppShell({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const active = useMemo(() => pathname, [pathname]);

  return (
    <div className="min-h-[100svh] bg-gradient-to-br from-[#335CFF]/5 to-[#7B5CFF]/5">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-zinc-900/40 border-b">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <Link href="/app/dashboard" className="font-semibold tracking-tight">
            FIGURE
          </Link>
          <div className="flex items-center gap-3">
            <CurrencySelect />
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-4 md:py-6 grid md:grid-cols-[220px_1fr] gap-6">
        <aside className="hidden md:block">
          <nav className="space-y-1">
            {tabs.map((t) => {
              const Icon = t.icon;
              const isActive = active?.startsWith(t.href);
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-3 py-2 text-sm",
                    isActive ? "bg-primary/10 text-primary" : "hover:bg-accent"
                  )}
                >
                  <Icon className="size-4" />
                  <span>{t.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>
        <main>{children}</main>
      </div>

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t bg-background/80 backdrop-blur">
        <ul className="flex items-stretch justify-around h-14">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = active?.startsWith(t.href);
            return (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 text-xs h-full px-3",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <Icon className="size-5" />
                  {t.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
