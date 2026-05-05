import { useSelector } from "react-redux";

function GpaSummary() {
  const students = useSelector((state) => state.students.list);

  if (!students || students.length === 0) return null;

  const average = (
    students.reduce((sum, student) => sum + student.gpa, 0) / students.length
  ).toFixed(2);
  const highest = Math.max(...students.map((s) => s.gpa)).toFixed(2);
  const lowest = Math.min(...students.map((s) => s.gpa)).toFixed(2);

  const honorCount = students.filter((s) => s.gpa >= 3.5).length;

  return (
    <div className="summary-panel">
      <div className="summary-card summary-card--total">
        <div className="summary-icon">🎓</div>
        <div className="summary-info">
          <span className="summary-label">Total Students</span>
          <span className="summary-value">{students.length}</span>
        </div>
      </div>

      <div className="summary-card summary-card--average">
        <div className="summary-icon">📊</div>
        <div className="summary-info">
          <span className="summary-label">Average GPA</span>
          <span className="summary-value">{average}</span>
          <div className="gpa-bar-track">
            <div
              className="gpa-bar-fill"
              style={{ width: `${(average / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="summary-card summary-card--highest">
        <div className="summary-icon">🏆</div>
        <div className="summary-info">
          <span className="summary-label">Highest GPA</span>
          <span className="summary-value">{highest}</span>
        </div>
      </div>

      <div className="summary-card summary-card--lowest">
        <div className="summary-icon">📉</div>
        <div className="summary-info">
          <span className="summary-label">Lowest GPA</span>
          <span className="summary-value">{lowest}</span>
        </div>
      </div>

      <div className="summary-card summary-card--honors">
        <div className="summary-icon">⭐</div>
        <div className="summary-info">
          <span className="summary-label">Honor Roll</span>
          <span className="summary-value">{honorCount}</span>
          <span className="summary-sub">GPA ≥ 3.50</span>
        </div>
      </div>
    </div>
  );
}

export default GpaSummary;
