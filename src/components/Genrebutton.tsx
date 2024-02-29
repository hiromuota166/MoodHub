"use client";
import Image from "next/image";
import React, { useState } from "react";

interface iRandomColorButton {
  name: string;
  color: string;
  selected: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function RandomColorButton(props: iRandomColorButton) {
  const { name, color, selected, onClick } = props;

  const initialBackgroundColor = "#f5f5f5";
  const [isClicked, setIsClicked] = useState<boolean>(selected);

  const toggleColors = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsClicked(!isClicked);
    onClick && onClick(event); //propsから渡されたonClickを呼ぶ
    //配列に名前を加えるようにする
  };
  // サーバー側とクライアント側で選ばれる色が違う

  return (
    <>
      <div className="py-2 px-2">
        <button
          onClick={toggleColors}
          className={`px-3 py-1 flex flex-nowrap gap-1 items-center text-lg`}
          style={{
            backgroundColor: isClicked ? color : initialBackgroundColor,
            color: isClicked ? initialBackgroundColor : color,
            borderRadius: "16px",
          }}
        >
          {name}
          <div className="w-6 h-6">
            {isClicked ? (
              <Image src={"/done.svg"} alt="Done Icon" width={32} height={32} />
            ) : (
              <Image
                className="origin-center rotate-45"
                src={"/close.svg"}
                alt="Close Icon"
                width={32}
                height={32}
              />
            )}
          </div>
        </button>
      </div>
    </>
  );
}

export default RandomColorButton;
