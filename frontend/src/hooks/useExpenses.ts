import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../services/api";

export const EXPENSES_QUERY_KEY = "expenses" as const;

export function useExpenses(year: number, month: number) {
  return useQuery({
    queryKey: [EXPENSES_QUERY_KEY, year, month],
    queryFn: () => getExpenses(year, month),
  });
}
