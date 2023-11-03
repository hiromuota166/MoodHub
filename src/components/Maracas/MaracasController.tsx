"use client";
import useSoundEvents from "@/customhooks/useSoundEvents";
import { useState } from "react";
import LightMaracas from "./LightMaracas";
import VolumeButton from "./VolumeButton";
import MaracasModal from "./MaracasModal";
import Show3dObj from "./Show3dObj";
import NightModeSwitch from "../NightModeSwitch";
import { useCustomColorMode } from "@/customhooks/useCustomColorMode";

interface MaracasControllerProps {
	mode: "normal" | "special" | "light";
}

const MaracasController = (props: MaracasControllerProps) => {
	const { mode } = props;
	const modeText = mode === "normal" ? "ノーマル" : mode === "special" ? "スペシャル" : "軽量";
	const [shakeInterval, setShakeInterval] = useState(80); // シェイクのインターバル
	const [shakeThreshold, setShakeThreshold] = useState(15); // シェイクの閾値
	const { colorMode } = useCustomColorMode();
	const feverMode = colorMode === "dark" ? true : false;

	const ausioPath = "/maracas-sound.mp3";
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
			<div className='absolute bottom-24 right-0 md-top-8 md-right-8 w-full z-10'>
				<div className='flex md:block justify-between'>
					<div className='flex flex-col md:flex-row md:justify-end gap-2 my-2 mr-2'>
						<h2 className='mt-auto p-4 px-2 w-fit h-fit shadow-boxOut rounded-3xl'>{modeText}マラカス</h2>
					</div>
					<div className='grid grid-cols-2 md:flex md:justify-end gap-2 my-2 mr-2'>
						<div className='col-start-2'>
							<NightModeSwitch />
						</div>
						<div className="w-fit">
							<VolumeButton Volume={volume} isMuted={isMuted} handleToggleMute={toggleMute} />
						</div>
						<div className="w-fit">
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
					</div>
				</div>
			</div>
			{!isDevicemotionPermissionGranted ? (
				<div className='absolute top-0 left-0 h-screen w-screen'>
					<button
						onClick={requestDeviceMotion}
						className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-3xl shadow-boxOut p-4 m-4'
					>
						ここをクリックしてマラカスをはじめる
					</button>
				</div>
			) : (
				<></>
			)}
			{mode === "light" && <LightMaracas />}
			{mode === "normal" && <Show3dObj mode='normal' feverMode={feverMode} />}
			{mode === "special" && <Show3dObj mode='special' feverMode={feverMode} />}
		</div>
	);
};

export default MaracasController;

