import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import { OPTIONS } from "../utils/constants";
import { useSelector } from "react-redux";
import { forwardRef, useEffect, useRef, useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import useGetWatchlist from "../hooks/useWatchlist";
import Tooltip from "@mui/material/Tooltip";
import { useMediaQuery, useTheme } from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogMedia = ({ open, handleClose, media, isMovie, trailer }) => {
  const { handleAddToList, handleRemoveFromList } = useGetWatchlist();

  const [details, setDetails] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  const { original_title, original_name, title, id, overview, poster_path } =
    media;

  const watchList = useSelector((store) => store?.watchlist);
  const watchListDoc = watchList?.find((data) => data?.id == id);

  const iframeRef = useRef(null);

  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("md"));

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

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
    setDetails(json);
  };

  useEffect(() => {
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
      <div className="w-full md:w-[65vw] relative">
        <div className="bg-slate-500 h-[40vh] md:h-[80vh] overflow-hidden">
          <iframe
            ref={iframeRef}
            className="w-full h-full scale-[1.8] md:scale-[1.4] "
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
          className="absolute top-3 right-3 text-[#181818] cursor-pointer z-20"
          onClick={handleClose}
          fontSize={isLarge ? "large" : "medium"}
        />

        <div className="absolute top-[25vh] md:top-[55vh] z-20 left-4 md:left-14">
          <div className="text-lg md:text-3xl mb-2 md:mb-4 font-bold text-white">
            {original_title ? original_title : original_name}
          </div>
          <div className="flex items-center">
            <div
              onClick={handleFullScreen}
              className="bg-white flex items-center justify-center mr-3 w-fit rounded-sm text-sm md:text-xl font-semibold py-1 pl-1 md:pl-5 pr-3 md:pr-9 cursor-pointer text-black hover:bg-[#c9c8c8]"
            >
              <PlayArrowIcon fontSize={isLarge ? "large" : "medium"} />
              Play
            </div>
            {watchListDoc ? (
              <Tooltip
                title="Remove from my list"
                componentsProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: "white",
                      color: "black",
                      fontSize: "16px",
                      "& .MuiTooltip-arrow": {
                        color: "white",
                      },
                    },
                  },
                }}
                arrow
              >
                <RemoveCircleOutlineIcon
                  onClick={() =>
                    handleRemoveFromList(watchListDoc?.docId, handleClose)
                  }
                  fontSize={isLarge ? "large" : "medium"}
                  className="text-white cursor-pointer hover:text-[#b3b3b3]"
                />
              </Tooltip>
            ) : (
              <Tooltip
                title="Add to my list"
                componentsProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: "white",
                      color: "black",
                      fontSize: "16px",
                      "& .MuiTooltip-arrow": {
                        color: "white",
                      },
                    },
                  },
                }}
                arrow
              >
                <AddCircleOutlineOutlinedIcon
                  onClick={() =>
                    handleAddToList(
                      id,
                      isMovie,
                      original_name,
                      original_title,
                      overview,
                      poster_path
                    )
                  }
                  fontSize={isLarge ? "large" : "medium"}
                  className="text-white cursor-pointer hover:text-[#b3b3b3]"
                />
              </Tooltip>
            )}
            {isLiked ? (
              <ThumbUpAltIcon
                onClick={handleLike}
                fontSize={isLarge ? "large" : "medium"}
                className="text-white ml-2 cursor-pointer hover:text-[#b3b3b3]"
              />
            ) : (
              <Tooltip
                title="Like this"
                componentsProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: "white",
                      color: "black",
                      fontSize: "16px",
                      "& .MuiTooltip-arrow": {
                        color: "white",
                      },
                    },
                  },
                }}
                arrow
              >
                <ThumbUpOffAltIcon
                  onClick={handleLike}
                  fontSize={isLarge ? "large" : "medium"}
                  className="text-white ml-2 cursor-pointer hover:text-[#b3b3b3]"
                />
              </Tooltip>
            )}
          </div>
        </div>

        <div className="absolute top-0 w-full bg-gradient-to-t from-[#181818] h-[40vh] md:h-[80vh] z-10"></div>
        <div className="bg-[#181818] text-white px-4 md:px-12 py-2 flex justify-between min-h-52">
          <div className="w-[60%]">
            <div className="my-2 font-bold text-[#B5B5B5]">
              {isMovie
                ? new Date(details?.release_date)?.getFullYear()
                : new Date(details?.first_air_date)?.getFullYear()}
            </div>
            <div className="text-xs md:text-sm">{overview}</div>
          </div>
          <div className="w-[30%] text-xs md:text-sm">
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
