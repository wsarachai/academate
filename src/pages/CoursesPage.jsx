import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCourse } from "../features/courses/coursesSlide.js";
import CourseTable from "../components/CourseTable.jsx";

const EMPTY_FORM = { code: "", title: "", credits: "", dept: "" };

function CoursesPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(EMPTY_FORM);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.code.trim() || !formData.title.trim()) return;
    dispatch(
      addCourse({
        id: Date.now(),
        code: formData.code.trim(),
        title: formData.title.trim(),
        credits: parseInt(formData.credits) || 3,
        dept: formData.dept.trim() || "General",
      }),
    );
    setFormData(EMPTY_FORM);
  }

  return (
    <>
      {/* Add Course Form */}
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>Add New Course</h3>
        <div className="form-row">
          <input
            name="code"
            placeholder="Code *"
            value={formData.code}
            onChange={handleChange}
          />
          <input
            name="title"
            placeholder="Title *"
            value={formData.title}
            onChange={handleChange}
          />
          <input
            name="dept"
            placeholder="Department"
            value={formData.dept}
            onChange={handleChange}
          />
          <input
            name="credits"
            placeholder="Credits"
            type="number"
            min="1"
            max="6"
            value={formData.credits}
            onChange={handleChange}
          />
          <button type="submit" className="btn-primary">
            + Add Course
          </button>
        </div>
      </form>

      <CourseTable />
    </>
  );
}

export default CoursesPage;
