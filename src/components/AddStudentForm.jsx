import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent } from "../features/students/studentsSlice.js";

const EMPTY_FORM = {
  name: "",
  studentId: "",
  major: "",
  gpa: "",
};

function AddStudentForm({ onAddStudent }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Validation logic here
    if (
      !formData.name.trim() ||
      !formData.studentId.trim() ||
      formData.gpa === ""
    ) {
      setErrors({
        name: !formData.name.trim() ? "Name is required" : "",
        studentId: !formData.studentId.trim() ? "Student ID is required" : "",
        gpa: formData.gpa === "" ? "GPA is required" : "",
      });
      return;
    }
    const gpaNum = parseFloat(formData.gpa);
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4) {
      setErrors((prev) => ({
        ...prev,
        gpa: "GPA must be a number between 0.0 and 4.0",
      }));
      return;
    }

    dispatch(
      addStudent({
        id: Date.now(), // Temporary ID — Session 4 uses API-generated IDs
        name: formData.name.trim(),
        studentId: formData.studentId.trim(),
        major: formData.major.trim() || "Undeclared",
        gpa: gpaNum,
      }),
    );

    setFormData(EMPTY_FORM);
    setErrors({});
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Add New Student</h3>
      {errors.name && <span className="form-error">{errors.name}</span>}
      {errors.studentId && (
        <span className="form-error">{errors.studentId}</span>
      )}
      {errors.gpa && <span className="form-error">{errors.gpa}</span>}
      <div className="form-row">
        <input
          name="name"
          placeholder="Full Name *"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          name="studentId"
          placeholder="Student ID *"
          value={formData.studentId}
          onChange={handleChange}
        />
        <input
          name="major"
          placeholder="Major"
          value={formData.major}
          onChange={handleChange}
        />
        <input
          name="gpa"
          placeholder="GPA (0.0–4.0)"
          value={formData.gpa}
          onChange={handleChange}
          type="number"
          step="0.01"
          min="0"
          max="4"
        />
        <button type="submit" className="btn-primary">
          + Add Student
        </button>
      </div>
    </form>
  );
}

export default AddStudentForm;
