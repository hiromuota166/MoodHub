"use client";
import useSoundEvents from "@/customhooks/useSoundEvents";
import Image from "next/image";
import { useState } from "react";
import MaracasModal from "@/components/Maracas/MaracasModal";
import VolumeButton from "@/components/Maracas/VolumeButton";

const Page = () => {
	const ausioPath = "/maracas-sound.mp3";
	const [shakeInterval, setShakeInterval] = useState(80); // シェイクのインターバル
	const [shakeThreshold, setShakeThreshold] = useState(15); // シェイクの閾値

	const {
		loadingState,
		playSound,
		reloadAudio,
		adjustVolume,
		mute,
		unmute,
		toggleMute,
		isMuted,
		volume,
		isDevicemotionPermissionGranted,
		requestDeviceMotion,
	} = useSoundEvents(ausioPath, shakeThreshold, shakeInterval);

	const handleMaracasSensitivityChange = (value: number) => {
		setShakeInterval(value); // スライダーの値をステートにセット
	};

	const handleMaracasVibrationIntensityChange = (value: number) => {
		setShakeThreshold(value); // スライダーの値をステートにセット
	};

	return (
		<div>
			<div>軽量マラカス</div>
			<VolumeButton Volume={volume} isMuted={isMuted} handleToggleMute={toggleMute}/>
			<div className='m-4'>
				<MaracasModal
					MaracasSensitivity={shakeInterval}
					handleMaracasSensitivityChange={handleMaracasSensitivityChange}
					MaracasVibrationIntensity={shakeThreshold}
					handleMaracasVibrationIntensityChange={handleMaracasVibrationIntensityChange}
					isMuted={isMuted}
					toggleMute={toggleMute}
					Volume={volume}
					handleVolumeChange={adjustVolume}
					handleMaracasSoundSwitch={toggleMute}
				/>
			</div>
			<div>
				{!isDevicemotionPermissionGranted ? (
					<div className="absolute top-0 left-0 h-screen w-screen bg-background">
						<button onClick={requestDeviceMotion} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-3xl shadow-boxOut p-4 m-4'>
							ここをクリックしてマラカスをはじめる
						</button>
					</div>
				) : (
					<></>
				)}
			</div>

			<div className='w-[60%] h-[60%] m-auto'>
				<button onClick={playSound}>
					<Image src={"/music_maracas.webp"} alt='マラカスの画像' width={400} height={382} layout='responsive' loading="eager"></Image>
				</button>
			</div>
		</div>
	);
};

export default Page;
