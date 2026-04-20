import "./App.css";
import GpaSummary from "./components/GpaSummary.jsx";
import AddStudentForm from "./components/AddStudentForm.jsx";
import StudentDashboard from "./components/StudentDashboard.jsx";
import PaginatedStudents from "./components/PaginatedStudents.jsx";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AcadeMate</h1>
        <p>Student Academic Performance Tracker — Session 2 Redux Migration</p>
      </header>
      <main className="app-main">
        <GpaSummary />
        <AddStudentForm />
        <StudentDashboard />
      </main>
    </div>
  );
}

export default App;
