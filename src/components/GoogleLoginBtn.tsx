"use client";
import { useAuth } from "@/context/auth";
import { login } from "@/lib/auth";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";

type LoginState = "NOT_LOGGED_IN" | "LOGGING_IN" | "LOGGED_IN" | "LOGIN_FAILED";

export default function GoogleLoginBtn() {
  const user = useAuth();
  const [loginState, setLoginState] = useState<LoginState>("NOT_LOGGED_IN");
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    setLoginState(user ? "LOGGED_IN" : "NOT_LOGGED_IN");
  }, [user]);

  const signIn = () => {
    setLoginState("LOGGING_IN");

    login()
      .then((userCrednetial) => {
        const user = userCrednetial.user;
        setLoginState("LOGGED_IN");
        console.log(user);
      })
      .catch((error) => {
        console.error(error?.code);
        setError(error?.message || "ログインに失敗しました");
        setLoginState("LOGIN_FAILED");
      });
  };

  return (
    <div>
      {loginState === "NOT_LOGGED_IN" && (
        <Button colorScheme="blackAlpha" onClick={signIn}>
          ログイン
        </Button>
      )}
      {loginState === "LOGIN_FAILED" && <p>{error}</p>}
    </div>
  );
}
