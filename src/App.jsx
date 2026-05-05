import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout.jsx";
import StudentsPage from "./pages/StudentsPage.jsx";
import CoursesPage from "./pages/CoursesPage.jsx";
import GradesPage from "./pages/GradesPage.jsx";

function App() {
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
