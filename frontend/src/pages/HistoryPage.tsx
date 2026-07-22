import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useExpenses } from "../hooks/useExpenses";
import { useCategories } from "../hooks/useCategories";
import { useCreateExpense } from "../hooks/useCreateExpense";
import { useCreateCategory } from "../hooks/useCreateCategory";
import { useUpdateExpense } from "../hooks/useUpdateExpense";
import { useDeleteExpense } from "../hooks/useDeleteExpense";
import { ExpenseFormData } from "../types";
import YearNavigation from "../components/YearNavigation";
import { MonthNavigation } from "../components/MonthNavigation";
import CategoryBreakdown from "../components/CategoryBreakdown";
import { CalendarExpenseTable } from "../components/CalendarExpenseTable";
import { ExpenseForm } from "../components/ExpenseForm";
import { CategoryForm } from "../components/CategoryForm";
import { SkeletonSummary } from "../components/SkeletonSummary";
import { SkeletonTable } from "../components/SkeletonTable";
import { ErrorState } from "../components/ErrorState";
import { Modal, Button } from "../vibes";
import styles from "./HistoryPage.module.css";

const HistoryPage: React.FC = () => {
  // Get year and month from URL params, default to current date if not provided
  const [selectedYear, setSelectedYear] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const currentDate = new Date();
    const yearParam = params.get("year");
    return yearParam ? parseInt(yearParam) : currentDate.getFullYear();
  });
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const currentDate = new Date();
    const monthParam = params.get("month");
    return monthParam ? parseInt(monthParam) : currentDate.getMonth() + 1;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const {
    data: expensesData,
    isLoading,
    error: expensesError,
    refetch,
  } = useExpenses(selectedYear, selectedMonth, currentPage);

  const expenses = expensesData?.expenses ?? [];
  const totalPages = expensesData?.meta?.total_pages ?? 1;
  const { data: categories = [] } = useCategories();
  const createExpenseMutation = useCreateExpense();
  const createCategoryMutation = useCreateCategory();
  const updateExpenseMutation = useUpdateExpense();
  const deleteExpenseMutation = useDeleteExpense();

  // Update URL when year or month changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("year", selectedYear.toString());
    params.set("month", selectedMonth.toString());
    const newURL = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newURL);
  }, [selectedYear, selectedMonth]);

  const handleYearChange = useCallback((year: number) => {
    setSelectedYear(year);
    setCurrentPage(1);
  }, []);

  const handleMonthChange = useCallback((month: number, year: number) => {
    setSelectedYear(year);
    setSelectedMonth(month);
    setCurrentPage(1);
  }, []);

  const handleAddExpense = useCallback(
    async (data: ExpenseFormData) => {
      await createExpenseMutation.mutateAsync(data);
      setIsModalOpen(false);
    },
    [createExpenseMutation],
  );

  const handleAddCategory = useCallback(
    async (name: string) => {
      await createCategoryMutation.mutateAsync(name);
      setIsCategoryModalOpen(false);
    },
    [createCategoryMutation],
  );

  const handleUpdateExpense = useCallback(
    async (id: number, data: ExpenseFormData) => {
      await updateExpenseMutation.mutateAsync({ id, data });
    },
    [updateExpenseMutation],
  );

  const handleDeleteExpense = useCallback(
    async (id: number) => {
      await deleteExpenseMutation.mutateAsync(id);
    },
    [deleteExpenseMutation],
  );

  // Calculate category breakdown
  const { categoriesSummary, total, totalCount } = useMemo(() => {
    const categoryData = expenses.reduce(
      (acc, expense) => {
        const category = expense.category || "Uncategorized";
        if (!acc[category]) {
          acc[category] = { category, amount: 0, count: 0 };
        }
        acc[category].amount += Number(expense.amount);
        acc[category].count += 1;
        return acc;
      },
      {} as Record<string, { category: string; amount: number; count: number }>,
    );

    const categoriesSummary = Object.values(categoryData).sort(
      (a, b) => b.amount - a.amount,
    );
    const total = categoriesSummary.reduce((sum, cat) => sum + cat.amount, 0);
    const totalCount = categoriesSummary.reduce((sum, cat) => sum + cat.count, 0);

    return { categoriesSummary, total, totalCount };
  }, [expenses]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <h1 className={styles.title}>Expense History</h1>
          <YearNavigation
            currentYear={selectedYear}
            onYearChange={handleYearChange}
          />
        </div>
        <div className={styles.headerActions}>
          <Button variant="secondary" onClick={() => setIsCategoryModalOpen(true)}>
            Add Category
          </Button>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Add Expense
          </Button>
        </div>
      </div>

      <MonthNavigation
        currentMonth={selectedMonth}
        currentYear={selectedYear}
        onMonthChange={handleMonthChange}
      />

      <div>
        {isLoading ? (
          <>
            <SkeletonSummary />
            <SkeletonTable />
          </>
        ) : expensesError ? (
          <ErrorState error={expensesError} onRetry={() => refetch()} />
        ) : (
          <>
            <CategoryBreakdown
              categories={categoriesSummary}
              total={total}
              totalCount={totalCount}
            />
            <div className={styles.tableContainer}>
              <CalendarExpenseTable
                expenses={expenses}
                categories={categories}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                onUpdate={handleUpdateExpense}
                onDelete={handleDeleteExpense}
                onAddExpense={() => setIsModalOpen(true)}
              />
            </div>
          </>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Expense"
      >
        <ExpenseForm
          categories={categories}
          onSubmit={handleAddExpense}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        title="Add New Category"
      >
        <CategoryForm
          onSubmit={handleAddCategory}
          onCancel={() => setIsCategoryModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default HistoryPage;
