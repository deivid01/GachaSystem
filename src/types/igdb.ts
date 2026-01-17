export interface IGDBGame {
    id: number;
    name: string;
    summary?: string;
    rating?: number;
    year?: number | null;
    url?: string;
    cover?: { image_id: string } | null;
    coverUrl?: string | null;
    genres?: { name: string }[];
}
