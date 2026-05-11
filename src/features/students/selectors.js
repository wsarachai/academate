import { createSelector } from "@reduxjs/toolkit";
import { studentApi } from "./studentApi";
const selectStudentsResult = studentApi.endpoints.getStudents.select();
const selectStudentsData = createSelector(
  selectStudentsResult,
  (studentsResult) => studentsResult.data ?? [],
);

export const selectAverageGPA = createSelector(
  selectStudentsData,
  (students) => {
    if (students.length === 0) return 0;
    const totalGPA = students.reduce((sum, student) => sum + student.gpa, 0);
    return (totalGPA / students.length).toFixed(2);
  },
);

export const selectHighGPAStudents = createSelector(
  selectStudentsData,
  (students) => students.filter((student) => student.gpa >= 3.5),
);

export const selectGPADistribution = createSelector(
  selectStudentsData,
  (students) => {
    if (students.length === 0) {
      return {
        high: 0,
        medium: 0,
        low: 0,
      };
    }

    return {
      high: students.filter((student) => student.gpa >= 3.5).length,
      medium: students.filter(
        (student) => student.gpa >= 2.5 && student.gpa < 3.5,
      ).length,
      low: students.filter((student) => student.gpa < 2.5).length,
    };
  },
);

export const selectStudentCount = createSelector(
  selectStudentsData,
  (students) => students.length,
);

export const selectMaxGPA = createSelector(selectStudentsData, (students) => {
  if (students.length === 0) return 0;
  return Math.max(...students.map((s) => s.gpa)).toFixed(2);
});

export const selectMinGPA = createSelector(selectStudentsData, (students) => {
  if (students.length === 0) return 0;
  return Math.min(...students.map((s) => s.gpa)).toFixed(2);
});
