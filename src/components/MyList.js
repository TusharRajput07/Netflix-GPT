import Header from "./Header";

const MyList = () => {
  return (
    <div>
      <Header />
      <div className="bg-[#252525] h-[30vh] w-full pt-[14vh]">
        <div className="text-white pl-14 text-2xl font-semibold">My List</div>
      </div>
      <div className="h-40 w-full bg-gray-300"></div>
    </div>
  );
};

export default MyList;
