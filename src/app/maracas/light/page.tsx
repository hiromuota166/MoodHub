"use client";
import useSoundEvents from "@/customhooks/useSoundEvents";
import Image from "next/image";
import { useState } from "react";
const Page = () => {
	const ausioPath = "/maracas-sound.mp3";
	const [shakeThreshold, setShakeThreshold] = useState(15); // シェイクの閾値
	const [shakeInterval, setShakeInterval] = useState(100); // シェイクのインターバル

	const { playSound, isDevicemotionPermissionGranted, requestDeviceMotion } = useSoundEvents(ausioPath, shakeThreshold, shakeInterval);

	const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setShakeInterval(Number(event.target.value)); // スライダーの値をステートにセット
	};

	const handleThresholdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setShakeThreshold(Number(event.target.value)); // スライダーの値をステートにセット
	};

	return (
		<div>
			<div>light maracas</div>
			<div>
				{!isDevicemotionPermissionGranted || true ? <button onClick={requestDeviceMotion}>Enable Motion</button> : <></>}

			</div>
			<div>
				<input type='range' min='0' max='300' step='10' value={shakeInterval} onChange={handleSliderChange} />
				<p>shankeInterval: Current Value: {shakeInterval}</p>
			</div>
			<div>
				<input type='range' min='0' max='30' value={shakeThreshold} onChange={handleThresholdChange} />
				<p>Shake Power threshold: Current Value: {shakeThreshold}</p>
			</div>
			<div>
				<button onClick={playSound}>Play Sound</button>
			</div>
			<div className='w-[60%] h-[60%] m-auto'>
				<Image src={"/music_maracas.webp"} alt='マラカスの画像' width={400} height={382} layout='responsive'></Image>
			</div>
		</div>
	);
};

export default Page;
