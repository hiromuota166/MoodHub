import { gql } from "@apollo/client";

const CREATE_ROOM = gql`
  mutation createRoom($userId: String!, $roomName: String!) {
    createRoom(room: { userId: $userId, roomName: $roomName }) {
      roomId
      userId
      name
    }
  }
`;

const JOIN_ROOM = gql`
  mutation JoinRoom($userId: String!, $roomId: Int!) {
    joinRoom(join: { userId: $userId, roomId: $roomId }) {
      userId
      roomId
    }
  }
`;

const UPDATE_CATEGORIES = gql`
  mutation UpdateCategories($userId: String!, $categories: [String!]!) {
    updateCategory(update: { userId: $userId, categories: $categories }) {
      userId
      categories
      userName
      gender
      age
    }
  }
`;

const REGISTER_USER = gql`
  mutation Register(
    $userId: String!
    $categories: [String!]!
    $userName: String = null
    $gender: String = null
    $age: Int = null
    $avatarUrl: String = null
  ) {
    register(
      regist: {
        userId: $userId
        categories: $categories
        userName: $userName
        gender: $gender
        age: $age
        avatarUrl: $avatarUrl
      }
    ) {
      userId
      categories
      userName
      gender
      age
    }
  }
`;

const GET_SONG = gql`
  query Song($roomId: Int!) {
    song(roomId: $roomId) {
      songName
      categories
      trackId
    }
  }
`;

const GET_USER = gql`
  query getMembers($roomId: Int!){
    getMembers(roomId: $roomId){
      roomName
      membersInfoList {
        userId
        avatarUrl
      }
    }
  }
`;

export {
  GET_SONG,
  CREATE_ROOM,
  JOIN_ROOM,
  UPDATE_CATEGORIES,
  REGISTER_USER,
  GET_USER,
};
