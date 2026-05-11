import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE = "https://69da9b2226585bd92dd400ca.mockapi.io/api/v1";

export const fetchCourses = createAsyncThunk(
  "courses/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE}/courses`);
      if (!res.ok) throw new Error("Failed to fetch courses");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const addCourseAsync = createAsyncThunk(
  "courses/add",
  async (course, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE}/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });
      if (!res.ok) throw new Error("Failed to add course");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const updateCourseAsync = createAsyncThunk(
  "courses/update",
  async (course, thunkAPI) => {
    try {
      const res = await fetch(`${BASE}/courses/${course.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });
      if (!res.ok) throw new Error("Failed to update course");
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const deleteCourseAsync = createAsyncThunk(
  "courses/delete",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`${BASE}/courses/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete course");
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);