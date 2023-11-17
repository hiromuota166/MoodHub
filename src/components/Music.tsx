"use client";
import NeumourList from "@/components/NeumorList";
import ShowRoomID from "@/components/ShowRoomID";
import React from "react";

const Music = () => {
  const userList = ["tom", "tom"];
  return (
    <>
      {/* <ModalWhole/> */}
      <ShowRoomID roomID="12245" />
      <NeumourList listItems={userList} />
    </>
  );
};

export default Music;
