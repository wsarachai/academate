import { createAsyncThunk } from "@reduxjs/toolkit";
const BASE = 'https://69da9b2226585bd92dd400ca.mockapi.io/api/v1';

export const fetchStudents = createAsyncThunk('students/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const res = await fetch(`${BASE}/students`);
        if (!res.ok) throw new Error('Failed to fetch students');
        return await res.json();
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export const addStudentAsync = createAsyncThunk('students/add', async (student, { rejectWithValue }) => {
    try {
        const res = await fetch(`${BASE}/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        });
        if (!res.ok) throw new Error('Failed to add student');
        return await res.json();
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export const updateStudentAsync = createAsyncThunk('students/update', async (student, trunkAPI) => {
    try {
        const res = await fetch(`${BASE}/students/${student.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        });
        if (!res.ok) throw new Error('Failed to update student');
        return await res.json();
    } catch (err) {
        return trunkAPI.rejectWithValue(err.message);
    }
});

export const deleteStudentAsync = createAsyncThunk('students/delete', async (id, trunkAPI) => {
    try {
        const res = await fetch(`${BASE}/students/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete student');
        return id;
    } catch (err) {
        return trunkAPI.rejectWithValue(err.message);
    }
});
