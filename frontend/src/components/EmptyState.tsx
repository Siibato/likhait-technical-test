import { Button } from "../vibes";
import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = "No expenses yet",
  message = "Add your first expense to start tracking your spending.",
  actionLabel = "Add Expense",
  onAction,
}: EmptyStateProps) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>📝</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.message}>{message}</div>
      {onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
