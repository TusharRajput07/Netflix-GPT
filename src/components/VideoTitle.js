import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute top-[35vh] left-16 text-white w-1/2">
      <div className="text-5xl font-extrabold">{title}</div>
      <div className="my-5 text-sm">{overview}</div>
      <div className="flex">
        <div className="bg-white z-20 flex items-center justify-center mr-3 w-fit rounded-sm text-xl font-semibold py-1 px-5 text-black pr-9 cursor-pointer">
          <PlayArrowIcon fontSize="large" />
          Play
        </div>
        <div className="bg-black z-20 bg-opacity-20 flex items-center justify-center w-fit rounded-sm text-xl font-semibold py-1 px-5 cursor-pointer">
          <InfoOutlinedIcon className="mr-1" />
          More Info
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
