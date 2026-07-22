import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpense } from "../services/api";
import { EXPENSES_QUERY_KEY } from "./useExpenses";

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EXPENSES_QUERY_KEY] });
    },
  });
}
