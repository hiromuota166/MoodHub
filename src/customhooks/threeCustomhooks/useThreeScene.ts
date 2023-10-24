import * as THREE from "three";
import { useEffect, useRef, useState } from "react";

export const useThreeScene = () => {
	console.log("useThreeScene");
	const mountRef = useRef<HTMLDivElement>(null);
	const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
	const sceneRef = useRef<THREE.Scene | null>(null);

	useEffect(() => {
		// rendererが未初期化の場合のみ初期化
		if (!rendererRef.current) {
			console.log("renderer is not initialized");
			rendererRef.current = new THREE.WebGLRenderer();
		}

		// sceneが未初期化の場合のみ初期化
		if (!sceneRef.current) {
			console.log("scene is not initialized");
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
