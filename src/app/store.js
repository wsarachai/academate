import { configureStore } from "@reduxjs/toolkit";
import { studentApi } from "../features/students/studentApi";
import { coursesReducer } from "../features/courses/coursesSlide";
import { gradesReducer } from "../features/grades/gradesSlide";
import loggerMiddleware from "./middleware/loggerMiddleware";
// import toastMiddleware from "./middleware/toast";

export const store = configureStore({
  reducer: {
    [studentApi.reducerPath]: studentApi.reducer,
    courses: coursesReducer,
    grades: gradesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentApi.middleware)
      .concat(loggerMiddleware) // dev console logging
  // .concat(toastMiddleware), // error notifications
});
