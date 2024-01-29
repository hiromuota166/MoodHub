"use client";
import { useAuth } from "@/context/auth";
import { login } from "@/lib/auth";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { REGISTER_USER } from "../lib/apollo/apollo-query";
import { Register, RegisterComplete } from "../lib/apollo/gql/graphql";

type LoginState = "NOT_LOGGED_IN" | "LOGGING_IN" | "LOGGED_IN" | "LOGIN_FAILED";

export default function GoogleLoginBtn() {
  const user = useAuth();
  const [loginState, setLoginState] = useState<LoginState>("NOT_LOGGED_IN");
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    setLoginState(user ? "LOGGED_IN" : "NOT_LOGGED_IN");
  }, [user]);

  const [registerUserFunc] = useMutation<{
    register: RegisterComplete;
  }>(REGISTER_USER);

  const registerUserQuery = useCallback(
    async (userData: Register) => {
      await registerUserFunc({
        variables: userData,
      }).catch((err) => {
        console.error(err);
      });
    },
    [registerUserFunc]
  );

  const signIn = () => {
    setLoginState("LOGGING_IN");

    login()
      .then(async (userCrednetial) => {
        const user = userCrednetial.user;

        const userData: Register = {
          userId: user.uid,
          categories: [], // 必要に応じてカテゴリを設定
          userName: user.displayName || null,
          gender: null, // 性別が必要な場合は設定
          age: null, // 年齢が必要な場合は設定
        };
        await registerUserQuery(userData);
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
