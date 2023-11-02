"use client";
import { useRouter } from "next/navigation";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { makeUID } from "@/functions/makeUID";
import NavigateButton from "./NavigateButton";
import IsLoading from "./IsLoading";
export const CREATE_ROOM_MUTATION = gql`
	mutation CreateARoom($room: CreateRoom!) {
		createRoom(room: $room) {
			roomId
			userId
			name
		}
	}
`;
const CreateRoom = () => {
	const router = useRouter();

	interface RoomResponse {
		createRoom: Room;
	}

	interface Room {
		roomId: number;
		userId: number[];
		name: string;
	}

	const [createRoom, { data, loading, error }] = useMutation<RoomResponse>(CREATE_ROOM_MUTATION);
	const [roomName, setRoomName] = useState<string>("");

	const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		e.preventDefault();
		const userId = makeUID();
		try {
			await createRoom({
				variables: {
					room: {
						userId,
						roomName,
					},
				},
			}).then((res) => {
				console.log(res.data?.createRoom.roomId);
				const roomId = res.data?.createRoom.roomId;
				// 処理が完了した後にページ遷移
				const url = `/init-room?roomID=${roomId}&userID=${userId}`;
				router.push(url);
			});
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<>
			{loading ? (
				<IsLoading />
			) : (
				<NavigateButton
					href={"/maracas"}
					label={"ルーム作成"}
					onClick={(e) => handleClick(e, "/maracas")}
					linkDisabled
				/>
			)}
		</>
	);
};

export default CreateRoom;
