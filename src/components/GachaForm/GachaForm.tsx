import { useState, FormEvent } from 'react';
import { useSound } from '../../hooks/useSound';
import styles from './GachaForm.module.css';

interface GachaFormProps {
  onPull: (pulls: number) => void;
  isLoading: boolean;
}

export const GachaForm = ({ onPull, isLoading }: GachaFormProps) => {
  const [pulls, setPulls] = useState<string>('');
  const { playClick } = useSound();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const pullsNumber = parseInt(pulls);
    if (pullsNumber && pullsNumber > 0 && pullsNumber <= 999) {
      onPull(pullsNumber);
    }
  };

  const handleQuickPull = (amount: number) => {
    playClick();
    setPulls(amount.toString());
    onPull(amount);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label htmlFor="pulls" className={styles.label}>
          How many pulls do you want to make?
        </label>
        <input
          type="number"
          id="pulls"
          name="pulls"
          value={pulls}
          onChange={(e) => setPulls(e.target.value)}
          max="999"
          min="1"
          className={styles.input}
          placeholder="Enter amount..."
          disabled={isLoading}
          required
        />
      </div>

      <div className={styles.quickButtons}>
        <button
          type="button"
          onClick={() => handleQuickPull(1)}
          className={styles.quickButton}
          disabled={isLoading}
        >
          1 Pull
        </button>
        <button
          type="button"
          onClick={() => handleQuickPull(10)}
          className={styles.quickButton}
          disabled={isLoading}
        >
          10 Pulls
        </button>
        <button
          type="button"
          onClick={() => handleQuickPull(90)}
          className={styles.quickButton}
          disabled={isLoading}
        >
          90 Pulls
        </button>
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isLoading || !pulls}
      >
        {isLoading ? 'Pulling...' : '🎲 Pull Gacha'}
      </button>
    </form>
  );
};
