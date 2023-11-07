"use client";
import NeumourList from "@/components/NeumorList";
import ShowRoomID from "@/components/ShowRoomID";
import ModalWhole from "@/components/ModalWhole";
import { useSearchParams } from "next/navigation";
import IsLoading from "@/components/IsLoading";
import useMusicRecommendPageData from "@/hooks/useMusicRecommendPageData";
import { Song } from "@/lib/apollo/gql/graphql";

interface SongListProps {
	songsData: { song: Song[] } | undefined;
}

const SongList = ({ songsData }: SongListProps) => {
	if (!songsData) return <p>曲がありません。</p>;
	const songs = songsData.song;
	const songNames = songs.map((song) => song.songName);
	return (
		<>
			<NeumourList listItems={songNames} />
		</>
	);
};

const Page = () => {
	const searchParams = useSearchParams();

	const roomID = searchParams.get("roomID");
	const userID = searchParams.get("userID");
	const numericRoomID = Number(roomID);
	const numericUserID = Number(userID);

	const {
		updateCategoriesState,
		registerUserState,
		Song,
		getUserState,
		handleUserRegistration,
		handleUpdateCategories,
	} = useMusicRecommendPageData(numericUserID, numericRoomID);

	if (isNaN(numericRoomID) || isNaN(numericUserID)) {
		return <p>ルームIDまたはユーザーIDが不正です。</p>;
	}

	if (Song.error) {
		return <p>エラーが発生しました。やり直してください。</p>;
	}

	return (
		<>
			<ModalWhole userId={numericUserID} roomId={numericRoomID}/>
			<ShowRoomID roomID={String(numericRoomID)} />
			{getUserState.loading ? (
				<IsLoading />
			) : (
				<>
					<p>ルームネーム: {getUserState.data?.getMembers.roomName}</p>
					<p>ユーザーリスト:</p>
					<ul>
						{getUserState.data?.getMembers.members?.map((member, i) => {
							console.log(member);
							return <li key={i}>{member}</li>;
						})}
					</ul>
				</>
			)}
			{Song.loading ? <IsLoading /> : <SongList songsData={Song.data} />}
		</>
	);
};

export default Page;
