import styles from "./QuickAddButton.module.css";

interface QuickAddButtonProps {
  onClick: () => void;
}

export function QuickAddButton({ onClick }: QuickAddButtonProps) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      aria-label="Add expense"
    >
      +
    </button>
  );
}
