// useThreeLighting.ts
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const createDirectionalLight = (
	scene: THREE.Scene,
	color: number,
	intensity: number,
	position: { x: number; y: number; z: number }
) => {
	const light = new THREE.DirectionalLight(color, intensity);
	light.position.set(position.x, position.y, position.z);
	scene.add(light);
	return light;
};

// ディレクションライトの位置を設定するユーティリティ関数
const setLightPosition = (angleDeg: number, distance: number, y: number) => {
	const angleRad = angleDeg * (Math.PI / 180);
	return {
		x: distance * Math.cos(angleRad),
		y: y,
		z: distance * Math.sin(angleRad),
	};
};

const shuffleArray = (array: number[]) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]]; // 配列の要素を交換
	}
	return array;
};

export const useThreeLighting = (scene: THREE.Scene | null) => {
	const directionalLightsRef = useRef<THREE.DirectionalLight[]>([]);
	const pointLightsRef = useRef<THREE.PointLight[]>([]);
	const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
	const [lightUpdateCounter, setLightUpdateCounter] = useState(0);

	useEffect(() => {
		if (!scene) return;

		const light1Position = setLightPosition(0, 40, -15);
		const light2Position = setLightPosition(120, 40, -15);
		const light3Position = setLightPosition(-120, 40, -15);
		const lightIntensity = 0.1;
		const newDirectionalLights = [
			createDirectionalLight(scene, 0xffffff, 3, { x: 0, y: 5, z: 50 }),
			createDirectionalLight(scene, 0xa0a0a0, lightIntensity, light1Position),
			createDirectionalLight(scene, 0xa0a0a0, lightIntensity, light2Position),
			createDirectionalLight(scene, 0xa0a0a0, lightIntensity, light3Position),
		];

		const newAmbientLight = new THREE.AmbientLight(0x404040, 90);
		scene.add(newAmbientLight);
		const colors = [0xd50000, 0x00ff00, 0x0000ff, 0xcccc00, 0xcc00cc, 0x00ffff, 0xe57300, 0x660066, 0x666600, 0x008080];
		const newPointLights: THREE.PointLight[] = [];
		shuffleArray(colors).forEach((color, idx) => {
			const light = new THREE.PointLight(color, 0, 50);
			light.position.set(5 * Math.sin(idx), 5 * Math.cos(idx), 5 * Math.sin(idx) * Math.cos(idx));
			scene.add(light);
			newPointLights.push(light);
		});

		// ライトの参照を保存
		directionalLightsRef.current = newDirectionalLights;
		pointLightsRef.current = newPointLights;
		ambientLightRef.current = newAmbientLight;
		setLightUpdateCounter((prev) => prev + 1);

		// Cleanup: シーンからライトを削除する
		return () => {
			newDirectionalLights.forEach((light) => scene.remove(light));
			newPointLights.forEach((light) => scene.remove(light));
			if (newAmbientLight) scene.remove(newAmbientLight);
		};
	}, [scene]); // この useEffect は scene が変わるたびに実行されます。

	const pointLightsUpdate = (pointLight: THREE.PointLight) => {
		const idx = pointLightsRef.current.indexOf(pointLight) + 1;
		pointLight.position.x = 6 * Math.sin(Date.now() * 0.001 * idx);
		pointLight.position.z = 6 * Math.cos(Date.now() * 0.001 * idx);
		pointLight.intensity = (Math.sin(Date.now() * 0.001 * idx) + 1.5) * 30;
		return pointLight;
	};

	return {
		directionalLights: directionalLightsRef.current,
		ambientLight: ambientLightRef.current,
		pointLights: pointLightsRef.current,
		pointLightsUpdate,
		lightUpdateCounter,
		setLightUpdateCounter,
	};
};
