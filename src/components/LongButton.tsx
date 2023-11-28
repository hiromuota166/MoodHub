"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface LongButtonProps {
  text: string;
}
const LongButton = (props: LongButtonProps) => {
  const { text } = props;
  const router = useRouter();
  // クエリパラメータを取得
  const searchParams = useSearchParams();
  const roomID = searchParams.get("roomID");
  const userID = searchParams.get("userID");
  const handleClick = () => {
    router.push(`/music-recommend`);
    const url = `/music-recommend?roomID=${roomID}&userID=${userID}`;
    router.push(url);
  };

  return (
    <button
      className="bg-background text-font text-xl m-auto p-8 py-4 my-8 w-full rounded-3xl shadow-boxOut"
      onClick={handleClick}
    >
      <h2>{text}</h2>
    </button>
  );
};

export default LongButton;
