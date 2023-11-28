'use client'
import { makeUID } from "@/functions/makeUID";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { gql, useMutation } from "@apollo/client";

const RoomInButton = () => {

    const JOIN_ROOM_MUTATION = gql`
        mutation joinRoom($join: JoinRoomInput!) {
            joinRoom(input: $join) {
                roomId
                userId
                name
            }
        }
    `;
    interface RoomResponse {
        joinRoom: Room;
    }

    interface Room {
        roomId: number;
        userId: number[];
        name: string;
    }
    const router = useRouter();
    const [joinRoom, { data, loading, error }] = useMutation<RoomResponse>(JOIN_ROOM_MUTATION);
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            roomId: { value: number };
        };
        const roomId = Number(target.roomId.value);
        const userId = makeUID();
        if (userId === null || roomId === null) return; 
        try {
            await joinRoom({
                variables: {
                    join: {
                        userId,
                        roomId
                    }
                }
            }).then((res) => {
                console.log(res.data?.joinRoom.roomId);
                const roomId = res.data?.joinRoom.roomId;
                // 処理が完了した後にページ遷移
                const url = `/music-recommend?roomID=${roomId}`;
                router.push(url);
            })
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="bg-background text-font text-lg text-3xl m-auto mt-12 mb-24 p-8 py-10 w-fit rounded-3xl shadow-boxOut">
            <h2 className="mx-2">ルームID入力</h2>
            <form onSubmit={onSubmit} className="flex h-10">
                <input
                    title="ルームID入力欄"
                    type="number"
                    className="bg-background rounded-tl-2xl rounded-bl-2xl shadow-boxIn"
                    name="roomId"
                />
                <button 
                    title="ルーム入室ボタン"
                    type="submit"  
                    className="w-12 rounded-tr-2xl rounded-br-2xl shadow-boxOut">
                    <Image
                        src="/submit_triangle.svg"
                        alt="フォーム入力用の画像"
                        width={32}
                        height={32}
                        className="m-auto"
                    />
                </button>
            </form>
        </div>
    )
}

export default RoomInButton;