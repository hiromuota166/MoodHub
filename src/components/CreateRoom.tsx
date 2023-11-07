"use client";
import IsLoading from "./IsLoading";
import useCreateRoom from "@/hooks/useCreateRoom";

const CreateRoom = () => {
	const { roomName, setRoomName, handleClick, createRoomState } = useCreateRoom();

	return (
		<a href='/target-page' onClick={(e) => handleClick(e, "/target-page")}>
			<div className='bg-background text-font text-xl m-auto p-8 py-10 w-fit rounded-3xl shadow-boxOut'>
				{createRoomState.loading ? <IsLoading /> : <h2>ルーム作成</h2>}
			</div>
		</a>
	);
};

export default CreateRoom;
