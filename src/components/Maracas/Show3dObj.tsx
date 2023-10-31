"use client";
import { useEffect, useMemo } from "react";
import { useThreeScene } from "@/customhooks/threeCustomhooks/useThreeScene";
import { useThreeLighting } from "@/customhooks/threeCustomhooks/useThreeLighting";
import { useThreeModel } from "@/customhooks/threeCustomhooks/useThreeModel";
import { useThreeCamera } from "@/customhooks/threeCustomhooks/useThreeCamera";
import { useThreeAnimation } from "@/customhooks/threeCustomhooks/useThreeAnimation";

interface Show3dObjProps {
	mode: "normal" | "special";
	feverMode: boolean;
}

const Show3dObj = (props: Show3dObjProps) => {
	const { mode, feverMode } = props;
	const memoizedMode = useMemo(() => mode, [mode]);
	const momoizedFeverMode = useMemo(() => feverMode, [feverMode]);
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
	useThreeAnimation(scene, camera, renderer, lights, lightUpdateCounter, momoizedFeverMode);

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
		</div>
	);
};

export default Show3dObj;
