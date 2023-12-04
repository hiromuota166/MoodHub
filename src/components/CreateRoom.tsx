"use client";
import { useRouter } from "next/navigation";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { makeUID } from "@/functions/makeUID";
import IsLoading from "./IsLoading";
import React from "react";

const CreateRoom = () => {
  const router = useRouter();
  const CREATE_ROOM_MUTATION = gql`
    mutation CreateARoom($room: CreateRoom!) {
      createRoom(room: $room) {
        roomId
        userId
        name
      }
    }
  `;

  interface RoomResponse {
    createRoom: Room;
  }

  interface Room {
    roomId: number;
    userId: number[];
    name: string;
  }

  const [createRoom, { loading }] =
    useMutation<RoomResponse>(CREATE_ROOM_MUTATION);
  const [roomName] = useState<string>("");

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const userId = makeUID();
    try {
      await createRoom({
        variables: {
          room: {
            userId,
            roomName,
          },
        },
      }).then((res) => {
        console.log(res.data?.createRoom.roomId);
        const roomId = res.data?.createRoom.roomId;
        // 処理が完了した後にページ遷移
        const url = `/init-room?roomID=${roomId}&userID=${userId}`;
        router.push(url);
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <a href="/target-page" onClick={(e) => handleClick(e)}>
      <div className="text-xl m-auto p-8 py-10 w-fit rounded-3xl shadow-boxOut">
        {loading ? <IsLoading /> : <h2>ルーム作成</h2>}
      </div>
    </a>
  );
};

export default CreateRoom;
