import { useCallback, useRef } from 'react';

interface SoundEffects {
    playPull: () => void;
    playSuccess: () => void;
    playRare: () => void;
    playClick: () => void;
    playPullAnimation: () => void;
}

export const useSound = (): SoundEffects => {
    const audioContext = useRef<AudioContext | null>(null);

    const getAudioContext = useCallback(() => {
        if (!audioContext.current) {
            audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        return audioContext.current;
    }, []);

    const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
        try {
            const ctx = getAudioContext();
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = type;

            gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + duration);
        } catch (error) {
            // Silently fail if audio is not supported
            console.warn('Audio not supported', error);
        }
    }, [getAudioContext]);

    const playPull = useCallback(() => {
        playTone(440, 0.1, 'sine');
        setTimeout(() => playTone(554, 0.1, 'sine'), 100);
        setTimeout(() => playTone(659, 0.15, 'sine'), 200);
    }, [playTone]);

    const playSuccess = useCallback(() => {
        playTone(523, 0.1, 'triangle');
        setTimeout(() => playTone(659, 0.1, 'triangle'), 100);
        setTimeout(() => playTone(784, 0.2, 'triangle'), 200);
    }, [playTone]);

    const playRare = useCallback(() => {
        playTone(659, 0.1, 'sine');
        setTimeout(() => playTone(784, 0.1, 'sine'), 80);
        setTimeout(() => playTone(988, 0.1, 'sine'), 160);
        setTimeout(() => playTone(1175, 0.3, 'sine'), 240);
    }, [playTone]);

    const playClick = useCallback(() => {
        playTone(800, 0.05, 'square');
    }, [playTone]);

    const playPullAnimation = useCallback(() => {
        // Som épico estilo Genshin - fase de revelação
        // Base drumbeat
        playTone(110, 0.3, 'sine');
        setTimeout(() => playTone(220, 0.2, 'square'), 100);

        // Melodia ascendente
        setTimeout(() => playTone(220, 0.15, 'sine'), 400);
        setTimeout(() => playTone(330, 0.15, 'sine'), 500);
        setTimeout(() => playTone(440, 0.15, 'sine'), 600);
        setTimeout(() => playTone(659, 0.2, 'sine'), 700);

        // Nota final brilhante
        setTimeout(() => playTone(988, 0.5, 'sine'), 950);
        setTimeout(() => playTone(1319, 0.4, 'sine'), 1200);
    }, [playTone]);

    return {
        playPull,
        playSuccess,
        playRare,
        playClick,
        playPullAnimation,
    };
};
