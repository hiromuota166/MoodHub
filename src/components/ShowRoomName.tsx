// ロームネームを表示するコンポーネント 親コンポーネント
"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import RoomNameModal from "./RoomNameModal";

const ShowRoomName = () => {
  const searchParam = useSearchParams();
  const [roomName, setRoomName] = useState("ひまわりの部屋");

  const roomID = searchParam.get("roomID");
  console.log(roomID);

  const handleRoomNameChange = (newName: string) => {
    setRoomName(newName);
  };
  return (
    <div className="my-8">
      <h2>ルーム名</h2>
      <div className="text-2xl py-4 text-font bg-background shadow-boxOut rounded-3xl">
        <div className="flex items-center space-x-4">
          <h2 className="flex-grow text-center ml-4">{roomName}</h2>
          <RoomNameModal onRoomNameChange={handleRoomNameChange} />
        </div>
      </div>
    </div>
  );
};

export default ShowRoomName;
