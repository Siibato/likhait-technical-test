/**
 * Type definitions for the Expense Tracking System
 */

export interface Expense {
  id: number;
  amount: number;
  description: string;
  category_id: number;
  category: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface ExpenseFormData {
  amount: string;
  description: string;
  category_id: string;
  date: string;
}

export interface MonthlySummary {
  totalExpenses: number;
  categoryBreakdown: CategoryBreakdown[];
  topCategories: TopCategory[];
}

export interface CategoryBreakdown {
  category: string;
  total: number;
  percentage: number;
}

export interface TopCategory {
  category: string;
  total: number;
  count: number;
}

export interface DayExpenses {
  day: number;
  expenses: Expense[];
  total: number;
}

export interface CategorySummary {
  category: string;
  amount: number;
  count: number;
}

export interface MonthSummary {
  total_amount: number;
  total_count: number;
  categories: CategorySummary[];
}

export interface PaginationMeta {
  current_page: number;
  per_page: number;
  total_pages: number;
  total_count: number;
  summary: MonthSummary;
}

export interface PaginatedExpensesResponse {
  expenses: Expense[];
  meta: PaginationMeta;
}
