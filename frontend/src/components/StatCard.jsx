import styles from "../styles/StatCard.module.css";

export default function StatCard({ color, icon, title, value }) {
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <div className={styles.top}>
        <span className={styles.icon}>{icon}</span>
        <div>
          <div className={styles.title}>{title}</div>
          <div className={styles.value}>{value}</div>
        </div>
      </div>
      <div className={styles.more}>More info →</div>
    </div>
  );
}
