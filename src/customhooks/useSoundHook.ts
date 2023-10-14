"use client";
import { useEffect, useRef, useState } from "react";

export const useSoundHook = () => {
	const [isSoundOn, setIsSoundOn] = useState(false);
	const [isPermissionGranted, setIsPermissionGranted] = useState(false);
	const lastPlayedTime = useRef<number>(0);
	const [accelerationX, setAccelerationX] = useState<number>(0);
	const [accelerationY, setAccelerationY] = useState<number>(0);
	const [accelerationZ, setAccelerationZ] = useState<number>(0);

	const enableSensor = async (): Promise<boolean> => {
		const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
		if (isIOS && true) {
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
		const sensor = await enableSensor();
		setIsPermissionGranted(sensor);
		// if (
		// 	typeof DeviceMotionEvent !== "undefined" &&
		// 	typeof (DeviceMotionEvent as any).requestPermission === "function"
		// ) {
		// 	try {
		// 		const permission: PermissionState = await (DeviceMotionEvent as any).requestPermission();
		// 		setIsPermissionGranted(permission === "granted");
		// 	} catch (error) {
		// 		console.error("Permission request was denied:", error);
		// 	}
		// } else {
		// 	// For browsers that do not need explicit permission
		// 	setIsPermissionGranted(true);
		// }
	};

	useEffect(() => {
		const playSound = () => {
			const now = Date.now();
			if (isSoundOn && now - lastPlayedTime.current >= 150) {
				// 1秒以上経過しているか確認
				const audio = new Audio("/maracas-sound.wav");
				audio.play();
				lastPlayedTime.current = now; // 最後に再生した時刻を更新
			}
		};
		const handleShake = (e: DeviceMotionEvent) => {
			if (e.acceleration && e.acceleration.x && e.acceleration.y && e.acceleration.z) {
				setAccelerationX(e.acceleration.x);
				setAccelerationY(e.acceleration.y);
				setAccelerationZ(e.acceleration.z);
			}
			console.log("handleShake");
			playSound();
		};

		const handleSwipe = () => {
			console.log("handleSwipe");
			// Swipe detection logic
			// ...
			playSound();
		};

		if (isSoundOn && isPermissionGranted) {
			window.addEventListener("devicemotion", handleShake);
			window.addEventListener("touchmove", handleSwipe);
		}

		return () => {
			window.removeEventListener("devicemotion", handleShake);
			window.removeEventListener("touchmove", handleSwipe);
		};
	}, [isSoundOn]);

	return { isSoundOn, setIsSoundOn, isPermissionGranted, requestPermission, accelerationX, accelerationY, accelerationZ };
};

export default useSoundHook;

