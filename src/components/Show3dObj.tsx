"use client";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
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

	const { mountRef, renderer, scene } = useThreeScene();
	const camera = useThreeCamera();
	const controls = new OrbitControls(camera, renderer.domElement);
	const lights = useThreeLighting(scene);
	useThreeModel(scene, mode);
	const { setFeverMode, feverMode } = useThreeAnimation(scene, camera, renderer, controls, lights);

	useEffect(() => {
		const elm = mountRef.current;
		const w = window.innerWidth;
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
			<button onClick={() => setFeverMode(!feverMode)}>{feverMode ? "Stop" : "Start"} Animation</button>
		</div>
	);
};

export default Show3dObj;
