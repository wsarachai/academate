import { createSelector } from "@reduxjs/toolkit";

export const selectAllCourses = (state) => state.courses.list;

export const selectCourseDisplayNameMap = createSelector(
  [selectAllCourses],
  (courses) =>
    courses.reduce((map, course) => {
      map[course.id] = `${course.code} — ${course.title}`;
      return map;
    }, {}),
);
