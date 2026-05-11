import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "./LoadingOverlay.jsx";
import StudentRow from "./StudentRow.jsx";
import {
  selectStudentsError,
  selectStudentsStatus,
} from "../features/students/selectors";
import { selectAllStudents } from "../features/students/studentsSlice";
import {
  deleteStudentAsync,
  fetchStudents,
  updateStudentAsync,
} from "../features/students/studentsThunks";

function StudentTable() {
  const dispatch = useDispatch();
  const students = useSelector(selectAllStudents);
  const status = useSelector(selectStudentsStatus);
  const error = useSelector(selectStudentsError);
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

  function handleSave() {
    const gpaNum = parseFloat(editData.gpa);
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4) return;

    dispatch(updateStudentAsync({ ...editData, gpa: gpaNum }));
    setEditingId(null);
    setEditData({});
  }

  function handleCancel() {
    setEditingId(null);
    setEditData({});
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudentAsync(id));
    }
  }

  if (status === "loading") {
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
        <p>Error: {error}</p>
        <button onClick={() => dispatch(fetchStudents())}>Retry</button>
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

  if (status !== "succeeded") return null;

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
