import { useSelector } from "react-redux";
import CardList from "./CardList";
import geminiIcon from "../utils/google-gemini-icon.png";

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
        <div className="flex items-center">
          {cardTitle(
            `Recommended Movies ${
              watchlist?.length ? "based on your watchlist" : "for you"
            }`
          )}
          <img className="w-4 md:w-5 h-4 md:h-5 ml-1" src={geminiIcon} />
        </div>

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
