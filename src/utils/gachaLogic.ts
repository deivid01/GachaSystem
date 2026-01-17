import { Character } from '../types';
import { fourStarCharacters, fiveStarCharacters } from '../data/characters';

export const PITY_LIMIT = 100;

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

export const performGachaPull = (pulls: number, currentHistory: number) => {
    if (pulls <= 0) {
        return {
            character: null,
            message: 'Invalid shot value',
            isError: true,
        };
    }

    const totalPulls = pulls + currentHistory;

    // Se atingiu exatamente 100 ou mais
    if (totalPulls >= PITY_LIMIT) {
        const character = getFiveStarCharacter();
        return {
            character,
            message: `Congratulations! You got the five star character ${character.name}! ⭐⭐⭐⭐⭐`,
            isError: false,
        };
    }

    // Se está abaixo de 100, ganha personagem 4 estrelas
    const character = getFourStarCharacter();
    return {
        character,
        message: `Congratulations! You got the four star character ${character.name}! ⭐⭐⭐⭐`,
        isError: false,
    };
};

export const calculateNewHistory = (pulls: number, currentHistory: number): number => {
    const totalPulls = pulls + currentHistory;

    // Se atingiu 100 ou mais, reseta o histórico
    if (totalPulls >= PITY_LIMIT) {
        return 0;
    }

    return totalPulls;
};
