"use client";
import { User } from "@/types/user";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

//UserContextType という新しい型をユニオン型で定義
// ログイン中/ログインしていない/ローディング中
type UserContextType = User | null | undefined;

//AuthContextという新しいコンテキストを作成。型はUserContextType。初期値はundefined
const AuthContext = createContext<UserContextType>(undefined);

//AuthProviderというコンポーネントを作成。childrenはReactNode型
//子コンポーネントに対して、Firebaseの認証状態を提供する
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserContextType>();

  //AuthProviderコンポーネントがマウントされた時に一回だけ実行
  useEffect(() => {
    //onAuthStateChangedは、認証状態が変化した時に実行される関数
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      //firebaseUserが存在する場合
      if (firebaseUser) {
        const ref = doc(db, `users/${firebaseUser.uid}`);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const appUser = (await getDoc(ref)).data() as User;
          setUser(appUser);
        } else {
          const appUser: User = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName!,
            photoUrl: firebaseUser.photoURL || "",
          };

          await setDoc(ref, appUser).then(() => {
            setUser(appUser);
          });
        }
      } else {
        setUser(null);
      }

      return unsubscribe;
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
