import * as THREE from "three";
import { useEffect, useRef } from "react";

export const useThreeCamera = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    // カメラの初期化
    if (!cameraRef.current) {
      const newCamera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      newCamera.position.set(0, 0, 5);
      cameraRef.current = newCamera;
    }

    // リサイズイベントハンドラー
    const onResize = () => {
      if (cameraRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
      }
    };

    // イベントリスナーを設定
    window.addEventListener("resize", onResize);

    // クリーンアップ関数
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return cameraRef.current;
};
