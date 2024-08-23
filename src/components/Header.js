import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";

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
    <div className="flex justify-between bg-gray-950 text-white py-2 px-8">
      <div className="flex items-center">
        <img
          className="w-32 mr-3"
          src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="logo"
        ></img>
        <div className="mx-3">Home</div>
        <div className="mx-3">TV Shows</div>
        <div className="mx-3">Movies</div>
        <div className="mx-3">My List</div>
      </div>

      <div className="flex items-center">
        <div className="mx-3">Hi {user?.displayName}</div>
        <div className="mx-3 cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </div>
      </div>
    </div>
  );
};

export default Header;
