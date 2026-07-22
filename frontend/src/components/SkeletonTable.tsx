import styles from "./SkeletonTable.module.css";

export function SkeletonTable() {
  const headerBars = ["80px", "40%", "30%", "80px", "80px"];
  const cellWidths = ["80px", "40%", "30%", "80px", "80px"];

  const rows = Array.from({ length: 5 });

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          {headerBars.map((width, index) => (
            <th key={index} className={styles.th}>
              <div className={styles.bar} style={{ width }} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((_, rowIndex) => (
          <tr key={rowIndex}>
            {cellWidths.map((width, cellIndex) => (
              <td key={cellIndex} className={styles.td}>
                <div className={styles.bar} style={{ width }} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
