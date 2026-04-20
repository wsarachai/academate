import { configureStore } from "@reduxjs/toolkit";
import { studentApi } from "../features/students/studentApi";
import { coursesReducer } from "../features/courses/coursesSlide";
import { gradesReducer } from "../features/grades/gradesSlide";

export const store = configureStore({
  reducer: {
    [studentApi.reducerPath]: studentApi.reducer,
    courses: coursesReducer,
    grades: gradesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentApi.middleware),
});
