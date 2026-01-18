import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID?.trim();
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET?.trim();

if (!TWITCH_CLIENT_ID || !TWITCH_CLIENT_SECRET) {
    console.warn('[IGDB] Credenciais Twitch não configuradas.');
    console.warn('[IGDB] Usando modo MOCK com dados de exemplo.');
}

let oauth: { token: string; expiresAt: number } | null = null;

// Mock data para teste
const mockGames = [
    { id: 1, name: 'The Legend of Zelda: Breath of the Wild', year: 2017, rating: 97, summary: 'Explore Hyrule in this epic adventure.', genres: [{ name: 'Adventure' }], coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r6i.jpg', url: 'https://www.igdb.com/games/the-legend-of-zelda-breath-of-the-wild' },
    { id: 2, name: 'Genshin Impact', year: 2020, rating: 74, summary: 'An open-world action RPG with gacha mechanics.', genres: [{ name: 'RPG' }], coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg', url: 'https://www.igdb.com/games/genshin-impact' },
    { id: 3, name: 'Elden Ring', year: 2022, rating: 96, summary: 'A challenging action RPG with open-world exploration.', genres: [{ name: 'RPG' }], coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5m7p.jpg', url: 'https://www.igdb.com/games/elden-ring' },
];

async function getToken() {
    const now = Date.now();
    if (oauth && now < oauth.expiresAt) return oauth.token;

    const url = `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`;
    console.log('[IGDB] Solicitando token Twitch...');

    try {
        const res = await fetch(url, { method: 'POST' });

        if (!res.ok) {
            const text = await res.text();
            console.error(`[IGDB] Erro ao obter token (${res.status}):`, text);
            throw new Error(`Twitch OAuth ${res.status}: ${text}`);
        }

        const data = await res.json() as any;

        if (!data.access_token) {
            console.error('[IGDB] Resposta Twitch sem token:', JSON.stringify(data));
            throw new Error('Twitch não retornou access_token');
        }

        oauth = {
            token: data.access_token,
            expiresAt: now + (data.expires_in - 60) * 1000,
        };
        console.log('[IGDB] Token obtido com sucesso');
        return oauth.token;
    } catch (err) {
        console.error('[IGDB] Falha ao obter token:', err instanceof Error ? err.message : String(err));
        throw err;
    }
}

app.post('/api/igdb/games', async (req, res) => {
    try {
        const { search } = req.body as { search?: string };

        // Se credenciais não estão configuradas, usar mock
        if (!TWITCH_CLIENT_ID || !TWITCH_CLIENT_SECRET) {
            console.log(`[IGDB] MOCK - Buscando: "${search || 'todos'}"`);
            let results = mockGames;

            if (search) {
                const term = search.toLowerCase();
                results = mockGames.filter(g => g.name.toLowerCase().includes(term));
            }

            return res.json(results);
        }

        console.log(`[IGDB] Buscando: "${search || 'todos'}"`);

        try {
            const token = await getToken();

            const query = [
                'fields name,summary,genres.name,release_dates.y,rating,cover.image_id,url;',
                search ? `search "${search}";` : '',
                'limit 12;',
            ].join('\n');

            const igdbRes = await fetch('https://api.igdb.com/v4/games', {
                method: 'POST',
                headers: {
                    'Client-ID': TWITCH_CLIENT_ID,
                    'Authorization': `Bearer ${token}`,
                },
                body: query,
            });

            console.log(`[IGDB] IGDB response: ${igdbRes.status}`);

            if (!igdbRes.ok) {
                const text = await igdbRes.text();
                console.error('[IGDB] Erro IGDB:', text);
                throw new Error(`IGDB ${igdbRes.status}: ${text}`);
            }

            const games = await igdbRes.json() as any[];
            console.log(`[IGDB] Encontrados ${games.length} jogos`);

            const withCovers = games.map((g) => ({
                ...g,
                coverUrl: g?.cover?.image_id ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${g.cover.image_id}.jpg` : null,
                year: g?.release_dates?.[0]?.y ?? null,
            }));

            res.json(withCovers);
        } catch (apiErr) {
            console.error('[IGDB] Erro na API, usando mock:', apiErr instanceof Error ? apiErr.message : String(apiErr));
            // Fallback para mock se API falhar
            let results = mockGames;
            if (search) {
                const term = search.toLowerCase();
                results = mockGames.filter(g => g.name.toLowerCase().includes(term));
            }
            res.json(results);
        }
    } catch (e) {
        console.error('[IGDB] Erro no servidor:', e);
        res.status(500).json({ error: 'Erro IGDB', detail: String(e) });
    }
});

// Endpoint para buscar imagens de personagens Genshin Impact
app.get('/api/characters/image', async (req, res) => {
    try {
        const { name } = req.query as { name?: string };

        if (!name) {
            return res.status(400).json({ error: 'Character name required' });
        }

        // Mapa de personagens com URLs de imagens (Todos os 4★ e 5★)
        const characterImages: Record<string, string> = {
            // 4★ Pyro
            'Amber': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Bennett': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Thoma': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Yanfei': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',

            // 4★ Hydro
            'Barbara': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Candace': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Mika': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Sucrose': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',

            // 4★ Electro
            'Diona': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Fischl': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Kujou Sara': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',

            // 4★ Cryo
            'Chongyun': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Shenhe': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',

            // 4★ Anemo
            'Shikanoin Heizou': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Noelle': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Sayu': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',

            // 4★ Geo
            'Beidou': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Ningguang': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Yun Jin': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',

            // 4★ Dendro
            'Collei': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Faruzan': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Layla': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',

            // 4★ Outros
            'Lisa': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Rosaria': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Razor': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',

            // 5★ Pyro
            'Diluc': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Hu Tao': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Lyney': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',

            // 5★ Hydro
            'Kamisato Ayato': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Sangonomiya Kokomi': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Yelan': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Furina': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Neuvillette': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Mona': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',

            // 5★ Electro
            'Raiden Shogun': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Fischl (Awakened)': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Clorinde': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',

            // 5★ Cryo
            'Kamisato Ayaka': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Ganyu': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',

            // 5★ Anemo
            'Kaedehara Kazuha': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Venti': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Xiao': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Wanderer': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',

            // 5★ Geo
            'Alhaitham': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Eula': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Arataki Itto': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Zhongli': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Baizhu': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',

            // 5★ Dendro
            'Nahida': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Tighnari': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Dehya': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',

            // 5★ Standard
            'Jean': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Keqing': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Qiqi': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
            'Yae Miko': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2b63.jpg',
        };

        const characterName = String(name).trim();
        const imageUrl = characterImages[characterName] ||
            characterImages[Object.keys(characterImages).find(
                key => key.toLowerCase() === characterName.toLowerCase()
            ) || ''] ||
            '/public/images/bennett.jpg'; // Fallback padrão

        console.log(`[Characters] Buscando imagem para: ${characterName} -> ${imageUrl}`);

        res.json({
            imageUrl,
            source: 'genshin-wiki',
            character: characterName,
        });
    } catch (err) {
        console.error('[Characters] Erro:', err);
        res.status(500).json({ error: 'Failed to fetch character image' });
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`[IGDB Proxy] Escutando http://localhost:${port}`);
    if (!TWITCH_CLIENT_ID || !TWITCH_CLIENT_SECRET) {
        console.log('[IGDB Proxy] ⚠️  Modo MOCK ativado');
    }
});
