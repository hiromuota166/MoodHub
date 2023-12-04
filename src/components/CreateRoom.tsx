"use client";
import { useRouter } from "next/navigation";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import IsLoading from "./IsLoading";
import { auth } from "@/lib/firebase";
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
    //ログインしていたらルーム作成ページへ遷移
    e.preventDefault();
    if (auth.currentUser != null) {
      const userId = auth.currentUser?.uid;
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
          const url = `/music-recommend?roomID=${roomId}`;
          router.push(url);
        });
      } catch (err) {
        console.error(err);
      }
      return;
    } else {
      //ログインしていなかったらアラートを出してそのままのページに留まる
      alert("ログインしてください");
      const url = `/`;
      router.push(url);
      return;
    }
  };
  return (
    <a href="/" onClick={(e) => handleClick(e)}>
      <div className="bg-background text-font text-lg text-3xl m-auto p-8 py-10 w-fit rounded-3xl shadow-boxOut">
        {loading ? <IsLoading /> : <h2>ルーム作成</h2>}
      </div>
    </a>
  );
};

export default CreateRoom;
