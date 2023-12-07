'use client'
import React, { useEffect } from "react";
import { Avatar, AvatarGroup, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import { auth } from "@/lib/firebase";
import { logout } from "@/lib/auth";

const UserList = () => {
  const displayName = auth.currentUser?.displayName || '';

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [avatarUrl, setAvatarUrl] = React.useState<string>('');
  // もしログインしてない場合、アバターは表示しない
  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      let url: string | null = '';
      if (user) {
        url = user.photoURL;
      }
      if (!url) {
        url = '';
      }
      setAvatarUrl(url)
    });
    return unsubcribe
  }, []);
  return (
    <>
      <AvatarGroup size="md" max={2} onClick={onOpen}>
        <Avatar 
          src={avatarUrl} 
        />
        {/* 他のユーザーのアバターもここに追加 */}
      </AvatarGroup>

      {/* モーダルでユーザー情報を表示 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ユーザー情報</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg">名前: {displayName}</Text>
            {/* 他のユーザー情報を表示 */}
          </ModalBody>
          <button 
            onClick={logout}
            className="pb-4">ログアウト</button>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserList;
