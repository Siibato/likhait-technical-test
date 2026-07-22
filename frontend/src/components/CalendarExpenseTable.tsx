import { useState } from "react";
import { Expense, ExpenseFormData } from "../types";
import { formatCurrency, formatDate } from "../utils/expenseUtils";
import { getCategoryEmoji } from "../constants/categoryEmojis";
import { Button, Pagination } from "../vibes";
import { EmptyState } from "./EmptyState";
import { EditExpenseModal } from "./EditExpenseModal";
import { DeleteExpenseModal } from "./DeleteExpenseModal";
import styles from "./CalendarExpenseTable.module.css";

interface CalendarExpenseTableProps {
  expenses: Expense[];
  categories: Array<{ id: number; name: string }>;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onUpdate: (id: number, data: ExpenseFormData) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onAddExpense?: () => void;
}

export function CalendarExpenseTable({
  expenses,
  categories,
  currentPage,
  totalPages,
  onPageChange,
  onUpdate,
  onDelete,
  onAddExpense,
}: CalendarExpenseTableProps) {
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [deletingExpense, setDeletingExpense] = useState<Expense | null>(null);

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const handleDelete = (expense: Expense) => {
    setDeletingExpense(expense);
  };

  if (expenses.length === 0) {
    return (
      <EmptyState
        title="No expenses found"
        message="Add your first expense to get started!"
        actionLabel="Add Expense"
        onAction={onAddExpense}
      />
    );
  }

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Date</th>
            <th className={styles.th}>Description</th>
            <th className={styles.th}>Category</th>
            <th className={styles.th}>Amount</th>
            <th className={`${styles.th} ${styles.actionsCell}`}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td className={styles.td}>{formatDate(new Date(expense.date))}</td>
              <td className={styles.td}>{expense.description}</td>
              <td className={styles.td}>
                <span className={styles.categoryCell}>
                  <span>{getCategoryEmoji(expense.category)}</span>
                  <span>{expense.category}</span>
                </span>
              </td>
              <td className={`${styles.td} ${styles.amountCell}`}>
                {formatCurrency(expense.amount)}
              </td>
              <td className={`${styles.td} ${styles.actionsCell}`}>
                <div className={styles.actionButtons}>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => handleEdit(expense)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => handleDelete(expense)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

      <EditExpenseModal
        expense={editingExpense}
        isOpen={editingExpense !== null}
        categories={categories}
        onClose={() => setEditingExpense(null)}
        onUpdate={onUpdate}
      />

      <DeleteExpenseModal
        expense={deletingExpense}
        isOpen={deletingExpense !== null}
        onClose={() => setDeletingExpense(null)}
        onDelete={onDelete}
      />
    </>
  );
}
