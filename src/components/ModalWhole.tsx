"use client";
import { useState } from "react";
import Modal from "react-modal";
import ModalButton from "./ModalButton";
import Image from "next/image";
import {
  addToLocalStorage,
  getFromLocalStorage,
} from "@/functions/crudLoculStrage";
import RandomColorButton from "./Genrebutton";

const ModalCss = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  content: {
    left: "20px",
    right: "20px",
    padding: "0px",
    borderRadius: "1rem",
  },
};

interface Props {
  default?: boolean;
  // eslint-disable-next-line no-unused-vars
  handleUpdateCategories: (categories: string[]) => void;
}

const genreList = [
  "カラオケソング",
  "ヒットソング",
  "青春",
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

const getSelectedCategories = (
  selections: Selections
): { eras: string[]; genres: string[] } => {
  const selectedEras = Object.entries(selections.eras)
    .filter(([, isSelected]) => isSelected)
    .map(([era]) => era);

  const selectedGenres = Object.entries(selections.genres)
    .filter(([, isSelected]) => isSelected)
    .map(([genre]) => genre);

  return { eras: selectedEras, genres: selectedGenres };
};

const createInitialSelections = (
  eraList: string[],
  genreList: string[]
): Selections => {
  const initialEras = eraList.reduce(
    (acc, era) => ({ ...acc, [era]: true }),
    {}
  );
  const initialGenres = genreList.reduce(
    (acc, genre) => ({ ...acc, [genre]: true }),
    {}
  );

  return { eras: initialEras, genres: initialGenres };
};

interface Selections {
  eras: { [key: string]: boolean };
  genres: { [key: string]: boolean };
}

const ModalWhole = (props: Props) => {
  const { handleUpdateCategories } = props;
  const [modalIsOpen, setIsOpen] = useState(props.default ? true : false);
  const initEraList = getFromLocalStorage("era");
  const initGenreList = getFromLocalStorage("genre");
  const initialSelections = createInitialSelections(
    initEraList ? initEraList : [],
    initGenreList ? initGenreList : []
  );
  const [selections, setSelections] = useState(initialSelections);
  const colors = ["#6835FF", "#496AE8", "#FF60A8", "#07BFBC"];

  const handleGenreClick = (category: "eras" | "genres", name: string) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [category]: {
        ...prevSelections[category],
        [name]: !prevSelections[category][name],
      },
    }));
  };

  const handleDone = async () => {
    const currentSelections = getSelectedCategories(selections);
    addToLocalStorage("era", currentSelections.eras);
    addToLocalStorage("genre", currentSelections.genres);
    // 合成されたカテゴリの配列を作成
    const categories = [...currentSelections.eras, ...currentSelections.genres];
    if (categories.length === 0) {
      alert("少なくとも一つは選択してください");
      return;
    }
    setIsOpen(false);

    try {
      await handleUpdateCategories(categories);
    } catch (error) {
      console.error("Error updating categories:", error);
    }
  };

  const handleOpen = () => {
    const eraList = getFromLocalStorage("era");
    const genreList = getFromLocalStorage("genre");
    const initialSelections = createInitialSelections(
      eraList ? eraList : [],
      genreList ? genreList : []
    );
    setSelections({ ...initialSelections });
    setIsOpen(true);
  };

  return (
    <div className="relative p-5">
      <button 
        className="absolute right-0"
        title="isBtn" 
        onClick={handleOpen}
        >
        <Image
          src="/search.svg"
          width={500}
          height={500}
          alt="検索ボタン"
          className="w-10 mt-5 right-0 top-0"
        />
      </button>
      <Modal isOpen={modalIsOpen} style={ModalCss} ariaHideApp={false}>
        <div className="text-3xl flex justify-center py-10">ジャンルを選択</div>
        <div className="flex flex-wrap p-5">
          {genreList.map((genre, i) => {
            return (
              <RandomColorButton
                key={i}
                name={genre}
                color={colors[i % 4]}
                selected={selections.genres[genre]}
                onClick={() => handleGenreClick("genres", genre)}
              />
            );
          })}
        </div>
        <div className="text-3xl flex justify-center py-10">年代を選択</div>
        <div className="flex flex-wrap p-5">
          {eraList.map((era, i) => {
            return (
              <RandomColorButton
                key={i}
                name={era}
                color={colors[i % 4]}
                selected={selections.eras[era]}
                onClick={() => handleGenreClick("eras", era)}
              />
            );
          })}
        </div>
        {/* ここからフッターがわり */}
        <div
          id=""
          className=" bottom-0 w-full flex justify-center z-10 bg-white p-4 left-0 sticky"
        >
          <div>
            <ModalButton name="Back" onClick={() => setIsOpen(false)} />
          </div>
          <div>
            <ModalButton name="Done" onClick={handleDone} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalWhole;
