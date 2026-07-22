/**
 * Reusable SelectBox component
 */

import { useId } from "react";
import styles from "./SelectBox.module.css";

interface SelectBoxProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  options: Array<{ value: string; label: string }>;
}

export function SelectBox({
  label,
  error,
  fullWidth = false,
  options,
  className = "",
  style,
  id,
  ...props
}: SelectBoxProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  const containerClasses = [
    styles.container,
    fullWidth ? styles["container--fullWidth"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const selectClasses = [styles.select, error ? styles["select--error"] : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses} style={style}>
      {label && <label htmlFor={selectId} className={styles.label}>{label}</label>}
      <select id={selectId} className={selectClasses} {...props}>
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
