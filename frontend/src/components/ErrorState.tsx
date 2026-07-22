import React from "react";
import { COLORS } from "../constants/colors";
import { Button } from "../vibes";
import { isApiError, isNetworkError } from "../services/errors";

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
      <div style={iconStyle}>⚠️</div>
      <div style={titleStyle}>{title}</div>
      <div style={messageStyle}>{message}</div>
      <Button variant="primary" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
}
