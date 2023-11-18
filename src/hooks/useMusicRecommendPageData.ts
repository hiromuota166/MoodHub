import { useCallback } from "react";
import useApolloQuery from "@/lib/apollo/useApolloQuery";
import { Register, UpdateCategories } from "@/lib/apollo/gql/graphql";

const useMusicRecommendPageData = (userID?: number, roomID?: number) => {
  const {
    updateCategoriesFunc,
    updateCategoriesState,
    registerUserFunc,
    registerUserState,
    Song,
    RoomMembers
  } = useApolloQuery(userID, roomID);

  // ユーザー登録のGraphQLのクエリ関数
  const registerUserQuery = useCallback(
    async (userData: Register) => {
      await registerUserFunc(
        {
          variables: userData
        },
      ).catch((err) => {
        console.error(err);
      });
    },
    [registerUserFunc]
  );

  // ユーザー情報更新のGraphQLのクエリ関数
  const updateUserQuery = useCallback(
    async (userId: number, categories: string[]) => {
      const userData: UpdateCategories = {
        userId: userId,
        categories: categories,
      };
      await updateCategoriesFunc({
        variables: {
          ...userData,
        },
      }).catch((err) => {
        console.error(err);
      });
    },
    [updateCategoriesFunc]
  );

  // ユーザー登録または更新を判断する関数
  const handleUserRegistration = useCallback(
    async (userData: Register) => {
      if (!userData) return;

      if (registerUserState.data) {
        // 既にユーザー情報がある場合は更新
        await updateUserQuery(userData.userId, userData.categories);
      } else {
        // ユーザー情報がない場合は登録
        await registerUserQuery(userData);
      }
    },
    [registerUserState.data, registerUserQuery, updateUserQuery]
  );

  //カテゴリのデータを更新する関数
  const handleUpdateCategories = async (categories: string[]) => {
    if (registerUserState.data === undefined) {
      if (!userID) return;
      const userData: Register = {
        userId: userID,
        categories: categories,
        userName: "moody山田",
      };
      handleUserRegistration(userData);
      if (!roomID) return;
      await Song.refetch();
      return;
    }

    //ここにローカルストレージにカテゴリを保存する処理を後で追加する

    await updateCategoriesFunc({
      variables: {
        categories: categories,
        userId: userID,
      },
    }).catch((err) => {
      console.error(err);
    });
    if (!roomID) return;
    await Song.refetch();
  };

  return {
    updateCategoriesState,
    registerUserState,
    Song,
    RoomMembers,
    handleUserRegistration,
    handleUpdateCategories,
  };
};

export default useMusicRecommendPageData;
