// src/features/students/selectors.js
import { createSelector } from "@reduxjs/toolkit";

// ── Basic selectors ───────────────────────────────────────
// Select the full list of students from the store
export const selectAllStudents = (state) => state.student.list;

// Select total count
export const selectStudentCount = (state) => state.student.list.length;

// ── Derived / computed selectors ─────────────────────────
// Compute average GPA across all students
export const selectAverageGpa = (state) => {
  const list = state.student.list;
  if (list.length === 0) return "0.00";
  const total = list.reduce((sum, s) => sum + s.gpa, 0);
  return (total / list.length).toFixed(2);
};

// Find a single student by id (useful for edit modal)
export const selectStudentById = (id) => (state) =>
  state.student.list.find((s) => s.id === id);

// Count students above a GPA threshold
export const selectHighAchievers = createSelector(
  [selectAllStudents],
  (list) => list.filter((s) => s.gpa >= 3.5),
);
