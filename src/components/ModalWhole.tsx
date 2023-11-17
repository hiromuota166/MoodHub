"use client";
import React from "react";
import Modal from "react-modal";
import ModalWrap from "./modal";
import ModalButton from "./ModalButton";
import Image from "next/image";
import { getFromLocalStorage } from "@/functions/crudLoculStrage";
import { gql, useMutation } from "@apollo/client";

const ModalCss = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  content: {
    left: "20px",
    right: "20px",
    padding: "1rem",
    marginTop: "100px",
    marginBottom: "80px",
    borderRadius: "1rem",
  },
};

const REGISTER_MUTATION = gql`
  mutation Register($regist: Register!) {
    register(regist: $regist) {
      userId
      categories
    }
  }
`;

interface Props {
  default?: boolean;
  userId: number;
}

const ModalWhole = (props: Props) => {
  const { userId } = props;
  const [modalIsOpen, setIsOpen] = React.useState(props.default ? true : false);
  const [registerMutation] = useMutation(REGISTER_MUTATION);

  const handleDone = async () => {
    console.log("done");
    // setIsOpen(false)
    const genreList = getFromLocalStorage("genre");
    const eraList = getFromLocalStorage("era");
    const notNullgenreList = genreList ? genreList : [];
    const notNulleraList = eraList ? eraList : [];
    const categories = [...notNullgenreList, ...notNulleraList];
    try {
      if (categories.length === 0) {
        throw new Error("No categories selected");
      }
      const { data } = await registerMutation({
        variables: {
          regist: {
            userId: userId,
            categories: categories,
          },
        },
      });

      console.log("Joined room with data:", data);
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };

  return (
    <div className="relative">
      <button title="isBtn" onClick={() => setIsOpen(true)}>
        <Image
          src="/filter.svg"
          width={500}
          height={500}
          alt="Description"
          className="ml-80 w-10 mt-5"
        />
      </button>
      <Modal isOpen={modalIsOpen} style={ModalCss} ariaHideApp={false}>
        <div className="text-xl flex justify-center py-10">ジャンルを選択</div>
        <div className="">
          <ModalWrap type="genre" />
        </div>
        <div className="text-xl flex justify-center py-10">年代を選択</div>
        <div className="">
          <ModalWrap type="era" />
        </div>
        {/* ここからフッターがわり */}
        <div
          id=""
          className=" bottom-0 w-full flex justify-center z-10 bg-white p-4 left-0"
        >
          <div>
            <ModalButton name="Back" onClick={() => setIsOpen(false)} />
          </div>
          <div onClick={handleDone}>
            <ModalButton name="Done" onClick={() => setIsOpen(false)} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalWhole;
