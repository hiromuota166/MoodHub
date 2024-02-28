"use client";
import { useAuth } from "@/context/auth";
import { login } from "@/lib/auth";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useCallback } from "react";
import { Register } from "../lib/apollo/gql/graphql";
import useApolloQuery from "@/lib/apollo/useApolloQuery";

type LoginState = "NOT_LOGGED_IN" | "LOGGING_IN" | "LOGGED_IN" | "LOGIN_FAILED";

export default function GoogleLoginBtn() {
  const user = useAuth();
  const { registerUserFunc, updateAvatarFunc } = useApolloQuery();
  const [loginState, setLoginState] = useState<LoginState>("NOT_LOGGED_IN");
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    setLoginState(user ? "LOGGED_IN" : "NOT_LOGGED_IN");
  }, [user]);

  const registerUserQuery = useCallback(
    async (userData: Register) => {
      console.log(userData);
      await registerUserFunc({
        variables: userData,
      }).catch((err) => {
        console.error(err);
        // registerUserFuncのエラー処理
        throw new Error(err);
      });
    },
    [registerUserFunc]
  );

  const signIn = async () => {
    setLoginState("LOGGING_IN");
    try {
      const userCredential = await login();
      const user = userCredential.user;

      const userData: Register = {
        userId: user.uid,
        categories: [],
        userName: user.displayName || null,
        gender: null,
        age: null,
        avatarUrl: user.photoURL || null,
      };

      try {
        await registerUserQuery(userData);
        setLoginState("LOGGED_IN");
      } catch (registerError) {
        if (
          registerError instanceof Error &&
          registerError.message ===
            "ApolloError: You are already registered with Moodhub"
        ) {
          try {
            await updateAvatarFunc({
              variables: {
                userId: user.uid,
                avatarUrl: user.photoURL || null,
              },
            });
          } catch (updateError) {
            console.error(updateError);
          }
        } else {
          setError(
            registerError instanceof Error
              ? registerError.message
              : "登録に失敗しました"
          );
          setLoginState("LOGIN_FAILED");
        }
      }
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "ログインに失敗しました"
      );
      setLoginState("LOGIN_FAILED");
    }
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
