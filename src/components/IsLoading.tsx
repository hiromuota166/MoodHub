"use client";
import React from "react";
import { Spinner } from "@chakra-ui/react";

function IsLoading() {
  return (
    <>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal.400"
        size="xl"
      />
    </>
  );
}

export default IsLoading;
