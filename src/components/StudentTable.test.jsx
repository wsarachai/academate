// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../tests/utils";
import StudentTable from "./StudentTable";

const mockStudents = [
  { id: 1, name: "Alice", studentId: "S001", major: "CS", gpa: 3.8 },
  { id: 2, name: "Bob", studentId: "S002", major: "Math", gpa: 3.2 },
];

describe("StudentTable", () => {
  it("shows loading spinner initially", async () => {
    renderWithProviders(<StudentTable />);
    expect(screen.getByText("Loading…")).toBeInTheDocument();
  });

  it("renders student rows after loading", async () => {
    const preloadedState = {
      studentApi: {
        queries: {
          "getStudents(undefined)": {
            status: "fulfilled",
            data: mockStudents,
          },
        },
      },
    };
    renderWithProviders(<StudentTable />, { preloadedState });

    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("3.80")).toBeInTheDocument();
    });
  });
});
