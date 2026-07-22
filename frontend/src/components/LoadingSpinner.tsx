import React from "react";
import { COLORS } from "../constants/colors";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
}

const SIZE_MAP = {
  small: 16,
  medium: 24,
  large: 32,
};

export function LoadingSpinner({ size = "medium" }: LoadingSpinnerProps) {
  const pixelSize = SIZE_MAP[size];

  const spinnerStyle: React.CSSProperties = {
    width: pixelSize,
    height: pixelSize,
    border: `3px solid ${COLORS.secondary.s03}`,
    borderTopColor: COLORS.primary.p06,
    borderRadius: "50%",
    animation: "loading-spinner-spin 0.8s linear infinite",
    display: "inline-block",
    flexShrink: 0,
  };

  return (
    <>
      <style>{`@keyframes loading-spinner-spin { to { transform: rotate(360deg); } }`}</style>
      <div style={spinnerStyle} />
    </>
  );
}
