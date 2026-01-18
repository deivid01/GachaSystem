import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { Character } from '../../types';
import styles from './GachaPullAnimation.module.css';

interface GachaPullAnimationProps {
  character: Character | null;
  characters?: Character[];
  isVisible: boolean;
  onAnimationEnd: () => void;
}

export const GachaPullAnimation = ({
  character,
  characters,
  isVisible,
  onAnimationEnd,
}: GachaPullAnimationProps) => {
  const [phase, setPhase] = useState<'sky' | 'pull' | 'reveal'>('sky');

  useEffect(() => {
    if (!isVisible) {
      setPhase('sky');
      return;
    }

    const timeline = [
      { delay: 0, phase: 'sky' as const },
      { delay: 1800, phase: 'pull' as const },
      { delay: 3000, phase: 'reveal' as const },
    ];

    const timers: ReturnType<typeof setTimeout>[] = [];

    timeline.forEach(({ delay, phase: newPhase }) => {
      const timer = setTimeout(() => setPhase(newPhase), delay);
      timers.push(timer);
    });

    const endTimer = setTimeout(onAnimationEnd, 4500);
    timers.push(endTimer);

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [isVisible, onAnimationEnd]);

  const primaryCharacter: Character | null =
    character ?? (characters && (characters.find(c => c.rarity === 5) || characters[characters.length - 1])) ?? null;
  const isRare = primaryCharacter?.rarity === 5;
  const rarityColor = isRare ? '#ffd60a' : '#a855f7';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.container}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Phase 1: Céu estrelado */}
          {phase === 'sky' && (
            <motion.div
              className={styles.skyPhase}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className={styles.stars}>
                {Array.from({ length: 30 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={styles.star}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      delay: Math.random() * 1.5,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>

              {/* Estrelas caindo do céu */}
              <div className={styles.fallingStars}>
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.div
                    key={`fall-${i}`}
                    className={styles.fallingStar}
                    initial={{
                      x: Math.random() * window.innerWidth,
                      y: -50,
                      rotate: Math.random() * 360,
                      opacity: 0,
                    }}
                    animate={{
                      y: window.innerHeight + 50,
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2.2 + Math.random() * 1.2,
                      delay: Math.random() * 1.5,
                      repeat: Infinity,
                      repeatDelay: Math.random() * 1.5,
                    }}
                    style={{
                      boxShadow: `0 0 12px ${rarityColor}`,
                      backgroundColor: rarityColor,
                    }}
                  />
                ))}
              </div>

              <motion.div
                className={styles.text}
                animate={{ y: [-20, 20, -20] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <h2>Desejando...</h2>
              </motion.div>
            </motion.div>
          )}

          {/* Phase 2: Puxar */}
          {(phase === 'pull' || phase === 'reveal') && (
            <motion.div
              className={styles.pullPhase}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className={styles.light}
                animate={{
                  scale: [1, 1.5, 2],
                  opacity: [1, 0.8, 0],
                }}
                transition={{ duration: 1.2 }}
                style={{
                  backgroundColor: rarityColor,
                  boxShadow: `0 0 100px ${rarityColor}`,
                }}
              />

              <motion.div
                className={styles.glow}
                animate={{
                  scale: [0.8, 1.2],
                  opacity: [0.8, 0],
                }}
                transition={{ duration: 1.5 }}
                style={{
                  backgroundColor: rarityColor,
                }}
              />
            </motion.div>
          )}

          {/* Phase 3: Revelação */}
          {phase === 'reveal' && (
            <motion.div className={styles.revealPhase}>
              {/* Particulas de fundo */}
              <div className={styles.particles}>
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={styles.particle}
                    initial={{
                      x: 0,
                      y: 0,
                      opacity: 1,
                    }}
                    animate={{
                      x: (Math.random() - 0.5) * 400,
                      y: (Math.random() - 0.5) * 400,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 1,
                      ease: 'easeOut',
                    }}
                    style={{
                      backgroundColor: rarityColor,
                    }}
                  />
                ))}
              </div>

              {/* Revelar todos os personagens do pull */}
              {characters && characters.length > 0 ? (
                <motion.div
                  className={styles.revealGrid}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {characters.map((c, idx) => (
                    <motion.div
                      key={`${c.id}-${idx}`}
                      className={`${styles.revealItem} ${c.rarity === 5 ? styles.fiveStar : styles.fourStar}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.08 }}
                    >
                      <img
                        src={c.image}
                        alt={c.name}
                        className={styles.revealImage}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.opacity = '0.5';
                        }}
                      />
                      <div className={styles.revealName}>{c.name}</div>
                      <div className={styles.revealRarity}>{'⭐'.repeat(c.rarity)}</div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                primaryCharacter && (
                  <motion.div
                    className={`${styles.characterCard} ${
                      isRare ? styles.fiveStar : styles.fourStar
                    }`}
                    initial={{ scale: 0, rotateY: 180 }}
                    animate={{ scale: 1, rotateY: 0 }}
                    transition={{
                      duration: 0.8,
                      type: 'spring',
                      stiffness: 100,
                    }}
                  >
                    <motion.img
                      src={primaryCharacter.image}
                      alt={primaryCharacter.name}
                      className={styles.characterImage}
                      animate={{ y: [20, 0] }}
                      transition={{ duration: 0.5 }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.opacity = '0.5';
                      }}
                    />

                    <motion.div
                      className={styles.characterInfo}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3>{primaryCharacter.name}</h3>
                      <p className={styles.rarity}>
                        {'⭐'.repeat(primaryCharacter.rarity)}
                      </p>
                    </motion.div>
                  </motion.div>
                )
              )}

              {/* Efeitos visuais 5★ */}
              {isRare && (
                <motion.div
                  className={styles.rareEffect}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              )}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
