import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../services/api";

export const CATEGORIES_QUERY_KEY = "categories" as const;

export function useCategories() {
  return useQuery({
    queryKey: [CATEGORIES_QUERY_KEY],
    queryFn: fetchCategories,
  });
}
