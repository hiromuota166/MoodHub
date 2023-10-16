import LongButton from "@/components/LongButton";
import NeumourList from "@/components/NeumorList";
import ShowRoomID from "@/components/ShowRoomID";

const Page = () => {
    const userList = ["john", "jane", "james", "judy", "jake", "jill", "josh", "jessica", "jackson", "jennifer", "jordan", "julie", "jim", "julian", "juliet", "joseph", "jose", "julio", "juliana", "julius", "juliette", "julianne", "ju"]
    return (
        <>
            <ShowRoomID roomID="12345"/>
            <NeumourList listItems={userList} />
            <LongButton text="ルーム決定" />
        </>
    );
}

export default Page;