import { useEffect, useState } from "react";
import { OPTIONS } from "../utils/constants";

const VideoBackground = ({ id }) => {
  const [Trailer, setTrailer] = useState(null);

  const getMovieVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + id + "/videos?language=en-US",
      OPTIONS
    );
    const json = await data.json();

    const filteredData = json?.results?.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filteredData.length ? filteredData[0] : json.results[0];
    setTrailer(trailer?.key);
  };

  useEffect(() => {
    getMovieVideo();
  }, []);

  return (
    <div className="max-w-screen h-[85vh] overflow-hidden pointer-events-none">
      <iframe
        className="w-screen aspect-video -mt-[104px]"
        src={
          "https://www.youtube.com/embed/" +
          Trailer +
          "?si=L-JbjnKXzZoPJxpW&autoplay=1&mute=1&rel=0&loop=1&showinfo=0&controls=0"
        }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
