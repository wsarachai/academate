import { useState } from "react";
import "./App.css";
import GpaSummary from "./components/GpaSummary.jsx";
import AddStudentForm from "./components/AddStudentForm.jsx";
import StudentTable from "./components/StudentTable.jsx";

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
        <StudentTable />
      </main>
    </div>
  );
}

export default App;
