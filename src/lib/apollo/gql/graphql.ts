/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type CreateRoom = {
  roomName: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type JoinRoom = {
  roomId: Scalars["Int"]["input"];
  userId: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  createRoom: Room;
  joinRoom: Room;
  register: RegisterComplete;
  updateCategory: RegisterComplete;
  updateUsername: RegisterComplete;
};

export type MutationCreateRoomArgs = {
  room: CreateRoom;
};

export type MutationJoinRoomArgs = {
  join: JoinRoom;
};

export type MutationRegisterArgs = {
  regist: Register;
};

export type MutationUpdateCategoryArgs = {
  update: UpdateCategories;
};

export type MutationUpdateUsernameArgs = {
  update: UpdateUserName;
};

export type Query = {
  __typename?: "Query";
  getMembers: RoomMembers;
  getUserInfo: RegisterComplete;
  song: Array<Song>;
};

export type QueryGetMembersArgs = {
  roomId: Scalars["Int"]["input"];
};

export type QueryGetUserInfoArgs = {
  userId: Scalars["String"]["input"];
};

export type QuerySongArgs = {
  roomId: Scalars["Int"]["input"];
};

export type Register = {
  age?: InputMaybe<Scalars["Int"]["input"]>;
  categories: Array<Scalars["String"]["input"]>;
  gender?: InputMaybe<Scalars["String"]["input"]>;
  userId: Scalars["String"]["input"];
  userName?: InputMaybe<Scalars["String"]["input"]>;
};

export type RegisterComplete = {
  __typename?: "RegisterComplete";
  age?: Maybe<Scalars["Int"]["output"]>;
  categories: Array<Scalars["String"]["output"]>;
  gender?: Maybe<Scalars["String"]["output"]>;
  userId: Scalars["String"]["output"];
  userName?: Maybe<Scalars["String"]["output"]>;
};

export type Room = {
  __typename?: "Room";
  name: Scalars["String"]["output"];
  roomId: Scalars["Int"]["output"];
  userId: Array<Scalars["String"]["output"]>;
};

export type RoomMembers = {
  __typename?: "RoomMembers";
  members: Array<Scalars["String"]["output"]>;
  roomName: Scalars["String"]["output"];
};

export type Song = {
  __typename?: "Song";
  categories: Array<Scalars["String"]["output"]>;
  songName: Scalars["String"]["output"];
};

export type UpdateCategories = {
  categories: Array<Scalars["String"]["input"]>;
  userId: Scalars["String"]["input"];
};

export type UpdateUserName = {
  userId: Scalars["String"]["input"];
  userName?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateARoomMutationVariables = Exact<{
  room: CreateRoom;
}>;

export type CreateARoomMutation = {
  __typename?: "Mutation";
  createRoom: {
    __typename?: "Room";
    roomId: number;
    userId: Array<string>;
    name: string;
  };
};

export const CreateARoomDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateARoom" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "room" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateRoom" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createRoom" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "room" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "room" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "roomId" } },
                { kind: "Field", name: { kind: "Name", value: "userId" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateARoomMutation, CreateARoomMutationVariables>;
