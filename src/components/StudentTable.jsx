import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllStudents,
  selectStudentsStatus,
  selectStudentsError
} from "../features/students/selectors";
import EditModal from "./EditModal";
import { deleteStudentAsync, updateStudentAsync } from '../features/students/studentsThunks';

function StudentTable() {
  const dispatch = useDispatch();
  const allStudents = useSelector(selectAllStudents);
  const status = useSelector(selectStudentsStatus);
  const error = useSelector(selectStudentsError);

  const [editing, setEditing] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudentAsync(id));
    }
  };

  const handleEditSave = (student) => {
    dispatch(updateStudentAsync({ ...student, gpa: parseFloat(student.gpa) || 0 }));
    setEditing(null);
  };

  if (status === "loading") {
    return <div className="spinner">Loading…</div>;
  }

  if (error) {
    return (
      <div className="error-banner">
        <p>Error: {error}</p>
        <button onClick={() => dispatch(fetchStudents())}>
          Retry
        </button>
      </div>
    );
  }

  if (!allStudents || allStudents.length === 0) {
    return <p>No students found. Add one to the list.</p>;
  }

  if (status !== "succeeded") return null;

  return (
    <>
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
          {allStudents.map((student, index) => (
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
                <button type="button" onClick={() => setEditing(student)}>
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing && (
        <EditModal
          student={editing}
          onSave={handleEditSave}
          onCancel={() => setEditing(null)}
        />
      )}
    </>
  );
}

export default StudentTable;
