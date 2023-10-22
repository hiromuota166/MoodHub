"use client";
import { useAuth } from "@/context/auth";
import { login, logout } from "@/lib/auth";
import { useEffect, useState } from "react";

type LoginState = "NOT_LOGGED_IN" | "LOGGING_IN" | "LOGGED_IN" | "LOGIN_FAILED";

export default function GoogleLoginBtn() {
  const user = useAuth();
  const [loginState, setLoginState] = useState<LoginState>("NOT_LOGGED_IN");
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (user) {
      setLoginState("LOGGED_IN");
    } else if (loginState !== "LOGGING_IN") {
      setLoginState("NOT_LOGGED_IN");
    }
  }, [user]);

  const signIn = () => {
    setLoginState("LOGGING_IN");

    login()
      .then(() => {
        setLoginState("LOGGED_IN");
      })
      .catch((error) => {
        console.error(error?.code);
        setError(error?.message || "ログインに失敗しました");
        setLoginState("LOGIN_FAILED");
      });
  };

  return (
    <div>
      {loginState === "NOT_LOGGED_IN" && <button onClick={signIn}>ログイン</button>}
      {loginState === "LOGGED_IN" && <button onClick={logout}>ログアウト</button>}
      {loginState === "LOGIN_FAILED" && <p>{error}</p>}
    </div>
  );
}
