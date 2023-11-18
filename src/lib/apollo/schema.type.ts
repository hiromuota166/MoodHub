export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateRoom = {
  userId: Scalars["Int"];
  roomName: Scalars["String"];
};

export type GetRoomMembers = {
  roomId: Scalars["Int"];
};

export type JoinRoom = {
  userId: Scalars["Int"];
  roomId: Scalars["Int"];
};

export type Mutation = {
  __typename?: "Mutation";
  createRoom: Room;
  joinRoom: Room;
  updateCategory: RegisterComplete;
  register: RegisterComplete;
  getMembers: RoomMembers;
};

export type MutationCreateRoomArgs = {
  room: CreateRoom;
};

export type MutationJoinRoomArgs = {
  join: JoinRoom;
};

export type MutationUpdateCategoryArgs = {
  update: UpdateCategories;
};

export type MutationRegisterArgs = {
  regist: Register;
};

export type MutationGetMembersArgs = {
  members: GetRoomMembers;
};

export type Query = {
  __typename?: "Query";
  song: Array<Song>;
};

export type QuerySongArgs = {
  roomId: Scalars["Int"];
};

export type Register = {
  userId: Scalars["Int"];
  categories: Array<Scalars["String"]>;
  userName: Scalars["String"];
  gender?: Maybe<Scalars["String"]>;
  age?: Maybe<Scalars["Int"]>;
};

export type RegisterComplete = {
  __typename?: "RegisterComplete";
  userId: Scalars["Int"];
  categories: Array<Scalars["String"]>;
  userName: Scalars["String"];
  gender?: Maybe<Scalars["String"]>;
  age?: Maybe<Scalars["Int"]>;
};

export type Room = {
  __typename?: "Room";
  roomId: Scalars["Int"];
  userId: Array<Scalars["Int"]>;
  name: Scalars["String"];
};

export type RoomMembers = {
  __typename?: "RoomMembers";
  roomName: Scalars["String"];
  members: Array<Scalars["String"]>;
};

export type Song = {
  __typename?: "Song";
  songName: Scalars["String"];
  categories: Array<Scalars["String"]>;
};

export type UpdateCategories = {
  userId: Scalars["Int"];
  categories: Array<Scalars["String"]>;
};
