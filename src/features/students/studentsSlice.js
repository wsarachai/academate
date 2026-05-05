import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STUDENTS = [
  {
    id: 1,
    name: "SomchaiRakpong",
    studentId: "6501001",
    major: "ComputerScience",
    gpa: 3.85,
  },
  {
    id: 2,
    name: "NareeThongdee",
    studentId: "6501002",
    major: "InformationTechnology",
    gpa: 3.6,
  },
  {
    id: 3,
    name: "KritSuwan",
    studentId: "6501003",
    major: "ComputerScience",
    gpa: 2.95,
  },
  {
    id: 4,
    name: "MaleeJaikaew",
    studentId: "6501004",
    major: "BusinessIT",
    gpa: 3.4,
  },
  {
    id: 5,
    name: "PongSrisuk",
    studentId: "6501005",
    major: "InformationTechnology",
    gpa: 3.75,
  },
];

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    list: INITIAL_STUDENTS,
    status: "idle",
    error: null,
  },
  reducers: {
    addStudent: (state, action) => {
      state.list.push(action.payload);
    },
    deleteStudent: (state, action) => {
      state.list = state.list.filter(
        (student) => student.id !== action.payload,
      );
    },
    updateStudent: (state, action) => {
      const index = state.list.findIndex(
        (student) => student.id === action.payload.id,
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const studentsReducer = studentsSlice.reducer;
export const { addStudent, deleteStudent, updateStudent } =
  studentsSlice.actions;
