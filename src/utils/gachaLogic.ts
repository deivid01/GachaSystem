import { Character } from '../types';
import { fourStarCharacters, fiveStarCharacters } from '../data/characters';

export const PITY_LIMIT = 100;
export const GUARANTEED_4STAR_INTERVAL = 10;

export const getRandomCharacter = (characters: Character[]): Character => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
};

export const getFourStarCharacter = (): Character => {
    return getRandomCharacter(fourStarCharacters);
};

export const getFiveStarCharacter = (): Character => {
    return getRandomCharacter(fiveStarCharacters);
};

// Chance gradual de 5★ (soft pity aproximado)
// Inspirado no comportamento do Genshin: chance baixa no início,
// aumenta suavemente e acelera perto do pity.
export const getFiveStarChance = (history: number): number => {
    // Antes de 50: chance base muito baixa (~0.6%)
    if (history <= 50) return 0.006;
    // 51 a 75: aumenta lentamente
    if (history <= 75) return 0.006 + (history - 50) * 0.004; // até ~10.6%
    // 76 a 90: aumenta mais rapidamente (soft pity)
    if (history <= 90) return 0.106 + (history - 75) * 0.02; // até ~40.6%
    // 91 a 99: muito provável, mas não garantido
    if (history < PITY_LIMIT) return 0.8;
    // 100 é pity; esta função não deve ser chamada em 100+
    return 1.0;
};

/**
 * Realiza múltiplos pulls com a lógica:
 * - No 10º, 20º, 30º... pull, um 4★ é garantido
 * - Chance gradual de 5★ que aumenta a cada pull (0% no início até 100% no pity de 100)
 * - Hard pity em 100 pulls = 5★ garantido
 */
export const performGachaPull = (pulls: number, currentHistory: number) => {
    if (pulls <= 0) {
        return {
            characters: [],
            message: 'Invalid pull count',
            isError: true,
        };
    }

    const results: Character[] = [];
    let history = currentHistory;

    for (let i = 0; i < pulls; i++) {
        history++;
        const pullNumberWithinBatch = i + 1;

        // Hard pity: em 100 pulls, força um 5★ e reseta
        if (history >= PITY_LIMIT) {
            results.push(getFiveStarCharacter());
            history = 0;
            continue;
        }

        // Garantia de 4★: exatamente no 10º, 20º, 30º pull desta execução
        if (pullNumberWithinBatch % GUARANTEED_4STAR_INTERVAL === 0) {
            results.push(getFourStarCharacter());
            continue;
        }

        // Chance gradual de 5★ que aumenta conforme se aproxima do pity
        const chanceOf5Star = getFiveStarChance(history);
        const roll = Math.random();

        if (roll < chanceOf5Star) {
            // Conseguiu um 5★, reseta o contador
            results.push(getFiveStarCharacter());
            history = 0;
        } else {
            // Não foi 5★ e não é pull garantido de 4★.
            // Para cumprir a regra "10 pulls = 1 4★", não adicionamos 4★ aqui.
            // Pulls comuns não geram personagem visível (equivalente a 3★/item).
            continue;
        }
    }

    // Contar raridades
    const totalFiveStars = results.filter(c => c.rarity === 5).length;
    const totalFourStars = results.filter(c => c.rarity === 4).length;

    let message = '';
    if (totalFiveStars > 0 && totalFourStars > 0) {
        message = `You got ${totalFourStars} 4★ and ${totalFiveStars} 5★! ⭐`;
    } else if (totalFiveStars > 0) {
        message = `Congratulations! You got ${totalFiveStars} 5★ character(s)! ⭐⭐⭐⭐⭐`;
    } else {
        message = `You got ${totalFourStars} 4★ character(s)! ⭐⭐⭐⭐`;
    }

    return {
        characters: results,
        message,
        isError: false,
    };
};

export const calculateNewHistory = (pulls: number, currentHistory: number): number => {
    let history = currentHistory;

    for (let i = 0; i < pulls; i++) {
        history++;

        // Se atingiu 100, reseta
        if (history >= PITY_LIMIT) {
            history = 0;
        }
    }

    return history;
};

