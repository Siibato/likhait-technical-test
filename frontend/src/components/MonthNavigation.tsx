import styles from "./MonthNavigation.module.css";

interface MonthNavigationProps {
  currentMonth: number;
  currentYear: number;
  onMonthChange: (month: number, year: number) => void;
}

const MONTHS = [
  { label: "Jan", value: 1 },
  { label: "Feb", value: 2 },
  { label: "Mar", value: 3 },
  { label: "Apr", value: 4 },
  { label: "May", value: 5 },
  { label: "Jun", value: 6 },
  { label: "Jul", value: 7 },
  { label: "Aug", value: 8 },
  { label: "Sep", value: 9 },
  { label: "Oct", value: 10 },
  { label: "Nov", value: 11 },
  { label: "Dec", value: 12 },
];

export function MonthNavigation({
  currentMonth,
  currentYear,
  onMonthChange,
}: MonthNavigationProps) {
  const handlePreviousMonth = () => {
    if (currentMonth === 1) {
      onMonthChange(12, currentYear - 1);
    } else {
      onMonthChange(currentMonth - 1, currentYear);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      onMonthChange(1, currentYear + 1);
    } else {
      onMonthChange(currentMonth + 1, currentYear);
    }
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.navButton}
        onClick={handlePreviousMonth}
        title="Previous month"
      >
        ←
      </button>
      <div className={styles.container}>
        {MONTHS.map((month) => (
          <button
            key={month.value}
            className={[
              styles.monthButton,
              currentMonth === month.value ? styles.selected : "",
            ].filter(Boolean).join(" ")}
            onClick={() => onMonthChange(month.value, currentYear)}
          >
            {month.label}
          </button>
        ))}
      </div>
      <button
        className={styles.navButton}
        onClick={handleNextMonth}
        title="Next month"
      >
        →
      </button>
    </div>
  );
}
