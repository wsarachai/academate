import { selectTopStudents } from "./selectors";
import { describe, it, expect } from "vitest";

describe("selectTopStudents", () => {
  const state = {
    studentApi: {
      queries: {
        "getStudents(undefined)": {
          data: [
            { id: 1, name: "Alice", studentId: "S001", major: "CS", gpa: 3.8 },
            { id: 2, name: "Bob", studentId: "S002", major: "Math", gpa: 3.2 },
            {
              id: 3,
              name: "Carol",
              studentId: "S003",
              major: "Physics",
              gpa: 3.7,
            },
          ],
        },
      },
    },
  };

  it("returns students with gpa >= 3.5", () => {
    const result = selectTopStudents(state);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("Alice");
    expect(result[1].name).toBe("Carol");
  });

  it("returns [] when status is not succeeded", () => {
    const s = { studentApi: { queries: {} } };
    expect(selectTopStudents(s)).toEqual([]);
  });
});
