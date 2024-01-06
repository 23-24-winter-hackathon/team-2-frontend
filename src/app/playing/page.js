"use client";

const BASE_URL = process.env.NEXT_PUBLIC_DEV_URL;

import { useState, useEffect } from "react";
import axios from "axios";
import Bar from "@/components/playing/Bar";
import Chat from "@/components/playing/Chat";
import Header from "@/components/playing/Header";
import ImageNHint from "@/components/playing/ImageNHint";
import { PlayingContainer } from "@/components/playing/playing.styles";

export default function Playing() {
  const [data, setData] = useState({});

  const fetchGameData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/games/current`, {
        withCredentials: true,
      });
      setData(res.data.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGameData();

    // 1초마다 데이터 가져오기
    const intervalId = setInterval(() => {
      fetchGameData();
    }, 1000);

    // 컴포넌트가 언마운트되면 clearInterval 호출
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <>
      <Header data={data} />
      <PlayingContainer>
        <Bar />
        <ImageNHint data={data} />
        <Chat />
      </PlayingContainer>
    </>
  );
}
