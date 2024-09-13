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
    console.log(tempList);

    dispatch(updateWatchlist(tempList));
  };

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/mylist",
      element: <MyList />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
