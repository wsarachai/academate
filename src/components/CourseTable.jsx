import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCourse,
  updateCourse,
} from "../features/courses/coursesSlide.js";

function CourseTable() {
  const courses = useSelector((state) => state.courses.list);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  function handleEditClick(course) {
    setEditingId(course.id);
    setEditData({ ...course });
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    dispatch(
      updateCourse({ ...editData, credits: parseInt(editData.credits) || 3 }),
    );
    setEditingId(null);
  }

  function handleDelete(id) {
    if (window.confirm("Delete this course?")) {
      dispatch(deleteCourse(id));
    }
  }

  return (
    <div className="table-wrapper">
      <h3>Course Catalog</h3>
      {courses.length === 0 ? (
        <p className="no-students">No courses yet.</p>
      ) : (
        <table className="student-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Title</th>
              <th>Department</th>
              <th>Credits</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) =>
              editingId === course.id ? (
                <tr key={course.id}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      className="edit-input"
                      name="code"
                      value={editData.code}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      className="edit-input"
                      name="title"
                      value={editData.title}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      className="edit-input"
                      name="dept"
                      value={editData.dept}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      className="edit-input"
                      name="credits"
                      type="number"
                      min="1"
                      max="6"
                      value={editData.credits}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-save" onClick={handleSave}>
                        Save
                      </button>
                      <button
                        className="btn-cancel"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr key={course.id}>
                  <td>{index + 1}</td>
                  <td>
                    <span className="badge badge--blue">{course.code}</span>
                  </td>
                  <td>{course.title}</td>
                  <td>{course.dept}</td>
                  <td>{course.credits}</td>
                  <td>
                    <div className="action-btns">
                      <button
                        className="btn-edit"
                        onClick={() => handleEditClick(course)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(course.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CourseTable;
