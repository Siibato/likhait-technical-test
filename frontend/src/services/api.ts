/**
 * API service functions for communicating with the backend.
 */

import { request } from "./apiClient";
import { Expense, ExpenseFormData, PaginatedExpensesResponse } from "../types";

export async function getExpenses(
  year: number,
  month: number,
  page: number = 1,
  perPage: number = 10,
): Promise<PaginatedExpensesResponse> {
  return request<PaginatedExpensesResponse>("/expenses", {
    params: { year, month, page, per_page: perPage },
  });
}

export async function fetchCategories(): Promise<
  Array<{ id: number; name: string }>
> {
  return request<Array<{ id: number; name: string }>>("/categories");
}

export async function createCategory(
  name: string,
): Promise<{ id: number; name: string }> {
  return request<{ id: number; name: string }>("/categories", {
    method: "POST",
    body: JSON.stringify({ category: { name } }),
  });
}

export async function createExpense(data: ExpenseFormData): Promise<Expense> {
  const expenseData = {
    description: data.description,
    amount: Number(data.amount),
    category_id: Number(data.category_id),
    date: data.date,
  };

  return request<Expense>("/expenses", {
    method: "POST",
    body: JSON.stringify({ expense: expenseData }),
  });
}

export async function updateExpense(
  id: number,
  data: Partial<ExpenseFormData>,
): Promise<Expense> {
  const expenseData: Record<string, unknown> = {};

  if (data.description !== undefined) {
    expenseData.description = data.description;
  }
  if (data.amount !== undefined) {
    expenseData.amount = Number(data.amount);
  }
  if (data.category_id !== undefined) {
    expenseData.category_id = Number(data.category_id);
  }
  if (data.date !== undefined) {
    expenseData.date = data.date;
  }

  return request<Expense>(`/expenses/${id}`, {
    method: "PUT",
    body: JSON.stringify({ expense: expenseData }),
  });
}

export async function deleteExpense(id: number): Promise<void> {
  return request<void>(`/expenses/${id}`, {
    method: "DELETE",
  });
}
