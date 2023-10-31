"use client";
import useSoundEvents from "@/customhooks/useSoundEvents";
import Image from "next/image";
import { useState } from "react";
import MaracasModal from "@/components/MaracasModal";

const Page = () => {
	const ausioPath = "/maracas-sound.mp3";
	const [shakeInterval, setShakeInterval] = useState(80); // シェイクのインターバル
	const [shakeThreshold, setShakeThreshold] = useState(15); // シェイクの閾値
	const [DeviceVolume, setDeviceVolume] = useState(1); // デバイス全体の音量

	const {
		loadingState,
		playSound,
		reloadAudio,
		adjustVolume,
		mute,
		unmute,
		toggleMute,
		isMuted,
		isDevicemotionPermissionGranted,
		requestDeviceMotion,
	} = useSoundEvents(ausioPath, shakeThreshold, shakeInterval);

	const handleMaracasSensitivityChange = (value: number) => {
		setShakeInterval(value); // スライダーの値をステートにセット
	};

	const handleMaracasVibrationIntensityChange = (value: number) => {
		setShakeThreshold(value); // スライダーの値をステートにセット
	};

	const handleDeviceVolumeChange = (value: number) => {
		setDeviceVolume(value); // スライダーの値をステートにセット
		adjustVolume(value)
	}

	return (
		<div>
			<div>軽量マラカス</div>
			<div className="m-4">
				<MaracasModal
					MaracasSensitivity={shakeInterval}
					handleMaracasSensitivityChange={handleMaracasSensitivityChange}
					MaracasVibrationIntensity={shakeThreshold}
					handleMaracasVibrationIntensityChange={handleMaracasVibrationIntensityChange}
					DeviceVolume={DeviceVolume}
					handleDeviceVolumeChange={handleDeviceVolumeChange}
					handleMaracasSoundSwitch={toggleMute}
				/>
			</div>
			<div>
				{!isDevicemotionPermissionGranted || true ? (
					<button onClick={requestDeviceMotion} className="rounded-3xl shadow-boxOut p-4 m-4">マラカスをはじめる</button>
				) : (
					<></>
				)}
			</div>

			<div className='w-[60%] h-[60%] m-auto'>
				<button onClick={playSound}>
					<Image src={"/music_maracas.webp"} alt='マラカスの画像' width={400} height={382} layout='responsive'></Image>
				</button>
			</div>
		</div>
	);
};

export default Page;
