import Card from "./Card";

const CardList = ({ mediaList, isMovie }) => {
  return (
    <div className="full mt-2 mb-2 md:mb-8 flex overflow-y-hidden overflow-x-scroll no-scrollbar">
      {mediaList?.map((media) => (
        <Card key={media?.id} media={media} isMovie={isMovie} />
      ))}
    </div>
  );
};

export default CardList;
