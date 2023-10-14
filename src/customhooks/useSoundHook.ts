"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export const useSoundHook = () => {
	const [isSoundOn, setIsSoundOn] = useState(false);
	const [isPermissionGranted, setIsPermissionGranted] = useState(false);
	const lastPlayedTime = useRef<number>(0);
	const [accelerationX, setAccelerationX] = useState<number>(0);
	const [accelerationY, setAccelerationY] = useState<number>(0);
	const [accelerationZ, setAccelerationZ] = useState<number>(0);

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

	const playSound = useCallback(() => {
		const audio = new Audio("/maracas-sound.wav");
		audio.play();
	}, []);

	const handleShake = useCallback(
		(e: DeviceMotionEvent) => {
			const ax = e.acceleration?.x || 0;
			const ay = e.acceleration?.y || 0;
			const az = e.acceleration?.z || 0;
			const shakeThreshold = 5;
			const magnitude = Math.sqrt(ax ** 2 + ay ** 2 + az ** 2);
			if (magnitude < shakeThreshold) {
				return;
			}

			playSound();
			if (e.acceleration && ax && ay && az) {
				setAccelerationX(ax);
				setAccelerationY(ay);
				setAccelerationZ(az);
			}
		},
		[setAccelerationX, setAccelerationY, setAccelerationZ, playSound]
	);

	const handleSwipe = useCallback(() => {
		const now = Date.now();
		if (isSoundOn && now - lastPlayedTime.current >= 150) {
			// 1秒以上経過しているか確認
			playSound();
			lastPlayedTime.current = now; // 最後に再生した時刻を更新
		}
	}, [playSound, isSoundOn]);

	useEffect(() => {
		if (isSoundOn && isPermissionGranted) {
			window.addEventListener("devicemotion", handleShake);
			window.addEventListener("touchmove", handleSwipe);
		}

		return () => {
			window.removeEventListener("devicemotion", handleShake);
			window.removeEventListener("touchmove", handleSwipe);
		};
	}, [isSoundOn, isPermissionGranted, handleShake, handleSwipe]);

	return {
		isSoundOn,
		setIsSoundOn,
		isPermissionGranted,
		requestPermission,
		accelerationX,
		accelerationY,
		accelerationZ,
	};
};

export default useSoundHook;

