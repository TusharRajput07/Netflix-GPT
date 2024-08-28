import { useState } from "react";
import { CARD_IMG_URL, OPTIONS } from "../utils/constants";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const Card = ({ media, isMovie }) => {
  // console.log(media);

  const { poster_path, original_title, overview, original_name, id } = media;
  const [isHovered, setIsHovered] = useState(false);
  const [trailer, setTrailer] = useState(null);

  const fetchTrailer = async (isMovie, id) => {
    if (isMovie) {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" + id + "/videos?language=en-US",
        OPTIONS
      );
      const json = await data.json();
      // console.log(json);
      const filteredData = json?.results?.find(
        (video) => video.type === "Trailer"
      );
      setTrailer(filteredData?.key);
    }
  };

  const handleMouseEnter = (isMovie) => {
    setIsHovered(true);
    fetchTrailer(isMovie, id);
  };

  return (
    <div
      className="mr-4 cursor-pointer"
      onMouseEnter={() => handleMouseEnter(isMovie, id)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className="min-w-32 w-32 rounded-sm"
        src={CARD_IMG_URL + poster_path}
        alt="Media"
      />
      {isHovered && (
        <div className="text-white border border-white absolute -top-10 float-left z-50">
          <div className="cursor-default pointer-events-none overflow-hidden bg-black">
            <iframe
              className="pointer-events-none scale-[2.2] -translate-y-2"
              // width="full"
              // height="full"
              src={
                "https://www.youtube.com/embed/" +
                trailer +
                "?si=G6VpOb_C_MfSZlHh&autoplay=1&mute=1&rel=0&loop=1&showinfo=0&controls=0"
              }
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
          <div className="h-fit bg-[#141414] w-[20rem] text-wrap box-border p-2">
            <div className="text-lg font-bold mb-2">
              {original_title ? original_title : original_name}
            </div>
            <div className="text-xs font-extralight line-clamp-3">
              {overview}
            </div>
            <div className="flex my-2">
              <PlayCircleIcon className="mr-2" fontSize="large" />
              <AddCircleOutlineOutlinedIcon className="mr-2" fontSize="large" />
              <ThumbUpOffAltIcon fontSize="large" />
            </div>
            <div>{id}</div>
            <div>{isMovie?.toString()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
