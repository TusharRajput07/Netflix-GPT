import { useState } from "react";
import { CARD_IMG_URL, OPTIONS } from "../utils/constants";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Popover } from "@mui/material";
import DialogMedia from "./DialogMedia";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";

const Card = ({ media, isMovie }) => {
  const { poster_path, original_title, overview, original_name, id } = media;
  const [trailer, setTrailer] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
    handlePopoverClose();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    if (!trailer) {
      fetchTrailer(isMovie, id);
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

  return (
    <div
      className="mr-4 cursor-pointer"
      onMouseEnter={handlePopoverOpen}
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
          {/* <div className="h-48 w-full absolute top-0 bg-gradient-to-t from-[#141414]"></div> */}
          <div
            onClick={handleOpenDialog}
            className="h-fit cursor-pointer bg-[#141414] text-wrap box-border p-2"
          >
            <div className="text-lg font-bold mb-2">
              {original_title ? original_title : original_name}
            </div>
            <div className="flex my-2">
              <PlayCircleIcon className="mr-2" fontSize="large" />
              <AddCircleOutlineOutlinedIcon className="mr-2" fontSize="large" />
              <ThumbUpOffAltIcon fontSize="large" />
            </div>
            {/* <div>{id}</div> */}
            <div className="flex justify-end items-center">
              Show More
              <ExpandCircleDownOutlinedIcon className="ml-1" fontSize="large" />
            </div>
          </div>
        </div>
      </Popover>

      <DialogMedia
        open={openDialog}
        handleClose={handleCloseDialog}
        media={media}
        isMovie={isMovie}
        trailer={trailer}
      />
    </div>
  );
};

export default Card;
