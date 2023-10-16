'use client'
import React, { Suspense } from "react";
import useSongByRoomId from "@/lib/useSongByRoomId";

interface SongListProps {
  roomId: number;
}

const SongList: React.FC<SongListProps> = ({ roomId }) => {
  const songs = useSongByRoomId(roomId);

  return (
    <ul>
      {songs && songs.map((song, index) => {
        console.log(song);
        if (song) {
          return (
            <li key={index}>
              {song.songName} - Categories: {song.categories && song.categories.map((category, index) => (
                <span key={index}>{category}</span>
              ))}
            </li>
          )
        }
      })}
    </ul>
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