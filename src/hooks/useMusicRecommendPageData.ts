// import { useCallback } from "react";
import useApolloQuery from "@/lib/apollo/useApolloQuery";
// import { Register, UpdateCategories } from "@/lib/apollo/gql/graphql";

const useMusicRecommendPageData = (userID?: string, roomID?: number) => {
  const {
    updateCategoriesFunc,
    updateCategoriesState,
    registerUserState,
    Song,
    RoomMembers,
  } = useApolloQuery(userID, roomID);

  //カテゴリのデータを更新する関数
  const handleUpdateCategories = async (categories: string[]) => {
    if (!userID) return;

    //ここにローカルストレージにカテゴリを保存する処理を後で追加する

    await updateCategoriesFunc({
      variables: {
        categories: categories,
        userId: userID,
      },
    }).catch((err) => {
      console.error(err);
    });
  };

  return {
    updateCategoriesState,
    registerUserState,
    Song,
    RoomMembers,
    handleUpdateCategories,
  };
};

export default useMusicRecommendPageData;
