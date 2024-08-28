import { useDispatch } from "react-redux";
import { OPTIONS } from "../utils/constants";
import { addOnTheAirTV } from "../utils/movieSlice";

const useOnTheAirTV = () => {
  const dispatch = useDispatch();

  const getOnTheAirTV = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1",
      OPTIONS
    );

    const json = await data.json();
    dispatch(addOnTheAirTV(json?.results));
  };

  return getOnTheAirTV;
};

export default useOnTheAirTV;
