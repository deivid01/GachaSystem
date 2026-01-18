import { useState, useCallback, useEffect } from 'react';
import { GachaResult, PullStatistics, GachaHistoryData, PullRecord } from '../types';
import { performGachaPull, calculateNewHistory } from '../utils/gachaLogic';
import { useSound } from './useSound';

const STORAGE_KEY = 'gacha-history-v2';

const DEFAULT_STATISTICS: PullStatistics = {
    totalPulls: 0,
    totalFiveStars: 0,
    totalFourStars: 0,
    lastPullTime: null,
    pullHistory: [],
    averagePullsPerFiveStar: 0,
};

export const useGacha = () => {
    const [result, setResult] = useState<GachaResult | null>(null);
    const [history, setHistory] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [statistics, setStatistics] = useState<PullStatistics>(DEFAULT_STATISTICS);
    const { playPull, playSuccess, playRare } = useSound();

    // Carregar dados do localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const data: GachaHistoryData = JSON.parse(saved);
                setStatistics(data.statistics);
                setHistory(0); // Reset history on load
            }
        } catch (err) {
            console.error('Erro ao carregar histórico:', err);
        }
    }, []);

    // Salvar dados no localStorage
    useEffect(() => {
        try {
            const data: GachaHistoryData = {
                version: 1,
                statistics,
                lastUpdated: Date.now(),
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (err) {
            console.error('Erro ao salvar histórico:', err);
        }
    }, [statistics]);

    const performPull = useCallback((pulls: number) => {
        setIsLoading(true);
        playPull();

        // Simula um pequeno delay para dar sensação de "pull"
        setTimeout(() => {
            const gachaResult = performGachaPull(pulls, history);

            const newResult: GachaResult = {
                characters: gachaResult.characters,
                message: gachaResult.message,
                pulls: pulls,
            };

            setResult(newResult);

            // Atualiza o histórico e estatísticas apenas se não for erro
            if (!gachaResult.isError) {
                const newHistory = calculateNewHistory(pulls, history);
                setHistory(newHistory);

                // Atualizar estatísticas
                setStatistics(prev => {
                    const updatedStats = { ...prev };
                    updatedStats.totalPulls += pulls;
                    updatedStats.lastPullTime = Date.now();

                    // Processar cada personagem
                    gachaResult.characters.forEach(character => {
                        if (character.rarity === 5) {
                            updatedStats.totalFiveStars += 1;
                        } else {
                            updatedStats.totalFourStars += 1;
                        }

                        // Adicionar ao histórico
                        const pullRecord: PullRecord = {
                            characterId: character.id,
                            characterName: character.name,
                            rarity: character.rarity,
                            timestamp: Date.now(),
                            pullCount: 1,
                        };

                        updatedStats.pullHistory = [pullRecord, ...updatedStats.pullHistory].slice(0, 100);
                    });

                    // Calcular média de pulls por 5★
                    if (updatedStats.totalFiveStars > 0) {
                        updatedStats.averagePullsPerFiveStar = Math.round(
                            updatedStats.totalPulls / updatedStats.totalFiveStars
                        );
                    }

                    return updatedStats;
                });

                // Toca som baseado na raridade
                if (gachaResult.characters.some(c => c.rarity === 5)) {
                    playRare();
                } else {
                    playSuccess();
                }
            }

            setIsLoading(false);
        }, 800);
    }, [history, playPull, playSuccess, playRare]);

    const resetResult = useCallback(() => {
        setResult(null);
    }, []);

    const resetHistory = useCallback(() => {
        setHistory(0);
        setResult(null);
        setStatistics(DEFAULT_STATISTICS);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    const exportStatistics = useCallback(() => {
        const data: GachaHistoryData = {
            version: 1,
            statistics,
            lastUpdated: Date.now(),
        };
        return JSON.stringify(data, null, 2);
    }, [statistics]);

    return {
        result,
        history,
        isLoading,
        statistics,
        performPull,
        resetResult,
        resetHistory,
        exportStatistics,
    };
};
