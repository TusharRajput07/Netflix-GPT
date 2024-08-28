import Card from "./Card";

const CardList = ({ mediaList, isMovie }) => {
  return (
    <div className="full mt-2 mb-8 flex overflow-x-scroll no-scrollbar">
      {mediaList?.map((media) => (
        <Card media={media} isMovie={isMovie} />
      ))}
    </div>
  );
};

export default CardList;
