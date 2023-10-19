"use client";
import CreateRoom from "@/components/CreateRoom";
import NavigateButton from "@/components/NavigateButton";
import RoomInButton from "@/components/RoomInButton";
export default function Home() {
	return (
		<>
			<div className='m-auto my-8 w-fit'>
				<RoomInButton />
			</div>
			<div className='m-auto my-8 w-fit'>
				<CreateRoom />
			</div>
			<div className='m-auto my-8 w-fit'>
				<NavigateButton href={"/maracas"} label={"マラカス"} />
			</div>
		</>
	);
}
