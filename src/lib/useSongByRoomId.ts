import { gql, useSuspenseQuery } from "@apollo/client";
import { Song } from "./apollo/gql/graphql";

const GET_SONG_BY_ROOM_ID = gql`
  query GetSongByRoomId($roomId: Int!) {
    song(roomId: $roomId) {
      songName
      categories
    }
  }
`;

const useSongByRoomId = (roomId: number) => {
  const { data } = useSuspenseQuery<{ song: Song[] }>(GET_SONG_BY_ROOM_ID, {
    variables: { roomId },
  });

  return data?.song;
};

export default useSongByRoomId;
