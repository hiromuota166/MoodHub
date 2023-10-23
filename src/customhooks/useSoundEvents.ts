import { useCallback, useEffect, useRef, useState } from 'react';
import useAudioPlayer from './useAudioPlayer'; // useAudioPlayerをインポート
import useDeviceMotion from './useDeviceMotion'; // useDeviceMotionをインポート

const useSoundEvents = (audioPath: string, shakeThreshold: number = 20, shakeInterval: number = 200) => {
    const { playSound } = useAudioPlayer(audioPath);
    const { requestDeviceMotion, isDevicemotionPermissionGranted, updateAndDetectAcceleration } = useDeviceMotion(shakeThreshold);
    const lastPlayedTime = useRef<number>(0);


    const canPlaySound = useCallback(() => {
        const now = Date.now();
        if (now - lastPlayedTime.current < shakeInterval) {
            return false;
        }
		lastPlayedTime.current = now;
        return true;
    }, [lastPlayedTime, shakeInterval]);

    const playSoundIfPossible = useCallback(() => {
        if (canPlaySound()) {
            playSound();
        }
    }, [canPlaySound, playSound])

    const handleSwipe = useCallback(() => {
        playSoundIfPossible()
    }, [playSoundIfPossible]);

    const handleTouch = useCallback(() => {
        playSoundIfPossible()
    }, [playSoundIfPossible]);

    const handleShake = useCallback((e: DeviceMotionEvent) => {
        const isShaking = updateAndDetectAcceleration(e);
        console.log(isShaking);
        if (isShaking) {
            playSoundIfPossible()
        }
    }, [updateAndDetectAcceleration, playSoundIfPossible]);

    useEffect(() => {
        window.addEventListener('touchstart', handleTouch);
        return () => {
            window.removeEventListener('touchstart', handleTouch);
        };
    }, [handleTouch]);

    useEffect(() => {
        window.addEventListener('touchmove', handleSwipe);
        return () => {
            window.removeEventListener('touchmove', handleSwipe);
        };
    }, [handleSwipe]);

    useEffect(() => {
        if (isDevicemotionPermissionGranted) {
            window.addEventListener('devicemotion', handleShake);
        }
        return () => {
            window.removeEventListener('devicemotion', handleShake);
        };
    }, [handleShake, isDevicemotionPermissionGranted]);

    return {
        playSound,
        isDevicemotionPermissionGranted,
        requestDeviceMotion
    };
};

export default useSoundEvents;
