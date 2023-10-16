'use client'
import { useMutation } from "@apollo/client";
import useApolloQuery from "@/lib/useApolloQuery"

interface SongData {
  songName: string;
  category: string[];
}

export default function Page() {
  const { joinRoomFunc, joinRoomState } = useApolloQuery();
  const handleClick = () => {
    console.log("clicked");
    joinRoomFunc().then(() => {
      console.log(joinRoomState);
    })
  }
  return <main onClick={handleClick}>hogehoge</main>;
}