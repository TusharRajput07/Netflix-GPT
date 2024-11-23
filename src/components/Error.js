import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="bg-[#141414]">
      <div className="py-2 px-6 md:px-28 w-full bg-gradient-to-b from-black">
        <img
          className="w-36 md:w-48"
          src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="logo"
        ></img>
      </div>
      <div className="text-gray-400 md:flex px-6 md:px-56 py-10">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            className="w-40 md:w-80"
            src="https://assets.dochipo.com/editor/animations/404-error/ab7d4cf7-c9ed-4254-95ef-9adee5b7959c.gif"
            alt="404-image"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-4">
          <div className="text-4xl font-bold">Lost your way?</div>
          <div className="px-2 text-base">
            Sorry, we can't find that page. You'll find lots to explore on the
            Home page.
          </div>
          <Link to="/Browse">
            <div className="bg-red-600 text-xs md:text-lg font-semibold py-1 px-3 pb-2 text-white w-fit h-fit rounded-sm hover:bg-red-700 transition ease-in-out delay-75 cursor-pointer">
              Home
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
