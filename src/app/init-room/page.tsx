"use client";
import LongButton from "@/components/LongButton";
import ModalWhole from "@/components/ModalWhole";
import NeumourList from "@/components/NeumorList";
import ShowRoomID from "@/components/ShowRoomID";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();

  // クエリパラメータを取得
  const roomID = searchParams.get("roomID");
  const userID = searchParams.get("userID");

  // クエリがまだ利用できない場合のハンドリング
  if (!roomID || !userID) {
    return <div>Loading...</div>;
  }
  if (typeof roomID !== "string" || typeof userID !== "string") {
    return <p>ルームIDまたはユーザーIDが不正です。</p>;
  }

  const userList = ["入室できました！"];
  // const userList = ["john", "jane", "james", "judy", "jake"]
  return (
    <>
      <ModalWhole default={false} handleUpdateCategories={() => {}} />
      <ShowRoomID roomID={roomID} />
      <NeumourList listItems={userList} />
      <LongButton text="曲を探す" />
    </>
  );
};

export default Page;
