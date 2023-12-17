"use client";
import IsLoading from "./IsLoading";
import React from "react";
import useCreateRoom from "@/hooks/useCreateRoom";

const CreateRoom = () => {
  const { handleClick, createRoomState } = useCreateRoom();

  return (
    <a href="/" onClick={(e) => handleClick(e)}>
      <div className="bg-background text-font text-lg m-auto p-8 py-10 w-fit rounded-3xl shadow-boxOut">
        {createRoomState.loading ? <IsLoading /> : <h2>ルーム作成</h2>}
      </div>
    </a>
  );
};

export default CreateRoom;
