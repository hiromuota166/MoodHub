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
            className="w-10 mr-3"
          />
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>
            <Input
              type="text"
              onChange={handleInputChange}
              placeholder="ルームネームを入れよう"
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              決定
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RoomNameModal;
