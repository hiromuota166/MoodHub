"use client";
import { useEffect, useMemo } from "react";
import { useThreeScene } from "@/customhooks/threeCustomhooks/useThreeScene";
import { useThreeLighting } from "@/customhooks/threeCustomhooks/useThreeLighting";
import { useThreeModel } from "@/customhooks/threeCustomhooks/useThreeModel";
import { useThreeCamera } from "@/customhooks/threeCustomhooks/useThreeCamera";
import { useThreeAnimation } from "@/customhooks/threeCustomhooks/useThreeAnimation";

interface Show3dObjProps {
	mode: "normal" | "special";
}

const Show3dObj = (props: Show3dObjProps) => {
	const { mode } = props;
	const memoizedMode = useMemo(() => mode, [mode]);

	const { mountRef, renderer, scene } = useThreeScene();
	const camera = useThreeCamera();
	const { directionalLights, ambientLight, pointLights, pointLightsUpdate, lightUpdateCounter } =
		useThreeLighting(scene);
	const lights = useMemo(() => {
		return {
			directionalLights,
			ambientLight,
			pointLights,
			pointLightsUpdate,
		};
	}, [directionalLights, ambientLight, pointLights, pointLightsUpdate]);
	useThreeModel(scene, memoizedMode);
	const { setFeverMode, feverMode } = useThreeAnimation(scene, camera, renderer, lights, lightUpdateCounter);

	useEffect(() => {
		if (renderer === null) return;
		const elm = mountRef?.current;
		const w = document.documentElement.clientWidth;
		const h = window.innerHeight;
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(w, h);
		elm?.appendChild(renderer.domElement);

		return () => {
			elm?.removeChild(renderer.domElement);
		};
	}, [renderer, mountRef]);

	return (
		<div ref={mountRef} className='absolute top-0 left-0 w-full h-full'>
			<button
				className={`absolute top-0 left-0 ${feverMode ? "text-background" : "text-font"} `}
				onClick={() => setFeverMode(!feverMode)}
			>
				start {feverMode ? "normal" : "fever"} Mode
			</button>
		</div>
	);
};

export default Show3dObj;
