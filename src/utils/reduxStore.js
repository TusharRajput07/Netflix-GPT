import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import watchlistReducer from "./watchlistSlice";

const reduxStore = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
    watchlist: watchlistReducer,
  },
});

export default reduxStore;
