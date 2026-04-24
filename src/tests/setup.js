import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { beforeAll, afterEach, afterAll } from "vitest";

// Establish API mocking before all tests.
beforeAll(() => {});

// Reset any request handlers that are declared as a part of our tests
afterEach(() => {
  cleanup();
});

// Clean up after all tests are done.
afterAll(() => {});
