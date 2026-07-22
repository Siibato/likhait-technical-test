import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExpense } from "../services/api";
import { ExpenseFormData } from "../types";
import { EXPENSES_QUERY_KEY } from "./useExpenses";

export function useUpdateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<ExpenseFormData>;
    }) => updateExpense(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EXPENSES_QUERY_KEY] });
    },
  });
}
