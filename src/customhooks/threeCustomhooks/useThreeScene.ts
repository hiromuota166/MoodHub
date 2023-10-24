import * as THREE from "three";
import { useEffect, useRef } from "react";

export const useThreeScene = () => {
	const mountRef = useRef<HTMLDivElement>(null);
	const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
	const sceneRef = useRef<THREE.Scene | null>(null);

	useEffect(() => {
		// rendererが未初期化の場合のみ初期化
		if (!rendererRef.current) {
			rendererRef.current = new THREE.WebGLRenderer();
		}

		// sceneが未初期化の場合のみ初期化
		if (!sceneRef.current) {
			const newScene = new THREE.Scene();
			newScene.background = new THREE.Color("#000");
			sceneRef.current = newScene;
		}
	}, []);

	return {
		mountRef,
		renderer: rendererRef.current,
		scene: sceneRef.current,
	};
};
