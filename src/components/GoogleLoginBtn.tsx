'use client'
import { useAuth } from "@/context/auth";
import { login, logout } from "@/lib/auth";
import { useState } from "react";

export default function GoogleLoginBtn() {
  const user = useAuth();
  const [waiting, setWaiting] = useState<boolean>(false);

  const signIn = () => {
    setWaiting(true);

    login()
      .catch((error) => {
        console.error(error?.code);
      })
      //ログインい失敗しても成功しても、setWaiting(false)を実行
      .finally(() => {
        setWaiting(false);
      });
  };
  return (
    <div>
      {user === null && !waiting && <button onClick={signIn}>ログイン</button>}
      {user && <button onClick={logout}>ログアウト</button>}
    </div>
  );
}
