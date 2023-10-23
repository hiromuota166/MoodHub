import { useCallback, useEffect, useState } from 'react';
import useAudioPlayer from './useAudioPlayer'; // useAudioPlayerをインポート
import useDeviceMotion from './useDeviceMotion'; // useDeviceMotionをインポート

const useSoundEvents = (audioPath: string, shakeThreshold: number = 20, shakeInterval: number = 200) => {
    const { playSound } = useAudioPlayer(audioPath);
    const { isShaking } = useDeviceMotion(shakeThreshold);
    const [lastPlayedTime, setLastPlayedTime] = useState<number>(0);

    const canPlaySound = useCallback(() => {
        const now = Date.now();
        if (now - lastPlayedTime < shakeInterval) {
            return false;
        }
        setLastPlayedTime(now);
        return true;
    }, [lastPlayedTime, shakeInterval]);

    const handleSwipe = useCallback(() => {
        if (canPlaySound()) {
            playSound();
        }
    }, [playSound, canPlaySound]);

    const handleShake = useCallback(() => {
        if (isShaking && canPlaySound()) {
            playSound();
        }
    }, [isShaking, playSound, canPlaySound]);

    useEffect(() => {
        window.addEventListener('touchmove', handleSwipe);
        return () => {
            window.removeEventListener('touchmove', handleSwipe);
        };
    }, [handleSwipe]);

    useEffect(() => {
        if (isShaking) {
            handleShake();
        }
    }, [isShaking, handleShake]);

    return {
        playSound,
    };
};

export default useSoundEvents;
