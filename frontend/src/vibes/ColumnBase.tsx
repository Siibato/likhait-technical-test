/**
 * Base column component for tables
 */

import React from "react";
import styles from "./ColumnBase.module.css";

interface ColumnBaseProps {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  width?: string;
  isHeader?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function ColumnBase({
  children,
  align = "left",
  width,
  isHeader = false,
  className = "",
  style,
}: ColumnBaseProps) {
  const classes = [
    styles.columnBase,
    isHeader ? styles["columnBase--header"] : "",
    styles[`align-${align}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const Tag = isHeader ? "th" : "td";

  return <Tag className={classes} style={{ ...style, width }}>{children}</Tag>;
}
