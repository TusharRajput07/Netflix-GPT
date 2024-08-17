import { Link } from "react-router-dom";
import HeaderStart from "./HeaderStart";

const Home = () => {
  return (
    <div>
      <HeaderStart />
      <div className="h-full w-full overflow-hidden relative">
        <img
          className="brightness-50 scale-125 translate-y-[-10%] w-full h-full"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/20bf1f4d-1c73-48fd-8689-310d6dd80efc/81bdc063-cb8f-4afe-8a02-a3131ca4ef5e/IN-en-20240812-POP_SIGNUP_TWO_WEEKS-perspective_WEB_7998f3b6-63e3-424a-8328-550cf777ddce_small.jpg"
        />
        {/* <div className="bg-slate-500 text-4xl absolute z-10">jdbfjsd</div> */}
      </div>
      <div className="absolute text-white top-0 my-72 w-full text-center">
        <div className="font-extrabold text-5xl">
          Unlimited movies, TV shows and more
        </div>
        <div className="text-2xl font-semibold my-6">
          Watch anywhere. Cancel anytime.
        </div>
        <div className="text-xl my-2">
          Ready to watch? Enter your email to create or restart your membership.
        </div>
        <Link to="/login">
          <div className="bg-red-600 p-4 text-2xl font-semibold w-48 m-auto cursor-pointer mt-4 rounded-md hover:bg-red-700 transition ease-in-out delay-75">
            Get Started
          </div>
        </Link>
      </div>

      <div className="bg-[#232323] h-2"></div>

      <div className="flex justify-center text-white bg-black py-20">
        <div className="w-1/3 relative">
          <img
            className="w-full"
            src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
          ></img>

          <div className="absolute left-1/2 w-64 translate-x-[-50%] bottom-0 z-10 flex items-center bg-black border border-white rounded-lg p-2">
            <img
              className="h-20"
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png"
            ></img>
            <div className="pl-2">
              <div>Stranger Things</div>
              <div className="text-blue-700">Downloading...</div>
            </div>
            <img
              className="w-14 ml-auto"
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/download-icon.gif"
            />
          </div>
        </div>
        <div className="w-1/3 pt-10">
          <div className="text-5xl font-extrabold mb-4 leading-snug">
            Download your shows to watch offline
          </div>
          <div className="text-2xl">
            Save your favourites easily and always have something to watch.
          </div>
        </div>
      </div>

      <div className="bg-[#232323] h-2"></div>
      <div className="bg-black text-white py-40 text-center font-extrabold text-2xl">
        Footer...
      </div>
    </div>
  );
};

export default Home;
