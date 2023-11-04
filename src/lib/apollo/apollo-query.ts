import { gql } from "@apollo/client";

const CREATE_ROOM = gql`
	mutation createRoom($userId: Int!, $roomName: String!) {
		createRoom(room: { userId: $userId, roomName: $roomName }) {
			roomId
			userId
			name
		}
	}
`;

const JOIN_ROOM = gql`
	mutation JoinRoom($userId: Int!, $roomId: Int!) {
		joinRoom(join: { userId: $userId, roomId: $roomId }) {
			userId
			roomId
		}
	}
`;

const UPDATE_CATEGORIES = gql`
	mutation UpdateCategories($userId: Int!, $categories: [String!]!) {
		updateCaategory(update: { userId: $userId, categories: $categories }) {
			userId
			categories
			userName
			gender
			age
		}
	}
`;

const REGISTER_USER = gql`
	mutation Register($userId: Int!, $categories: [String!]!, userName: String!, gender: String!, age: Int!) {
		register(regist: { userId: $userId, categories: $categories, userName: userName, gender: $gender, age: $age}) {
			userId
			categories
			userName
			gender
			age
		}
	}
`;

const GET_SONG = gql`
	query Song($roomId: String!) {
		song(keyword: $roomId) {
			songName
			category
		}
	}
`;

const GET_USER = gql`
	mutation getMembers( $roomId: Int!)) {
		getMembers(members: { roomId: $roomId }) {
			roomName
			members
		}
	}
`;

export { GET_SONG, CREATE_ROOM, JOIN_ROOM, UPDATE_CATEGORIES, REGISTER_USER, GET_USER};

