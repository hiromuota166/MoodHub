// useThreeAnimation.ts
import { useState, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export const useThreeAnimation = (
	scene: THREE.Scene,
	camera: THREE.Camera,
	renderer: THREE.WebGLRenderer,
	controls: OrbitControls,
	lights: {
		directionalLight: THREE.DirectionalLight;
		ambientLight: THREE.AmbientLight;
		pointLights: THREE.PointLight[];
		pointLightsUpdate: (pointLight: THREE.PointLight) => THREE.PointLight;
	}
) => {
	const [feverMode, setFeverMode] = useState(false);
	const pointLights = lights.pointLights;
	const pointLightsUpdate = lights.pointLightsUpdate;

	useEffect(() => {
		const animate = () => {
			if (feverMode) {
				scene.remove(lights.directionalLight);
				scene.remove(lights.ambientLight);
				scene.background = new THREE.Color("#000"); // 背景色を設定
				pointLights.forEach((pointLight) => {
					pointLightsUpdate(pointLight);
				});

				// spotLight.color.setHSL(Math.sin(Date.now() * 0.001), 1, 0.5);

				requestAnimationFrame(animate);
			} else {
				scene.background = new THREE.Color("#D6E5E3"); // 背景色を設定
				scene.add(lights.directionalLight);
				scene.add(lights.ambientLight);
				pointLights.forEach((pointLight) => {
					scene.remove(pointLight);
				});
			}

			renderer.render(scene, camera);
			controls.update();
		};

		animate();

		const tick = () => {
			renderer.render(scene, camera);
			requestAnimationFrame(tick);
		};

		tick();

		return () => {
			// クリーンアップロジック
		};
	}, [feverMode, scene, camera, renderer, controls, lights, pointLights, pointLightsUpdate]);

	return {
		setFeverMode,
		feverMode,
	};
};

