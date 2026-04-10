import { createSlice } from "@reduxjs/toolkit";

const gradesSlice = createSlice({
  name: "grades",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addGrade: (state, action) => {
      state.list.push(action.payload);
    },
    deleteGrade: (state, action) => {
      state.list = state.list.filter((grade) => grade.id !== action.payload);
    },
    updateGrade: (state, action) => {
      const index = state.list.findIndex(
        (grade) => grade.id === action.payload.id,
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const gradesReducer = gradesSlice.reducer;
export const { addGrade, deleteGrade, updateGrade } = gradesSlice.actions;
