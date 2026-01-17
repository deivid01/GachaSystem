import styles from './Footer.module.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <p>Version: 2.0 | Built with React + TypeScript</p>
      <p>© {currentYear} Gacha System</p>
    </footer>
  );
};
