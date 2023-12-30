"use client";
import React, { Suspense, useState } from "react";
import NeumourList from "@/components/NeumorList";
import ShowRoomID from "@/components/ShowRoomID";
import ModalWhole from "@/components/ModalWhole";
import { useSearchParams } from "next/navigation";
import IsLoading from "@/components/IsLoading";
import useMusicRecommendPageData from "@/hooks/useMusicRecommendPageData";
import { useAuth } from "@/context/auth";
import ShowRoomName from "@/components/ShowRoomName";

interface SongListProps {
  roomID: number;
  userID: string;
}

const SongList = (props: SongListProps) => {
  const { userID, roomID } = props;
  const [loading, setloading] = useState(true);
  const { Song, handleUpdateCategories } = useMusicRecommendPageData(
    userID,
    roomID
  );
  const error = Song.error;
  const songs = Song.data?.song;
  const songNames = songs ? songs.map((song) => song.songName) : [];

  const handleModalUpdate = (categories: string[]) => {
    setloading(true);
    handleUpdateCategories(categories).then(() => {
      setloading(false);
    });
  };

  return (
    <>
      <ModalWhole default={true} handleUpdateCategories={handleModalUpdate} />
      <ShowRoomID roomID={String(roomID)} />
      {loading ? (
        <IsLoading />
      ) : error ? (
        <p>error</p>
      ) : (
        <NeumourList listItems={songNames} />
      )}
    </>
  );
};

const Page = () => {
  const searchParams = useSearchParams();
  const auth = useAuth();
  let userID = auth?.id;

  // クエリパラメータを取得
  const roomID = searchParams.get("roomID");

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
        <SongList roomID={Number(roomID)} userID={userID} />
      </Suspense>
    );
  }
  return (
    <>
      <ShowRoomName/>
      <Suspense fallback={<IsLoading />}>
        <SongList roomID={Number(roomID)} userID={userID} />
      </Suspense>
    </>
  );
};

export default Page;
