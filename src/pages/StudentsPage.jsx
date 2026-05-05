import GpaSummary from "../components/GpaSummary.jsx";
import AddStudentForm from "../components/AddStudentForm.jsx";
import StudentTable from "../components/StudentTable.jsx";

function StudentsPage() {
  return (
    <>
      <GpaSummary />
      <AddStudentForm />
      <StudentTable />
    </>
  );
}

export default StudentsPage;
