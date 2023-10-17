"use client";
import { useCallback, useEffect, useRef, useState } from "react";
export const useSoundHook = () => {
	const [isSoundOn, setIsSoundOn] = useState(false);
	const [isPermissionGranted, setIsPermissionGranted] = useState(false);
	const lastPlayedTime = useRef<number>(0);
	const [acceleration, setAcceleration] = useState<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 });
	const [worker, setWorker] = useState<Worker | null>(null);

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

	useEffect(() => {
		if (typeof window !== "undefined") {
			setWorker(new Worker("/path/to/your/worker.js"));
		}
	}, []);

	useEffect(() => {
		const handleShake = (ax: number, ay: number, az: number) => {
			const isShaking = detectAcceleration(ax, ay, az);
			if (isShaking) {
				playSound();
			}
		};
		if (worker) {
			worker.onmessage = (event) => {
				// Handle worker messages here
				switch (event.data.action) {
					case "ACCELERATION_DATA":
						const { ax, ay, az } = event.data.data;
						// ここで取得した加速度データを利用して何らかの処理を行います
						handleShake(ax, ay, az);
						setAcceleration({ x: ax, y: ay, z: az });
						break;
					default:
						console.error("Unknown action:", event.data.action);
				}
			};

			// Example of sending a message to the worker
			// 加速度の監視を開始
			worker.postMessage({ action: "START_ACCELERATION_MONITORING" });
		}

		return () => {
			worker?.terminate(); // Cleanup the worker when component unmounts
		};
	}, [worker, playSound]);

	useEffect(() => {
		const handleSwipe = () => {
			const now = Date.now();
			if (isSoundOn && now - lastPlayedTime.current >= 150) {
				playSound();
				lastPlayedTime.current = now;
			}
		};
		if (isSoundOn && isPermissionGranted) {
			window.addEventListener("touchmove", handleSwipe);
		}

		return () => {
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
