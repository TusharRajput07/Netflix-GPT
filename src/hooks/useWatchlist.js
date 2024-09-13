import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { updateWatchlist } from "../utils/watchlistSlice";
import { useDispatch, useSelector } from "react-redux";

const useWatchlist = () => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store?.user?.uid);

  // get the watchList from the firestore and put it on the redux store
  const getWatchlist = async () => {
    const q = query(collection(db, "watchlist"), where("userId", "==", userId));
    let tempList = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      tempList.push({ ...doc.data(), docId: doc.id });
    });
    dispatch(updateWatchlist(tempList));
  };

  const handleAddToList = async (
    id,
    isMovie,
    original_name,
    original_title,
    overview,
    poster_path
  ) => {
    // add the movie to the database
    try {
      const docRef = await addDoc(collection(db, "watchlist"), {
        id: id,
        isMovie: isMovie,
        original_name: original_name ?? "",
        original_title: original_title ?? "",
        overview: overview,
        poster_path: poster_path,
        userId: userId,
      });
      console.log("Document written with ID: ", docRef.id);

      // get the watchList from the database and store it on the redux store
      getWatchlist();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleRemoveFromList = async (docId, handleClose) => {
    try {
      await deleteDoc(doc(db, "watchlist", docId));
      // get the updated list from the firestore and put it on the redux store
      getWatchlist();
      handleClose();
    } catch (error) {
      console.error("Error deleting movie: ", error);
    }
  };

  return { handleAddToList, handleRemoveFromList };
};

export default useWatchlist;
