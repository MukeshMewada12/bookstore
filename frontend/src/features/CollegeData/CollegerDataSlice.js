import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCollegeData } from "./CollegeDataApi";

// Async thunk to fetch all colleges
export const fetchAllColleges = createAsyncThunk(
  "college/fetchAllColleges",
  async (_, { rejectWithValue }) => {
    try {
      return await getCollegeData();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const collegeSlice = createSlice({
  name: "college",
  initialState: {
    colleges: [],  
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Colleges
      .addCase(fetchAllColleges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllColleges.fulfilled, (state, action) => {
        state.loading = false;
        state.colleges = action.payload.data;
        state.success = true;
      })
      .addCase(fetchAllColleges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default collegeSlice.reducer;
