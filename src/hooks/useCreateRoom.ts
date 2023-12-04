"use client";
import { useState } from "react";
import useApolloQuery from "@/lib/apollo/useApolloQuery";
import { useRouter } from "next/navigation";
import React from "react";
import { auth } from "@/lib/firebase";

const useCreateRoom = () => {
  const { createRoomFunc, createRoomState } = useApolloQuery();
  const [roomName, setRoomName] = useState<string>("");
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const userId = auth.currentUser?.uid;
    if (!userId) return window.alert("ログインしてください");
    try {
      await createRoomFunc({
        variables: {
          userId,
          roomName,
        },
      }).then((res) => {
        const roomId = res.data?.createRoom.roomId;
        const url = `/music-recommend?roomID=${roomId}`;
        router.push(url);
      });
    } catch (err) {
      console.error(err);
    }
  };
  return { roomName, setRoomName, handleClick, createRoomState };
};

export default useCreateRoom;
