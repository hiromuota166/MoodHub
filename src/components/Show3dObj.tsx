"use client";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import type { NextPage } from "next";
import * as THREE from "three";

const Show3dObj = () => {
	const mountRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const w = 960;
		const h = 540;

		const renderer = new THREE.WebGLRenderer();
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		const elm = mountRef.current;

		elm?.appendChild(renderer.domElement);

		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(w, h);

		const scene = new THREE.Scene();
		scene.background = new THREE.Color('#D6E5E3'); // 背景色を設定

		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.set(1, -1, 3);

		const loader = new GLTFLoader();

		loader.load(
			"/maracas-gold.glb",
			(gltf) => {
				// When the .gltf is loaded
				scene.add(gltf.scene); // Add the loaded object to the scene
			},
			(xhr) => {
				// Called while loading is progressing
				console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
			},
			(error) => {
				// Called when an error occurred
				console.log("An error happened", error);
			}
		);

		loader.load(
			"/maracas-wood.glb",
			(gltf) => {
				// When the .gltf is loaded
				gltf.scene.position.set(2, 0, 0); // Set position: x=1, y=2, z=3
				scene.add(gltf.scene); // Add the loaded object to the scene
			},
			(xhr) => {
				// Called while loading is progressing
				console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
			},
			(error) => {
				// Called when an error occurred
				console.log("An error happened", error);
			}
		);

		// const textureLoader = new THREE.TextureLoader();
		// const texture = textureLoader.load("/maracas_02_colorful/textures/body_Mat_diffuse.png");

		const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
		directionalLight.position.set(10, 20, 50);
		scene.add(directionalLight);

		// const ambientLight = new THREE.AmbientLight(0x404040, 10); // soft white light
		// ambientLight.position.set(10, 20, 50)
		// scene.add(ambientLight);

		const tick = () => {
			renderer.render(scene, camera);
			requestAnimationFrame(tick);
		};

		tick();

		return () => {
			elm?.removeChild(renderer.domElement);
		};
	}, []);

	return <div ref={mountRef} />;
};

export default Show3dObj;
