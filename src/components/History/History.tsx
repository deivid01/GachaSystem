import styles from './History.module.css';

interface HistoryProps {
  history: number;
  onReset: () => void;
}

export const History = ({ history, onReset }: HistoryProps) => {
  const pityProgress = (history / 100) * 100;
  const pullsUntilPity = 100 - history;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Pity Counter</h3>
        <button onClick={onReset} className={styles.resetButton} aria-label="Reset history">
          🔄 Reset
        </button>
      </div>

      <div className={styles.counterDisplay}>
        <div className={styles.currentPulls}>
          <span className={styles.number}>{history}</span>
          <span className={styles.separator}>/</span>
          <span className={styles.total}>100</span>
        </div>
        <p className={styles.untilPity}>
          {pullsUntilPity > 0
            ? `${pullsUntilPity} pulls until guaranteed 5⭐`
            : 'Guaranteed 5⭐ on next pull!'}
        </p>
      </div>

      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${pityProgress}%` }}
        />
      </div>
    </div>
  );
};
