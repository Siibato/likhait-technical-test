import { Button } from "../vibes";
import { isApiError, isNetworkError } from "../services/errors";
import styles from "./ErrorState.module.css";

interface ErrorStateProps {
  error: unknown;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  let title = "Something went wrong";
  let message = "An unexpected error occurred. Please try again.";

  if (isNetworkError(error)) {
    title = "Unable to reach the server";
    message = "Please check your connection and try again.";
  } else if (isApiError(error)) {
    title = "Server error";
    message = error.message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className={styles.container}>
      <div className={styles.icon}>⚠️</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.message}>{message}</div>
      <Button variant="primary" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
}
