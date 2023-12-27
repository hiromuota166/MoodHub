interface ShowSpotifyProps {
  trackId: string | undefined;
}

const ShowSpotify = (props: ShowSpotifyProps) => {
  const { trackId } = props;

  if (trackId === undefined) {
    return <div>動画が見つかりません。</div>;
  }

  const theme = "&theme=0"

  const videoUrl = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator${theme}`;

  return (
    <iframe style={{ borderRadius: "12px" }} src={videoUrl} width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
  );
};

export default ShowSpotify;
