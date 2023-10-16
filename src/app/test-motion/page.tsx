"use client";
import useSoundHook from "@/customhooks/useSoundHook";
import playSound from "@/functions/playSound";

const Page = () => {
	const {
		isSoundOn,
		setIsSoundOn,
		isPermissionGranted,
		requestPermission,
		accelerationX,
		accelerationY,
		accelerationZ,
	} = useSoundHook();
	return (
		<div>
			<div className=''>
				<button onClick={playSound}>play Sound</button>
				<button onClick={() => setIsSoundOn(!isSoundOn)}>{isSoundOn ? "Stop" : "Start"} Sound</button>
				{!isPermissionGranted? <button onClick={requestPermission}>Enable Motion</button> : <></>}
                <div>
                    <ul>
                        <li>accelerationX: {accelerationX}</li>
                        <li>accelerationY: {accelerationY}</li>
                        <li>accelerationZ: {accelerationZ}</li>
                    </ul>
                </div>
			</div>
		</div>
	);
};

export default Page;
