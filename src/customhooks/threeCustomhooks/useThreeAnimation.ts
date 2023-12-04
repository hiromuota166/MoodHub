import { useEffect, useRef } from "react";
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
        // eslint-disable-next-line no-unused-vars
        pointLightsUpdate: (pointLight: THREE.PointLight) => THREE.PointLight;
      }
    | undefined,
  lightUpdateCounter: number,
  feverMode: boolean
) => {
  const isDraggingRef = useRef(false);
  useEffect(() => {
    if (!scene || !renderer || !camera) return;

    // OrbitControlsの初期化
    const controls = new OrbitControls(camera, renderer.domElement);

    return () => {
      controls.dispose(); // OrbitControlsのクリーンアップ
    };
  }, [scene, camera, renderer]);

  useEffect(() => {
    if (!scene || !renderer || !camera || !lights) return;
    const { directionalLights, ambientLight, pointLights, pointLightsUpdate } =
      lights;

    if (!directionalLights || !ambientLight || !pointLights) return;

    let animationFrameId: number = 0;

    const updateRender = () => {
      if (feverMode) {
        directionalLights.forEach((light) => (light.intensity = 0.1));
        ambientLight.intensity = 0;
        scene.background = new THREE.Color("#000"); // 背景色を設定
        pointLights.forEach((pointLight) => {
          pointLightsUpdate(pointLight);
          pointLight.visible = true;
        });
      } else {
        scene.background = new THREE.Color("#D6E5E3"); // 背景色を設定
        directionalLights.forEach((light) => (light.intensity = 3));
        ambientLight.intensity = 1;
        pointLights.forEach((pointLight) => (pointLight.visible = false));
      }
      renderer.render(scene, camera);
    };

    const animate = () => {
      updateRender();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseDown = () => {
      isDraggingRef.current = true;
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleMouseMove = () => {
      if (isDraggingRef.current) {
        updateRender();
      }
    };

    if (feverMode) {
      animate();
    } else {
      cancelAnimationFrame(animationFrameId); // アニメーションのキャンセル
      updateRender();
      window.addEventListener("touchmove", updateRender);
      window.addEventListener("wheel", updateRender);
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      cancelAnimationFrame(animationFrameId); // アニメーションのキャンセル
      window.removeEventListener("touchmove", updateRender);
      window.removeEventListener("wheel", updateRender);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [feverMode, scene, camera, renderer, lights, lightUpdateCounter]); // 依存関係を指定
};
