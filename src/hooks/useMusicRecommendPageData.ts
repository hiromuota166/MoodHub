import { useCallback, useEffect, useState } from "react";
import useApolloQuery from "@/lib/apollo/useApolloQuery";
import { get } from "http";

interface MusicRecommendPageDataProps {
	userID?: number;
	roomID?: number;
}

const useMusicRecommendPageData = (props: MusicRecommendPageDataProps) => {
	const { userID, roomID } = props;
	const {
		updateCategoriesFunc,
		updateCategoriesState,
		registerUserFunc,
		registerUserState,
		Song,
		getUserFunc,
		getUserState,
	} = useApolloQuery();

	const { error: songError, loading: songLoading, data: songData, refetch: songRefetch } = Song;
	const { error: getUserError, loading: getUserLoading, data: getUserData } = getUserState;
	const {
		error: updateCategoriesError,
		loading: updateCategoriesLoading,
		data: updateCategoriesData,
	} = updateCategoriesState;
	const { error: registerUserError, loading: registerUserLoading, data: registerUserData } = registerUserState;

	const [registerUserStateDate, setRegisterUserStateDate] = useState<typeof registerUserData>(registerUserData);
	const [categories, setCategories] = useState<string[]>([]);

	//ルームに居るユーザのデータを取得する関数
	const getUser = useCallback(
		async (roomId: number) => {
			await getUserFunc({
				variables: {
					roomId: roomId,
				},
			});
		},
		[getUserFunc]
	);

    //ルームidを取得するときにユーザのデータを取得する副作用
	useEffect(() => {
		if (roomID) getUser(roomID);
	}, [roomID, getUser]);

	//ユーザのデータを登録する関数
	const registerUser = async (userData: typeof registerUserData) => {
		setRegisterUserStateDate(userData);
		if (registerUserData) {
			updateUserDataQuery(userData);
		} else {
			registerUserQuery(userData);
		}
	};

	//ユーザのGraphQLのデータを登録する関数
	const registerUserQuery = async (userData: typeof registerUserData) => {
		await registerUserFunc({
			variables: {
				userId: userID,
				categories: userData?.categories,
				userName: userData?.userName,
				gender: userData?.gender,
				age: userData?.age,
			},
		});
	};

	//ユーザのGraphQLのデータを更新する関数
	const updateUserDataQuery = async (userData: typeof registerUserData) => {
		await registerUserFunc({
			variables: {
				userName: userData?.userName,
			},
		});
	};

	//カテゴリのデータを更新する関数
	const updateCategories = async (categories: string[], userName: string, gender?: string, age?: string) => {
		//ここにローカルストレージにカテゴリを保存する処理を後で追加する

		setCategories([...categories]);
		await updateCategoriesQuery(categories);
		//カテゴリを更新したら、曲のデータを更新する
		await songRefetch();
	};

	//カテゴリののGraphQLのデータを更新する関数
	const updateCategoriesQuery = async (categories: string[]) => {
		await updateCategoriesFunc({
			variables: {
				categories: categories,
				userId: userID,
			},
		});
	};

	return { songError, songLoading, songData, songRefetch, getUserError, getUserLoading, getUserData };
};
