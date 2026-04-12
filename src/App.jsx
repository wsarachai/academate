import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import GpaSummary from "./components/GpaSummary.jsx";
import AddStudentForm from "./components/AddStudentForm.jsx";
import StudentTable from "./components/StudentTable.jsx";
import { fetchStudents } from "./features/students/studentsThunks";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());  // load data from API when app starts
  }, [dispatch]);               // runs once on mount

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AcadeMate</h1>
        <p>Student Academic Performance Tracker — Session 2 Redux Migration</p>
      </header>
      <main className="app-main">
        <GpaSummary students={[]} />
        <AddStudentForm onAddStudent={() => { }} />
        <StudentTable students={[]} />
      </main>
    </div>
  );
}

export default App;
