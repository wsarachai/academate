import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addGrade, deleteGrade, updateGrade } from "../features/grades/gradesSlide.js";

const EMPTY_FORM = { studentId: "", courseId: "", score: "", grade: "" };

const GRADE_COLORS = {
  A: "badge--green",
  B: "badge--blue",
  C: "badge--yellow",
  D: "badge--orange",
  F: "badge--red",
};

function scoreToGrade(score) {
  const s = parseFloat(score);
  if (s >= 80) return "A";
  if (s >= 70) return "B";
  if (s >= 60) return "C";
  if (s >= 50) return "D";
  return "F";
}

function GradesPage() {
  const grades = useSelector((state) => state.grades.list);
  const students = useSelector((state) => state.students.list);
  const courses = useSelector((state) => state.courses.list);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    if (name === "score") updated.grade = scoreToGrade(value);
    setFormData(updated);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.studentId || !formData.courseId || formData.score === "") return;
    dispatch(
      addGrade({
        id: Date.now(),
        studentId: parseInt(formData.studentId),
        courseId: parseInt(formData.courseId),
        score: parseFloat(formData.score),
        grade: formData.grade || scoreToGrade(formData.score),
      })
    );
    setFormData(EMPTY_FORM);
  }

  function handleEditClick(g) {
    setEditingId(g.id);
    setEditData({ ...g });
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    const updated = { ...editData, [name]: value };
    if (name === "score") updated.grade = scoreToGrade(value);
    setEditData(updated);
  }

  function handleSave() {
    dispatch(updateGrade({ ...editData, score: parseFloat(editData.score) }));
    setEditingId(null);
  }

  function handleDelete(id) {
    if (window.confirm("Delete this grade record?")) dispatch(deleteGrade(id));
  }

  function getStudentName(id) {
    return students.find((s) => s.id === id)?.name ?? `#${id}`;
  }

  function getCourseTitle(id) {
    const c = courses.find((c) => c.id === id);
    return c ? `${c.code} — ${c.title}` : `#${id}`;
  }

  return (
    <>
      {/* Add Grade Form */}
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>Record a Grade</h3>
        <div className="form-row">
          <select name="studentId" value={formData.studentId} onChange={handleChange} className="form-select">
            <option value="">Select Student *</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <select name="courseId" value={formData.courseId} onChange={handleChange} className="form-select">
            <option value="">Select Course *</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.code} — {c.title}</option>
            ))}
          </select>
          <input
            name="score"
            placeholder="Score (0–100) *"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={formData.score}
            onChange={handleChange}
          />
          {formData.grade && (
            <span className={`badge ${GRADE_COLORS[formData.grade] ?? ""} badge--lg`}>
              Grade: {formData.grade}
            </span>
          )}
          <button type="submit" className="btn-primary">+ Record</button>
        </div>
      </form>

      {/* Grades Table */}
      <div className="table-wrapper">
        <h3>Grade Records</h3>
        {grades.length === 0 ? (
          <p className="no-students">No grade records yet.</p>
        ) : (
          <table className="student-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Course</th>
                <th>Score</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g, index) =>
                editingId === g.id ? (
                  <tr key={g.id}>
                    <td>{index + 1}</td>
                    <td>
                      <select className="edit-input" name="studentId" value={editData.studentId} onChange={handleEditChange}>
                        {students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                    </td>
                    <td>
                      <select className="edit-input" name="courseId" value={editData.courseId} onChange={handleEditChange}>
                        {courses.map((c) => <option key={c.id} value={c.id}>{c.code}</option>)}
                      </select>
                    </td>
                    <td>
                      <input className="edit-input" name="score" type="number" min="0" max="100" step="0.1" value={editData.score} onChange={handleEditChange} />
                    </td>
                    <td><span className={`badge ${GRADE_COLORS[editData.grade] ?? ""}`}>{editData.grade}</span></td>
                    <td>
                      <div className="action-btns">
                        <button className="btn-save" onClick={handleSave}>Save</button>
                        <button className="btn-cancel" onClick={() => setEditingId(null)}>Cancel</button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={g.id}>
                    <td>{index + 1}</td>
                    <td>{getStudentName(g.studentId)}</td>
                    <td>{getCourseTitle(g.courseId)}</td>
                    <td>{g.score.toFixed(1)}</td>
                    <td><span className={`badge ${GRADE_COLORS[g.grade] ?? ""}`}>{g.grade}</span></td>
                    <td>
                      <div className="action-btns">
                        <button className="btn-edit" onClick={() => handleEditClick(g)}>Edit</button>
                        <button className="btn-delete" onClick={() => handleDelete(g.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default GradesPage;
