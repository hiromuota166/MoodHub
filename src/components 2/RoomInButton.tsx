'use client'
import Image from "next/image";

const RoomInButton = () => {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            roomId: { value: string };
        };
        const roomId = target.roomId.value;
        console.log(roomId);
    }
    return (
        <div className="bg-background text-font text-lg text-3xl m-auto mt-12 mb-24 p-8 py-10 w-fit rounded-3xl shadow-boxOut">
            <h2 className="mx-2">ルームID入力</h2>
            <form action={() => onSubmit} className="flex h-10">
                <input type="text" className="bg-background rounded-tl-2xl rounded-bl-2xl shadow-boxIn" />
                <button className="w-12 rounded-tr-2xl rounded-br-2xl shadow-boxOut">
                    <Image src={"/submit_triangle.svg"} alt="フォーム入力用の画像" width={32} height={32} className="m-auto" />
                </button>
            </form>
        </div>
    )
}

export default RoomInButton;