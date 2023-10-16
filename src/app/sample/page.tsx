// app/page.js
import { getClient } from "@/lib/client";

import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
const GET_SONG = gql`
query Song($songName: String!) {
  song(keyword: $songName) {
    songName
    category
  }
}`;

const query = gql`
query{
  song(keyword:"yoasobi"){
    songName
  }
}
`;
interface SongData {
  songName: string;
  category: string[];
}

export default async function Page() {
  //   const { data, error } = useSuspenseQuery<{ song: SongData }>(GET_SONG, {
  //     variables: { songName: "yoasobi" },
  // });

  const { data } = await getClient().query({ query }).then((res) => { console.log(res.data.song); return res.data; });

  return <main>{data}</main>;
}