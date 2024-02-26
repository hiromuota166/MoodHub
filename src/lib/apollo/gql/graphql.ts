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
  avatarUrl?: InputMaybe<Scalars["String"]["input"]>;
  categories?: InputMaybe<Array<Scalars["String"]["input"]>>;
  gender?: InputMaybe<Scalars["String"]["input"]>;
  userId: Scalars["String"]["input"];
  userName?: InputMaybe<Scalars["String"]["input"]>;
};

export type RegisterComplete = {
  __typename?: "RegisterComplete";
  age?: Maybe<Scalars["Int"]["output"]>;
  avatarUrl?: Maybe<Scalars["String"]["output"]>;
  categories?: Maybe<Array<Scalars["String"]["output"]>>;
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
  membersInfoList: Array<UserDict>;
  roomName: Scalars["String"]["output"];
};

export type Song = {
  __typename?: "Song";
  categories: Array<Scalars["String"]["output"]>;
  songName: Scalars["String"]["output"];
  trackId: Scalars["String"]["output"];
};

export type UpdateCategories = {
  categories: Array<Scalars["String"]["input"]>;
  userId: Scalars["String"]["input"];
};

export type UpdateUserName = {
  userId: Scalars["String"]["input"];
  userName?: InputMaybe<Scalars["String"]["input"]>;
};

export type UserDict = {
  __typename?: "UserDict";
  avatarUrl?: Maybe<Scalars["String"]["output"]>;
  userId: Scalars["String"]["output"];
};

export type CreateRoomMutationVariables = Exact<{
  userId: Scalars["String"]["input"];
  roomName: Scalars["String"]["input"];
}>;

export type CreateRoomMutation = {
  __typename?: "Mutation";
  createRoom: {
    __typename?: "Room";
    roomId: number;
    userId: Array<string>;
    name: string;
  };
};

export type JoinRoomMutationVariables = Exact<{
  userId: Scalars["String"]["input"];
  roomId: Scalars["Int"]["input"];
}>;

export type JoinRoomMutation = {
  __typename?: "Mutation";
  joinRoom: { __typename?: "Room"; userId: Array<string>; roomId: number };
};

export type UpdateCategoriesMutationVariables = Exact<{
  userId: Scalars["String"]["input"];
  categories: Array<Scalars["String"]["input"]> | Scalars["String"]["input"];
}>;

export type UpdateCategoriesMutation = {
  __typename?: "Mutation";
  updateCategory: {
    __typename?: "RegisterComplete";
    userId: string;
    categories?: Array<string> | null;
    userName?: string | null;
    gender?: string | null;
    age?: number | null;
  };
};

export type RegisterMutationVariables = Exact<{
  userId: Scalars["String"]["input"];
  categories: Array<Scalars["String"]["input"]> | Scalars["String"]["input"];
  userName?: InputMaybe<Scalars["String"]["input"]>;
  gender?: InputMaybe<Scalars["String"]["input"]>;
  age?: InputMaybe<Scalars["Int"]["input"]>;
  avatarUrl?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: {
    __typename?: "RegisterComplete";
    userId: string;
    categories?: Array<string> | null;
    userName?: string | null;
    gender?: string | null;
    age?: number | null;
  };
};

export type SongQueryVariables = Exact<{
  roomId: Scalars["Int"]["input"];
}>;

export type SongQuery = {
  __typename?: "Query";
  song: Array<{
    __typename?: "Song";
    songName: string;
    categories: Array<string>;
    trackId: string;
  }>;
};

export type GetMembersQueryVariables = Exact<{
  roomId: Scalars["Int"]["input"];
}>;

export type GetMembersQuery = {
  __typename?: "Query";
  getMembers: {
    __typename?: "RoomMembers";
    roomName: string;
    membersInfoList: Array<{
      __typename?: "UserDict";
      userId: string;
      avatarUrl?: string | null;
    }>;
  };
};

export type GetSongByRoomIdQueryVariables = Exact<{
  roomId: Scalars["Int"]["input"];
}>;

export type GetSongByRoomIdQuery = {
  __typename?: "Query";
  song: Array<{
    __typename?: "Song";
    songName: string;
    categories: Array<string>;
  }>;
};

export const CreateRoomDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createRoom" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "roomName" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
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
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "userId" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "userId" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "roomName" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "roomName" },
                      },
                    },
                  ],
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
} as unknown as DocumentNode<CreateRoomMutation, CreateRoomMutationVariables>;
export const JoinRoomDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "JoinRoom" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "roomId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "joinRoom" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "join" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "userId" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "userId" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "roomId" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "roomId" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "userId" } },
                { kind: "Field", name: { kind: "Name", value: "roomId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<JoinRoomMutation, JoinRoomMutationVariables>;
export const UpdateCategoriesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateCategories" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "categories" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "String" },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateCategory" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "update" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "userId" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "userId" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "categories" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "categories" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "userId" } },
                { kind: "Field", name: { kind: "Name", value: "categories" } },
                { kind: "Field", name: { kind: "Name", value: "userName" } },
                { kind: "Field", name: { kind: "Name", value: "gender" } },
                { kind: "Field", name: { kind: "Name", value: "age" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateCategoriesMutation,
  UpdateCategoriesMutationVariables
>;
export const RegisterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Register" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "categories" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "String" },
                },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userName" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          defaultValue: { kind: "NullValue" },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "gender" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          defaultValue: { kind: "NullValue" },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "age" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "NullValue" },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "avatarUrl" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          defaultValue: { kind: "NullValue" },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "register" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "regist" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "userId" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "userId" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "categories" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "categories" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "userName" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "userName" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "gender" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "gender" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "age" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "age" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "avatarUrl" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "avatarUrl" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "userId" } },
                { kind: "Field", name: { kind: "Name", value: "categories" } },
                { kind: "Field", name: { kind: "Name", value: "userName" } },
                { kind: "Field", name: { kind: "Name", value: "gender" } },
                { kind: "Field", name: { kind: "Name", value: "age" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const SongDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Song" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "roomId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "song" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "roomId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "roomId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "songName" } },
                { kind: "Field", name: { kind: "Name", value: "categories" } },
                { kind: "Field", name: { kind: "Name", value: "trackId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SongQuery, SongQueryVariables>;
export const GetMembersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getMembers" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "roomId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getMembers" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "roomId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "roomId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "roomName" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "membersInfoList" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "userId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "avatarUrl" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetMembersQuery, GetMembersQueryVariables>;
export const GetSongByRoomIdDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetSongByRoomId" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "roomId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "song" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "roomId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "roomId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "songName" } },
                { kind: "Field", name: { kind: "Name", value: "categories" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetSongByRoomIdQuery,
  GetSongByRoomIdQueryVariables
>;
