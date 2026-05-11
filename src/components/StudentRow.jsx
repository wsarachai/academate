import { useGetStudentByIdQuery } from "../features/students/studentApi";

function StudentRow({
  id,
  index,
  editingId,
  editData,
  onEditClick,
  onEditChange,
  onSave,
  onCancel,
  onDelete,
}) {
  const { data: student } = useGetStudentByIdQuery(id);
  const isEditing = editingId === id;

  if (!student) return null;

  if (isEditing) {
    return (
      <tr key={student.id} className="high-gpa">
        <td>{index + 1}</td>
        <td>
          <input
            className="edit-input"
            name="name"
            value={editData.name ?? ""}
            onChange={onEditChange}
          />
        </td>
        <td>
          <input
            className="edit-input"
            name="studentId"
            value={editData.studentId ?? ""}
            onChange={onEditChange}
          />
        </td>
        <td>
          <input
            className="edit-input"
            name="major"
            value={editData.major ?? ""}
            onChange={onEditChange}
          />
        </td>
        <td>
          <input
            className="edit-input"
            name="gpa"
            type="number"
            min="0"
            max="4"
            step="0.01"
            value={editData.gpa ?? ""}
            onChange={onEditChange}
          />
        </td>
        <td>
          <div className="action-btns">
            <button className="btn-save" onClick={onSave}>
              Save
            </button>
            <button className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr key={student.id} className={student.gpa >= 3.5 ? "high-gpa" : ""}>
      <td>{index + 1}</td>
      <td>{student.name}</td>
      <td>{student.studentId}</td>
      <td>{student.major}</td>
      <td className="gpa-cell">{student.gpa.toFixed(2)}</td>
      <td>
        <div className="action-btns">
          <button
            className="btn-edit"
            onClick={() => onEditClick(student)}
          >
            Edit
          </button>
          <button
            className="btn-delete"
            onClick={() => onDelete(student.id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default StudentRow;
