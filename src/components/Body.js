import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import Home from "./Home";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import Search from "./Search";
import MyList from "./MyList";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import { updateWatchlist } from "../utils/watchlistSlice";
import ScrollToTop from "./ScrollToTop";
import ProtectedRouteIn from "./ProtectedRouteIn";
import ProtectedRouteOut from "./ProtextedRouteOut";
import Error from "./Error";

const Body = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // sign in / sign out
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        uid && getWatchlist(uid);
      } else {
        // User is signed out
        dispatch(removeUser());
      }
    });
  }, []);

  const getWatchlist = async (uid) => {
    const q = query(collection(db, "watchlist"), where("userId", "==", uid));
    let tempList = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      tempList.push({ ...doc.data(), docId: doc.id });
    });

    dispatch(updateWatchlist(tempList));
  };

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <ScrollToTop />
          <Home />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <ProtectedRouteOut>
          <ScrollToTop />
          <Login />
        </ProtectedRouteOut>
      ),
    },
    {
      path: "/browse",
      element: (
        <ProtectedRouteIn>
          <ScrollToTop />
          <Browse />
        </ProtectedRouteIn>
      ),
    },
    {
      path: "/search",
      element: (
        <ProtectedRouteIn>
          <ScrollToTop />
          <Search />
        </ProtectedRouteIn>
      ),
    },
    {
      path: "/mylist",
      element: (
        <ProtectedRouteIn>
          <ScrollToTop />
          <MyList />
        </ProtectedRouteIn>
      ),
    },
    {
      path: "*",
      element: (
        <>
          <ScrollToTop />
          <Error />
        </>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
