import { useGacha } from './hooks/useGacha';
import { Header } from './components/Header/Header';
import { GachaResult } from './components/GachaResult/GachaResult';
import { GachaForm } from './components/GachaForm/GachaForm';
import { History } from './components/History/History';
import { Footer } from './components/Footer/Footer';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';
import { Particles } from './components/Particles/Particles';
import { GameSearch } from './components/GameSearch/GameSearch';
import { Statistics } from './components/Statistics/Statistics';
import styles from './App.module.css';

function App() {
  const { result, history, isLoading, performPull, resetResult, resetHistory, statistics } = useGacha();

  return (
    <div className={styles.app}>
      <Particles count={25} />
      <ThemeToggle />
      
      <Header />

      <main className={styles.main}>
        {result && <GachaResult result={result} onClose={resetResult} />}
        
        <GachaForm onPull={performPull} isLoading={isLoading} />
        
        <Statistics statistics={statistics} />
        
        <History history={history} onReset={resetHistory} />

        <GameSearch />
      </main>

      <Footer />
    </div>
  );
}

export default App;
