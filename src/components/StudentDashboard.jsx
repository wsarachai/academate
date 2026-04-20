import { useGetStudentsQuery } from "../features/students/studentApi";
import StudentTable from "./StudentTable";

function StudentDashboard() {
    const { data: students = [], isLoading, isError, isFetching, error, refetch } = useGetStudentsQuery();

    if (isLoading) {
        return <div className="spinner">Loading…</div>;
    }

    // if (isError) {
    //     return (
    //         <div className="error-banner">
    //             <p>Error: {error?.status || "Failed to fetch students"}</p>
    //             <button onClick={refetch}>Retry</button>
    //         </div>
    //     );
    // }

    return (
        <div>
            {isFetching && <span style={{ fontSize: 11, color: '#3A5BA0' }}>
                ↻ Syncing…
            </span>
            }
            <StudentTable students={students} />
        </div>
    );
}

export default StudentDashboard;