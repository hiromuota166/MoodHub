import useApolloQuery from "@/lib/apollo/useApolloQuery";

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
  const getRoomMembers = async () => {
    if (!roomID) return;
    await RoomMembers.refetch();
  };

  return {
    updateCategoriesState,
    registerUserState,
    Song,
    getRoomMembers,
    handleUpdateCategories,
  };
};

export default useMusicRecommendPageData;
