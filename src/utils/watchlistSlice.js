import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: null,
  reducers: {
    updateWatchlist: (state, action) => {
      console.log(action.payload);
      return action.payload;
    },
  },
});

export const { updateWatchlist } = watchlistSlice.actions;

export default watchlistSlice.reducer;
