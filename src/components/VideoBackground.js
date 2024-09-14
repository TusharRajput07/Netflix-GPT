const VideoBackground = ({ trailer, iframeRef }) => {
  return (
    <div className="relative h-[40vh] md:h-[95vh] overflow-hidden">
      <iframe
        ref={iframeRef}
        className="w-full h-full scale-[1.6] md:scale-[1.4] "
        src={
          "https://www.youtube.com/embed/" +
          trailer +
          "?si=L-JbjnKXzZoPJxpW&autoplay=1&mute=1&rel=0&loop=1&showinfo=0&controls=0"
        }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        style={{ pointerEvents: "none" }} // initial style
      ></iframe>
      <div className="absolute top-0 w-full h-full bg-gradient-to-t from-[#141414]"></div>
    </div>
  );
};

export default VideoBackground;
