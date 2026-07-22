import styles from "./Sidebar.module.css";

interface SidebarProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function Sidebar({
  onNavigate,
  currentPage = "history",
  isCollapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  return (
    <aside
      className={[
        styles.sidebar,
        isCollapsed ? styles.collapsed : styles.expanded,
      ].join(" ")}
    >
      <div className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>$</span>
          <div
            className={[
              styles.logoText,
              isCollapsed ? styles.logoTextCollapsed : "",
            ].filter(Boolean).join(" ")}
          >
            <div className={styles.logoTitle}>Expense Tracker</div>
          </div>
        </div>
        <button
          className={styles.toggleButton}
          aria-label="Toggle sidebar"
          onClick={onToggleCollapse}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={[
              styles.toggleIcon,
              isCollapsed ? styles.toggleIconCollapsed : "",
            ].filter(Boolean).join(" ")}
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      <nav className={styles.nav}>
        <button
          className={[
            styles.navItem,
            currentPage === "history" ? styles.active : "",
            isCollapsed ? styles.navItemCollapsed : styles.navItemExpanded,
          ].filter(Boolean).join(" ")}
          onClick={() => onNavigate?.("history")}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className={isCollapsed ? styles.navTextCollapsed : styles.navText}>
            History
          </span>
        </button>
      </nav>
    </aside>
  );
}
