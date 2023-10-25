"use client";
// useThreeAnimation.ts
import { useState, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export const useThreeAnimation = (
	scene: THREE.Scene | null,
	camera: THREE.Camera | null,
	renderer: THREE.WebGLRenderer | null,
	lights:
		| {
				directionalLights: THREE.DirectionalLight[] | null;
				ambientLight: THREE.AmbientLight | null;
				pointLights: THREE.PointLight[] | null;
				pointLightsUpdate: (pointLight: THREE.PointLight) => THREE.PointLight;
		}
		| undefined,
	lightUpdateCounter: number
) => {
	const [feverMode, setFeverMode] = useState(false);

	useEffect(() => {
		if (!scene || !renderer || !lights || !camera) return;
		const { directionalLights, ambientLight, pointLights, pointLightsUpdate } = lights;
		const controls = new OrbitControls(camera, renderer.domElement);
		let animationFrameId: number;
		if (!directionalLights || !ambientLight || !pointLights) {
			return;
		}

		const animate = () => {
			if (feverMode) {
				directionalLights.forEach((directionalLight) => {
					directionalLight.intensity = 0.1;
				});
				ambientLight.intensity = 0;
				scene.background = new THREE.Color("#000"); // 背景色を設定
				pointLights.forEach((pointLight) => {
					const newPointLight = pointLightsUpdate(pointLight);
					scene.add(newPointLight);
				});
			} else {
				scene.background = new THREE.Color("#D6E5E3"); // 背景色を設定
				directionalLights.forEach((directionalLight) => {
					directionalLight.intensity = 3;
				});
				ambientLight.intensity = 0;
				pointLights.forEach((pointLight) => {
					scene.remove(pointLight);
				});
			}

			renderer.render(scene, camera);
			controls.update();
			animationFrameId = requestAnimationFrame(animate);
		};

		animate();

		return () => {
			cancelAnimationFrame(animationFrameId); // アニメーションのキャンセル
			controls.dispose(); // OrbitControlsのクリーンアップ
		};
	}, [feverMode, scene, camera, renderer, lights, lightUpdateCounter, lightUpdateCounter]);

	return {
		setFeverMode,
		feverMode,
	};
};
