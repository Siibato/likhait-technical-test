/**
 * Form component for adding a new category
 */

import { useState, FormEvent } from "react";
import { TextField, Button } from "../vibes";
import { LoadingSpinner } from "./LoadingSpinner";
import styles from "./CategoryForm.module.css";

interface CategoryFormProps {
  onSubmit: (name: string) => Promise<void>;
  onCancel: () => void;
}

export function CategoryForm({ onSubmit, onCancel }: CategoryFormProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmed = name.trim();
    if (!trimmed) {
      setError("Category name is required");
      return;
    }

    setError("");
    setIsSubmitting(true);
    onSubmit(trimmed)
      .then(() => setName(""))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to create category"),
      )
      .finally(() => setIsSubmitting(false));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <TextField
        label="Category Name"
        type="text"
        placeholder="Enter category name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError("");
        }}
        error={error}
        fullWidth
        required
      />

      <div className={styles.buttonGroup}>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          fullWidth
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner size="small" />
              <span>Creating...</span>
            </>
          ) : (
            "Add Category"
          )}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
