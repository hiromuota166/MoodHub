import { useCallback, useEffect } from "react";
import useApolloQuery from "@/lib/apollo/useApolloQuery";
import { Register } from "@/lib/apollo/gql/graphql";

const useMusicRecommendPageData = (userID?: number, roomID?: number) => {
	const {
		updateCategoriesFunc,
		updateCategoriesState,
		registerUserFunc,
		registerUserState,
		Song,
		getUserFunc,
		getUserState,
	} = useApolloQuery(userID, roomID);
	//ルームに居るユーザのデータを取得する関数
	const getUser = useCallback(
		async (roomId: number) => {
			await getUserFunc({
				variables: {
					input: {
						roomId: roomId,
					},
				},
			}).catch((err) => {
				console.error(err);
			});
		},
		[getUserFunc]
	);

	//ルームidを取得するときにユーザのデータを取得する副作用
	useEffect(() => {
		if (roomID) getUser(roomID);
	}, [roomID, getUser]);

	// ユーザー登録のGraphQLのクエリ関数
	const registerUserQuery = useCallback(
		async (userData: Register) => {
			await registerUserFunc({
				variables: {
					...userData,
				},
			}).catch((err) => {
				console.error(err);
			});
		},
		[registerUserFunc]
	);

	// ユーザー情報更新のGraphQLのクエリ関数
	const updateUserQuery = useCallback(
		async (userData: Register) => {
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
				await updateUserQuery(userData);
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
				userName: "山田歌郎",
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
		getUserState,
		handleUserRegistration,
		handleUpdateCategories,
	};
};

export default useMusicRecommendPageData;