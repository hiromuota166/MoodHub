/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";

export enum ModelLoadingState {
  Idle,
  Loading,
  Loaded,
  Error,
}

export const useThreeModel = (
  scene: THREE.Scene | null,
  camera: THREE.Camera | null,
  renderer: THREE.WebGLRenderer | null,
  mode: "normal" | "special"
) => {
  const modelRef = useRef<THREE.Object3D | null>(null);
  const loadingStateRef = useRef<ModelLoadingState>(ModelLoadingState.Idle);

  useEffect(() => {
    if (!scene || !camera || !renderer) return;

    const loader = new GLTFLoader();
    loadingStateRef.current = ModelLoadingState.Loading;

    const loadModel = (url: string) => {
      loader.load(
        url,
        (gltf) => {
          const model = gltf.scene;
          model.position.set(0, 1.7, 0);
          model.scale.set(1.8, 1.8, 1.8);
          scene.add(model);
          renderer.render(scene, camera);
          modelRef.current = model;
          loadingStateRef.current = ModelLoadingState.Loaded;
        },
        undefined, // 進行状況に関する処理は省略（必要に応じて追加）
        (error) => {
          loadingStateRef.current = ModelLoadingState.Error;
        }
      );
    };

    const modelUrl =
      mode === "normal" ? "/maracas-wood-v2.glb" : "/maracas-gold-v2.glb";
    loadModel(modelUrl);

    return () => {
      if (modelRef.current) {
        scene.remove(modelRef.current);
      }
    };
  }, [scene, mode, camera, renderer]);

  return {
    modelLoadingState: loadingStateRef.current,
  };
};
