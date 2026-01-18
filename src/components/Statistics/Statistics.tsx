import { motion } from 'framer-motion';
import styles from './Statistics.module.css';
import type { PullStatistics } from '../../types';

interface StatisticsProps {
  statistics: PullStatistics;
}

export const Statistics = ({ statistics }: StatisticsProps) => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className={styles.title}>Estatísticas</h2>

      <div className={styles.grid}>
        <motion.div className={styles.stat} variants={itemVariants}>
          <div className={styles.label}>Total de Pulls</div>
          <div className={styles.value}>{statistics.totalPulls}</div>
        </motion.div>

        <motion.div className={styles.stat} variants={itemVariants}>
          <div className={styles.label}>⭐⭐⭐⭐⭐ (5★)</div>
          <div className={`${styles.value} ${styles.fiveStar}`}>
            {statistics.totalFiveStars}
          </div>
        </motion.div>

        <motion.div className={styles.stat} variants={itemVariants}>
          <div className={styles.label}>⭐⭐⭐⭐ (4★)</div>
          <div className={`${styles.value} ${styles.fourStar}`}>
            {statistics.totalFourStars}
          </div>
        </motion.div>

        <motion.div className={styles.stat} variants={itemVariants}>
          <div className={styles.label}>Média por 5★</div>
          <div className={styles.value}>
            {statistics.averagePullsPerFiveStar || 0}
          </div>
        </motion.div>

        {statistics.lastPullTime && (
          <motion.div className={styles.stat} variants={itemVariants}>
            <div className={styles.label}>Último Pull</div>
            <div className={styles.value}>
              {new Date(statistics.lastPullTime).toLocaleDateString('pt-BR')}
            </div>
          </motion.div>
        )}
      </div>

      {statistics.pullHistory.length > 0 && (
        <motion.div className={styles.history} variants={itemVariants}>
          <h3 className={styles.historyTitle}>Histórico Recente</h3>
          <div className={styles.historyList}>
            {statistics.pullHistory.slice(0, 10).map((record, index) => (
              <motion.div
                key={index}
                className={`${styles.historyItem} ${
                  record.rarity === 5 ? styles.historyFiveStar : styles.historyFourStar
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <span className={styles.name}>{record.characterName}</span>
                <span className={styles.rarity}>{'⭐'.repeat(record.rarity)}</span>
                <span className={styles.date}>
                  {new Date(record.timestamp).toLocaleDateString('pt-BR')}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
