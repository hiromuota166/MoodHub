"use client";
import useSoundHook from "@/customhooks/useSoundHook";
import Image from "next/image";
const Page = () => {
    const { isSoundOn, setIsSoundOn, isDevicemotionPermissionGranted, requestPermission } = useSoundHook();
    return (
        <div>
            <div>light maracas</div>
            <div className='absolute top-0 right-0 z-10'>
                <button onClick={() => setIsSoundOn(!isSoundOn)}>{isSoundOn ? "Stop" : "Start"} Sound</button>
                {!isDevicemotionPermissionGranted || true ? <button onClick={requestPermission}>Enable Motion</button> : <></>}
            </div>
            <div className="w-[60%] h-[60%] m-auto">
                <Image src={"/music_maracas.webp"} alt="マラカスの画像" width={400} height={382} layout="responsive"></Image>
            </div>
        </div>
    )
}

export default Page;
