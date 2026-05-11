import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout.jsx";
import StudentsPage from "./pages/StudentsPage.jsx";
import CoursesPage from "./pages/CoursesPage.jsx";
import GradesPage from "./pages/GradesPage.jsx";
import { fetchStudents } from "./features/students/studentsThunks";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents()); // load data from API when app starts
  }, [dispatch]); // runs once on mount

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<StudentsPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="grades" element={<GradesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
