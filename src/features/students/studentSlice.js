import { createSlice, createEntityAdapter, isPending } from "@reduxjs/toolkit";
import {
  fetchStudents,
  addStudentAsync,
  updateStudentAsync,
  deleteStudentAsync,
} from "./studentsThunks";

const studentAdapter = createEntityAdapter({
  selectId: (student) => student.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = studentAdapter.getInitialState({
  status: "idle",
  error: null,
});

const studentSlice = createSlice({
  name: "students",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        studentAdapter.setAll(state, action.payload);
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addStudentAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        studentAdapter.addOne(state, action.payload);
      })
      .addCase(addStudentAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateStudentAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        studentAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateStudentAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteStudentAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        studentAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteStudentAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addMatcher(
        (action) =>
          action.type.endsWith("/pending") &&
          action.type.startsWith("students/"),
        (state) => {
          state.status = "loading";
          state.error = null;
        },
      )
      .addMatcher(
        (action) =>
          action.type.endsWith("/rejected") &&
          action.type.startsWith("students/"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        },
      );
  },
});

export const {
  selectAll: selectAllStudents,
  selectById: selectStudentById,
  selectTotal: selectStudentCount,
} = studentAdapter.getSelectors((state) => state.students);
export const studentReducer = studentSlice.reducer;
