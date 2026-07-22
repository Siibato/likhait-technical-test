import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExpense } from "../services/api";
import { EXPENSES_QUERY_KEY } from "./useExpenses";

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EXPENSES_QUERY_KEY] });
    },
  });
}
