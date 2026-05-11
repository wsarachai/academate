import { useSelector } from "react-redux";
import { useGetStudentsQuery } from "../features/students/studentApi";
import {
  selectAverageGPA,
  selectHighGPAStudents,
  selectGPADistribution,
  selectStudentCount,
  selectMaxGPA,
  selectMinGPA,
} from "../features/students/selectors";

function GpaSummary() {
  useGetStudentsQuery();
  const count = useSelector(selectStudentCount);
  const avgGpa = useSelector(selectAverageGPA);
  const highList = useSelector(selectHighGPAStudents);
  const gpaDistribution = useSelector(selectGPADistribution);
  const maxGpa = useSelector(selectMaxGPA);
  const minGpa = useSelector(selectMinGPA);

  if (count === 0) return null;

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
          <span className="summary-value">{avgGpa}</span>
          <div className="gpa-bar-track">
            <div
              className="gpa-bar-fill"
              style={{ width: `${(parseFloat(avgGpa) / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="summary-card summary-card--highest">
        <div className="summary-icon">🏆</div>
        <div className="summary-info">
          <span className="summary-label">Highest GPA</span>
          <span className="summary-value">{maxGpa}</span>
        </div>
      </div>

      <div className="summary-card summary-card--lowest">
        <div className="summary-icon">📉</div>
        <div className="summary-info">
          <span className="summary-label">Lowest GPA</span>
          <span className="summary-value">{minGpa}</span>
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
