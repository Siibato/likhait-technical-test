import styles from "./LoadingSpinner.module.css";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
}

export function LoadingSpinner({ size = "medium" }: LoadingSpinnerProps) {
  return (
    <div
      className={[styles.spinner, styles[size]].filter(Boolean).join(" ")}
      aria-hidden="true"
    />
  );
}
