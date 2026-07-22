import { useState } from "react";
import { Expense } from "../types";
import { formatCurrency } from "../utils/expenseUtils";
import { Modal, Button } from "../vibes";
import styles from "./DeleteExpenseModal.module.css";

interface DeleteExpenseModalProps {
  expense: Expense | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: number) => Promise<void>;
}

export function DeleteExpenseModal({
  expense,
  isOpen,
  onClose,
  onDelete,
}: DeleteExpenseModalProps) {
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!expense) return;
    setError("");
    setIsDeleting(true);
    try {
      await onDelete(expense.id);
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete expense",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Expense">
      <div className={styles.deleteConfirmation}>
        <p className={styles.deleteMessage}>
          Are you sure you want to delete this expense?
        </p>
        {expense && (
          <p className={styles.deleteDescription}>
            <strong>{expense.description}</strong> -{" "}
            {formatCurrency(expense.amount)}
          </p>
        )}
        {error && <p className={styles.deleteError}>{error}</p>}
        <div className={styles.deleteActions}>
          <Button variant="secondary" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
