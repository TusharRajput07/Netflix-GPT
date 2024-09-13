import { useState } from "react";
import { CARD_IMG_URL, OPTIONS } from "../utils/constants";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Popover } from "@mui/material";
import DialogMedia from "./DialogMedia";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import useGetWatchlist from "../hooks/useWatchlist";
import Tooltip from "@mui/material/Tooltip";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useSelector } from "react-redux";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

const Card = ({ media, isMovie }) => {
  const { handleAddToList, handleRemoveFromList } = useGetWatchlist();
  const [isLiked, setIsLiked] = useState(false);

  const { poster_path, original_title, overview, original_name, id } = media;
  const watchList = useSelector((store) => store?.watchlist);

  const watchListDoc = watchList?.find((data) => data?.id == id);

  const [trailer, setTrailer] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleOpenDialog = (event) => {
    event?.stopPropagation();
    handlePopoverClose();
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handlePopoverOpen = (event) => {
    if (!openDialog) {
      setAnchorEl(event.currentTarget);
      if (!trailer) {
        fetchTrailer(isMovie, id);
      }
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const fetchTrailer = async (isMovie, id) => {
    if (!trailer) {
      if (isMovie) {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/" + id + "/videos?language=en-US",
          OPTIONS
        );
        const json = await data.json();
        const filteredData = json?.results?.find(
          (video) => video.type === "Trailer"
        );
        setTrailer(filteredData?.key);
      } else {
        const data = await fetch(
          "https://api.themoviedb.org/3/tv/" + id + "/videos?language=en-US",
          OPTIONS
        );
        const json = await data.json();
        const filteredData = json?.results?.find(
          (video) => video.type === "Trailer"
        );
        setTrailer(filteredData?.key);
      }
    }
  };

  if (!poster_path) {
    return <></>;
  }

  return (
    <div
      className="mr-4 mb-4 cursor-pointer"
      onClick={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <img
        className="min-w-32 w-32 rounded-sm"
        src={CARD_IMG_URL + poster_path}
        alt="Media"
      />
      <Popover
        id="mouse-over-popover"
        className="pointer-events-none"
        classes={{
          paper: "pointer-events-auto",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableScrollLock
      >
        <div className="text-white w-[25vw] relative">
          <div className="cursor-default pointer-events-none bg-black overflow-hidden h-48">
            <iframe
              className="pointer-events-none w-full h-full scale-[1.9]"
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
            ></iframe>
          </div>
          <div
            onClick={handleOpenDialog}
            className="h-fit cursor-pointer bg-[#141414] text-wrap box-border p-2"
          >
            <div className="text-lg font-bold mb-2">
              {original_title ? original_title : original_name}
            </div>
            <div className="flex my-2">
              <PlayCircleIcon className="mr-2" fontSize="large" />
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
                    onClick={(event) => {
                      event.stopPropagation();
                      handleRemoveFromList(watchListDoc?.docId, () => {});
                    }}
                    fontSize="large"
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
                    onClick={(event) => {
                      event.stopPropagation();
                      handleAddToList(
                        id,
                        isMovie,
                        original_name,
                        original_title,
                        overview,
                        poster_path
                      );
                    }}
                    fontSize="large"
                    className="text-white cursor-pointer hover:text-[#b3b3b3]"
                  />
                </Tooltip>
              )}
              {isLiked ? (
                <ThumbUpAltIcon
                  onClick={(event) => {
                    event.stopPropagation();
                    handleLike();
                  }}
                  fontSize="large"
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
                    onClick={(event) => {
                      event.stopPropagation();
                      handleLike();
                    }}
                    fontSize="large"
                    className="text-white ml-2 cursor-pointer hover:text-[#b3b3b3]"
                  />
                </Tooltip>
              )}
            </div>
            <div className="flex justify-end items-center">
              Show More
              <ExpandCircleDownOutlinedIcon className="ml-1" fontSize="large" />
            </div>
          </div>
        </div>
      </Popover>

      {openDialog && (
        <DialogMedia
          open={openDialog}
          handleClose={handleCloseDialog}
          media={media}
          isMovie={isMovie}
          trailer={trailer}
        />
      )}
    </div>
  );
};

export default Card;

//bubbling trickling stop propagation
