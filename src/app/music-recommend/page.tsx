
'use client';

import React, { Suspense } from "react";
import useSongByRoomId from "@/lib/useSongByRoomId";
import NeumourList from "@/components/NeumorList";
import ShowRoomID from "@/components/ShowRoomID";
import ModalWhole from "@/components/ModalWhole";
import { useSearchParams } from "next/navigation";
import IsLoading from "@/components/IsLoading";
import { auth } from "@/lib/firebase";

interface SongListProps {
  roomId: number;
  userID: number;
};

const SongList = (props: SongListProps) => {
  const songs = useSongByRoomId(props.roomId);
  const songNames = songs ? songs.map((song) => song.songName) : [];

  return (
    <>
      <ModalWhole userId={props.userID} />
      <ShowRoomID roomID={String(props.roomId)} />
      <NeumourList listItems={songNames} />
    </>
  );
};

const Page = () => {
  const searchParams = useSearchParams();

  // クエリパラメータを取得
  const roomID = searchParams.get("roomID");
  // const userID = searchParams.get("userID");
  // ユーザーIDはログイン機能を実装したら取得する
  const userID = auth.currentUser?.uid;

  // クエリがまだ利用できない場合のハンドリング
  if (!roomID || !userID) {
    return <IsLoading />;
  }
  if (typeof roomID !== "string" || typeof userID !== "string") {
    return <p>ルームIDまたはユーザーIDが不正です。</p>;
  }
  if (!roomID) {
    return (
      <Suspense fallback={<IsLoading />}>
        <SongList roomId={Number(roomID)} userID={Number(userID)} />
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<IsLoading />}>
      <SongList roomId={Number(roomID)} userID={Number(userID)} />
    </Suspense>
  );
};

export default Page;
