"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const detectAcceleration = (x: number, y: number, z: number) => {
	const threshold = 10;
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

const PLAY_SOUND_INTERVAL = 50; // 例として150ミリ秒を設定

export const useSoundHook = () => {
	const [isSoundOn, setIsSoundOn] = useState(false);
	const [isDevicemotionPermissionGranted, setIsDevicemotionPermissionGranted] = useState(false);
	const lastPlayedTime = useRef<number>(0);
	const [acceleration, setAcceleration] = useState<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 });

	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		if (typeof window !== "undefined") {
			audioRef.current = new Audio("/maracas-sound.mp3");
		}
	}, []);

	type TimeData = {
		timestamp: number;
		difference: number;
	};

	const [playData, setPlayData] = useState<TimeData[]>([]);

	const playSound = useCallback(() => {
		const now = Date.now();

		// 最後のタイムスタンプとの差分を計算
		const lastTimestamp = playData.length > 0 ? playData[playData.length - 1].timestamp : 0;
		const timeDifference = now - lastTimestamp;

		// インターバルよりも短い場合は早期リターン
		if (timeDifference < PLAY_SOUND_INTERVAL) {
			return;
		}

		if (!audioRef.current) return;

		audioRef.current.play().catch((e) => console.error(e));

		// タイムスタンプと差分のペアを配列に追加
		setPlayData((prevData) => [...prevData, { timestamp: now, difference: timeDifference }]);
	}, [playData, audioRef]);

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

	const handleShake = useCallback(
		(e: DeviceMotionEvent) => {
			if (!observePlaySound()) {
				return;
			}
			const ax = e.acceleration?.x || 0;
			const ay = e.acceleration?.y || 0;
			const az = e.acceleration?.z || 0;
			const isShaking = detectAcceleration(ax, ay, az);

			if (isShaking) {
				playSound();
				setAcceleration({ x: ax, y: ay, z: az });
			}
		},
		[playSound]
	);
	useEffect(() => {
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
			window.removeEventListener("devicemotion", handleShake);
			window.removeEventListener("touchstart", handleStart);
			window.removeEventListener("touchmove", handleSwipe);
		};
	}, [isSoundOn, isDevicemotionPermissionGranted, playSound, handleSwipe, handleShake, handleStart]);

	return {
		isSoundOn,
		setIsSoundOn,
		isDevicemotionPermissionGranted,
		requestPermission,
		acceleration,
		playSound,
		playData,
	};
};

export default useSoundHook;
