import { useSelector } from "react-redux";
import CardList from "./CardList";
import { useEffect, useState } from "react";
import { OPTIONS } from "../utils/constants";

const CardsContainer = () => {
  const nowPlayingMovies = useSelector(
    (store) => store?.movies?.nowPlayingMovies
  );

  const popularMovies = useSelector((store) => store?.movies?.popularMovies);
  const onTheAirTV = useSelector((store) => store?.movies?.onTheAirTV);
  const topRatedTV = useSelector((store) => store?.movies?.topRatedTV);
  const topRatedMovies = useSelector((store) => store?.movies?.topRatedMovies);
  const recommendedMovies = useSelector(
    (store) => store?.movies?.recommendedMovies
  );

  // useEffect(() => {
  //   getGeminiRecommendations();
  // }, []);

  const cardTitle = (title) => (
    <h1 className="text-white text-sm md:text-lg font-semibold">{title}</h1>
  );

  return (
    <div className="-mt-8">
      <div>
        {cardTitle("Now Playing Movies")}
        <CardList mediaList={nowPlayingMovies} isMovie={true} />
      </div>
      <div id="movies">
        {cardTitle("Top Rated Movies")}
        <CardList mediaList={topRatedMovies} isMovie={true} />
      </div>
      <div>
        {cardTitle("Recommended Movies based on your watchlist")}
        <CardList mediaList={recommendedMovies} isMovie={true} />
      </div>
      <div id="tv-shows">
        {cardTitle("Top Rated TV Shows")}
        <CardList mediaList={topRatedTV} isMovie={false} />
      </div>
      <div>
        {cardTitle("Popular Movies")}
        <CardList mediaList={popularMovies} isMovie={true} />
      </div>
      <div>
        {cardTitle("On The Air TV Shows")}
        <CardList mediaList={onTheAirTV} isMovie={false} />
      </div>
    </div>
  );
};

export default CardsContainer;
