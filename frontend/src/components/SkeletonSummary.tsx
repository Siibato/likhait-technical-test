import styles from "./SkeletonSummary.module.css";

export function SkeletonSummary() {
  return (
    <div className={styles.container}>
      <div className={styles.total}>
        <div className={[styles.pulse, styles.label].join(" ")} />
        <div className={[styles.pulse, styles.amount].join(" ")} />
        <div className={[styles.pulse, styles.count].join(" ")} />
        <div className={[styles.pulse, styles.toggle].join(" ")} />
      </div>
      <div className={styles.list}>
        <div className={styles.item}>
          <div className={styles.itemLeft}>
            <div className={[styles.pulse, styles.itemIcon].join(" ")} />
            <div>
              <div className={[styles.pulse, styles.itemName].join(" ")} />
              <div className={[styles.pulse, styles.itemCount].join(" ")} />
            </div>
          </div>
          <div className={[styles.pulse, styles.itemAmount].join(" ")} />
        </div>
        <div className={styles.item}>
          <div className={styles.itemLeft}>
            <div className={[styles.pulse, styles.itemIcon].join(" ")} />
            <div>
              <div className={[styles.pulse, styles.itemName].join(" ")} />
              <div className={[styles.pulse, styles.itemCount].join(" ")} />
            </div>
          </div>
          <div className={[styles.pulse, styles.itemAmount].join(" ")} />
        </div>
      </div>
    </div>
  );
}
