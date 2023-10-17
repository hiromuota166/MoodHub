"use client";
import { useCallback, useEffect, useRef, useState } from "react";
export const useSoundHook = () => {
	const [isSoundOn, setIsSoundOn] = useState(false);
	const [isPermissionGranted, setIsPermissionGranted] = useState(false);
	const lastPlayedTime = useRef<number>(0);
	const [acceleration, setAcceleration] = useState<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 });

	const audioRef = useRef<HTMLAudioElement | null>(null);

	if (typeof window !== "undefined") {
		audioRef.current = new Audio("/maracas-sound.wav");
	}
	const playSound = useCallback(() => {
		if (!audioRef.current) return;
		audioRef.current.play().catch((e) => console.error(e));
	}, []);

	const requestPermission = async () => {
		// const sensor = await enableSensor();
		// setIsPermissionGranted(sensor);
		if (
			typeof DeviceMotionEvent !== "undefined" &&
			typeof (DeviceMotionEvent as any).requestPermission === "function"
		) {
			try {
				const permission: PermissionState = await (DeviceMotionEvent as any).requestPermission();
				setIsPermissionGranted(permission === "granted");
			} catch (error) {
				console.error("Permission request was denied:", error);
			}
		} else {
			// For browsers that do not need explicit permission
			setIsPermissionGranted(true);
		}
	};

	const detectAcceleration = (x: number, y: number, z: number) => {
		const threshold = 5;
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
		}, 200);

		const handleSwipe = () => {
			const now = Date.now();
			if (isSoundOn && now - lastPlayedTime.current >= 150) {
				playSound();
				lastPlayedTime.current = now;
			}
		};
		if (isSoundOn && isPermissionGranted) {
			window.addEventListener("devicemotion", handleShake);
			window.addEventListener("touchmove", handleSwipe);
		}

		return () => {
			window.removeEventListener("devicemotion", handleShake);
			window.removeEventListener("touchmove", handleSwipe);
		};
	}, [isSoundOn, isPermissionGranted, playSound]);

	return {
		isSoundOn,
		setIsSoundOn,
		isPermissionGranted,
		requestPermission,
		acceleration,
		playSound,
	};
};

export default useSoundHook;
