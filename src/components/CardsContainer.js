import { useSelector } from "react-redux";
import CardList from "./CardList";

const CardsContainer = () => {
  const nowPlayingMovies = useSelector(
    (store) => store?.movies?.nowPlayingMovies
  );

  const popularMovies = useSelector((store) => store?.movies?.popularMovies);
  const onTheAirTV = useSelector((store) => store?.movies?.onTheAirTV);
  const topRatedTV = useSelector((store) => store?.movies?.topRatedTV);
  const topRatedMovies = useSelector((store) => store?.movies?.topRatedMovies);

  return (
    <div className="-mt-16">
      <div className="relative">
        <h1 className="text-white text-lg font-semibold">Now Playing Movies</h1>
        <CardList mediaList={nowPlayingMovies} isMovie={true} />
      </div>
      <div className="relative">
        <h1 className="text-white text-lg font-semibold">Top Rated Movies</h1>
        <CardList mediaList={topRatedMovies} isMovie={true} />
      </div>
      <div className="relative">
        <h1 className="text-white text-lg font-semibold">Top Rated TV Shows</h1>
        <CardList mediaList={topRatedTV} isMovie={false} />
      </div>
      <div className="relative">
        <h1 className="text-white text-lg font-semibold">Popular Movies</h1>
        <CardList mediaList={popularMovies} isMovie={true} />
      </div>
      <div className="relative">
        <h1 className="text-white text-lg font-semibold">
          On The Air TV Shows
        </h1>
        <CardList mediaList={onTheAirTV} isMovie={false} />
      </div>
    </div>
  );
};

export default CardsContainer;
