// getMembersで取得したユーザー情報を元に、アバターを表示するコンポーネント
"use client";
import React from "react";
import { Avatar, AvatarGroup } from "@chakra-ui/react";
import useMusicRecommendPageData from "@/hooks/useMusicRecommendPageData";

interface AvatarProps {
  roomID: number;
}

const GroupAvatar = (props: AvatarProps) => {
  const { roomID } = props;
  const { getRoomMembers } = useMusicRecommendPageData(undefined, roomID);
  // getRoomMembersを使って、ルームメンバーのデータを取得
  const members = getRoomMembers();
  console.log(members);

  return (
    <AvatarGroup size="md" max={2}>
      <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
    </AvatarGroup>
  );
};

export default GroupAvatar;
