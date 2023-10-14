"use client";
import { useEffect, useState } from "react";

export const useSoundHook = () => {
	const [isSoundOn, setIsSoundOn] = useState(false);
	const [isPermissionGranted, setIsPermissionGranted] = useState(false);

	const requestPermission = async () => {
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

	useEffect(() => {
		const playSound = () => {
			if (isSoundOn) {
				const audio = new Audio("/maracas-sound.wav");
				audio.play();
			}
		};
		const handleShake = () => {
			playSound();
		};

		const handleSwipe = () => {
			// Swipe detection logic
			// ...
			playSound();
		};

		if (isSoundOn) {
			window.addEventListener("devicemotion", handleShake);
			window.addEventListener("touchmove", handleSwipe);
		}

		return () => {
			window.removeEventListener("devicemotion", handleShake);
			window.removeEventListener("touchmove", handleSwipe);
		};
	}, [isSoundOn]);

	return { isSoundOn, setIsSoundOn, isPermissionGranted, requestPermission };
};

export default useSoundHook;

