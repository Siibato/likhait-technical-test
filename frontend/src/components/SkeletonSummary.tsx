import React from "react";
import { COLORS } from "../constants/colors";

const PULSE_STYLE: React.CSSProperties = {
  background: COLORS.secondary.s03,
  borderRadius: "6px",
  animation: "skeleton-pulse 1.5s ease-in-out infinite",
};

export function SkeletonSummary() {
  const containerStyle: React.CSSProperties = {
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  };

  const totalStyle: React.CSSProperties = {
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    borderBottom: `1px solid ${COLORS.secondary.s04}`,
    background: COLORS.secondary.s01,
  };

  const labelStyle: React.CSSProperties = {
    ...PULSE_STYLE,
    width: "48px",
    height: "14px",
  };

  const amountStyle: React.CSSProperties = {
    ...PULSE_STYLE,
    width: "140px",
    height: "32px",
  };

  const countStyle: React.CSSProperties = {
    ...PULSE_STYLE,
    width: "100px",
    height: "14px",
    marginLeft: "auto",
  };

  const toggleStyle: React.CSSProperties = {
    ...PULSE_STYLE,
    width: "32px",
    height: "32px",
    borderRadius: "6px",
    flexShrink: 0,
  };

  const listStyle: React.CSSProperties = {
    padding: "8px",
  };

  const itemStyle: React.CSSProperties = {
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: COLORS.secondary.s01,
    borderRadius: "8px",
    marginBottom: "8px",
  };

  const itemLeftStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  };

  const itemIconStyle: React.CSSProperties = {
    ...PULSE_STYLE,
    width: "48px",
    height: "48px",
    borderRadius: "10px",
  };

  const itemNameStyle: React.CSSProperties = {
    ...PULSE_STYLE,
    width: "120px",
    height: "18px",
    marginBottom: "8px",
  };

  const itemCountStyle: React.CSSProperties = {
    ...PULSE_STYLE,
    width: "80px",
    height: "14px",
  };

  const itemAmountStyle: React.CSSProperties = {
    ...PULSE_STYLE,
    width: "80px",
    height: "24px",
  };

  return (
    <>
      <style>{`@keyframes skeleton-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
      <div style={containerStyle}>
        <div style={totalStyle}>
          <div style={labelStyle} />
          <div style={amountStyle} />
          <div style={countStyle} />
          <div style={toggleStyle} />
        </div>
        <div style={listStyle}>
          <div style={itemStyle}>
            <div style={itemLeftStyle}>
              <div style={itemIconStyle} />
              <div>
                <div style={itemNameStyle} />
                <div style={itemCountStyle} />
              </div>
            </div>
            <div style={itemAmountStyle} />
          </div>
          <div style={itemStyle}>
            <div style={itemLeftStyle}>
              <div style={itemIconStyle} />
              <div>
                <div style={itemNameStyle} />
                <div style={itemCountStyle} />
              </div>
            </div>
            <div style={itemAmountStyle} />
          </div>
        </div>
      </div>
    </>
  );
}
