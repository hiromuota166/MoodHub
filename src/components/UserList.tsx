"use client";
import React from "react";
import { useAuth } from "@/context/auth";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";

function UserList() {
  const user = useAuth(); 
  return (
    <>
      <AvatarGroup size="md" max={2}>
        <Avatar name={user?.name} src={user?.photoUrl} />
      </AvatarGroup>
    </>
  );
}

// 入室した人のアカウント情報の取得方法がわからない

export default UserList;
