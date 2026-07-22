/**
 * Reusable Button component
 */

import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  children,
  disabled,
  className = "",
  style,
  ...props
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    fullWidth ? styles["button--fullWidth"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} style={style} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
