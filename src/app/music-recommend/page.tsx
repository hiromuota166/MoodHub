'use client'
import React, { Suspense } from "react";
import useSongByRoomId from "@/lib/useSongByRoomId";
import NeumourList from "@/components/NeumorList";
import ShowRoomID from "@/components/ShowRoomID";
import ModalWhole from "@/components/ModalWhole";
import { useSearchParams } from "next/navigation";

interface SongListProps {
  roomId: number;
  userID: number;
}

const SongList: React.FC<SongListProps> = ({ roomId, userID }) => {
  const songs = useSongByRoomId(roomId);
  const songNames = songs ? songs.map(song => song.songName) : [];

  return (
    <>
      <ModalWhole userId={userID} />
      <ShowRoomID roomID={String(roomId)} />
      <NeumourList listItems={songNames} />
    </>
  );
};


const Page = () => {
  const searchParams = useSearchParams();

  // クエリパラメータを取得
  const roomID = searchParams.get("roomID");
  const userID = searchParams.get("userID");
  // クエリがまだ利用できない場合のハンドリング
  if (!roomID || !userID) {
    return <div>Loading...</div>;
  }
  if (typeof roomID !== "string" || typeof userID !== "string") {
    return <p>ルームIDまたはユーザーIDが不正です。</p>
  }
  if (!roomID) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <SongList roomId={Number(roomID)} userID={Number(userID)} />
      </Suspense>)
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SongList roomId={Number(roomID)} userID={Number(userID)} />
    </Suspense>
  );
};

export default Page;