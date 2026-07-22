/**
 * Reusable TextField component
 */

import { useId } from "react";
import styles from "./TextField.module.css";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export function TextField({
  label,
  error,
  fullWidth = false,
  className = "",
  style,
  id,
  ...props
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const containerClasses = [
    styles.container,
    fullWidth ? styles["container--fullWidth"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inputClasses = [styles.input, error ? styles["input--error"] : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses} style={style}>
      {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
      <input id={inputId} className={inputClasses} {...props} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
