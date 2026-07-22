import { useState } from "react";
import { CATEGORY_EMOJIS } from "../constants/categoryEmojis";
import styles from "./CategoryBreakdown.module.css";

interface CategoryData {
  category: string;
  amount: number;
  count: number;
}

interface CategoryBreakdownProps {
  categories: CategoryData[];
  total: number;
  totalCount: number;
}

export default function CategoryBreakdown({
  categories,
  total,
  totalCount,
}: CategoryBreakdownProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const formatAmount = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.total}
        onClick={() => setIsCollapsed(!isCollapsed)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsCollapsed(!isCollapsed);
          }
        }}
      >
        <span className={styles.totalLabel}>TOTAL:</span>
        <span className={styles.totalAmount}>{formatAmount(total)}</span>
        <span className={styles.totalCount}>({totalCount} transactions)</span>
        <button
          className={styles.toggleButton}
          aria-label={isCollapsed ? "Expand" : "Collapse"}
          onClick={(e) => {
            e.stopPropagation();
            setIsCollapsed(!isCollapsed);
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            className={[
              styles.toggleIcon,
              isCollapsed ? styles.toggleIconCollapsed : "",
            ].filter(Boolean).join(" ")}
          >
            <path d="M8 11l-5-5h10z" />
          </svg>
        </button>
      </div>

      {!isCollapsed && (
        <div className={styles.list}>
          {categories.map((category) => (
            <div key={category.category} className={styles.item}>
              <div className={styles.itemInfo}>
                <span className={styles.itemIcon}>
                  {CATEGORY_EMOJIS[category.category] || "📊"}
                </span>
                <div className={styles.itemDetails}>
                  <div className={styles.itemName}>{category.category}</div>
                  <div className={styles.itemCount}>
                    {category.count} transaction
                    {category.count !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>
              <div className={styles.itemAmount}>{formatAmount(category.amount)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
