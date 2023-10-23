// useThreeLighting.ts
import * as THREE from "three";

export const useThreeLighting = (scene: THREE.Scene) => {
	const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
	directionalLight.position.set(0, -4, 50);
	const ambientLight = new THREE.AmbientLight(0x404040, 15);

	const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
	const pointLights: THREE.PointLight[] = [];
	colors.forEach((color, idx) => {
		const light = new THREE.PointLight(color, 1, 50);
		light.position.set(5 * Math.sin(idx), 5 * Math.cos(idx), 5 * Math.sin(idx) * Math.cos(idx));
		scene.add(light);
		pointLights.push(light);
	});

	const pointLightsUpdate = (pointLight: THREE.PointLight) => {
		const idx = pointLights.indexOf(pointLight);
		pointLight.position.x = 5 * Math.sin(Date.now() * 0.001);
		pointLight.position.z = 5 * Math.cos(Date.now() * 0.001);
		pointLight.intensity = (Math.sin(Date.now() * 0.001) + 1.5) * 1.5;
		return pointLight;
	};

	scene.add(directionalLight);
	scene.add(ambientLight);

	return {
		directionalLight,
		ambientLight,
		pointLights,
		pointLightsUpdate,
	};
};

