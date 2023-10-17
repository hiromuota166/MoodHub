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

	const enableSensor = async (): Promise<boolean> => {
		const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
		if (isIOS) {
			// ios の場合は明示的に許可が必要
			const response = await (DeviceMotionEvent as any).requestPermission();
			if (response === "granted") {
				return true;
			} else {
				return false;
			}
		} else {
			// android
			return true;
		}
	};

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

	const debounce = (func: Function, wait: number) => {
		let timeoutId: ReturnType<typeof setTimeout> | null = null;
		return function (...args: any[]) {
			if (timeoutId !== null) {
				clearTimeout(timeoutId);
			}
			timeoutId = setTimeout(() => func(...args), wait);
		};
	};

	useEffect(() => {
		const handleShake = (e: DeviceMotionEvent) => {
			const ax = e.acceleration?.x || 0;
			const ay = e.acceleration?.y || 0;
			const az = e.acceleration?.z || 0;
			const isShaking = detectAcceleration(ax, ay, az);
			setAcceleration({ x: ax, y: ay, z: az });
			if (isShaking) {
				playSound();
			}
		};

		const debouncedHandleShake = debounce(handleShake, 100);

		const handleSwipe = () => {
			const now = Date.now();
			if (isSoundOn && now - lastPlayedTime.current >= 150) {
				playSound();
				lastPlayedTime.current = now;
			}
		};
		if (isSoundOn && isPermissionGranted) {
			window.addEventListener("touchmove", handleSwipe);
			window.addEventListener("devicemotion", debouncedHandleShake);
		}

		return () => {
			window.removeEventListener("touchmove", handleSwipe);
			window.removeEventListener("devicemotion", debouncedHandleShake);
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
