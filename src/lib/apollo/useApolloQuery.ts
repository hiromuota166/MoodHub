import { useMutation, useQuery } from "@apollo/client";
import { GET_SONG, CREATE_ROOM, JOIN_ROOM, UPDATE_CATEGORIES, REGISTER_USER, GET_USER } from "./apollo-query";
import { JoinRoom, MutationJoinRoomArgs } from "./schema.type";

const useApolloQuery = () => {
	const [joinRoomFunc, joinRoomState] = useMutation(JOIN_ROOM);
	const [createRoomFunc, createRoomState] = useMutation(CREATE_ROOM);
	const [updateCategoriesFunc, updateCategoriesState] = useMutation(UPDATE_CATEGORIES);
	const [registerUserFunc, registerUserState] = useMutation(REGISTER_USER);
	const Song = useQuery(GET_SONG);
	const [getUserFunc, getUserState] = useMutation(GET_USER);

	return {
		joinRoomFunc,
		joinRoomState,
		createRoomFunc,
		createRoomState,
		updateCategoriesFunc,
		updateCategoriesState,
		registerUserFunc,
		registerUserState,
		Song,
		getUserFunc,
		getUserState,
	};
};

export default useApolloQuery;
