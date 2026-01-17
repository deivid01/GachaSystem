import { useState } from 'react';
import { searchGames } from '../../services/igdb';
import type { IGDBGame } from '../../types/igdb';
import styles from './GameSearch.module.css';

export function GameSearch() {
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<IGDBGame[]>([]);

  async function onSearch(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const games = await searchGames(term.trim());
      setResults(games);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={styles.wrapper} aria-labelledby="game-search-title">
      <h2 id="game-search-title" className={styles.title}>Buscar Jogos (IGDB)</h2>
      <form onSubmit={onSearch} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          value={term}
          placeholder="Ex.: Zelda, Genshin Impact"
          onChange={(e) => setTerm(e.target.value)}
          aria-label="Termo de busca de jogos"
        />
        <button className={styles.button} type="submit" disabled={loading || !term.trim()}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
      {error && <div role="alert" className={styles.error}>{error}</div>}
      <div className={styles.grid}>
        {results.map((g) => (
          <article key={g.id} className={styles.card}>
            {g.coverUrl && <img src={g.coverUrl} alt={`Capa de ${g.name}`} className={styles.cover} />}
            <div className={styles.info}>
              <h3 className={styles.name}>{g.name}</h3>
              <p className={styles.meta}>
                {g.year ? `Ano: ${g.year}` : ''}
                {g.rating ? ` · Rating: ${Math.round(g.rating)}` : ''}
              </p>
              {g.genres && g.genres.length > 0 && (
                <p className={styles.genres}>Gêneros: {g.genres.map((x) => x.name).join(', ')}</p>
              )}
              {g.summary && <p className={styles.summary}>{g.summary}</p>}
              {g.url && (
                <a href={g.url} target="_blank" rel="noreferrer" className={styles.link}>
                  Ver na IGDB
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
