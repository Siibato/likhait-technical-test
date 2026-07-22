import React from "react";
import { COLORS } from "../constants/colors";
import { Button } from "../vibes";

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = "No expenses yet",
  message = "Add your first expense to start tracking your spending.",
  actionLabel = "Add Expense",
  onAction,
}: EmptyStateProps) {
  const containerStyle: React.CSSProperties = {
    padding: "48px 24px",
    textAlign: "center",
    background: COLORS.background.main,
    borderRadius: "0.5rem",
    border: `1px solid ${COLORS.border}`,
  };

  const iconStyle: React.CSSProperties = {
    fontSize: "48px",
    marginBottom: "16px",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: COLORS.text.primary,
    marginBottom: "8px",
  };

  const messageStyle: React.CSSProperties = {
    fontSize: "1rem",
    color: COLORS.text.secondary,
    marginBottom: "24px",
  };

  return (
    <div style={containerStyle}>
      <div style={iconStyle}>📝</div>
      <div style={titleStyle}>{title}</div>
      <div style={messageStyle}>{message}</div>
      {onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
