import { createSlice } from "@reduxjs/toolkit";

const INITIAL_COURSES = [
  { id: 1, code: "CS101", title: "Data Structures", credits: 3, dept: "CS" },
  { id: 2, code: "AI201", title: "AI Fundamentals", credits: 3, dept: "CS" },
  { id: 3, code: "WD301", title: "Web Development", credits: 3, dept: "IT" },
  { id: 4, code: "NS401", title: "Network Security", credits: 3, dept: "IT" },
];

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    list: INITIAL_COURSES,
    status: "idle",
    error: null,
  },
  reducers: {
    addCourse: (state, action) => {
      state.list.push(action.payload);
    },
    deleteCourse: (state, action) => {
      state.list = state.list.filter((course) => course.id !== action.payload);
    },
    updateCourse: (state, action) => {
      const index = state.list.findIndex(
        (course) => course.id === action.payload.id,
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const coursesReducer = coursesSlice.reducer;
export const { addCourse, deleteCourse, updateCourse } = coursesSlice.actions;
