import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import * as React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import { OPTIONS } from "../utils/constants";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogMedia = ({ open, handleClose, media, isMovie, trailer }) => {
  const [details, setDetails] = React.useState(null);
  const { original_title, title, id, overview } = media;

  const [isLiked, setIsLiked] = React.useState(false);
  const [inList, setInList] = React.useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleAddToList = () => {
    setInList(!inList);
  };

  const iframeRef = React.useRef(null);

  const handleFullScreen = () => {
    const iframe = iframeRef.current;

    //give default attributes back to the iframe
    iframe.style.pointerEvents = "auto";
    iframe.src =
      "https://www.youtube.com/embed/" +
      trailer +
      "?si=G6VpOb_C_MfSZlHh&autoplay=1&rel=0&loop=1&controls=1&start=0";

    // Request fullscreen
    if (iframe.webkitRequestFullscreen) {
      // Chrome, Safari, and Opera
      iframe.webkitRequestFullscreen();
    }
  };

  const fetchDetails = async () => {
    const data = isMovie
      ? await fetch(
          "https://api.themoviedb.org/3/movie/" + media?.id + "?language=en-US",
          OPTIONS
        )
      : await fetch(
          "https://api.themoviedb.org/3/tv/" + media?.id + "?language=en-US",
          OPTIONS
        );
    const json = await data.json();
    console.log(json);
    setDetails(json);
  };

  React.useEffect(() => {
    open && fetchDetails();
  }, [open]);

  return (
    <Dialog
      open={open}
      maxWidth="lg"
      onClose={handleClose}
      TransitionComponent={Transition}
      scroll="body"
    >
      <div className="w-[65vw] relative">
        <div className="bg-slate-500 h-[80vh] overflow-hidden">
          <iframe
            ref={iframeRef}
            className="w-full h-full scale-[1.4] "
            src={
              "https://www.youtube.com/embed/" +
              trailer +
              "?si=G6VpOb_C_MfSZlHh&autoplay=1&mute=1&rel=0&loop=1&showinfo=0&controls=0"
            }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            style={{ pointerEvents: "none" }} // initial style
          ></iframe>
        </div>
        <CancelIcon
          className="absolute top-3 right-3 text-[#181818]"
          fontSize="large"
        />

        <div className="absolute  top-[55vh] z-20 left-14">
          <div className="text-3xl mb-4 font-bold text-white">
            {original_title ? original_title : title}
          </div>
          <div className="flex items-center">
            <div
              onClick={handleFullScreen}
              className="bg-white flex items-center justify-center mr-3 w-fit rounded-sm text-lg font-semibold py-1 px-5 text-black pr-9 cursor-pointer hover:bg-[#c9c8c8]"
            >
              <PlayArrowIcon fontSize="medium" />
              Play
            </div>
            {inList ? (
              <CheckCircleOutlineIcon
                onClick={handleAddToList}
                fontSize="large"
                className="text-white cursor-pointer hover:text-[#b3b3b3]"
              />
            ) : (
              <AddCircleOutlineOutlinedIcon
                onClick={handleAddToList}
                fontSize="large"
                className="text-white cursor-pointer hover:text-[#b3b3b3]"
              />
            )}
            {isLiked ? (
              <ThumbUpAltIcon
                onClick={handleLike}
                fontSize="large"
                className="text-white ml-2 cursor-pointer hover:text-[#b3b3b3]"
              />
            ) : (
              <ThumbUpOffAltIcon
                onClick={handleLike}
                fontSize="large"
                className="text-white ml-2 cursor-pointer hover:text-[#b3b3b3]"
              />
            )}
          </div>
        </div>

        <div className="absolute top-0 w-full bg-gradient-to-t from-[#181818] h-[80vh]"></div>
        <div className="bg-[#181818] text-white px-12 pt-2 flex justify-between h-52">
          <div className="w-[60%]">
            <div className="my-2 font-bold text-[#B5B5B5]">
              {isMovie
                ? new Date(details?.release_date)?.getFullYear()
                : new Date(details?.first_air_date)?.getFullYear()}
            </div>
            <div className="text-sm">{overview}</div>
          </div>
          <div className="w-[30%] text-sm">
            <div className="my-2">
              <span className="text-[#8e8e8e] font-bold">Genre : </span>
              {details?.genres?.map((genre) => genre?.name)?.join(", ")}
            </div>
            <div>
              <span className="text-[#8e8e8e] font-bold">Duration : </span>
              {/* {isMovie ? details?.runtime : details?.number_of_season} */}
              {details?.runtime
                ? details?.runtime + " minutes"
                : details?.number_of_seasons + " seasons"}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogMedia;
