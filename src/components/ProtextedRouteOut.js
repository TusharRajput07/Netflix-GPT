import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRouteOut = ({ children }) => {
  // subscribe to the userSlice to continuously track the presence of logged in user
  const user = useSelector((state) => state.user);

  if (user?.uid) {
    // user is not logged in
    return <Navigate to="/browse" replace />;
  }

  // user is logged in
  return children;
};

export default ProtectedRouteOut;
