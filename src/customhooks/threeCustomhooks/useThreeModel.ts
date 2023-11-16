import { useEffect } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";

export const useThreeModel = (scene: THREE.Scene | null, mode: "normal" | "special") => {
	useEffect(() => {
		if (!scene) return;

		const loader = new GLTFLoader();
		const loadModel = (url: string, onLoadCallback: (gltf: any) => void) => {
			loader.load(url, onLoadCallback, undefined, (error) => console.error("An error happened", error));
		};

		let model: THREE.Object3D;

		if (mode === "normal") {
			loadModel("/maracas-wood-v2.glb", (gltf) => {
				model = gltf.scene;
				model.position.set(0, 1.7, 0);
				model.scale.set(1.8, 1.8, 1.8);
				scene.add(model);
			});
		} else if (mode === "special") {
			loadModel("/maracas-gold-v2.glb", (gltf) => {
				model = gltf.scene;
				model.scale.set(1.8, 1.8, 1.8);
				model.position.set(0, 1.7, 0);
				scene.add(model);
			});
		}

		return () => {
			// コンポーネントのクリーンアップ時にモデルをシーンから削除
			if (model) {
				scene.remove(model);
			}
		};
	}, [scene, mode]);
};
