'use client'
import React, { Suspense } from "react";
import useSongByRoomId from "@/lib/useSongByRoomId";
import NeumourList from "@/components/NeumorList";
import ShowRoomID from "@/components/ShowRoomID";
import ModalWhole from "@/components/ModalWhole";

interface SongListProps {
  roomId: number;
}

const SongList: React.FC<SongListProps> = ({ roomId }) => {
  const songs = useSongByRoomId(roomId);
  const songNames = songs ? songs.map(song => song.songName) : [];

  return (
    <>
      <ModalWhole/>
      <ShowRoomID roomID="12345"/>
      <NeumourList listItems={songNames}/>
    </>
  );
};

interface SuspendedSongListProps {
  roomId?: number;
}

const SuspendedSongList: React.FC<SuspendedSongListProps> = ({ roomId }) => {
  if (!roomId) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <SongList roomId={5711} />
      </Suspense>)
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SongList roomId={roomId} />
    </Suspense>
  );
};

export default SuspendedSongList;