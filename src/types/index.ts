export type CharacterRarity = 4 | 5;

export interface Character {
    id: string;
    name: string;
    rarity: CharacterRarity;
    image: string;
}

export interface GachaResult {
    characters: Character[];
    message: string;
    pulls: number;
}

export interface GachaState {
    result: GachaResult | null;
    history: number;
    isLoading: boolean;
}

export interface PullRecord {
    characterId: string;
    characterName: string;
    rarity: CharacterRarity;
    timestamp: number;
    pullCount: number;
}

export interface PullStatistics {
    totalPulls: number;
    totalFiveStars: number;
    totalFourStars: number;
    lastPullTime: number | null;
    pullHistory: PullRecord[];
    averagePullsPerFiveStar: number;
}

export interface GachaHistoryData {
    version: number;
    statistics: PullStatistics;
    lastUpdated: number;
}
