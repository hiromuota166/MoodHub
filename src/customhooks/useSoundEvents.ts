import { useCallback, useEffect, useRef, useState } from "react";
import useAudioPlayer from "./useAudioPlayer";
import useDeviceMotion from "./useDeviceMotion";

export interface AudioFile {
  name: string; // 画面に表示される名前
  path: string; // 音声ファイルのパス
}

const useSoundEvents = (
  shakeThreshold: number = 20,
  shakeInterval: number = 200
) => {
  const audioFiles: AudioFile[] = [
    { name: "マラカス", path: "/sound/maracas-sound.mp3" },
    { name: "タンバリン", path: "/sound/tambourine.mp3" },
    { name: "拍手", path: "/sound/clap.mp3" },
    { name: "パフパフ", path: "/sound/pafu.mp3" },
    { name: "ボイン", path: "/sound/boyon.mp3" },
    { name: "チリン", path: "/sound/chin.mp3" },
    { name: "鳩時計", path: "/sound/birdClock.mp3" },
    { name: "ドラ", path: "/sound/DaLuo.mp3" },
  ];
  const [audioFile, setAudioFile] = useState<AudioFile>(audioFiles[0]);
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
  } = useAudioPlayer(audioFile.path);
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
    audioFiles,
    audioFile,
    setAudioFile,
  };
};

export default useSoundEvents;
