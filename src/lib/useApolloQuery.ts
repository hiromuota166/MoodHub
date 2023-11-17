import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const useApolloQuery = () => {
  const JOIN_ROOM = gql`
    mutation JoinRoom($userId: Int!, $roomId: Int!) {
      joinRoom(join: { userId: $userId, roomId: $roomId }) {
        userId
        roomId
      }
    }
  `;

  const CREATE_ROOM = gql`
    mutation createRoom($userId: Int!, $roomName: String!) {
      createRoom(room: { userId: $userId, roomName: $roomName }) {
        roomId
        userId
        name
      }
    }
  `;
  const [joinRoomFunc, joinRoomState] = useMutation(JOIN_ROOM);
  const [createRoomFunc, createRoomState] = useMutation(CREATE_ROOM);
  return { joinRoomFunc, createRoomFunc, joinRoomState, createRoomState };
};

export default useApolloQuery;
