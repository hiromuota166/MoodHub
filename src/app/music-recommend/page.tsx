"use client";
import React from "react";
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
  if (!songsData || songsData.song.length === 0) return <p>曲がありません。</p>;
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

  const { Song, RoomMembers } = useMusicRecommendPageData(
    numericUserID,
    numericRoomID
  );

  if (isNaN(numericRoomID) || isNaN(numericUserID)) {
    return <p>ルームIDまたはユーザーIDが不正です。</p>;
  }

  return (
    <>
      <ModalWhole userId={numericUserID} roomId={numericRoomID} />
      <ShowRoomID roomID={String(numericRoomID)} />
      {RoomMembers.loading ? (
        <IsLoading />
      ) : (
        <>
          <p>ルームネーム: {RoomMembers.data?.getMembers.roomName}</p>
          <p>ユーザーリスト:</p>
          <ul>
            {RoomMembers.data?.getMembers.members?.map((member, i) => {
              return <li key={i}>{member}</li>;
            })}
          </ul>
        </>
      )}
      {Song.error ? (
        <>
          <p>曲のエラーが発生しました。やり直してください。</p>
          <p>{Song.error.toString()}</p>
        </>
      ) : null}
      {Song.loading ? <IsLoading /> : <SongList songsData={Song.data} />}
    </>
  );
};

export default Page;
