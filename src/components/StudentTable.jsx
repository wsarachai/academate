import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditModal from "./EditModal.jsx";
import LoadingOverlay from "./LoadingOverlay.jsx";
import {
  selectAllStudents,
  selectStudentsError,
  selectStudentsStatus,
} from "../features/students/selectors";
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

  function handleSave(updatedStudent) {
    const gpaNum = parseFloat(updatedStudent.gpa);
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4) return;

    dispatch(updateStudentAsync({ ...updatedStudent, gpa: gpaNum }));
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
            <tr
              key={student.id}
              className={student.gpa >= 3.5 ? "high-gpa" : ""}
            >
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.studentId}</td>
              <td>{student.major}</td>
              <td className="gpa-cell">{student.gpa.toFixed(2)}</td>
              <td>
                <div className="action-btns">
                  <button
                    className="btn-edit"
                    onClick={() => handleEditClick(student)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingId !== null && (
        <EditModal
          student={editData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default StudentTable;
