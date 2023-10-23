// useThreeScene.ts
import * as THREE from "three";
import { useRef } from "react";

export const useThreeScene = () => {
	const mountRef = useRef<HTMLDivElement>(null);
	const renderer = new THREE.WebGLRenderer();
	const scene = new THREE.Scene();
    scene.background = new THREE.Color("#000"); 
	return {
		mountRef,
		renderer,
		scene,
	};
};

