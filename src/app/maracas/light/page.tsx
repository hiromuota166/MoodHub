"use client";
import useSoundHook from "@/customhooks/useSoundHook";
import Image from "next/image";
const Page = () => {
	const {
		isSoundOn,
		setIsSoundOn,
		isDevicemotionPermissionGranted,
		requestPermission,
		loadingState,
		reloadAudio,
		shankeInterval,
		setShankeInterval,
	} = useSoundHook();

	const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setShankeInterval(Number(event.target.value)); // スライダーの値をステートにセット
	};

	return (
		<div>
			<div>light maracas</div>
			<button onClick={() => setIsSoundOn(!isSoundOn)}>{isSoundOn ? "Stop" : "Start"} Sound</button>
			{!isDevicemotionPermissionGranted || true ? <button onClick={requestPermission}>Enable Motion</button> : <></>}
			<div>loadingState: {loadingState}</div>
			<button onClick={reloadAudio}>reload audio</button>
			<div>
				<input type='range' min='0' max='1000' step='10' value={shankeInterval} onChange={handleSliderChange} />
				<p>Current Value: {shankeInterval}</p>
			</div>
			<div className='w-[60%] h-[60%] m-auto'>
				<Image src={"/music_maracas.webp"} alt='マラカスの画像' width={400} height={382} layout='responsive'></Image>
			</div>
		</div>
	);
};

export default Page;
