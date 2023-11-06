import { useMutation, useQuery, useSuspenseQuery } from "@apollo/client";
import { GET_SONG, CREATE_ROOM, JOIN_ROOM, UPDATE_CATEGORIES, REGISTER_USER, GET_USER } from "./apollo-query";
import {
	Room,
	Song,
	RoomMembers,
	RegisterComplete,
} from "./gql/graphql";

const useApolloQuery = (userID?: number, roomID?: number) => {
	const [joinRoomFunc, joinRoomState] = useMutation<{ joinRoom: Room }>(JOIN_ROOM);
	const [createRoomFunc, createRoomState] = useMutation<{ createRoom: Room }>(CREATE_ROOM);
	const [updateCategoriesFunc, updateCategoriesState] = useMutation<{ updateCaategory: RegisterComplete }>(
		UPDATE_CATEGORIES
	);
	const [registerUserFunc, registerUserState] = useMutation<{ register: RegisterComplete }>(REGISTER_USER);
	const Song = useQuery<{ song: Song[] }>(GET_SONG, { variables: { roomId: roomID }, skip: !roomID });
	const [getUserFunc, getUserState] = useMutation<{ getMembers: RoomMembers }>(GET_USER);
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
