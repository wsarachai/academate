import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteStudent,
  updateStudent,
} from "../features/students/studentsSlice.js";
import EditModal from "./EditModal.jsx";

function StudentTable() {
  const students = useSelector((state) => state.students.list);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  function handleEditClick(student) {
    setEditingId(student.id);
    setEditData({ ...student });
  }

  function handleSave(updatedStudent) {
    const gpaNum = parseFloat(updatedStudent.gpa);
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4) return;
    dispatch(updateStudent({ ...updatedStudent, gpa: gpaNum }));
    setEditingId(null);
    setEditData({});
  }

  function handleCancel() {
    setEditingId(null);
    setEditData({});
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id));
    }
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
