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
				directionalLights: THREE.DirectionalLight[];
				ambientLight: THREE.AmbientLight;
				pointLights: THREE.PointLight[];
				pointLightsUpdate: (pointLight: THREE.PointLight) => THREE.PointLight;
		  }
		| undefined
) => {
	console.log("useThreeAnimation");
	const [feverMode, setFeverMode] = useState(true);

	useEffect(() => {
		if (!scene || !renderer || !lights || !camera) return;

		const pointLights = lights.pointLights;
		const pointLightsUpdate = lights.pointLightsUpdate;
		const controls = new OrbitControls(camera, renderer.domElement);
		let animationFrameId: number;

		const animate = () => {
			if (feverMode) {
				lights.directionalLights[0].intensity = 0;
				lights.ambientLight.intensity = 0;
				scene.background = new THREE.Color("#000"); // 背景色を設定
				pointLights.forEach((pointLight) => {
					pointLightsUpdate(pointLight);
				});

			} else {
				scene.background = new THREE.Color("#D6E5E3"); // 背景色を設定
				lights.directionalLights[0].intensity = 3;
				lights.ambientLight.intensity = 0;
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
	}, [feverMode, scene, camera, renderer, lights]);

	return {
		setFeverMode,
		feverMode,
	};
};

