import type { IGDBGame } from '../types/igdb';

export async function searchGames(search: string): Promise<IGDBGame[]> {
    const res = await fetch('/api/igdb/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ search }),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`IGDB error ${res.status}: ${text}`);
    }
    return res.json();
}
