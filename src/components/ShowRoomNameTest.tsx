'use client';
import React, { useState } from 'react';
import useMusicRecommendPageData from "@/hooks/useMusicRecommendPageData";

interface ShowRoomNameProps {
  roomID: number;
}

const ShowRoomName = (props: ShowRoomNameProps) => {
  const { roomID } = props;
  const [loading, setLoading] = useState(true);
  const { RoomMembers, getRoomMembers } = useMusicRecommendPageData(
    String(roomID)
  );
  const error = RoomMembers.error;
  const data = RoomMembers.data;
  const roomName = data?.getMembers.roomName;
  
  if (loading) {
    getRoomMembers(roomID).then(() => {
      setLoading(false);
    });
  } else if (error) {
    return <p>error</p>;
  } else {
    return <p>{roomName}</p>;
  }
}

export default ShowRoomName;
