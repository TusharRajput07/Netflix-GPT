import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import { useEffect, useRef, useState } from "react";
import { OPTIONS } from "../utils/constants";

const VideoContainer = () => {
  const movies = useSelector((store) => store?.movies?.nowPlayingMovies);
  const [videoMovie, setVideoMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const iframeRef = useRef(null);

  const getMovieVideo = async (resetAfterClose) => {
    console.log(movies);
    const id = movies?.[1]?.id;
    setVideoMovie(movies?.[1]);
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + id + "/videos?language=en-US",
      OPTIONS
    );
    const json = await data.json();

    const filteredData = json?.results?.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filteredData?.length
      ? filteredData?.[0]
      : json.results?.[0];
    setTrailer(trailer?.key);
    resetAfterClose && closeFullScreen(trailer?.key);
  };

  const closeFullScreen = (trailer) => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe["style"]["pointerEvents"] = "none";
      iframe["src"] =
        "https://www.youtube.com/embed/" +
        trailer +
        "?si=L-JbjnKXzZoPJxpW&autoplay=1&mute=1&rel=0&loop=1&showinfo=0&controls=0&start=0";
    }
  };

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      getMovieVideo(true);
    }
  };

  useEffect(() => {
    if (movies?.length) {
      getMovieVideo();
    }
  }, [movies]);

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  const handleFullScreen = () => {
    const iframe = iframeRef.current;

    //give default attributes back to the iframe
    iframe.style.pointerEvents = "auto";
    iframe.src =
      "https://www.youtube.com/embed/" +
      trailer +
      "?si=G6VpOb_C_MfSZlHh&autoplay=1&rel=0&loop=1&controls=1&start=0";

    // Request fullscreen
    if (iframe.webkitRequestFullscreen) {
      // Chrome, Safari, and Opera
      iframe.webkitRequestFullscreen();
    }
  };

  if (!videoMovie) return;

  return (
    <div>
      <VideoTitle
        title={videoMovie?.original_title}
        overview={videoMovie?.overview}
        handleFullScreen={handleFullScreen}
      />
      <VideoBackground trailer={trailer} iframeRef={iframeRef} />
    </div>
  );
};

export default VideoContainer;
