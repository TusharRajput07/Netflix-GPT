import Header from "./Header";
import { useEffect, useRef, useState } from "react";
import VideoContainer from "./VideoContainer";
import CardsContainer from "./CardsContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useOnTheAirTV from "../hooks/useOnTheAirTV";
import useTopRatedTV from "../hooks/useTopRatedTV";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import useRecommendedMovies from "../hooks/useRecommendedMovies";

const Browse = () => {
  const getNowPlayingMovies = useNowPlayingMovies();
  const getPopularMovies = usePopularMovies();
  const getOnTheAirTV = useOnTheAirTV();
  const getTopRatedTV = useTopRatedTV();
  const getTopRatedMovies = useTopRatedMovies();
  const getGeminiRecommendations = useRecommendedMovies();
  const watchlist = useSelector((store) => store.watchlist);
  const videoRef = useRef(null);
  const cardsRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState();
  const recommendedMovies = useSelector(
    (store) => store?.movies?.recommendedMovies
  );

  useEffect(() => {
    getNowPlayingMovies();
    getPopularMovies();
    getOnTheAirTV();
    getTopRatedTV();
    getTopRatedMovies();
  }, []);

  useEffect(() => {
    if (!recommendedMovies && Array.isArray(watchlist)) {
      console.log("i am running", watchlist);

      getGeminiRecommendations();
    }
  }, [watchlist]);

  useEffect(() => {
    getHeight();
  }, []);

  const getHeight = () => {
    console.log(
      videoRef?.current?.clientHeight + cardsRef?.current?.clientHeight
    );
    setContainerHeight(
      videoRef?.current?.clientHeight + cardsRef?.current?.clientHeight
    );
  };

  return (
    <div style={{ height: `${containerHeight}px` }}>
      <Header />
      <div className="bg-black h-[40vh] md:h-[95vh]" ref={videoRef}>
        <VideoContainer />
      </div>
      <div
        className="absolute z-20 bg-[#141414] pl-6 md:pl-16 w-full"
        ref={cardsRef}
      >
        <CardsContainer />
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
