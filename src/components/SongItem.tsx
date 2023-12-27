import React, { Suspense } from "react";
import ShowSpotify from "./ShowSpotify";
import { Song } from "@/lib/apollo/gql/graphql";
import IsLoading from "./IsLoading";

const SongItem: React.FC<{ song: Song }> = ({ song }) => {
  return (
    <div>
      <h3>{song.songName}</h3>
      <Suspense fallback={<IsLoading />}>
        <ShowSpotify trackId={song.trackId} />
      </Suspense>
    </div>
  );
};

export default SongItem;
