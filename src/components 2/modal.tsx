"use client";
//モーダルを作るコンポーネント
import React from "react";
import { useState, useEffect } from "react";
import RandomColorButton from "./Genrebutton";

function ModalWrap() {
  const genreList = [
    "ダンス",
    "jpop",
    "pop",
    "op",
    "kpop",
    "kop",
    "kpp",
    "ppap",
    "kp",
    "kpop",
    "kpop",
    "kpop",
    "kpop",
    "kpop",
    "kpop",
  ];
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

    const colors = [
      "#6835FF",
      "#496AE8",
      "#FF60A8",
      "#07BFBC",
    ];
    useEffect(() => {
      console.log(selectedGenres)
    },[selectedGenres]);
  return (
    <div className='flex flex-wrap '>
      {genreList.map((genre, i) => {
        return (
          <RandomColorButton
            key={i}
            name={genre}
            color={colors[(i%4)]}
            onClick={() => handleGenreClick(genre)}
          />
        );
      })}
      <div className=''>
        {/* <h3>Selected Genres:</h3>
        <ul>
          {selectedGenres.map((genre, index) => (
            <li key={index}>{genre}</li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}

export default ModalWrap;

//モーダルの中でuseStateの配列使いながら選択したジャンル持ってたら大丈夫
