/**
 * Reusable Pagination component
 */

import React from "react";
import styles from "./Pagination.module.css";
import { Button } from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  style,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`${styles.container} ${className}`} style={style}>
      <Button
        variant="secondary"
        size="small"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span className={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="secondary"
        size="small"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
}
