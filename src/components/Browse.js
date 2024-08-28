import Header from "./Header";
import { useEffect } from "react";
import VideoContainer from "./VideoContainer";
import CardsContainer from "./CardsContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useOnTheAirTV from "../hooks/useOnTheAirTV";
import useTopRatedTV from "../hooks/useTopRatedTV";
import useTopRatedMovies from "../hooks/useTopRatedMovies";

const Browse = () => {
  const getNowPlayingMovies = useNowPlayingMovies();
  const getPopularMovies = usePopularMovies();
  const getOnTheAirTV = useOnTheAirTV();
  const getTopRatedTV = useTopRatedTV();
  const getTopRatedMovies = useTopRatedMovies();

  useEffect(() => {
    getNowPlayingMovies();
    getPopularMovies();
    getOnTheAirTV();
    getTopRatedTV();
    getTopRatedMovies();
  }, []);

  return (
    <div>
      <Header />
      <VideoContainer />
      <div className="absolute bottom-16 h-80 z-10 bg-gradient-to-t from-black w-full"></div>
      <div className="absolute z-20 bg-[#141414] pl-16 w-full">
        <CardsContainer />
      </div>
    </div>
  );
};

export default Browse;
