// useThreeLighting.ts
import * as THREE from "three";

export const useThreeLighting = (scene: THREE.Scene | null) => {
	console.log("useThreeLighting");
	if (!scene) return;

	const createDirectionalLight = (color: number, intensity: number, position: { x: number; y: number; z: number }) => {
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(position.x, position.y, position.z);
		scene.add(light);
		return light;
	};

	const directionalLight = createDirectionalLight(0xffffff, 3, { x: 0, y: 5, z: 50 });
	const lightIntensity = 1;

	// ディレクションライトの位置を設定するユーティリティ関数
	const setLightPosition = (angleDeg: number, distance: number, y: number) => {
		const angleRad = angleDeg * (Math.PI / 180);
		return {
			x: distance * Math.cos(angleRad),
			y: y,
			z: distance * Math.sin(angleRad),
		};
	};

	const light1Position = setLightPosition(0, 50, -15);
	const light2Position = setLightPosition(120, 50, -15);
	const light3Position = setLightPosition(-120, 50, -15);

	const directionalLight1 = createDirectionalLight(0xffffff, lightIntensity, light1Position);
	const directionalLight2 = createDirectionalLight(0xffffff, lightIntensity, light2Position);
	const directionalLight3 = createDirectionalLight(0xffffff, lightIntensity, light3Position);

	const directionalLights = [directionalLight, directionalLight1, directionalLight2, directionalLight3];

	const ambientLight = new THREE.AmbientLight(0x404040, 90);

	const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
	const pointLights: THREE.PointLight[] = [];
	colors.forEach((color, idx) => {
		const light = new THREE.PointLight(color, 60, 100);
		light.position.set(5 * Math.sin(idx), 5 * Math.cos(idx), 5 * Math.sin(idx) * Math.cos(idx));
		scene.add(light);
		pointLights.push(light);
	});

	const pointLightsUpdate = (pointLight: THREE.PointLight) => {
		const idx = pointLights.indexOf(pointLight);
		pointLight.position.x = 6 * Math.sin(Date.now() * 0.001 * idx);
		pointLight.position.z = 6 * Math.cos(Date.now() * 0.001 * idx);
		pointLight.intensity = (Math.sin(Date.now() * 0.001 * idx) + 1.5) * 1.5;
		return pointLight;
	};

	scene.add(directionalLight);
	scene.add(ambientLight);

	return {
		directionalLights,
		ambientLight,
		pointLights,
		pointLightsUpdate,
	};
};

