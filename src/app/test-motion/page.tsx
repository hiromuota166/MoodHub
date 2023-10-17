"use client";
import useSoundHook from "@/customhooks/useSoundHook";

const Page = () => {
	const { isSoundOn, setIsSoundOn, isPermissionGranted, requestPermission, acceleration, playSound } = useSoundHook();
	return (
		<div>
			<div className=''>
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