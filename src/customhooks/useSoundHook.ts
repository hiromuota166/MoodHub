"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const detectAcceleration = (x: number, y: number, z: number) => {
	const threshold = 20;
	const magnitude = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
	if (magnitude < threshold) {
		return false;
	}
	return true;
};

const throttle = <T extends any[]>(func: (...args: T) => void, interval: number) => {
	// この関数はintervalミリ秒間に一度しか実行されません。
	// 高頻度で呼び出された場合でも、intervalミリ秒の間隔を空けて実行されます。
	// intervalミリ秒の間隔中に関数が複数回呼び出された場合、最後の呼び出しが次のintervalミリ秒のタイミングで実行されます。
	let isThrottled = false;
	let argsForNextRun: T | null = null;

	return (...args: T) => {
		if (!isThrottled) {
			isThrottled = true;
			func(...args);
			setTimeout(() => {
				isThrottled = false;
				if (argsForNextRun) {
					func(...argsForNextRun);
					argsForNextRun = null;
				}
			}, interval);
		} else {
			argsForNextRun = args;
		}
	};
};

const PLAY_SOUND_INTERVAL = 100; // 例として150ミリ秒を設定

export const useSoundHook = () => {
	const [isSoundOn, setIsSoundOn] = useState(false);
	const [isDevicemotionPermissionGranted, setIsDevicemotionPermissionGranted] = useState(false);
	const lastPlayedTime = useRef<number>(0);
	const [acceleration, setAcceleration] = useState<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 });
	const [loadingState, setLoadingState] = useState<"loading" | "loaded" | "error">("loading");
	const audioContextRef = useRef<AudioContext | null>(null);
	const audioBufferRef = useRef<AudioBuffer | null>(null);

	const loadAudio = async () => {
		setLoadingState("loading");
		try {
			if (audioContextRef.current === null) return;
			const response = await fetch("/maracas-sound.mp3");
			const audioData = await response.arrayBuffer();
			audioBufferRef.current = await audioContextRef.current.decodeAudioData(audioData);
			setLoadingState("loaded");
		} catch (error) {
			console.error("Failed to load audio:", error);
			setLoadingState("error");
		}
	};

	useEffect(() => {
		loadAudio();
	}, []);

	const playSound = useCallback(() => {
		if (!audioBufferRef.current || !audioContextRef.current) return;

		const source = audioContextRef.current.createBufferSource();
		source.buffer = audioBufferRef.current;
		source.connect(audioContextRef.current.destination);
		source.start(0);
	}, []);

	const observePlaySound = () => {
		const now = Date.now();
		// 前回のplaySound実行からの時間が指定インターバルよりも短い場合は早期リターン
		if (now - lastPlayedTime.current < PLAY_SOUND_INTERVAL) {
			return false;
		}
		lastPlayedTime.current = now;
		return true;
	};

	const requestPermission = async () => {
		if (
			typeof DeviceMotionEvent !== "undefined" &&
			typeof (DeviceMotionEvent as any).requestPermission === "function"
		) {
			try {
				const permission: PermissionState = await (DeviceMotionEvent as any).requestPermission();
				setIsDevicemotionPermissionGranted(permission === "granted");
			} catch (error) {
				console.error("Permission request was denied:", error);
			}
		} else {
			// For browsers that do not need explicit permission
			setIsDevicemotionPermissionGranted(true);
		}
	};

	const handleSwipe = useCallback(() => {
		if (!observePlaySound()) {
			return;
		}
		playSound();
	}, [playSound]); // 依存関係をリストに追加

	const handleStart = useCallback(() => {
		playSound();
	}, [playSound]); // 依存関係をリストに追加

	useEffect(() => {
		const handleShake = throttle((e: DeviceMotionEvent) => {
			const ax = e.acceleration?.x || 0;
			const ay = e.acceleration?.y || 0;
			const az = e.acceleration?.z || 0;
			const isShaking = detectAcceleration(ax, ay, az);
			setAcceleration({ x: ax, y: ay, z: az });
			if (isShaking) {
				playSound();
			}
		}, 100);
		if (isSoundOn) {
			window.addEventListener("touchmove", handleSwipe);
			window.addEventListener("touchstart", handleStart);
			if (isDevicemotionPermissionGranted) {
				window.addEventListener("devicemotion", handleShake);
			}
		} else {
			window.removeEventListener("touchmove", handleSwipe);
			window.removeEventListener("touchstart", handleStart);
			window.removeEventListener("devicemotion", handleShake);
		}

		return () => {
			window.removeEventListener("touchmove", handleSwipe);
			window.removeEventListener("touchstart", handleStart);
			window.removeEventListener("devicemotion", handleShake);
		};
	}, [isSoundOn, isDevicemotionPermissionGranted, playSound, handleSwipe, handleStart]);

	return {
		isSoundOn,
		setIsSoundOn,
		isDevicemotionPermissionGranted,
		requestPermission,
		acceleration,
		loadingState,
		reloadAudio: loadAudio,
		playSound,
	};
};

export default useSoundHook;
