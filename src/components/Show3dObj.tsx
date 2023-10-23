"use client";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

interface Show3dObjProps {
	mode: "normal" | "special";
}

const Show3dObj = ({ mode }: Show3dObjProps) => {
	const mountRef = useRef<HTMLDivElement>(null);
	const [feverMode, setFeverMode] = useState(false);

	useEffect(() => {
		const w = window.innerWidth;
		const h = window.innerHeight;

		const renderer = new THREE.WebGLRenderer();
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(w, h);

		const elm = mountRef.current;
		elm?.appendChild(renderer.domElement);

		const scene = new THREE.Scene();
		scene.background = feverMode ? new THREE.Color("#000") : new THREE.Color("#D6E5E3");

		const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
		camera.position.set(0, 0, 5);

		const loader = new GLTFLoader();
		const modelPath = mode === "normal" ? "/maracas-wood.glb" : "/maracas-gold.glb";

		loader.load(
			modelPath,
			(gltf) => {
				gltf.scene.position.set(0, 1.5, 0);
				gltf.scene.scale.set(1.5, 1.5, 1.5);
				scene.add(gltf.scene);
			},
			(xhr) => console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`),
			(error) => console.log("An error happened", error)
		);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
		directionalLight.position.set(0, -4, 50);
		const defaultAmbientLight = new THREE.AmbientLight(0xffffff, 3);
		const ambientLight = new THREE.AmbientLight(0x404040, 15);
		const spotLight = new THREE.SpotLight(0xffffff, 5);
		spotLight.position.set(0, 10, 0);

		const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
		const pointLights: THREE.PointLight[] = colors.map((color, idx) => {
			const light = new THREE.PointLight(color, 1, 50);
			light.position.set(5 * Math.sin(idx), 5 * Math.cos(idx), 5 * Math.sin(idx) * Math.cos(idx));
			return light;
		});

		scene.add(directionalLight, defaultAmbientLight, ambientLight, spotLight, ...pointLights);

		const controls = new OrbitControls(camera, renderer.domElement);

		const animate = () => {
			if (feverMode) {
				pointLights.forEach((light, idx) => {
					light.position.x = 5 * Math.sin(Date.now() * 0.001 * (idx + 1));
					light.position.z = 5 * Math.cos(Date.now() * 0.001 * (idx + 1));
					light.intensity = (Math.sin(Date.now() * 0.001 * (idx + 1)) + 1.5) * 1.5;
				});
				spotLight.color.setHSL(Math.sin(Date.now() * 0.001), 1, 0.5);
			}
			renderer.render(scene, camera);
			controls.update();
			requestAnimationFrame(animate);
		};

		animate();

		return () => {
			elm?.removeChild(renderer.domElement);
		};
	}, [mode, feverMode]);

	return (
		<div ref={mountRef} className='absolute top-0 left-0 w-full h-full'>
			<button onClick={() => setFeverMode(!feverMode)}>{feverMode ? "Stop" : "Start"} Animation</button>
		</div>
	);
};

export default Show3dObj;
