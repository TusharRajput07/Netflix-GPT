import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import SignoutDialog from "./SignoutDialog";
import geminiIcon from "../utils/google-gemini-icon.png";

const Header = () => {
  const user = useSelector((store) => store.user);
  const [isScrolled, setIsScrolled] = useState(false);

  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("md"));

  const [openDialog, setOpenDialog] = useState(false);
  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const { pathname } = useLocation();

  useEffect(() => {
    // on mount
    window.addEventListener("scroll", handleScroll);
    // on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  const handleSearch = () => {
    navigate("/search");
  };

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div
      className={`fixed top-0 z-40 w-full flex justify-between bg-gradient-to-b from-black text-white py-0 md:py-2 px-2 md:px-8 transition-colors duration-700 ease-in-out ${
        isScrolled ? "bg-black" : "bg-transparent"
      }`}
    >
      <div className="flex items-center w-full">
        <Link to="/browse">
          <img
            className="w-28 mr-3  cursor-pointer"
            src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
            alt="logo"
          ></img>
        </Link>
        <Link to="/browse">
          <div className="mx-3 cursor-pointer hidden md:block text-sm md:text-md">
            Home
          </div>
        </Link>
        {pathname === "/browse" && (
          <div
            className="mx-3 cursor-pointer hidden md:block text-sm md:text-md"
            onClick={() => scrollToSection("#tv-shows")}
          >
            TV Shows
          </div>
        )}
        {pathname === "/browse" && (
          <div
            className="mx-3 cursor-pointer hidden md:block text-sm md:text-md"
            onClick={() => scrollToSection("#movies")}
          >
            Movies
          </div>
        )}
        {pathname !== "/mylist" && (
          <div
            onClick={() => {
              navigate("/mylist");
            }}
            className="mx-0 md:mx-3 ml-auto md:ml-3 cursor-pointer text-sm md:text-md"
          >
            My List
          </div>
        )}
      </div>

      <div className="flex items-center">
        {pathname !== "/search" && (
          <div
            onClick={handleSearch}
            className={`flex justify-center items-center p-1 w-12 md:w-28 rounded-full cursor-pointer mx-2 md:mx-0 transition-colors duration-700 ease-in-out ${
              isScrolled ? "bg-[#252525]" : "bg-black bg-opacity-30"
            }`}
          >
            <SearchIcon fontSize="medium" />
            <span className="text-sm mx-1 hidden md:block">Search</span>
            <img className="w-4 md:w-6 h-4 md:h-6" src={geminiIcon} />
          </div>
        )}
        <div className="mx-2 md:mx-3 text-sm md:text-md hidden md:block text-nowrap">
          Hi {user?.displayName}
        </div>
        <div>
          <img
            className="w-6 md:w-8 min-w-6 md:min-w-8 rounded-sm cursor-pointer"
            src="https://occ-0-4826-3646.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXz4LMjJFidX8MxhZ6qro8PBTjmHbxlaLAbk45W1DXbKsAIOwyHQPiMAuUnF1G24CLi7InJHK4Ge4jkXul1xIW49Dr5S7fc.png?r=e6e"
          />
        </div>
        <div
          className="mx-0 md:mx-3 ml-2 md:ml-6 mb-1 cursor-pointer hover:text-red-500"
          onClick={handleDialog}
        >
          <LogoutIcon fontSize={isLarge ? "medium" : "small"} />
        </div>
      </div>

      <SignoutDialog
        open={openDialog}
        handleDialog={handleDialog}
        handleSignOut={handleSignOut}
      />
    </div>
  );
};

export default Header;
