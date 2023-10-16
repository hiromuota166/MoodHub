"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import ModalWrap from "./modal";
import ModalButton from "./ModalButton";
import Image from 'next/image';

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

interface Props {
  default?: boolean;
}

const ModalWhole = (props: Props) => {
  const [modalIsOpen, setIsOpen] = React.useState(props.default ? true : false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(true)}>
      <Image 
        src="/filter.svg" 
        width={500} 
        height={500} 
        alt="Description"
        className="ml-80 w-10 mt-5" />
      </button>
      <Modal isOpen={modalIsOpen} style={ModalCss}>
        <div className="text-3xl flex justify-center py-10">ジャンルを選択</div>
        <div className="">
          <ModalWrap />
        </div>
        <div className="text-3xl flex justify-center py-10">年代を選択</div>
        <div className="">
          <ModalWrap />
        </div>
        {/* ここからフッターがわり */}
        <div
          id=""
          className=" bottom-0 w-full flex justify-center z-10 bg-white p-4 left-0"
        >
          <div>
            <ModalButton name="Back" onClick={() => setIsOpen(false)} />
          </div>
          <div>
            <ModalButton name="Done" onClick={() => setIsOpen(false)} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalWhole;
