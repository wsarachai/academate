import { useSelector } from "react-redux";
import {
  selectAverageGpa,
  selectHighAchievers,
} from "../features/students/selectors";
import { useGetStudentsQuery } from "../features/students/studentApi";

function GpaSummary() {
  const { data: students = [] } = useGetStudentsQuery();
  const count = students.length;
  const avgGpa = useSelector(selectAverageGpa);
  const highList = useSelector(selectHighAchievers);

  return (
    <div className="gpa-summary">
      <div className="gpa-summary">
        <div className="stat-card">
          <span className="stat-label">Students</span>
          <span className="stat-value">{count}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Average GPA</span>
          <span className="stat-value">{avgGpa}</span>
        </div>
        <div className="stat-card highlight">
          <span className="stat-label">Highest GPA</span>
          <span className="stat-value">
            {highList.length > 0
              ? Math.max(...highList.map((s) => s.gpa)).toFixed(2)
              : "0.00"}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Lowest GPA</span>
          <span className="stat-value">
            {highList.length > 0
              ? Math.min(...highList.map((s) => s.gpa)).toFixed(2)
              : "0.00"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default GpaSummary;
