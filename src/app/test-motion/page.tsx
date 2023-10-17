"use client";
import useSoundHook from "@/customhooks/useSoundHook";

const Page = () => {
	const { isSoundOn, setIsSoundOn, isDevicemotionPermissionGranted, requestPermission, acceleration } = useSoundHook();

	return (
		<div>
			<div className='min-h-[500vh]'>
				<div>
					<button onClick={() => setIsSoundOn(!isSoundOn)}>
						{isSoundOn ? "Stop" : "Start"} Sound: is Sound On {isSoundOn.toString()}
					</button>
				</div>
				<div>
					{
						<button onClick={requestPermission}>
							Enable Motion: is permission Granted {isDevicemotionPermissionGranted.toString()}
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
