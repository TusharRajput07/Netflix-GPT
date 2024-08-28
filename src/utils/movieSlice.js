import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    onTheAirTV: null,
    topRatedTV: null,
    topRatedMovies: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      //   return {
      //     ...state,
      //     nowPlayingMovies: action.payload,
      //   };
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addOnTheAirTV: (state, action) => {
      state.onTheAirTV = action.payload;
    },
    addTopRatedTV: (state, action) => {
      state.topRatedTV = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addPopularMovies,
  addOnTheAirTV,
  addTopRatedTV,
  addTopRatedMovies,
} = movieSlice.actions;

export default movieSlice.reducer;
