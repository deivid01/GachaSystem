import { motion, AnimatePresence } from 'framer-motion';
import { GachaResult as GachaResultType } from '../../types';
import styles from './GachaResult.module.css';

interface GachaResultProps {
  result: GachaResultType | null;
  onClose: () => void;
}

export const GachaResult = ({ result, onClose }: GachaResultProps) => {
  if (!result) return null;

  const rarityClass = result.character?.rarity === 5 ? styles.fiveStar : styles.fourStar;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`${styles.result} ${rarityClass}`}>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close">
            ✕
          </button>
          
          <motion.p
            className={styles.message}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {result.message}
          </motion.p>

          {result.character && (
            <motion.div
              className={styles.imageContainer}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
            >
              <img
                src={result.character.image}
                alt={result.character.name}
                className={styles.characterImage}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className={styles.characterName}>
                {result.character.name}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
