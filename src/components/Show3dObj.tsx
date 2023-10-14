"use client";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import type { NextPage } from "next";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const Show3dObj = () => {
	const mountRef = useRef<HTMLDivElement>(null);
	const [feverMode, setFeverMode] = useState(false);

	useEffect(() => {
		const w = window.innerWidth;
		const h = window.innerHeight;

		const renderer = new THREE.WebGLRenderer();
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		const elm = mountRef.current;

		elm?.appendChild(renderer.domElement);

		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(w, h);

		const scene = new THREE.Scene();
		scene.background = new THREE.Color("#D6E5E3"); // 背景色を設定

		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.set(0, 0, 5);

		const loader = new GLTFLoader();

		loader.load(
			"/maracas-gold.glb",
			(gltf) => {
				// When the .gltf is loaded
				gltf.scene.position.set(0, 1.5, 0);
				gltf.scene.scale.set(1.5, 1.5, 1.5);
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
				gltf.scene.scale.set(1.5, 1.5, 1.5);
				gltf.scene.position.set(3, 1.5, 0);
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

		//DirectionalLight
		const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
		directionalLight.position.set(0, -4, 50);
		scene.add(directionalLight);

		// AmbientLight
		const defaultAmbientLight = new THREE.AmbientLight(0xffffff, 3); // soft white light
		scene.add(defaultAmbientLight);

		///////////////////////

		// Ambient Light
		const ambientLight = new THREE.AmbientLight(0x404040, 15);
		scene.add(ambientLight);

		const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
		const pointLights: THREE.PointLight[] = [];

		colors.forEach((color, idx) => {
			const light = new THREE.PointLight(color, 1, 50);
			light.position.set(5 * Math.sin(idx), 5 * Math.cos(idx), 5 * Math.sin(idx) * Math.cos(idx));
			scene.add(light);
			pointLights.push(light);
		});

		// Spot Light
		const spotLight = new THREE.SpotLight(0xffffff, 5);
		spotLight.position.set(0, 10, 0);
		scene.add(spotLight);

		// Geometry
		// const geometry = new THREE.BoxGeometry();
		// const material = new THREE.MeshStandardMaterial({ color: 0x808080 });
		// const cube = new THREE.Mesh(geometry, material);
		// scene.add(cube);

		const controls = new OrbitControls(camera, renderer.domElement);

		const animate = () => {
			if (feverMode) {
				scene.remove(directionalLight);
				scene.remove(defaultAmbientLight);

				scene.background = new THREE.Color("#000"); // 背景色を設定
				pointLights.forEach((light, idx) => {
					light.position.x = 5 * Math.sin(Date.now() * 0.001 * (idx + 1));
					light.position.z = 5 * Math.cos(Date.now() * 0.001 * (idx + 1));
					light.intensity = (Math.sin(Date.now() * 0.001 * (idx + 1)) + 1.5) * 1.5;
				});

				spotLight.color.setHSL(Math.sin(Date.now() * 0.001), 1, 0.5);

				// cube.rotation.x += 0.01;
				// cube.rotation.y += 0.01;
				requestAnimationFrame(animate);
			} else {
				scene.background = new THREE.Color("#D6E5E3"); // 背景色を設定
				scene.add(directionalLight);
				scene.add(defaultAmbientLight);
			}

			renderer.render(scene, camera);
			controls.update();
		};

		animate();

		///////////////////////

		const tick = () => {
			renderer.render(scene, camera);
			requestAnimationFrame(tick);
		};

		tick();

		return () => {
			elm?.removeChild(renderer.domElement);
			// scene.remove(cube);
			// geometry.dispose();
			// material.dispose();
		};
	}, [feverMode]);

	return (
		<div ref={mountRef} className='absolute top-0 left-0 w-full h-full'>
			<button onClick={() => setFeverMode(!feverMode)}>{feverMode ? "Stop" : "Start"} Animation</button>
		</div>
	);
};

export default Show3dObj;

