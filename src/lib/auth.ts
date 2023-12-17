import {
  //Googleアカウントを使用した認証に必要
  GoogleAuthProvider,
  //認証ポップアップを表示するために必要
  signInWithPopup,
  //認証に成功したユーザー情報を取得するために必要
  UserCredential,
  //ユーザーをログアウトさせるために必要
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

//Firebaseにログインするための関数loginを定義
export const login = (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

//ログアウトするための関数logoutを定義
export const logout = (): Promise<void> => {
  return signOut(auth);
};
