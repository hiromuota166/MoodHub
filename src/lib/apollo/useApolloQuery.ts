import { useMutation, useQuery } from "@apollo/client";
import { GET_SONG, CREATE_ROOM, JOIN_ROOM, UPDATE_CATEGORIES, REGISTER_USER, GET_USER } from "./apollo-query";
import { JoinRoom, CreateRoom, UpdateCategories, Register, Song, GetRoomMembers } from "./gql/graphql";

const useApolloQuery = () => {
	const [joinRoomFunc, joinRoomState] = useMutation<JoinRoom>(JOIN_ROOM);
	const [createRoomFunc, createRoomState] = useMutation<CreateRoom>(CREATE_ROOM);
	const [updateCategoriesFunc, updateCategoriesState] = useMutation<UpdateCategories>(UPDATE_CATEGORIES);
	const [registerUserFunc, registerUserState] = useMutation<Register>(REGISTER_USER);
	const Song = useQuery<Song>(GET_SONG);
	const [getUserFunc, getUserState] = useMutation<GetRoomMembers>(GET_USER);
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
