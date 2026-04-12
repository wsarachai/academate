import { createSlice, isPending } from "@reduxjs/toolkit";
import { fetchStudents, addStudentAsync, updateStudentAsync, deleteStudentAsync } from "./studentsThunks";

const studentSlice = createSlice({
  name: "students",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addStudentAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(addStudentAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateStudentAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.list.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateStudentAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteStudentAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.filter((s) => s.id !== action.payload);
      })
      .addCase(deleteStudentAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending") && action.type.startsWith("students/"),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected") && action.type.startsWith("students/"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export const studentReducer = studentSlice.reducer;
export const { addStudent, deleteStudent, updateStudent } = studentSlice.actions;
