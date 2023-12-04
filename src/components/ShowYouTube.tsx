import { useEffect, useState } from "react";

interface ShowYouTubeProps {
  query: string;
}

interface YouTubeSearchResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: Array<{
    kind: string;
    etag: string;
    id: {
      kind: string;
      videoId: string;
    };
    snippet: {
      // 必要に応じて他のフィールドを追加
      title: string;
      description: string;
    };
  }>;
}

const ShowYouTube = (props: ShowYouTubeProps) => {
  const { query } = props;
  const [videoIds, setVideoIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      const apiKey = process.env.YOUTUBE_DATA_API_KEY;
      const url = `${
        process.env.YOUTUBE_DATA_API_URL
      }/search?part=snippet&q=${encodeURIComponent(query)}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data: YouTubeSearchResponse = await response.json();
        const ids =
          data.items.length > 10
            ? data.items.slice(0, 10).map((item) => item.id.videoId)
            : data.items.map((item) => item.id.videoId);
        setVideoIds(ids);
      } catch (error) {
        console.error("YouTube検索中にエラーが発生しました:", error);
      }
    };

    if (query) {
      fetchYouTubeVideos();
    }
  }, [query]);

  if (videoIds.length === 0) {
    return <div>動画が見つかりません。</div>;
  }

  const videoUrl = `https://www.youtube.com/embed/${videoIds[0]}`;

  return (
    <iframe id="ytplayer" width="640" height="360" src={videoUrl}></iframe>
  );
};

export default ShowYouTube;
