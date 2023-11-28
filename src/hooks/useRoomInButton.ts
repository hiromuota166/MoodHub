import React, { useState } from "react";
import useApolloQuery from "@/lib/apollo/useApolloQuery";
import { makeUID } from "@/functions/makeUID";
import { useRouter } from "next/navigation";

const useRoomInButton = () => {
  const { joinRoomFunc, joinRoomState } = useApolloQuery();
  const [roomName, setRoomName] = useState<string>("");
  const router = useRouter();

  const joinRoom = async (userId: number, roomId: number) => {
    try {
      const response = await joinRoomFunc({
        variables: { userId, roomId },
      });
      return response.data?.joinRoom.roomId;
    } catch (err) {
      console.error("Failed to join room:", err);
      throw err; // Optionally re-throw the error to be handled elsewhere
    }
  };

  const navigateToRoom = (userId: number, roomId: number) => {
    const url = `/init-room?roomID=${roomId}&userID=${userId}`;
    router.push(url);
  };

  const handleJoinRoom = async (roomId: number) => {
    const userId = makeUID();
    try {
      const joinedRoomId = await joinRoom(userId, roomId);
      if (joinedRoomId) {
        navigateToRoom(userId, joinedRoomId);
      } else {
        console.error("No room ID returned after joining the room.");
      }
    } catch (err) {
      // Handle errors e.g. show a toast notification
    }
  };

  const onSubmited = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      roomId: { value: number };
    };
    const roomId = Number(target.roomId.value);
    handleJoinRoom(roomId);
  };

  return { roomName, setRoomName, onSubmited, joinRoomState };
};

export default useRoomInButton;
