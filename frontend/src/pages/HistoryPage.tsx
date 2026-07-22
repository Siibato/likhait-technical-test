import React, { useState, useEffect } from "react";
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
import { COLORS } from "../constants/colors";

const HistoryPage: React.FC = () => {
  // Get year and month from URL params, default to current date if not provided
  const getInitialYearMonth = () => {
    const params = new URLSearchParams(window.location.search);
    const currentDate = new Date();
    const yearParam = params.get("year");
    const monthParam = params.get("month");

    return {
      year: yearParam ? parseInt(yearParam) : currentDate.getFullYear(),
      month: monthParam ? parseInt(monthParam) : currentDate.getMonth() + 1,
    };
  };

  const initial = getInitialYearMonth();
  const [selectedYear, setSelectedYear] = useState(initial.year);
  const [selectedMonth, setSelectedMonth] = useState(initial.month);
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
  const updateURL = (year: number, month: number) => {
    const params = new URLSearchParams();
    params.set("year", year.toString());
    params.set("month", month.toString());
    const newURL = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newURL);
  };

  useEffect(() => {
    updateURL(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth]);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

  const handleMonthChange = (month: number, year: number) => {
    setSelectedYear(year);
    setSelectedMonth(month);
    setCurrentPage(1);
  };

  const handleAddExpense = async (data: ExpenseFormData) => {
    await createExpenseMutation.mutateAsync(data);
    setIsModalOpen(false);
  };

  const handleAddCategory = async (name: string) => {
    await createCategoryMutation.mutateAsync(name);
    setIsCategoryModalOpen(false);
  };

  const handleUpdateExpense = async (id: number, data: ExpenseFormData) => {
    await updateExpenseMutation.mutateAsync({ id, data });
  };

  const handleDeleteExpense = async (id: number) => {
    await deleteExpenseMutation.mutateAsync(id);
  };

  // Calculate category breakdown
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

  const pageStyle: React.CSSProperties = {
    padding: "48px 64px",
    minHeight: "100vh",
    background: COLORS.secondary.s01,
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    justifyContent: "space-between",
  };

  const leftHeaderStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "24px",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "40px",
    fontWeight: 700,
    color: COLORS.secondary.s10,
    margin: 0,
    flexShrink: 0,
  };

  const headerActionsStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <div style={leftHeaderStyle}>
          <h1 style={titleStyle}>Expense History</h1>
          <YearNavigation
            currentYear={selectedYear}
            onYearChange={handleYearChange}
          />
        </div>
        <div style={headerActionsStyle}>
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
            <div style={{ marginTop: "32px" }}>
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
