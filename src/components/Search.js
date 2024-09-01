import { IconButton } from "@mui/material";
import CardsContainer from "./CardsContainer";
import Header from "./Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="bg-[#252525] h-[40vh] w-full pt-[20vh]">
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
              className="w-[30vw] p-4 rounded-sm"
              type="text"
              placeholder="Enter Movie or TV series"
            />
            <div className="w-fit py-4 px-6 ml-2 rounded-sm font-semibold cursor-pointer text-white bg-red-500 hover:bg-red-700">
              Search
            </div>
          </div>
          <div className="w-10"></div>
        </div>
      </div>
      <div className="bg-[#252525] pl-9">
        <CardsContainer />
      </div>
    </div>
  );
};

export default Search;
