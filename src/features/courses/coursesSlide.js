import { createSlice } from "@reduxjs/toolkit";
import {
  addCourseAsync,
  deleteCourseAsync,
  fetchCourses,
  updateCourseAsync,
} from "./coursesThunks";

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addCourseAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(addCourseAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateCourseAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.list.findIndex(
          (course) => course.id === action.payload.id,
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateCourseAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteCourseAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.filter((course) => course.id !== action.payload);
      })
      .addCase(deleteCourseAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const coursesReducer = coursesSlice.reducer;
