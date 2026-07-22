import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../services/api";

export const EXPENSES_QUERY_KEY = "expenses" as const;

const DEFAULT_PER_PAGE = 10;

export function useExpenses(
  year: number,
  month: number,
  page: number = 1,
  perPage: number = DEFAULT_PER_PAGE,
) {
  return useQuery({
    queryKey: [EXPENSES_QUERY_KEY, year, month, page, perPage],
    queryFn: () => getExpenses(year, month, page, perPage),
  });
}
