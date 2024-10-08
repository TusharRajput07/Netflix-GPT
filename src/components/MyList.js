import { useSelector } from "react-redux";
import Header from "./Header";
import Card from "./Card";

const MyList = () => {
  const watchlist = useSelector((store) => store?.watchlist);

  return (
    <div>
      <Header />
      <div className="bg-[#252525] pl-6 md:pl-12 min-h-screen w-full py-16 md:py-20">
        <div className="text-white text-lg md:text-2xl pb-5 font-semibold">
          My List
        </div>
        <div className="flex flex-wrap">
          {watchlist?.map((media) => (
            <Card key={media?.id} media={media} isMovie={media?.isMovie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyList;
