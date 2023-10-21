"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const PLAY_SOUND_INTERVAL = 120; // 例として150ミリ秒を設定

export const useSoundHook = () => {
	const [isSoundOn, setIsSoundOn] = useState(false);
	const [isDevicemotionPermissionGranted, setIsDevicemotionPermissionGranted] = useState(false);
	const lastPlayedTime = useRef<number>(0);
	const [acceleration, setAcceleration] = useState<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 });
	const [loadingState, setLoadingState] = useState<"init" | "loading" | "loaded" | "error">("init");
	const [threshold, setThreshold] = useState(20); // 例として20を設定
	const [shankeInterval, setShankeInterval] = useState(200);
	const audioContextRef = useRef<AudioContext | null>(null);
	const audioBufferRef = useRef<AudioBuffer | null>(null);

	const loadAudio = async () => {
		setLoadingState("loading");
		try {
			if (typeof window !== "undefined" && audioContextRef.current) {
				const response = await fetch("/maracas-sound.mp3");
				console.log("fetched");
				const audioData = await response.arrayBuffer();
				audioBufferRef.current = await audioContextRef.current.decodeAudioData(audioData);
				setLoadingState("loaded");
			}
		} catch (error) {
			console.error("Failed to load audio:", error);
			setLoadingState("error");
		}
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			audioContextRef.current = new window.AudioContext();
			loadAudio();
		}
		return () => {
			audioContextRef.current?.close(); // Clean up the AudioContext when component is unmounted
		};
	}, []);

	const playSound = useCallback(() => {
		if (!audioBufferRef.current || !audioContextRef.current) return;
		const source = audioContextRef.current.createBufferSource();
		source.buffer = audioBufferRef.current;
		source.connect(audioContextRef.current.destination);
		try {
			source.start(0);
		} catch (error) {
			if (error instanceof DOMException && error.name === "InvalidStateError") {
				console.error("InvalidStateError occurred:", error.message);
			} else {
				console.error("An unexpected error occurred:", error);
			}
		}
	}, [audioBufferRef, audioContextRef]);

	const observePlaySound = useCallback(() => {
		const now = Date.now();
		// 前回のplaySound実行からの時間が指定インターバルよりも短い場合は早期リターン
		console.log((now - lastPlayedTime.current).toString());
		if (now - lastPlayedTime.current < shankeInterval) {
			return false;
		}
		lastPlayedTime.current = now;
		return true;
	}, [shankeInterval, lastPlayedTime]);

	const detectAcceleration = useCallback(
		(x: number, y: number, z: number) => {
			const magnitude = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
			if (magnitude < threshold) {
				return false;
			}
			return true;
		},
		[threshold]
	);

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
	}, [playSound, observePlaySound]); // 依存関係をリストに追加

	const handleStart = useCallback(() => {
		playSound();
	}, [playSound]); // 依存関係をリストに追加

	const handleShake = useCallback(
		(e: DeviceMotionEvent) => {
			if (!observePlaySound()) {
				return;
			}
			const ax = e.acceleration?.x || 0;
			const ay = e.acceleration?.y || 0;
			const az = e.acceleration?.z || 0;

			const isShaking = detectAcceleration(ax, ay, az);
			setAcceleration({ x: ax, y: ay, z: az });
			if (isShaking) {
				console.log("shake");
				playSound();
			}
		},
		[playSound, detectAcceleration, observePlaySound]
	);


	useEffect(() => {
		console.log("useEffect");
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
	}, [isSoundOn, isDevicemotionPermissionGranted, handleSwipe, handleStart, handleShake]);

	return {
		isSoundOn,
		setIsSoundOn,
		isDevicemotionPermissionGranted,
		requestPermission,
		acceleration,
		loadingState,
		reloadAudio: loadAudio,
		playSound,
		shankeInterval,
		setShankeInterval,
		threshold,
		setThreshold,
	};
};

export default useSoundHook;
