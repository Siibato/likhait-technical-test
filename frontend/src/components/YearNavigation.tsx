import styles from "./YearNavigation.module.css";

interface YearNavigationProps {
  currentYear: number;
  onYearChange: (year: number) => void;
}

export function YearNavigation({
  currentYear,
  onYearChange,
}: YearNavigationProps) {
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => onYearChange(currentYear - 1)}
      >
        ←
      </button>
      <div className={styles.year}>{currentYear}</div>
      <button
        className={styles.button}
        onClick={() => onYearChange(currentYear + 1)}
      >
        →
      </button>
    </div>
  );
}

export default YearNavigation;
