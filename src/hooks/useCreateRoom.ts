import { useState } from "react";
import useApolloQuery from "@/lib/apollo/useApolloQuery";
import { makeUID } from "@/functions/makeUID";
import { useRouter } from "next/navigation";

const useCreateRoom = () => {
  const { createRoomFunc, createRoomState } = useApolloQuery();
  const [roomName, setRoomName] = useState<string>("");
  const router = useRouter();

  const handleClick = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const userId = makeUID();
    try {
      await createRoomFunc({
        variables: {
          userId,
          roomName,
        },
      }).then((res) => {
        const roomId = res.data?.createRoom.roomId;
        const url = `/init-room?roomID=${roomId}&userID=${userId}`;
        router.push(url);
      });
    } catch (err) {
      console.error(err);
    }
  };
  return { roomName, setRoomName, handleClick, createRoomState };
};

export default useCreateRoom;
