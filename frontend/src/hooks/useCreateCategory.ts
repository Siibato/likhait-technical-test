import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../services/api";
import { CATEGORIES_QUERY_KEY } from "./useCategories";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
    },
  });
}
