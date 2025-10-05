"use client";

import { PropsWithChildren } from "react";
import { SWRConfig } from "swr";
import { apiFetch } from "@/lib/api";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <SWRConfig value={{ fetcher: (key: string) => apiFetch(key), revalidateOnFocus: true }}>
      {children}
    </SWRConfig>
  );
}
