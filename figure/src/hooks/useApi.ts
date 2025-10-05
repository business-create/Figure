import useSWR, { type SWRConfiguration } from "swr";
import { apiFetch } from "@/lib/api";

export function useEntity<T>(entity: string, config?: SWRConfiguration<T>) {
  return useSWR<T>(`/mock?entity=${entity}`, (url) => apiFetch<T>(url), {
    revalidateOnFocus: true,
    ...config,
  });
}
