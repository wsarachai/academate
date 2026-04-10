import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStudent,
  updateStudent,
} from "../features/students/studentSlice";
import { selectAllStudents } from "../features/students/selectors";
import EditModal from "./EditModal";

function StudentTable() {
  const dispatch = useDispatch();
  const allStudents = useSelector(selectAllStudents);
  const [editing, setEditing] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  const handleEditSave = (student) => {
    dispatch(updateStudent({ ...student, gpa: parseFloat(student.gpa) || 0 }));
    setEditing(null);
  };

  if (!allStudents || allStudents.length === 0) {
    return <p>No students found. Add one to the list.</p>;
  }
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
              <button onClick={() => setEditing(student)}>Edit</button>
              <button onClick={() => handleDelete(student.id)}>Delete</button>
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
