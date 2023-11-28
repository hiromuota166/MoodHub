import { useCallback, useEffect, useRef } from "react";
import useAudioPlayer from "./useAudioPlayer";
import useDeviceMotion from "./useDeviceMotion";

const useSoundEvents = (
  audioPath: string,
  shakeThreshold: number = 20,
  shakeInterval: number = 200
) => {
  const {
    loadingState,
    playSound,
    reloadAudio,
    adjustVolume,
    mute,
    unmute,
    toggleMute,
    isMuted,
    volume,
  } = useAudioPlayer(audioPath);
  const {
    requestDeviceMotion,
    isDevicemotionPermissionGranted,
    updateAndDetectAcceleration,
  } = useDeviceMotion(shakeThreshold);
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
  }, [canPlaySound, playSound]);

  const handleSwipe = useCallback(() => {
    playSoundIfPossible();
  }, [playSoundIfPossible]);

  const handleTouch = useCallback(() => {
    playSoundIfPossible();
  }, [playSoundIfPossible]);

  const handleShake = useCallback(
    (e: DeviceMotionEvent) => {
      const isShaking = updateAndDetectAcceleration(e);
      if (isShaking) {
        playSoundIfPossible();
      }
    },
    [updateAndDetectAcceleration, playSoundIfPossible]
  );

  useEffect(() => {
    if (!isMuted) {
      window.addEventListener("touchstart", handleTouch);
    }
    return () => {
      window.removeEventListener("touchstart", handleTouch);
    };
  }, [handleTouch, isMuted]);

  useEffect(() => {
    if (!isMuted) {
      window.addEventListener("touchmove", handleSwipe);
    }
    return () => {
      window.removeEventListener("touchmove", handleSwipe);
    };
  }, [handleSwipe, isMuted]);

  useEffect(() => {
    if (isDevicemotionPermissionGranted) {
      window.addEventListener("devicemotion", handleShake);
    }
    return () => {
      window.removeEventListener("devicemotion", handleShake);
    };
  }, [handleShake, isDevicemotionPermissionGranted]);

  return {
    loadingState,
    playSound,
    reloadAudio,
    adjustVolume,
    mute,
    unmute,
    toggleMute,
    isMuted,
    volume,
    isDevicemotionPermissionGranted,
    requestDeviceMotion,
  };
};

export default useSoundEvents;
