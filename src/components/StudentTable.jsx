import { useState } from "react";
import {
  useGetStudentsQuery,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} from "../features/students/studentApi";
import LoadingOverlay from "./LoadingOverlay.jsx";
import StudentRow from "./StudentRow.jsx";

function StudentTable() {
  const { data: students = [], isLoading, error, refetch } = useGetStudentsQuery();
  const [deleteStudent] = useDeleteStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  function handleEditClick(student) {
    setEditingId(student.id);
    setEditData({ ...student });
  }

  function handleEditChange(event) {
    const { name, value } = event.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    const gpaNum = parseFloat(editData.gpa);
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4) return;
    await updateStudent({ ...editData, gpa: gpaNum });
    setEditingId(null);
    setEditData({});
  }

  function handleCancel() {
    setEditingId(null);
    setEditData({});
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await deleteStudent(id);
    }
  }

  if (isLoading) {
    return (
      <div className="table-wrapper table-wrapper--loading">
        <h3>Student Records</h3>
        <LoadingOverlay label="Loading students..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-banner">
        <p>Error: {error?.data?.message || "Failed to fetch students"}</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  if (!students || students.length === 0) {
    return (
      <div className="table-wrapper">
        <h3>Student Records</h3>
        <p className="no-students">No students found. Add one to the list.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <h3>Student Records</h3>
      <table className="student-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Student ID</th>
            <th>Major</th>
            <th>GPA</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <StudentRow
              key={student.id}
              id={student.id}
              index={index}
              editingId={editingId}
              editData={editData}
              onEditClick={handleEditClick}
              onEditChange={handleEditChange}
              onSave={handleSave}
              onCancel={handleCancel}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
