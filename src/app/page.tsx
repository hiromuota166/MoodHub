"use client"
import CreateRoom from "@/components/CreateRoom"
import NavigateButton from "@/components/NavigateButton"
import RoomInButton from "@/components/RoomInButton"
export default function Home() {
  return (
    <>
      <RoomInButton />
      <CreateRoom />
      <div>
        <NavigateButton href={"/maracas"} label={"マラカス"} />
      </div>
    </>
  )
}
