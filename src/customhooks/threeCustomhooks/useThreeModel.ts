// useThreeModel.ts
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";

export const useThreeModel = (scene: THREE.Scene | null, mode: "normal" | "special") => {
	console.log("useThreeModel");
	if (!scene) return;
	const loader = new GLTFLoader();

	const loadModel = (url: string, onLoadCallback: (gltf: any) => void) => {
		loader.load(url, onLoadCallback, undefined, (error) => console.error("An error happened", error));
	};

	if (mode === "normal") {
		loadModel("/maracas-wood.glb", (gltf) => {
			gltf.scene.position.set(0, 1.5, 0);
			gltf.scene.scale.set(1.5, 1.5, 1.5);
			scene.add(gltf.scene);
		});
	} else if (mode === "special") {
		loadModel("/maracas-gold.glb", (gltf) => {
			gltf.scene.scale.set(1.5, 1.5, 1.5);
			gltf.scene.position.set(0, 1.5, 0);
			scene.add(gltf.scene);
		});
	}
};

