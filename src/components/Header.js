import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  const user = useSelector((store) => store.user);

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

  return (
    <div className="absolute w-full flex justify-between bg-gradient-to-b from-black text-white py-2 px-8">
      <div className="flex items-center">
        <img
          className="w-28 mr-3"
          src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="logo"
        ></img>
        <div className="mx-3">Home</div>
        <div className="mx-3">TV Shows</div>
        <div className="mx-3">Movies</div>
        <div className="mx-3">My List</div>
      </div>

      <div className="flex items-center">
        <SearchIcon className="cursor-pointer" fontSize="large" />
        <div className="mx-3">Hi {user?.displayName}</div>
        <div>
          <img
            className="w-8 rounded-sm"
            src="https://occ-0-4826-3646.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXz4LMjJFidX8MxhZ6qro8PBTjmHbxlaLAbk45W1DXbKsAIOwyHQPiMAuUnF1G24CLi7InJHK4Ge4jkXul1xIW49Dr5S7fc.png?r=e6e"
          />
        </div>
        <div className="mx-3 ml-6 cursor-pointer" onClick={handleSignOut}>
          <LogoutIcon />
        </div>
      </div>
    </div>
  );
};

export default Header;
