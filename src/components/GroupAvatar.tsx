// getMembersで取得したユーザー情報を元に、アバターを表示するコンポーネント
import React, { useEffect, useState } from "react";
import { Avatar, AvatarGroup } from "@chakra-ui/react";
import useMusicRecommendPageData from "@/hooks/useMusicRecommendPageData";

interface AvatarProps {
  roomID: number;
}

interface Member {
  userId: string;
  avatarUrl: string;
}

const GroupAvatar = ({ roomID }: AvatarProps) => {
  const [members, setMembers] = useState<Member[]>([]);
  const { getRoomMembers } = useMusicRecommendPageData(undefined, roomID);

  useEffect(() => {
    const fetchMembers = async () => {
      const membersData = await getRoomMembers();
      if (membersData) {
        // membersData.membersInfoListをMember[]型に変換
        const membersList: Member[] = membersData.membersInfoList.map(
          (user) => ({
            userId: user.userId,
            // avatarUrlがundefinedの場合はデフォルトのURLを設定
            avatarUrl: user.avatarUrl ?? "デフォルトのアバターURL",
          })
        );
        setMembers(membersList);
      }
    };

    fetchMembers();
  }, [roomID, getRoomMembers]);

  return (
    <AvatarGroup size="md" max={2}>
      {members.map((member) => (
        <Avatar
          key={member.userId}
          name={member.userId}
          src={member.avatarUrl}
        />
      ))}
    </AvatarGroup>
  );
};

export default GroupAvatar;
