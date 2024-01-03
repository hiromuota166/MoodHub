// ルームネームを表示するコンポーネント 親コンポーネント
"use client";
import { useState } from "react";
import RoomNameModal from "./RoomNameModal";
import useMusicRecommendPageData from "@/hooks/useMusicRecommendPageData";

interface ShowRoomNameProps {
  roomID: number;
}

const ShowRoomName = (props: ShowRoomNameProps) => {
  const [roomName, setRoomName] = useState("ひまわりの部屋");
  const { roomID } = props;

  const { RoomMembers } = useMusicRecommendPageData(String(roomID));
  console.log(RoomMembers);

  if (RoomMembers.data) {
    // データが取得できたらルーム名を表示
    const { getMembers } = RoomMembers.data;
    const name = getMembers.roomName;

    return (
      <div className="my-8">
        <h2>ルーム名</h2>
        <div className="text-2xl py-4 text-font bg-background shadow-boxOut rounded-3xl">
          <div className="flex items-center space-x-4">
            <h2 className="flex-grow text-center ml-4">{name}</h2>
            <RoomNameModal onRoomNameChange={setRoomName} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="my-8">
        <h2>ルーム名</h2>
        <div className="text-2xl py-4 text-font bg-background shadow-boxOut rounded-3xl">
          <div className="flex items-center space-x-4">
            <h2 className="flex-grow text-center ml-4">{roomName}</h2>
            <RoomNameModal onRoomNameChange={setRoomName} />
          </div>
        </div>
      </div>
    );
  }
}

export default ShowRoomName;
