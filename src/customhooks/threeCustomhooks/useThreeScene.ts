import * as THREE from "three";
import { useEffect, useRef, useState } from "react";

export const useThreeScene = () => {
	const mountRef = useRef<HTMLDivElement>(null);
	const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
	const sceneRef = useRef<THREE.Scene | null>(null);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 }); // 初期値を0に設定

	useEffect(() => {
		setDimensions({
			width: document.documentElement.clientWidth,
			height: window.innerHeight,
		});

		// rendererが未初期化の場合のみ初期化
		if (!rendererRef.current) {
			const newRenderer = new THREE.WebGLRenderer();
			newRenderer.setSize(dimensions.width, dimensions.height);
			rendererRef.current = newRenderer;
		}

		// sceneが未初期化の場合のみ初期化
		if (!sceneRef.current) {
			const newScene = new THREE.Scene();
			newScene.background = new THREE.Color("#000");
			sceneRef.current = newScene;
		}
		// resizeイベントリスナーを追加
		const handleResize = () => {
			const width = document.documentElement.clientWidth;
			const height = window.innerHeight;
			setDimensions({ width, height });

			if (rendererRef.current) {
				rendererRef.current.setSize(width, height);
			}
		};

		window.addEventListener("resize", handleResize);

		return () => {
			// cleanup: remove the event listener when the component is unmounted
			window.removeEventListener("resize", handleResize);
		};
	}, [dimensions.height, dimensions.width]);

	return {
		mountRef,
		renderer: rendererRef.current,
		scene: sceneRef.current,
	};
};
