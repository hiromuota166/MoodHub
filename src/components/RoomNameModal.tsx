// チャクラを使ったモーダルにします 子コンポーネント

"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import React from "react";

interface RoomNameModalProps {
  // eslint-disable-next-line no-unused-vars
  onRoomNameChange: (newName: string) => void;
}

const RoomNameModal: React.FC<RoomNameModalProps> = ({ onRoomNameChange }) => {
  const [inputValue, setInputValue] = React.useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="flex">
        <button onClick={onOpen} title="RoomNameModalBtn" className="ml-auto">
          <Image
            src="/write.svg"
            width={30}
            height={30}
            alt="Description"
            className="w-10 mr-2 m-2"
          />
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form
            onSubmit={(e) => {
              e.preventDefault(); // デフォルトのフォーム送信を防ぐ
              onRoomNameChange(inputValue); // 親コンポーネントの関数を実行
              onClose(); // モーダルを閉じる関数を実行
            }}
          >
            <ModalHeader></ModalHeader>
            <ModalBody>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="例: ひまわりの部屋"
              />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="gray" mr={3} onClick={onClose}>
                キャンセル
              </Button>
              <Button colorScheme="blue" mr={3} type="submit">
                決定
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RoomNameModal;
