import useApolloQuery from "@/lib/apollo/useApolloQuery";
import { useCallback } from "react";

const useMusicRecommendPageData = (userID?: string, roomID?: number) => {
  const {
    updateCategoriesFunc,
    updateCategoriesState,
    registerUserState,
    Song,
    RoomMembers, //これを使うことで、ルームメンバーのデータを取得できる
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
    if (!roomID) return;
    await Song.refetch();
  };

  // ルームのメンバーのデータを取得する関数
  const getRoomMembers = useCallback(async () => {
    if (!roomID) return;
    const response = await RoomMembers.refetch();
    return response.data.getMembers; // getMembersのデータを返す
  }, [roomID, RoomMembers]); // 依存配列にroomIDとRoomMembersを追加

  return {
    updateCategoriesState,
    registerUserState,
    Song,
    getRoomMembers,
    handleUpdateCategories,
  };
};

export default useMusicRecommendPageData;
