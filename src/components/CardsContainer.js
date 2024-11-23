import { useSelector } from "react-redux";
import CardList from "./CardList";
import geminiIcon from "../utils/google-gemini-icon.png";
import Skeleton from "@mui/material/Skeleton";
import { useEffect, useState } from "react";

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
  const watchlist = useSelector((store) => store?.watchlist);

  const cardTitle = (title) => (
    <h1 className="text-white text-sm md:text-lg font-semibold">{title}</h1>
  );

  const loadingSkeleton = () => (
    <div>
      <Skeleton
        sx={{ bgcolor: "grey.800" }}
        variant="rectangular"
        className="w-28 md:w-40 min-h-7"
      />
      <div className="flex gap-4 overflow-hidden mt-2 mb-2 md:mb-8">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((item) => (
          <Skeleton
            key={item}
            sx={{ bgcolor: "grey.800" }}
            variant="rectangular"
            className="min-w-24 md:min-w-32 min-h-36 md:min-h-48 mb-4"
          />
        ))}
      </div>
    </div>
  );

  // useEffect(() => {
  //   if (recommendedMovies) {
  //     setLoading(false);
  //   }
  // }, [recommendedMovies]);

  return (
    <div className="-mt-8">
      {nowPlayingMovies ? (
        <div>
          {cardTitle("Now Playing Movies")}
          <CardList mediaList={nowPlayingMovies} isMovie={true} />
        </div>
      ) : (
        loadingSkeleton()
      )}
      {topRatedMovies ? (
        <div id="movies">
          {cardTitle("Top Rated Movies")}
          <CardList mediaList={topRatedMovies} isMovie={true} />
        </div>
      ) : (
        loadingSkeleton()
      )}
      {recommendedMovies ? (
        <div>
          <div className="flex items-center">
            {cardTitle(
              `Gemini recommendations ${
                watchlist?.length ? "based on your watchlist" : "for you"
              }`
            )}
            <img className="w-4 h-4 ml-1" src={geminiIcon} />
          </div>
          <CardList mediaList={recommendedMovies} isMovie={true} />
        </div>
      ) : (
        loadingSkeleton()
      )}
      {topRatedTV ? (
        <div id="tv-shows">
          {cardTitle("Top Rated TV Shows")}
          <CardList mediaList={topRatedTV} isMovie={false} />
        </div>
      ) : (
        loadingSkeleton()
      )}
      {popularMovies ? (
        <div>
          {cardTitle("Popular Movies")}
          <CardList mediaList={popularMovies} isMovie={true} />
        </div>
      ) : (
        loadingSkeleton()
      )}
      {onTheAirTV ? (
        <div>
          {cardTitle("On The Air TV Shows")}
          <CardList mediaList={onTheAirTV} isMovie={false} />
        </div>
      ) : (
        loadingSkeleton()
      )}
    </div>
  );
};

export default CardsContainer;
