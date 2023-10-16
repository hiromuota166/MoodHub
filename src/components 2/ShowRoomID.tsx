interface ShowRoomIDProps {
    roomID: string;
}
const ShowRoomID = (props:ShowRoomIDProps) => {
    const { roomID } = props;
    return (
        <div className="my-8">
            <h2>ルームID</h2>
            <div className="text-center text-2xl py-4 text-font bg-background shadow-boxOut rounded-3xl">
                <h2>{roomID}</h2>
            </div>
        </div>
    ) 
}

export default ShowRoomID;