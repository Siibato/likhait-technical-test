import { Expense, ExpenseFormData } from "../types";
import { formatDate } from "../utils/expenseUtils";
import { Modal } from "../vibes";
import { ExpenseForm } from "./ExpenseForm";

interface EditExpenseModalProps {
  expense: Expense | null;
  isOpen: boolean;
  categories: Array<{ id: number; name: string }>;
  onClose: () => void;
  onUpdate: (id: number, data: ExpenseFormData) => Promise<void>;
}

export function EditExpenseModal({
  expense,
  isOpen,
  categories,
  onClose,
  onUpdate,
}: EditExpenseModalProps) {
  if (!expense) return null;

  const initialData = {
    amount: expense.amount.toString(),
    description: expense.description,
    category_id: expense.category_id.toString(),
    date: formatDate(new Date(expense.date)),
  };

  const handleUpdate = async (data: ExpenseFormData) => {
    await onUpdate(expense.id, data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Expense">
      <ExpenseForm
        categories={categories}
        initialData={initialData}
        onSubmit={handleUpdate}
        onCancel={onClose}
        submitLabel="Update Expense"
      />
    </Modal>
  );
}
