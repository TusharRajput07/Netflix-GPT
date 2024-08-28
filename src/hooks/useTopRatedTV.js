import { useDispatch } from "react-redux";
import { addTopRatedTV } from "../utils/movieSlice";
import { OPTIONS } from "../utils/constants";

const useTopRatedTV = () => {
  const dispatch = useDispatch();

  const getTopRatedTV = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
      OPTIONS
    );

    const json = await data.json();
    dispatch(addTopRatedTV(json?.results));
  };

  return getTopRatedTV;
};

export default useTopRatedTV;
