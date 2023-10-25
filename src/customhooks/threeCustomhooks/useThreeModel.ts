// useThreeModel.ts
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";

export const useThreeModel = (scene: THREE.Scene | null, mode: "normal" | "special") => {
	if (!scene) return;
	const loader = new GLTFLoader();

	const loadModel = (url: string, onLoadCallback: (gltf: any) => void) => {
		loader.load(url, onLoadCallback, undefined, (error) => console.error("An error happened", error));
	};

	if (mode === "normal") {
		loadModel("/maracas-wood-v2.glb", (gltf) => {
			gltf.scene.position.set(0, 1.7, 0);
			gltf.scene.scale.set(1.8, 1.8, 1.8);
			scene.add(gltf.scene);
		});
	} else if (mode === "special") {
		loadModel("/maracas-gold-v2.glb", (gltf) => {
			gltf.scene.scale.set(1.8, 1.8, 1.8);
			gltf.scene.position.set(0, 1.7, 0);
			scene.add(gltf.scene);
		});
	}
};
