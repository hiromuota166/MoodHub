"use client";
import NeumourList from "@/components/NeumorList";
import ShowRoomID from "@/components/ShowRoomID";
import React from "react";
import ModalWhole from "./ModalWhole";

const Music = () => {
  const userList = ["tom", "tom"];
  const [modalIsOpen, setIsOpen] = React.useState(true);
  return (
    <>
      {/* <ModalWhole/> */}
      <ShowRoomID roomID="12245" />
      <NeumourList listItems={userList} />
    </>
  );
};

export default Music;
