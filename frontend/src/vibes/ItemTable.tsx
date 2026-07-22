/**
 * Reusable ItemTable component
 */

import React from "react";
import styles from "./ItemTable.module.css";

interface Column {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  width?: string;
  render?: (item: any) => React.ReactNode;
}

interface ItemTableProps {
  columns: Column[];
  data: any[];
  emptyMessage?: string;
  className?: string;
  style?: React.CSSProperties;
}

function getAlignClass(align: Column["align"]) {
  switch (align) {
    case "center":
      return { textAlign: "center" as const };
    case "right":
      return { textAlign: "right" as const };
    default:
      return { textAlign: "left" as const };
  }
}

export function ItemTable({
  columns,
  data,
  emptyMessage = "No data available",
  className = "",
  style,
}: ItemTableProps) {
  if (data.length === 0) {
    return (
      <div className={`${styles.tableWrapper} ${className}`} style={style}>
        <div className={styles.empty}>{emptyMessage}</div>
      </div>
    );
  }

  return (
    <table className={`${styles.tableWrapper} ${className}`} style={style}>
      <thead className={styles.thead}>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className={styles.th}
              style={{ ...getAlignClass(column.align), width: column.width }}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td
                key={column.key}
                className={styles.td}
                style={getAlignClass(column.align)}
              >
                {column.render
                  ? column.render(item)
                  : (item[column.key] ?? "-")}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
