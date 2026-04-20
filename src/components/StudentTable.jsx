import { useState } from "react";
import {
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} from "../features/students/studentApi";
import EditModal from "./EditModal";
import StudentRow from "./StudentRow";

function StudentTable({ students, offset = 0 }) {
  const [deleteStudent] = useDeleteStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();

  const [editing, setEditing] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await deleteStudent(id);
    }
  };

  const handleEditSave = async (student) => {
    await updateStudent({ ...student, gpa: parseFloat(student.gpa) || 0 });
    setEditing(null);
  };

  if (!students || students.length === 0) {
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <StudentRow
              key={student.id}
              student={student}
              index={offset + index}
              setEditing={setEditing}
              handleDelete={handleDelete}
            />
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
