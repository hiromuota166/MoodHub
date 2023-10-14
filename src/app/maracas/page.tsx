"use client";
import Show3dObj from "@/components/Show3dObj";
import useSoundHook from "@/customhooks/useSoundHook";
const Page = () => {
	const { isSoundOn, setIsSoundOn, isPermissionGranted, requestPermission } = useSoundHook();
	return (
		<div>
			<div className='absolute top-0 right-0 z-10'>
				<button onClick={() => setIsSoundOn(!isSoundOn)}>{isSoundOn ? "Stop" : "Start"} Sound</button>
				{isPermissionGranted ? <button onClick={requestPermission}>Enable Motion</button> : <></>}
			</div>
			<Show3dObj />
		</div>
	);
};

export default Page;

