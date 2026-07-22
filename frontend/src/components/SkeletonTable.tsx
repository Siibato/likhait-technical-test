import React from "react";
import { COLORS } from "../constants/colors";

const PULSE_STYLE: React.CSSProperties = {
  background: COLORS.secondary.s03,
  borderRadius: "6px",
  animation: "skeleton-pulse 1.5s ease-in-out infinite",
  height: "16px",
};

export function SkeletonTable() {
  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: COLORS.background.main,
    borderRadius: "0.5rem",
    overflow: "hidden",
    border: `1px solid ${COLORS.border}`,
    marginTop: "32px",
  };

  const theadStyle: React.CSSProperties = {
    backgroundColor: COLORS.background.card,
  };

  const thStyle: React.CSSProperties = {
    padding: "0.75rem",
    textAlign: "left",
    borderBottom: `2px solid ${COLORS.border}`,
  };

  const tdStyle: React.CSSProperties = {
    padding: "0.75rem",
    borderBottom: `1px solid ${COLORS.border}`,
  };

  const headerBars = ["80px", "40%", "30%", "80px", "80px"];
  const cellWidths = ["80px", "40%", "30%", "80px", "80px"];

  const rows = Array.from({ length: 5 });

  return (
    <>
      <style>{`@keyframes skeleton-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
      <table style={tableStyle}>
        <thead style={theadStyle}>
          <tr>
            {headerBars.map((width, index) => (
              <th key={index} style={thStyle}>
                <div style={{ ...PULSE_STYLE, width }} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((_, rowIndex) => (
            <tr key={rowIndex}>
              {cellWidths.map((width, cellIndex) => (
                <td key={cellIndex} style={tdStyle}>
                  <div style={{ ...PULSE_STYLE, width }} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
