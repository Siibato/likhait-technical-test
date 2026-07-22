/**
 * Reusable FormControl component for consistent form field styling
 */

import React from "react";
import styles from "./FormControl.module.css";

interface FormControlProps {
  label?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function FormControl({
  label,
  error,
  required,
  children,
  fullWidth = false,
  className = "",
  style,
}: FormControlProps) {
  const containerClasses = [
    styles.container,
    fullWidth ? styles["container--fullWidth"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses} style={style}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
