"use client";
import useSoundHook from "@/customhooks/useSoundHook";

const Page = () => {
	const { isSoundOn, setIsSoundOn, isPermissionGranted, requestPermission, acceleration, playSound } = useSoundHook();

	return (
		<div>
			<div className=''>
				<div>
					<button
						className='m-4'
						onClick={async () => {
							let audio: HTMLAudioElement | null = new Audio("/maracas-sound.mp3");
							await audio.play();
							audio = null;
						}}
					>
						play sound
					</button>
				</div>
				<div>
					<button className='m-4' onClick={playSound}>
						play Sound
					</button>
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
