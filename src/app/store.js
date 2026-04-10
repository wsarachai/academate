import { configureStore } from "@reduxjs/toolkit";
import { studentReducer } from "../features/students/studentSlice";
import { coursesReducer } from "../features/courses/coursesSlide";
import { gradesReducer } from "../features/grades/gradesSlide";

export const store = configureStore({
  reducer: {
    student: studentReducer,
    courses: coursesReducer,
    grades: gradesReducer,
  },
});
