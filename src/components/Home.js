import { Link } from "react-router-dom";
import HeaderStart from "./HeaderStart";

const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      <HeaderStart />
      <div className="relative w-full overflow-hidden">
        <img
          className="brightness-50 scale-x-150 md:scale-125 w-full h-[100vh] md:h-full"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/20bf1f4d-1c73-48fd-8689-310d6dd80efc/81bdc063-cb8f-4afe-8a02-a3131ca4ef5e/IN-en-20240812-POP_SIGNUP_TWO_WEEKS-perspective_WEB_7998f3b6-63e3-424a-8328-550cf777ddce_small.jpg"
        />
        <div className="absolute top-0 bg-gradient-to-t from-black h-[100vh] md:h-full w-full"></div>
      </div>

      {/* text overlay */}
      <div className="absolute text-white px-6 top-[45vh] md:top-[45vh] w-full text-center">
        <div className="font-extrabold text-3xl md:text-5xl">
          Unlimited movies, TV shows and more
        </div>
        <div className="text-lg md:text-2xl font-semibold my-4 md:my-6">
          Watch anywhere. Cancel anytime.
        </div>
        <div className="text-sm md:text-xl my-2">
          Ready to watch? Click on the button below for Authentication.
        </div>
        <Link to="/login">
          <div className="bg-red-600 p-2 md:p-4 text-lg md:text-2xl font-semibold w-32 md:w-48 m-auto cursor-pointer mt-4 rounded-md hover:bg-red-700 transition ease-in-out delay-75">
            Get Started
          </div>
        </Link>
      </div>

      {/* divider */}
      <div className="bg-[#232323] w-full h-2"></div>

      {/* eleven image */}
      <div className="flex flex-col md:flex-row justify-start md:justify-center text-white bg-black md:py-20 px-5 md:px-0">
        <div className="w-full md:w-1/3 relative">
          <img
            className="w-full"
            src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
          />

          <div className="absolute left-1/2 translate-x-[-50%] bottom-0 z-10 flex items-center bg-black border border-white rounded-lg p-2">
            <img
              className="h-10 md:h-20"
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png"
            />
            <div className="pl-2">
              <div className="text-xs md:text-sm">Stranger Things</div>
              <div className="text-[8px] md:text-xs text-blue-700">
                Downloading...
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 pb-10 mb:pb-0 pt-3 md:pt-10 text-center md:text-left">
          <div className="text-2xl md:text-5xl font-extrabold mb-2 md:mb-4 leading-snug">
            Download your shows to watch offline
          </div>
          <div className="text-sm md:text-2xl">
            Save your favourites easily and always have something to watch.
          </div>
        </div>
      </div>

      <div className="bg-[#232323] w-full h-2"></div>
    </div>
  );
};

export default Home;
