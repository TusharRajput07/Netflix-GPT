import { IconButton } from "@mui/material";
import CardsContainer from "./CardsContainer";
import Header from "./Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { OPTIONS } from "../utils/constants";
import CardList from "./CardList";

const Search = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const [movieList, setMovieList] = useState(null);
  const [tvList, setTvList] = useState(null);

  const fetchMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        searchRef?.current?.value +
        "&include_adult=false&language=en-US&page=1",
      OPTIONS
    );
    const json = await data.json();
    console.log(json?.results);
    setMovieList(json?.results);
  };

  const fetchTV = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/tv?query=" +
        searchRef?.current?.value +
        "&include_adult=false&language=en-US&page=1",
      OPTIONS
    );
    const json = await data.json();
    console.log(json?.results);
    setTvList(json?.results);
  };

  const handleSearch = () => {
    fetchMovies();
    fetchTV();
  };

  return (
    <div>
      <Header />
      <div className="bg-[#252525] h-[30vh] w-full pt-[15vh]">
        <div className="flex items-center justify-between">
          <div className="text-white text-xl font-semibold flex items-center pl-10">
            <IconButton
              color="success"
              onClick={() => {
                navigate("/browse");
              }}
            >
              <ArrowBackIcon
                fontSize="large"
                className="text-white hover:text-red-500"
              />
            </IconButton>
          </div>
          <div className="flex justify-center">
            <input
              ref={searchRef}
              className="w-[30vw] p-4 rounded-sm"
              type="text"
              placeholder="Search for Movies or TV series"
            />
            <div
              onClick={handleSearch}
              className="w-fit py-4 px-6 ml-2 rounded-sm font-semibold cursor-pointer text-white bg-red-500 hover:bg-red-700"
            >
              Search
            </div>
          </div>
          <div className="w-10"></div>
        </div>
      </div>
      <div className="bg-[#252525] h-screen pl-14">
        {movieList && (
          <div>
            <h1 className="text-white text-lg font-semibold">Movies</h1>
            <CardList mediaList={movieList} isMovie={true} />
          </div>
        )}
        {tvList && (
          <div>
            <h1 className="text-white text-lg font-semibold">TV Shows</h1>
            <CardList mediaList={tvList} isMovie={false} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
