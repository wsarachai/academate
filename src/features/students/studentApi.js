import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE = "https://69da9b2226585bd92dd400ca.mockapi.io/api/v1";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE }),
  tagTypes: ["Student"],
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "students",
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: "Student", id })),
            { type: "Student", id: "LIST" },
          ]
          : [{ type: "Student", id: "LIST" }],
    }),
    getStudentsPage: builder.query({
      query: ({ page, limit }) => `students?page=${page}&limit=${limit}`,
      providesTags: (result, error, { page }) =>
        result
          ? [...result.map(({ id }) => ({ type: "Student", id })),
          { type: "Student", id: `PAGE_${page}` },
          ]
          : [{ type: "Student", id: `PAGE_${page}` }],
    }),
    getStudentById: builder.query({
      query: (id) => `students/${id}`,
      providesTags: (result, error, id) => [{ type: "Student", id }],
    }),
    addStudent: builder.mutation({
      query: (student) => ({
        url: "students",
        method: "POST",
        body: student,
      }),
      invalidatesTags: [{ type: "Student", id: "LIST" }],
    }),
    updateStudent: builder.mutation({
      query: (student) => ({
        url: `students/${student.id}`,
        method: "PUT",
        body: student,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, getState, queryFulfilled }) {
        const patchList = dispatch(
          studentApi.util.updateQueryData("getStudents", undefined, (draft) => {
            const item = draft.find((s) => s.id === id);
            if (item) Object.assign(item, patch);
          })
        );
        const patchDetail = dispatch(
          studentApi.util.updateQueryData("getStudentById", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchList.undo();
          patchDetail.undo();
        }
      },
      invalidatesTags: (result, error, student) =>
        error
          ? []
          : [
            { type: "Student", id: student.id },
            { type: "Student", id: "LIST" },
          ],
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Student", id },
        { type: "Student", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useGetStudentsPageQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;
