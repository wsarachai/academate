import { useSelector } from "react-redux";
import {
  selectAllStudents,
  selectStudentById,
} from "../features/students/studentSlice";

function StudentRow({ id, index, setEditing, handleDelete }) {
  const student = useSelector((state) => selectStudentById(state, id));

  if (!student) return null;

  return (
    <tr key={student.id} className={student.gpa >= 3.5 ? "high-gpa" : ""}>
      <td>{index + 1}</td>
      <td>{student.name}</td>
      <td>{student.studentId}</td>
      <td>{student.major}</td>
      <td className="gpa-cell">{student.gpa.toFixed(2)}</td>
      <td>
        <button type="button" onClick={() => setEditing(student)}>
          Edit
        </button>
        <button type="button" onClick={() => handleDelete(student.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default StudentRow;
