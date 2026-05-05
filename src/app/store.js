import { configureStore } from "@reduxjs/toolkit";
import { studentsReducer } from "../features/students/studentsSlice";
import { coursesReducer } from "../features/courses/coursesSlide";
import { gradesReducer } from "../features/grades/gradesSlide";

export const store = configureStore({
  reducer: {
    students: studentsReducer,
    courses: coursesReducer,
    grades: gradesReducer,
  },
});
