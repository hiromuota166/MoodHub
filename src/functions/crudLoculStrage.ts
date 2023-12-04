// ローカルストレージにデータを追加する関数
const addToLocalStorage = (key: "genre" | "era", value: string[]): void => {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
};

// ローカルストレージからデータを取得する関数
const getFromLocalStorage = (key: "genre" | "era"): string[] | null => {
  try {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : null;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to get data from localStorage:", error);
    return null;
  }
};

// ローカルストレージからデータを削除する関数
const removeFromLocalStorage = (key: "genre" | "era"): void => {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.error("Failed to remove data from localStorage:", error);
  }
};

// 使い方の例
const testLocalStorageFunctions = (): void => {
  // データの追加
  // addToLocalStorage("genre", ["rock", "pop"]);
  // addToLocalStorage("era", ["80s", "90s"]);
  // データの取得
  // console.log(getFromLocalStorage("genre")); // ["rock", "pop"]
  // console.log(getFromLocalStorage("era")); // ["80s", "90s"]
  // データの削除
  // removeFromLocalStorage("genre");
  // console.log(getFromLocalStorage("genre")); // null
};

testLocalStorageFunctions();

export { addToLocalStorage, getFromLocalStorage, removeFromLocalStorage };
