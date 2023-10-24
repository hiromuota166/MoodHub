// useThreeCamera.ts
import * as THREE from "three";
import { useEffect, useState } from "react";

export const useThreeCamera = () => {
	console.log("useThreeCamera");
	const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);

	useEffect(() => {
		const newCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		newCamera.position.set(0, 0, 5);
		setCamera(newCamera);
	}, []);

	return camera;
};
