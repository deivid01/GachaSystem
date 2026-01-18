import type { Character } from '../types';

// Cache local para evitar requisições repetidas
const imageCache = new Map<string, string>();

// Mapa customizado de personagens do Genshin Impact
const genshinCharacterMap: Record<string, string> = {
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

/**
 * Busca imagem de personagem via Wikidata API
 */
export async function fetchCharacterImageWikidata(
    characterName: string
): Promise<string | null> {
    try {
        const searchUrl = `https://www.wikidata.org/w/api.php?action=query&titles=${encodeURIComponent(
            characterName
        )}&format=json&origin=*`;
        const searchRes = await fetch(searchUrl);
        const searchData = (await searchRes.json()) as any;

        const pageId = Object.keys(searchData.query.pages)[0];
        if (!pageId || pageId === '-1') return null;

        const itemUrl = `https://www.wikidata.org/w/api.php?action=query&pageids=${pageId}&props=pageterms&format=json&origin=*`;
        const itemRes = await fetch(itemUrl);
        const itemData = (await itemRes.json()) as any;
        const wikidataId = itemData.query.pages[pageId]?.terms?.wikipedia?.[0];

        if (!wikidataId) return null;

        // Buscar imagem via Wikipedia
        const imageUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
            wikidataId
        )}&prop=pageimages&format=json&pithumbsize=400&origin=*`;
        const imageRes = await fetch(imageUrl);
        const imageData = (await imageRes.json()) as any;
        const pages = imageData.query.pages;
        const imageUri = Object.values(pages)[0] as any;

        return imageUri?.thumbnail?.source || null;
    } catch (err) {
        console.error('Erro ao buscar imagem Wikidata:', err);
        return null;
    }
}

/**
 * Busca imagem dinamicamente do backend
 */
export async function fetchCharacterImageFromBackend(
    characterName: string
): Promise<string | null> {
    try {
        const response = await fetch(
            `/api/characters/image?name=${encodeURIComponent(characterName)}`
        );
        if (!response.ok) return null;

        const data = (await response.json()) as { imageUrl: string };
        return data.imageUrl;
    } catch (err) {
        console.error('Erro ao buscar imagem do backend:', err);
        return null;
    }
}

/**
 * Tenta múltiplas fontes para obter imagem do personagem
 */
export async function getCharacterImageUrl(
    character: Character
): Promise<string> {
    // Verificar cache
    if (imageCache.has(character.id)) {
        return imageCache.get(character.id)!;
    }

    // Tentar mapa customizado primeiro
    if (genshinCharacterMap[character.name]) {
        const url = genshinCharacterMap[character.name];
        imageCache.set(character.id, url);
        return url;
    }

    // Tentar buscar do backend
    let imageUrl = await fetchCharacterImageFromBackend(character.name);

    // Fallback para Wikidata
    if (!imageUrl) {
        imageUrl = await fetchCharacterImageWikidata(character.name);
    }

    // Fallback final para imagem local
    if (!imageUrl) {
        imageUrl = character.image;
    }

    imageCache.set(character.id, imageUrl);
    return imageUrl;
}

/**
 * Limpa cache de imagens
 */
export function clearImageCache(): void {
    imageCache.clear();
}

/**
 * Pré-carrega imagens de personagens
 */
export async function preloadCharacterImages(
    characters: Character[]
): Promise<void> {
    const promises = characters.map(char => getCharacterImageUrl(char));
    await Promise.all(promises);
}
