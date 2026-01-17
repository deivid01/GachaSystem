import { useState, useCallback } from 'react';
import { GachaResult } from '../types';
import { performGachaPull, calculateNewHistory } from '../utils/gachaLogic';
import { useSound } from './useSound';

export const useGacha = () => {
    const [result, setResult] = useState<GachaResult | null>(null);
    const [history, setHistory] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { playPull, playSuccess, playRare } = useSound();

    const performPull = useCallback((pulls: number) => {
        setIsLoading(true);
        playPull();

        // Simula um pequeno delay para dar sensação de "pull"
        setTimeout(() => {
            const gachaResult = performGachaPull(pulls, history);

            const newResult: GachaResult = {
                character: gachaResult.character,
                message: gachaResult.message,
                pulls: pulls,
            };

            setResult(newResult);

            // Atualiza o histórico apenas se não for erro
            if (!gachaResult.isError) {
                const newHistory = calculateNewHistory(pulls, history);
                setHistory(newHistory);

                // Toca som baseado na raridade
                if (gachaResult.character?.rarity === 5) {
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
    }, []);

    return {
        result,
        history,
        isLoading,
        performPull,
        resetResult,
        resetHistory,
    };
};
