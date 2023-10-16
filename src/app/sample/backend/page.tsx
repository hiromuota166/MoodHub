"use client";

import React, { useEffect,useState } from "react";
import Image from "next/image";

function BackEnd() {
  //初期状態でnullを持つ状態を作成
  const [data,setData] = useState("");

  useEffect(() => {
    fetch("https://mood-hub.onrender.com/")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch((error) => {
        console.error('Fetch error: ', error);
      });
    },[]);

  return (
    <div>
      {data ? ( // データが存在する場合は表示、そうでない場合は"Fetching Data"と表示
        <p>{data}</p>
      ) : (
        "Fetching Data"
      )}
    </div>
  );
}

export default BackEnd;
