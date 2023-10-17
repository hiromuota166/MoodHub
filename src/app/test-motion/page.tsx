"use client";
import useSoundHook from "@/customhooks/useSoundHook";

const Page = () => {
	const { isSoundOn, setIsSoundOn, isPermissionGranted, requestPermission, acceleration, playSound } = useSoundHook();

	function playVoice(): Promise<HTMLAudioElement> {
		const languageCode = "en-US";
		const voice = "NEUTRAL";

		// const url = createSpeechUrl(text, languageCode, voice);
		// Substitute for this SO code snippet:

		// Instantiate the audio element with the source URL
		// so that it can stream the audio data as early as possible
		// (without waiting for the entire "file" to buffer)
		const audio = new Audio("/maracas-sound.mp3");

		// Return a promise with the result of attempting playback
		// after enough streaming data has been downloaded
		return new Promise<HTMLAudioElement>((resolve, reject) =>
			audio.addEventListener("canplaythrough", () =>
				audio
					.play()
					.then(() => resolve(audio))
					.catch(reject)
			)
		);
	}

	return (
		<div>
			<div className=''>
				<div>
					<button className='m-4' onClick={() => playVoice()}>
						play Sound
					</button>
				</div>
				<div>
					<button
						className='m-4'
						onClick={() => {
							let audio: HTMLAudioElement | null = new Audio("/maracas-sound.mp3");
							audio.play();
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
