//firebaseの初期化を行う

import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
};

// Firebaseが初期化されているかチェック。初期化されていなければ初期化する
// !getApps()?.length は は現在アプリが０である場合にtrueを返し、初期化をする
if (!getApps()?.length) {
  initializeApp(firebaseConfig);
}

//認証を初期化
export const auth = getAuth();
//データベースを初期化
export const db = getFirestore();