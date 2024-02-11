/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation createRoom($userId: String!, $roomName: String!) {\n    createRoom(room: { userId: $userId, roomName: $roomName }) {\n      roomId\n      userId\n      name\n    }\n  }\n": types.CreateRoomDocument,
    "\n  mutation JoinRoom($userId: String!, $roomId: Int!) {\n    joinRoom(join: { userId: $userId, roomId: $roomId }) {\n      userId\n      roomId\n    }\n  }\n": types.JoinRoomDocument,
    "\n  mutation UpdateCategories($userId: String!, $categories: [String!]!) {\n    updateCategory(update: { userId: $userId, categories: $categories }) {\n      userId\n      categories\n      userName\n      gender\n      age\n    }\n  }\n": types.UpdateCategoriesDocument,
    "\n  mutation Register(\n    $userId: String!\n    $categories: [String!]!\n    $userName: String = null\n    $gender: String = null\n    $age: Int = null\n    $avatarUrl: String = null\n  ) {\n    register(\n      regist: {\n        userId: $userId\n        categories: $categories\n        userName: $userName\n        gender: $gender\n        age: $age\n        avatarUrl: $avatarUrl\n      }\n    ) {\n      userId\n      categories\n      userName\n      gender\n      age\n    }\n  }\n": types.RegisterDocument,
    "\n  query Song($roomId: Int!) {\n    song(roomId: $roomId) {\n      songName\n      categories\n      trackId\n    }\n  }\n": types.SongDocument,
    "\n  query getMembers($roomId: Int!){\n    getMembers(roomId: $roomId){\n      roomName\n      membersInfoList {\n        userId\n        avatarUrl\n      }\n    }\n  }\n": types.GetMembersDocument,
    "\n  query GetSongByRoomId($roomId: Int!) {\n    song(roomId: $roomId) {\n      songName\n      categories\n    }\n  }\n": types.GetSongByRoomIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createRoom($userId: String!, $roomName: String!) {\n    createRoom(room: { userId: $userId, roomName: $roomName }) {\n      roomId\n      userId\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation createRoom($userId: String!, $roomName: String!) {\n    createRoom(room: { userId: $userId, roomName: $roomName }) {\n      roomId\n      userId\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation JoinRoom($userId: String!, $roomId: Int!) {\n    joinRoom(join: { userId: $userId, roomId: $roomId }) {\n      userId\n      roomId\n    }\n  }\n"): (typeof documents)["\n  mutation JoinRoom($userId: String!, $roomId: Int!) {\n    joinRoom(join: { userId: $userId, roomId: $roomId }) {\n      userId\n      roomId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCategories($userId: String!, $categories: [String!]!) {\n    updateCategory(update: { userId: $userId, categories: $categories }) {\n      userId\n      categories\n      userName\n      gender\n      age\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCategories($userId: String!, $categories: [String!]!) {\n    updateCategory(update: { userId: $userId, categories: $categories }) {\n      userId\n      categories\n      userName\n      gender\n      age\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register(\n    $userId: String!\n    $categories: [String!]!\n    $userName: String = null\n    $gender: String = null\n    $age: Int = null\n    $avatarUrl: String = null\n  ) {\n    register(\n      regist: {\n        userId: $userId\n        categories: $categories\n        userName: $userName\n        gender: $gender\n        age: $age\n        avatarUrl: $avatarUrl\n      }\n    ) {\n      userId\n      categories\n      userName\n      gender\n      age\n    }\n  }\n"): (typeof documents)["\n  mutation Register(\n    $userId: String!\n    $categories: [String!]!\n    $userName: String = null\n    $gender: String = null\n    $age: Int = null\n    $avatarUrl: String = null\n  ) {\n    register(\n      regist: {\n        userId: $userId\n        categories: $categories\n        userName: $userName\n        gender: $gender\n        age: $age\n        avatarUrl: $avatarUrl\n      }\n    ) {\n      userId\n      categories\n      userName\n      gender\n      age\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Song($roomId: Int!) {\n    song(roomId: $roomId) {\n      songName\n      categories\n      trackId\n    }\n  }\n"): (typeof documents)["\n  query Song($roomId: Int!) {\n    song(roomId: $roomId) {\n      songName\n      categories\n      trackId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getMembers($roomId: Int!){\n    getMembers(roomId: $roomId){\n      roomName\n      membersInfoList {\n        userId\n        avatarUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query getMembers($roomId: Int!){\n    getMembers(roomId: $roomId){\n      roomName\n      membersInfoList {\n        userId\n        avatarUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSongByRoomId($roomId: Int!) {\n    song(roomId: $roomId) {\n      songName\n      categories\n    }\n  }\n"): (typeof documents)["\n  query GetSongByRoomId($roomId: Int!) {\n    song(roomId: $roomId) {\n      songName\n      categories\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;