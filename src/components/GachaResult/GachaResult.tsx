import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { GachaPullAnimation } from '../GachaPullAnimation/GachaPullAnimation';
import { getCharacterImageUrl } from '../../services/characterImages';
import { GachaResult as GachaResultType } from '../../types';
import styles from './GachaResult.module.css';

interface GachaResultProps {
  result: GachaResultType | null;
  onClose: () => void;
}

export const GachaResult = ({ result, onClose }: GachaResultProps) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [displayImages, setDisplayImages] = useState<Record<string, string>>({});

  useEffect(() => {
    if (result?.characters && result.characters.length > 0) {
      setShowAnimation(true);

      // Carregar imagens dinâmicas para todos os personagens
      Promise.all(
        result.characters.map(char =>
          getCharacterImageUrl(char).then(url => ({
            id: char.id,
            url,
          }))
        )
      ).then(images => {
        const imageMap: Record<string, string> = {};
        images.forEach(img => {
          imageMap[img.id] = img.url;
        });
        setDisplayImages(imageMap);
      }).catch(err => {
        console.error('Erro ao carregar imagens:', err);
      });
    }
  }, [result]);

  if (!result || result.characters.length === 0) return null;

  // Mostrar primeiro personagem na animação (geralmente um 5★ ou 4★)
  const mainCharacter = result.characters[result.characters.length - 1];
  const mainCharacterRarity = mainCharacter.rarity === 5;

  return (
    <>
      <GachaPullAnimation
        character={mainCharacter}
        characters={result.characters}
        isVisible={showAnimation}
        onAnimationEnd={() => setShowAnimation(false)}
      />

      <AnimatePresence>
        {!showAnimation && (
          <motion.div
            className={styles.container}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.result}>
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

              {result.characters.length > 0 && (
                <motion.div
                  className={styles.characterGrid}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {result.characters.map((character, index) => (
                    <motion.div
                      key={`${character.id}-${index}`}
                      className={`${styles.characterCard} ${
                        character.rarity === 5 ? styles.fiveStar : styles.fourStar
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <img
                        src={displayImages[character.id] || character.image}
                        alt={character.name}
                        className={styles.cardImage}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = character.image;
                        }}
                      />
                      <div className={styles.cardName}>{character.name}</div>
                      <div className={styles.cardRarity}>
                        {'⭐'.repeat(character.rarity)}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
