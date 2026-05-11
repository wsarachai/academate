import { useSelector } from "react-redux";
import {
  selectAllStudents,
  selectStudentCount,
} from "../features/students/studentsSlice";
import {
  selectAverageGpa,
  selectHighAchievers,
  selectGpaDistribution,
} from "../features/students/selectors";

function GpaSummary() {
  const students = useSelector(selectAllStudents);
  const count = useSelector(selectStudentCount);
  const avgGpa = useSelector(selectAverageGpa);
  const highList = useSelector(selectHighAchievers);
  const gpaDistribution = useSelector(selectGpaDistribution);

  if (!students || students.length === 0) return null;

  const average = avgGpa === "—" ? "0.00" : avgGpa;
  const averageNum = Number.parseFloat(average) || 0;
  const highest = Math.max(...students.map((s) => s.gpa)).toFixed(2);
  const lowest = Math.min(...students.map((s) => s.gpa)).toFixed(2);
  const honorCount = highList.length;

  return (
    <div className="summary-panel">
      <div className="summary-card summary-card--total">
        <div className="summary-icon">🎓</div>
        <div className="summary-info">
          <span className="summary-label">Total Students</span>
          <span className="summary-value">{count}</span>
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
              style={{ width: `${(averageNum / 4) * 100}%` }}
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

      <div className="summary-card summary-card--distribution">
        <div className="summary-icon">📌</div>
        <div className="summary-info">
          <span className="summary-label">GPA Distribution</span>
          <span className="summary-sub">
            High: {gpaDistribution.high} | Medium: {gpaDistribution.medium} |
            Low: {gpaDistribution.low}
          </span>
        </div>
      </div>
    </div>
  );
}

export default GpaSummary;
