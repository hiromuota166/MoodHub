"use client";
//モーダルを作るコンポーネント
import React from "react";
import { useState, useEffect } from "react";
import RandomColorButton from "./Genrebutton";
import { addToLocalStorage } from "@/functions/crudLoculStrage";

interface Props {
  type: "genre" | "era";
}

function ModalWrap(props: Props) {
  const { type } = props;

  const genreList = [
    "カラオケソング",
    "ヒットソング",
    "青春",
    "10代",
    "20代",
    "。。。70代",
    "平成",
    "令和",
    "昭和",
    "ボーカロイド",
    "HIPHOP",
    "恋愛",
    "アイドルグループ",
    "ジャニーズ",
    "KPOP男性グループ",
    "KPOP女性グループ",
    "JPOP",
    "卒業",
  ];
  const eraList = ["10代", "20代", "30代", "40代", "50代", "60代"];
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleGenreClick = (genreName: string) => {
    setSelectedGenres((prevGenres) => {
      const isAlreadySelected = prevGenres.includes(genreName);

      if (isAlreadySelected) {
        return prevGenres.filter((genre) => genre !== genreName);
      } else {
        return [...prevGenres, genreName];
      }
    });
  };

  //初期色の設定をこっちでやって、RandomColorButtonにpropsで当てる

  const colors = ["#6835FF", "#496AE8", "#FF60A8", "#07BFBC"];
  useEffect(() => {
    console.log(selectedGenres);
    addToLocalStorage(type, selectedGenres);
  }, [selectedGenres, type]);
  return (
    <div className="flex flex-wrap ">
      {type === "genre" ? (
        <>
          {genreList.map((genre, i) => {
            return (
              <RandomColorButton
                key={i}
                name={genre}
                color={colors[i % 4]}
                onClick={() => handleGenreClick(genre)}
              />
            );
          })}
        </>
      ) : (
        <>
          {eraList.map((genre, i) => {
            return (
              <RandomColorButton
                key={i}
                name={genre}
                color={colors[i % 4]}
                onClick={() => handleGenreClick(genre)}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

export default ModalWrap;

//モーダルの中でuseStateの配列使いながら選択したジャンル持ってたら大丈夫
