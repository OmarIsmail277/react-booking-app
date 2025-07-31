// features/Search/searchSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../network/axios";

// Thunk to search hotels
export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async ({ query, country }, thunkAPI) => {
    try {
      const params = {};
      if (query) params.name = query;
      if (country) params.country = country;

      const res = await axiosInstance.get("/hotels", { params });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Search failed");
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearResults: (state) => {
      state.results = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearResults } = searchSlice.actions;
export default searchSlice.reducer;
