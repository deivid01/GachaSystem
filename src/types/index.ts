export type CharacterRarity = 4 | 5;

export interface Character {
    id: string;
    name: string;
    rarity: CharacterRarity;
    image: string;
}

export interface GachaResult {
    character: Character | null;
    message: string;
    pulls: number;
}

export interface GachaState {
    result: GachaResult | null;
    history: number;
    isLoading: boolean;
}
