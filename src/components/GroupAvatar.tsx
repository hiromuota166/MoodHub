// getMembersで取得したユーザー情報を元に、アバターを表示するコンポーネント
import React, { useEffect, useState } from "react";
import { Avatar, AvatarGroup, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure } from "@chakra-ui/react";
import useMusicRecommendPageData from "@/hooks/useMusicRecommendPageData";
import { db } from '@/lib/firebase'; 
import { doc, getDoc } from 'firebase/firestore';

interface AvatarProps {
  roomID: number;
}

interface Member {
  userId: string;
  avatarUrl: string;
}

interface UserInfo {
  name: string;
}

const GroupAvatar = ({ roomID }: AvatarProps) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getRoomMembers } = useMusicRecommendPageData(undefined, roomID);

  useEffect(() => {
    const fetchMembers = async () => {
      const membersData = await getRoomMembers();
      if (membersData) {
        const membersList: Member[] = membersData.membersInfoList.map(user => ({
          userId: user.userId,
          avatarUrl: user.avatarUrl ?? "デフォルトのアバターURL",
        }));
        setMembers(membersList);
      }
    };

    fetchMembers();
  }, [roomID, getRoomMembers]);

  const fetchUserName = async (userId: string) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setSelectedUser({
        name: docSnap.data().name,
      });
      onOpen();
    } else {
      console.log('No such document!');
    }
  };

  return (
    <>
      <AvatarGroup size="md" max={2}>
        {members.map(member => (
          <Avatar
            key={member.userId}
            name={member.userId}
            src={member.avatarUrl}
            onClick={() => fetchUserName(member.userId)}
          />
        ))}
      </AvatarGroup>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ユーザー情報</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedUser ? <p>名前: {selectedUser.name}</p> : <p>ユーザー情報を取得中...</p>}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupAvatar;
