import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Gacha System</h1>
      <p className={styles.subtitle}>Inspired by Genshin Impact gacha system</p>
    </header>
  );
};
