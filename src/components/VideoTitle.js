import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useMediaQuery, useTheme } from "@mui/material";

const VideoTitle = ({ title, overview, handleFullScreen }) => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div className="absolute top-[150px] md:top-[45vh] left-6 md:left-16 z-20 text-white w-2/3 md:w-1/2">
      <div className="text-xl md:text-5xl font-bold md:font-extrabold mb-2 md:mb-2">
        {title}
      </div>
      <div className="my-5 text-sm hidden md:block">{overview}</div>
      <div className="flex">
        <div
          className="bg-white flex items-center justify-center mr-3 w-fit rounded-sm text-sm md:text-xl font-semibold md:py-1 pl-1 md:pl-5 pr-3 md:pr-9 cursor-pointer text-black hover:bg-[#c9c8c8]"
          onClick={handleFullScreen}
        >
          <PlayArrowIcon fontSize={isLarge ? "large" : "medium"} />
          Play
        </div>
        <div className="bg-black bg-opacity-20 flex items-center justify-center w-fit rounded-sm text-sm md:text-xl font-semibold py-1 px-2 md:px-5 cursor-pointer hover:bg-opacity-50">
          <InfoOutlinedIcon
            fontSize={isLarge ? "large" : "small"}
            className="mr-1"
          />
          More Info
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
