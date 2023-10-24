// useThreeCamera.ts
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";

export const useThreeCamera = () => {
	console.log("useThreeCamera");
	const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
	const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

	useEffect(() => {
		// cameraが未初期化の場合のみ初期化
		if (!cameraRef.current) {
			console.log("camera is not initialized");
			const newCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
			newCamera.position.set(0, 0, 5);
			cameraRef.current = newCamera;
			setCamera(newCamera); // 状態を更新して再レンダリングをトリガーする
		}
	}, []);

	return camera; // useStateで管理されているcameraを返す
};
