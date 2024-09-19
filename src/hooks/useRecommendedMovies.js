import { useDispatch, useSelector } from "react-redux";
import { OPTIONS } from "../utils/constants";
import { addRecommendedMovies } from "../utils/movieSlice";

const useRecommendedMovies = () => {
  const dispatch = useDispatch();
  const { GoogleGenerativeAI } = require("@google/generative-ai");

  const watchlist = useSelector((store) => store?.watchlist);
  const watchlistArray =
    watchlist?.map((media) => media?.original_title || media?.original_name) ??
    [];
  const watchlistString = watchlistArray?.join(", ");

  const fetchMovies = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      OPTIONS
    );
    const json = await data.json();
    return json?.results;
  };
  // ***********************************recommended movies extraction*****************************
  // gemini function to fetch recommended movies
  const getGeminiRecommendations = async () => {
    console.log("funtion called");
    const genAI = new GoogleGenerativeAI(
      "AIzaSyA7AOqkAg9sEMWV04-ilcaVGHp7kv7Iods"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt =
      "Act as a movie recommendation system. Analyze the following query string: '" +
      watchlistString +
      "', and provide a list of 15 comma-separated movie titles in a single string which are similar in genre to the given query movies. If the given query string is empty, provide any 15 movie of any genre. Do not add any heading text. Do not add release year. Just a single comma separated string.";
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    // When Harry Met Sally, Love Actually, The Proposal, 500 Days of Summer, Easy A
    const geminiMediaList = result.response.text().split(", ");
    console.log(geminiMediaList);
    // ['When Harry Met Sally', 'Love Actually', 'The Proposal', '500 Days of Summer', 'Easy A']
    const promiseMovieList = geminiMediaList.map((media) => fetchMovies(media));
    // [Promise, Promise, Promise, Promise, Promise]
    const tmdbMovieResults = await Promise.all(promiseMovieList);
    const filteredTmdbMovies = tmdbMovieResults
      .map((subarray) => subarray?.[0])
      ?.filter((e) => e);
    console.log(filteredTmdbMovies);

    dispatch(addRecommendedMovies(filteredTmdbMovies));
  };
  // *********************************************************************************************

  return getGeminiRecommendations;
};

export default useRecommendedMovies;
