import { IconButton } from "@mui/material";
import CardsContainer from "./CardsContainer";
import Header from "./Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { OPTIONS } from "../utils/constants";
import CardList from "./CardList";
import { useMediaQuery, useTheme } from "@mui/material";

const Search = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const [movieList, setMovieList] = useState(null);
  const [tvList, setTvList] = useState(null);

  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("md"));

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
    <div className="min-h-screen bg-[#252525]">
      <Header />
      <div className="w-full pt-16 md:pt-20">
        <div className="flex items-center justify-between">
          <div className="text-white text-xl font-semibold flex items-center pl-2 md:pl-10">
            <IconButton
              color="success"
              onClick={() => {
                navigate("/browse");
              }}
            >
              <ArrowBackIcon
                fontSize={isLarge ? "large" : "medium"}
                className="text-white hover:text-red-500"
              />
            </IconButton>
          </div>
          <div className="flex justify-center">
            <input
              ref={searchRef}
              className="w-full md:w-[30vw] py-2 md:py-4 px-4 rounded-sm text-sm"
              type="text"
              placeholder="Search for movies or tv series"
            />
            <div
              onClick={handleSearch}
              className="w-fit py-1 md:py-4 px-3 md:px-6 ml-2 rounded-sm font-semibold cursor-pointer text-white bg-red-500 hover:bg-red-700 flex items-center text-sm"
            >
              Search
            </div>
          </div>
          <div className="w-4 md:w-10"></div>
        </div>
      </div>

      <div className="pl-6 md:pl-14 py-8">
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
