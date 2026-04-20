import StudentTable from "./StudentTable";
import { useState } from "react";
import { useGetStudentsPageQuery } from "../features/students/studentApi";

function PaginatedStudents() {
	const [page, setPage] = useState(1);
	const LIMIT = 10;
	const { data: students = [], isFetching, isLoading } = useGetStudentsPageQuery({ page, limit: LIMIT });

	return (
		<div>
			{isLoading && <p>Loading first page…</p>}
			{isFetching && <p className="syncing">↻ Loading page {page}…</p>}
			<StudentTable students={students} offset={(page - 1) * LIMIT} />
			<div className="pagination-controls">
				<button onClick={() => setPage(p => Math.max(1, p - 1))}
					disabled={page === 1 || isFetching}>← Prev</button>
				<span>Page {page}</span>
				<button onClick={() => setPage(p => p + 1)}
					disabled={isFetching}>Next →</button>
			</div>
		</div>
	);

}

export default PaginatedStudents;