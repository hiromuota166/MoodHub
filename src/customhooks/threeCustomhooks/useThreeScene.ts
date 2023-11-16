import * as THREE from "three";
import { useEffect, useRef } from "react";

export const useThreeScene = () => {
	const mountRef = useRef<HTMLDivElement>(null);
	const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
	const sceneRef = useRef<THREE.Scene | null>(null);

	useEffect(() => {
		// Rendererの初期化
		if (!rendererRef.current) {
			rendererRef.current = new THREE.WebGLRenderer();
			rendererRef.current.setSize(window.innerWidth, window.innerHeight);
		}

		// Sceneの初期化
		if (!sceneRef.current) {
			sceneRef.current = new THREE.Scene();
			sceneRef.current.background = new THREE.Color("#000");
		}

		// ウィンドウのリサイズイベントリスナーを設定
		const handleResize = () => {
			if (rendererRef.current) {
				rendererRef.current.setSize(document.documentElement.clientWidth, window.innerHeight);
			}
		};
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	return {
		mountRef,
		renderer: rendererRef.current,
		scene: sceneRef.current,
	};
};
