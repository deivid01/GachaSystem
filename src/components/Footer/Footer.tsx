import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer} role="contentinfo">
      <p className={styles.text}>
        Made by{' '}
        <a
          href="https://github.com/deivid01"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          aria-label="GitHub de Deivid Peres"
        >
          Deivid Peres
        </a>{' '}
        with love ❤️ and coffee ☕. © 2026
      </p>
    </footer>
  );
};
