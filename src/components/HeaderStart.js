import { Link } from "react-router-dom";

const HeaderStart = () => {
  return (
    <div className="absolute flex justify-between py-2 px-28 w-full bg-gradient-to-b from-black z-10">
      <img
        className="w-48"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      ></img>
      <Link to="/login">
        <div className="bg-red-600 text-base font-semibold py-1 px-3 pb-2 mt-6 text-white w-fit h-fit rounded-sm hover:bg-red-700 transition ease-in-out delay-75">
          Sign In
        </div>
      </Link>
    </div>
  );
};

export default HeaderStart;
