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
import { ChangeEvent } from "react";

interface RoomNameModalProps {
  onRoomNameChange: (newName: string) => void;
}

const RoomNameModal:React.FC<RoomNameModalProps> = ({ onRoomNameChange }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onRoomNameChange(event.target.value);
  };
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
            className="w-10 mr-2   m-2"
          />
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <form onSubmit={(e) => {
      e.preventDefault(); // デフォルトのフォーム送信を防ぐ
      onClose();         // モーダルを閉じる関数を実行
    }}>
      <ModalHeader></ModalHeader>
      <ModalBody>
        <Input
          type="text"
          onChange={handleInputChange}
          placeholder="例: ひまわりの部屋"
        />
      </ModalBody>

      <ModalFooter>
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
