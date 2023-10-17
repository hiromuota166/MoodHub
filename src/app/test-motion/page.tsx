"use client";
import useSoundHook from "@/customhooks/useSoundHook";
import React, { useState, useEffect } from "react";

const Page = () => {
	const { isSoundOn, setIsSoundOn, isPermissionGranted, requestPermission, acceleration, playSound } = useSoundHook();
	const [count, setCount] = useState(0);
	const interval = 200;

	useEffect(() => {
		const timer = setInterval(() => {
			setCount((prevCount) => prevCount + 1);
		}, interval);

		return () => {
			clearInterval(timer);
		};
	}, [interval]);
	return (
		<div>
			<div className=''>
				<div>{count}</div>
				<div>
					<button onClick={playSound}>play Sound</button>
				</div>
				<div>
					<button onClick={() => setIsSoundOn(!isSoundOn)}>
						{isSoundOn ? "Stop" : "Start"} Sound: is Sound On {isSoundOn.toString()}
					</button>
				</div>
				<div>
					{
						<button onClick={requestPermission}>
							Enable Motion: is permission Granted {isPermissionGranted.toString()}
						</button>
					}
				</div>
				<div>
					<ul>
						<li>accelerationX: {acceleration.x}</li>
						<li>accelerationY: {acceleration.y}</li>
						<li>accelerationZ: {acceleration.z}</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Page;
